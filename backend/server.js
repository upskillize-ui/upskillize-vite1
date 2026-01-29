const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// ============================================
// Environment Variables (for Render)
// ============================================
const ADMIN_EMAIL_1 = process.env.ADMIN_EMAIL_1 || 'amit@upskillize.com';
const ADMIN_EMAIL_2 = process.env.ADMIN_EMAIL_2 || 'ramesh@upskillize.com';
const ALL_ADMIN_EMAILS = `${ADMIN_EMAIL_1}, ${ADMIN_EMAIL_2}`;
const EMAIL_USER = process.env.EMAIL_USER || 'amit@upskillize.com';
const EMAIL_PASS = process.env.EMAIL_PASS; // MUST be set in Render environment variables

// ============================================
// Middleware Configuration
// ============================================
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// Multer Configuration (File Upload)
// ============================================
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 3 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, and DOCX files are allowed'));
    }
  },
});

// ============================================
// Check Email Password Configuration
// ============================================
if (!EMAIL_PASS) {
  console.error('⚠️  WARNING: EMAIL_PASS environment variable is not set!');
  console.error('⚠️  Email functionality will NOT work until you set it in Render dashboard');
  console.error('⚠️  Go to: Render Dashboard → Environment → Add EMAIL_PASS');
}

// ============================================
// SMTP Configuration - OPTIMIZED FOR RENDER
// ============================================
// Priority order: Try alternative ports first, then standard ports
const smtpConfigs = [
  // BEST: Port 2525 - Alternative SMTP port (less likely to be blocked)
  {
    name: 'Zoho Global - Port 2525 (Alternative)',
    host: 'smtp.zoho.com',
    port: 2525,
    secure: false,
  },
  {
    name: 'Zoho India - Port 2525 (Alternative)',
    host: 'smtp.zoho.in',
    port: 2525,
    secure: false,
  },
  // Try Port 25 (sometimes allowed on cloud servers)
  {
    name: 'Zoho Global - Port 25 (SMTP)',
    host: 'smtp.zoho.com',
    port: 25,
    secure: false,
  },
  {
    name: 'Zoho India - Port 25 (SMTP)',
    host: 'smtp.zoho.in',
    port: 25,
    secure: false,
  },
  // Standard ports (often blocked on Render)
  {
    name: 'Zoho Global - Port 587 (TLS)',
    host: 'smtp.zoho.com',
    port: 587,
    secure: false,
  },
  {
    name: 'Zoho India - Port 587 (TLS)',
    host: 'smtp.zoho.in',
    port: 587,
    secure: false,
  },
  {
    name: 'Zoho Global - Port 465 (SSL)',
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
  },
  {
    name: 'Zoho India - Port 465 (SSL)',
    host: 'smtp.zoho.in',
    port: 465,
    secure: true,
  },
  {
    name: 'Zoho Europe - Port 587 (TLS)',
    host: 'smtp.zoho.eu',
    port: 587,
    secure: false,
  },
  {
    name: 'Zoho Europe - Port 465 (SSL)',
    host: 'smtp.zoho.eu',
    port: 465,
    secure: true,
  },
];

let transporter = null;
let workingConfig = null;

// ============================================
// Initialize SMTP Transporter
// ============================================
async function initializeTransporter() {
  console.log('🔍 Testing SMTP configurations...\n');
  console.log('Trying alternative ports first (2525, 25) - more likely to work on Render\n');
  
  for (const config of smtpConfigs) {
    try {
      console.log(`Testing: ${config.name}`);
      console.log(`  Host: ${config.host}`);
      console.log(`  Port: ${config.port}`);
      console.log(`  Secure: ${config.secure ? 'Yes (SSL)' : 'No (TLS)'}`);
      
      const testTransporter = nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: config.secure,
        auth: {
          user: EMAIL_USER,
          pass: EMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false, // Important for cloud servers
          minVersion: 'TLSv1.2',
          ciphers: 'SSLv3' // Fallback for compatibility
        },
        connectionTimeout: 15000, // Increased to 15 seconds
        greetingTimeout: 15000,
        socketTimeout: 15000,
        logger: false, // Disable verbose logging
        debug: false, // Disable debug mode
      });

      // Test the connection with timeout
      await Promise.race([
        testTransporter.verify(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Connection timeout')), 15000)
        )
      ]);
      
      // Connection successful!
      transporter = testTransporter;
      workingConfig = config;
      
      console.log(`\n✅ ============================================`);
      console.log(`✅ SUCCESS! Connected using: ${config.name}`);
      console.log(`✅ Email server is ready to send messages!`);
      console.log(`✅ ============================================`);
      console.log(`📧 Configured for: ${EMAIL_USER}`);
      console.log(`📬 Admin recipients: ${ALL_ADMIN_EMAILS}\n`);
      break;
      
    } catch (error) {
      console.log(`  ❌ Failed: ${error.message}\n`);
    }
  }

  if (!transporter) {
    console.error('\n❌ ============================================');
    console.error('❌ ALL SMTP CONFIGURATIONS FAILED!');
    console.error('❌ ============================================\n');
    console.error('🔧 Troubleshooting Steps:');
    console.error('\n1. VERIFY ZOHO APP PASSWORD:');
    console.error('   → Generate NEW app password: https://accounts.zoho.in/home#security/application_pwd');
    console.error('   → Update EMAIL_PASS in Render Environment Variables');
    console.error('\n2. ENABLE IMAP/SMTP IN ZOHO:');
    console.error('   → Go to: https://mail.zoho.in');
    console.error('   → Settings → Mail Accounts → Enable IMAP Access');
    console.error('\n3. CHECK ZOHO REGION:');
    console.error('   → India accounts: use smtp.zoho.in');
    console.error('   → Global accounts: use smtp.zoho.com');
    console.error('   → Europe accounts: use smtp.zoho.eu');
    console.error('\n4. CONTACT RENDER SUPPORT:');
    console.error('   → Email: support@render.com');
    console.error('   → Request: "Please unblock SMTP ports (587, 465, 25, 2525) for my service"');
    console.error('   → Include your service URL');
    console.error('\n5. ALTERNATIVE SOLUTIONS:');
    console.error('   → Switch to Gmail SMTP (more reliable on cloud servers)');
    console.error('   → Use SendGrid/Mailgun (designed for servers)');
    console.error('   → Use Zoho Mail API instead of SMTP');
    console.error('\n⚠️  EMAIL WILL NOT WORK UNTIL THIS IS FIXED!\n');
  }
}

// Initialize SMTP on server startup
if (EMAIL_PASS) {
  initializeTransporter();
} else {
  console.error('\n❌ Cannot initialize SMTP: EMAIL_PASS environment variable not set\n');
}

// ============================================
// ROUTE 1: Contact Form Submission
// ============================================
app.post('/send-mail', async (req, res) => {
  const { name, email, phone, company, inquiry, message } = req.body;

  console.log('\n📨 ============================================');
  console.log('📨 Contact Form Submission Received');
  console.log('📨 ============================================');
  console.log('From:', email);
  console.log('Name:', name);
  console.log('Inquiry:', inquiry);

  if (!transporter) {
    console.error('❌ Email not configured - cannot send');
    return res.status(503).json({ 
      success: false, 
      message: 'Email service is not configured. Please contact administrator.',
      error: 'SMTP_NOT_CONFIGURED'
    });
  }
  if (!name || !email || !inquiry || !message) {

    console.error('❌ Missing required fields');
    return res.status(400).json({ 
      success: false, 
      message: 'Missing required fields: name, email, inquiry, message' 
    });
  }

  try {
    console.log(`Using SMTP: ${workingConfig.name}`);
    
    // Email to admin
    const adminEmail = await transporter.sendMail({
      from: EMAIL_USER,
      to: ALL_ADMIN_EMAILS,
      replyTo: email,
      subject: `New Contact Form - ${inquiry}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        Company: ${company || 'Not provided'}
        Inquiry: ${inquiry}

        Message:
        ${message}
        `,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4f46e5; margin-top: 0;">New Contact Form Submission</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee;">Name:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee;">Email:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee;">Phone:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${phone || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee;">Company:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${company || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee;">Inquiry:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${inquiry}</td>
              </tr>
            </table>
            <h3 style="color: #4f46e5; margin-top: 20px;">Message:</h3>
            <p style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #4f46e5;">${message}</p>
          </div>
        </div>
      `,
    });

    console.log('✅ Admin email sent successfully');
    console.log('   Message ID:', adminEmail.messageId);

    // Confirmation email to user
    const userEmail = await transporter.sendMail({
      from: EMAIL_USER,
      to: email,
      subject: 'We received your message - Upskillize',
      text: `Hi ${name},\n\nThank you for contacting Upskillize! We've received your message about ${inquiry} and will respond within 24-48 hours.\n\nBest regards,\nUpskillize Team`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4f46e5;">Thank You for Contacting Us!</h2>
            <p>Hi ${name},</p>
            <p>We've received your message about <strong>${inquiry}</strong> and will respond within 24-48 hours.</p>
            <p>Best regards,<br><strong>Upskillize Team</strong></p>
          </div>
        </div>
      `,
    });

    console.log('✅ User confirmation email sent successfully');
    console.log('   Message ID:', userEmail.messageId);
    console.log('✅ Contact form processed successfully\n');

    res.json({ 
      success: true, 
      message: 'Email sent successfully' 
    });
    
  } catch (error) {
    console.error('\n❌ ============================================');
    console.error('❌ Email Sending Failed');
    console.error('❌ ============================================');
    console.error('Error:', error.message);
    console.error('Code:', error.code);
    console.error('Response:', error.response);
    console.error('============================================\n');
    
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send email',
      error: error.message,
      code: error.code
    });
  }
});

// ============================================
// ROUTE 2: Career Application Submission
// ============================================
app.post('/send-career-application', upload.single('resume'), async (req, res) => {
  const { name, email, phone, linkedin, opportunity, message } = req.body;
  const resume = req.file;

  console.log('\n📨 ============================================');
  console.log('📨 Career Application Received');
  console.log('📨 ============================================');
  console.log('From:', email);
  console.log('Position:', opportunity);

  if (!resume) {
    console.error('❌ No resume file uploaded');
    return res.status(400).json({ 
      success: false, 
      message: 'Resume is required' 
    });
  }

  if (!transporter) {
    console.error('❌ Email not configured');
    return res.status(503).json({ 
      success: false, 
      message: 'Email service is not configured',
      error: 'SMTP_NOT_CONFIGURED'
    });
  }

  try {
    console.log(`Using SMTP: ${workingConfig.name}`);
    console.log('Resume file:', resume.originalname, `(${resume.size} bytes)`);
    
    const adminEmail = await transporter.sendMail({
      from: EMAIL_USER,
      to: ALL_ADMIN_EMAILS,
      subject: `Career Application - ${opportunity}`,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone}
LinkedIn: ${linkedin || 'Not provided'}
Opportunity: ${opportunity}

About Applicant:
${message}

Resume attached: ${resume.originalname}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4f46e5; margin-top: 0;">New Career Application</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee;">Name:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee;">Email:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee;">Phone:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee;">LinkedIn:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${linkedin || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee;">Opportunity:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${opportunity}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee;">Resume:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${resume.originalname}</td>
              </tr>
            </table>
            <h3 style="color: #4f46e5; margin-top: 20px;">About Applicant:</h3>
            <p style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #4f46e5;">${message}</p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: resume.originalname,
          content: resume.buffer,
        },
      ],
    });

    console.log('✅ Admin email sent successfully');
    console.log('   Message ID:', adminEmail.messageId);

    const userEmail = await transporter.sendMail({
      from: EMAIL_USER,
      to: email,
      subject: 'Application Received - Upskillize Career Services',
      text: `Hi ${name},\n\nThank you for your application for ${opportunity}! We'll review it within 3-5 business days.\n\nBest regards,\nUpskillize Career Team`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4f46e5;">Application Received!</h2>
            <p>Hi ${name},</p>
            <p>Thank you for your application for <strong>${opportunity}</strong>!</p>
            <p>We'll review your application within 3-5 business days and get back to you.</p>
            <p>Best regards,<br><strong>Upskillize Career Team</strong></p>
          </div>
        </div>
      `,
    });

    console.log('✅ User confirmation email sent successfully');
    console.log('   Message ID:', userEmail.messageId);
    console.log('✅ Career application processed successfully\n');

    res.json({ 
      success: true, 
      message: 'Application submitted successfully' 
    });
    
  } catch (error) {
    console.error('\n❌ Email sending failed:', error.message);
    
    res.status(500).json({ 
      success: false, 
      message: 'Failed to submit application',
      error: error.message 
    });
  }
});

// ============================================
// ROUTE 3: Course Launch Notification Request
// ============================================
app.post('/send-notification', async (req, res) => {
  const { email, courseName, date } = req.body;

  console.log('\n📨 ============================================');
  console.log('📨 Course Notification Request');
  console.log('📨 ============================================');
  console.log('Email:', email);
  console.log('Course:', courseName);

  if (!transporter) {
    console.error('❌ Email not configured');
    return res.status(503).json({ 
      success: false, 
      message: 'Email service is not configured',
      error: 'SMTP_NOT_CONFIGURED'
    });
  }

  try {
    console.log(`Using SMTP: ${workingConfig.name}`);
    
    const adminEmail = await transporter.sendMail({
      from: EMAIL_USER,
      to: ALL_ADMIN_EMAILS,
      replyTo: email,
      subject: `Course Launch Notification Request - ${courseName}`,
      text: `
Course Notification Request

Email: ${email}
Course: ${courseName}
Requested on: ${date}

Action Required: Add this user to the notification list for ${courseName}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4f46e5; margin-top: 0;">🔔 Course Launch Notification Request</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee;">User Email:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee;">Course:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${courseName}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee;">Requested on:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${date}</td>
              </tr>
            </table>
            <div style="background-color: #fff3cd; padding: 15px; margin-top: 20px; border-left: 4px solid #ffc107; border-radius: 5px;">
              <p style="margin: 0; color: #856404;"><strong>Action Required:</strong> Add this user to the notification list for <strong>${courseName}</strong></p>
            </div>
          </div>
        </div>
      `,
    });

    console.log('✅ Admin notification sent successfully');
    console.log('   Message ID:', adminEmail.messageId);

    const userEmail = await transporter.sendMail({
      from: EMAIL_USER,
      to: email,
      subject: `You're on the list! - ${courseName}`,
      text: `Thank you for your interest in ${courseName}!\n\nWe'll notify you as soon as this course launches. You'll be among the first to know and will receive exclusive early-bird discounts.\n\nBest regards,\nUpskillize Team`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4f46e5;">🎉 You're on the List!</h2>
            <p>Thank you for your interest in <strong>${courseName}</strong>!</p>
            <div style="background-color: #e8f4fd; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <h3 style="color: #0066cc; margin-top: 0;">What happens next?</h3>
              <ul style="color: #333; line-height: 1.8;">
                <li>We'll notify you immediately when the course launches</li>
                <li>You'll receive exclusive early-bird discounts</li>
                <li>Get priority access to limited seats</li>
              </ul>
            </div>
            <p>Stay tuned!</p>
            <p>Best regards,<br><strong>Upskillize Team</strong></p>
          </div>
        </div>
      `,
    });

    console.log('✅ User confirmation sent successfully');
    console.log('   Message ID:', userEmail.messageId);
    console.log('✅ Notification request processed successfully\n');

    res.json({ 
      success: true, 
      message: 'Notification request sent successfully' 
    });
    
  } catch (error) {
    console.error('\n❌ Email sending failed:', error.message);
    
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send notification request',
      error: error.message 
    });
  }
});

// ============================================
// Health Check Endpoint
// ============================================
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development',
    emailConfigured: transporter !== null,
    smtpConfig: workingConfig ? workingConfig.name : 'Not configured',
    emailUser: EMAIL_USER,
    adminEmails: ALL_ADMIN_EMAILS
  });
});

// ============================================
// Root Endpoint
// ============================================
app.get('/', (req, res) => {
  res.json({
    message: 'Upskillize Email API',
    version: '2.1.0',
    endpoints: [
      'POST /send-mail',
      'POST /send-career-application',
      'POST /send-notification',
      'GET /health'
    ],
    emailStatus: transporter ? '✅ Configured' : '❌ Not configured',
    smtpConfig: workingConfig ? workingConfig.name : 'None',
    documentation: 'Optimized for Render with alternative SMTP ports'
  });
});

// ============================================
// Error Handling Middleware
// ============================================
app.use((err, req, res, next) => {
  console.error('\n❌ Unhandled Error:');
  console.error('Message:', err.message);
  console.error('Stack:', err.stack);
  
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message
  });
});

// ============================================
// Start Server
// ============================================
app.listen(PORT, () => {
  console.log('\n╔═══════════════════════════════════════════╗');
  console.log('║   🚀 UPSKILLIZE EMAIL API SERVER         ║');
  console.log('╚═══════════════════════════════════════════╝\n');
  console.log(`🌐 Server running on port: ${PORT}`);
  console.log(`📧 Email User: ${EMAIL_USER}`);
  console.log(`📬 Admin Recipients: ${ALL_ADMIN_EMAILS}`);
  console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`\n📋 Available Endpoints:`);
  console.log(`   POST /send-mail`);
  console.log(`   POST /send-career-application`);
  console.log(`   POST /send-notification`);
  console.log(`   GET  /health`);
  console.log(`   GET  /\n`);
  console.log('╔═══════════════════════════════════════════╗');
  console.log('║   Server Ready - Waiting for requests     ║');
  console.log('╚═══════════════════════════════════════════╝\n');
});