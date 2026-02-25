require('dotenv').config();

const express = require('express');
const { Resend } = require('resend');
const multer = require('multer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// ============================================
// Environment Variables
// ============================================
const ADMIN_EMAIL_1 = process.env.ADMIN_EMAIL_1 || 'amit@upskillize.com';
const ADMIN_EMAIL_2 = process.env.ADMIN_EMAIL_2 || 'ramesh@upskillize.com';
const ALL_ADMIN_EMAILS = [ADMIN_EMAIL_1, ADMIN_EMAIL_2];

// Resend Configuration
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || 'ramesh@upskillize.com';

// ============================================
// Middleware - SIMPLIFIED CORS Configuration
// ============================================

// Define allowed origins
const allowedOrigins = [
  'https://upskillize.com',
  'https://www.upskillize.com',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5000'
];

// Manual CORS headers (more reliable than cors package)
app.use((req, res, next) => {
  const origin = req.get('origin');
  
  // Set CORS headers
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (!origin) {
    res.setHeader('Access-Control-Allow-Origin', '*');
  } else {
    // Allow all for now (you can restrict later)
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    console.log('✅ Preflight request from:', origin);
    return res.status(200).end();
  }
  
  next();
});

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`${new Date().toISOString()}`);
  console.log(`${req.method} ${req.path}`);
  console.log(`Origin: ${req.get('origin') || 'No origin'}`);
  console.log(`${'='.repeat(50)}\n`);
  next();
});

// ============================================
// Multer Configuration
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
      cb(new Error('Only PDF, DOC, DOCX files are allowed'));
    }
  },
});

// ============================================
// Resend Configuration
// ============================================
let resend = null;

if (!RESEND_API_KEY) {
  console.error('\n⚠️  ============================================');
  console.error('⚠️  WARNING: RESEND_API_KEY not set!');
  console.error('⚠️  Get API key: https://resend.com/api-keys');
  console.error('⚠️  ============================================\n');
} else {
  try {
    resend = new Resend(RESEND_API_KEY);
    console.log('\n✅ ============================================');
    console.log('✅ Resend API configured successfully!');
    console.log('✅ ============================================');
    console.log(`📧 From Email: ${FROM_EMAIL}`);
    console.log(`📬 Admin Emails: ${ALL_ADMIN_EMAILS.join(', ')}\n`);
  } catch (error) {
    console.error('\n❌ Resend initialization failed:', error.message);
    resend = null;
  }
}

// ============================================
// ROUTE 1: Contact Form
// ============================================
app.post('/send-mail', async (req, res) => {
  const { name, email, phone, company, inquiry, message } = req.body;

  console.log('\n📨 New Contact Form Submission');
  console.log('Name:', name);
  console.log('Email:', email);
  console.log('Inquiry:', inquiry);
  console.log('Origin:', req.get('origin'));

  // Validation
  if (!name || !email || !inquiry || !message) {
    console.log('❌ Missing required fields');
    return res.status(400).json({
      success: false,
      message: 'Missing required fields: name, email, inquiry, and message are required'
    });
  }

  if (!resend) {
    console.error('❌ Resend not configured');
    return res.status(503).json({
      success: false,
      message: 'Email service not configured',
      error: 'RESEND_NOT_CONFIGURED'
    });
  }

  try {
    // Send to admins
    const adminEmail = await resend.emails.send({
      from: FROM_EMAIL,
      to: ALL_ADMIN_EMAILS,
      reply_to: email,
      subject: `New Contact: ${inquiry} - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4f46e5;">📩 New Contact Form</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee;">Name:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee;">Email:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
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
                <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>${inquiry}</strong></td>
              </tr>
            </table>
            <div style="background-color: #f8f9fa; padding: 20px; margin-top: 20px; border-radius: 5px;">
              <h3 style="color: #333; margin-top: 0;">Message:</h3>
              <p style="color: #555; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
        </div>
      `,
    });

    console.log('✅ Admin notification sent:', adminEmail.id);

    // Determine email template based on inquiry type
    let userSubject = '';
    let userHtml = '';

    if (inquiry === 'Course Information') {
      // Template 1: Course Information Inquiry
      userSubject = 'Thank You for Your Interest in Upskillize Courses!';
      userHtml = `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4f46e5;">Thank You for Your Interest in Upskillize Courses!</h2>
            <p>Hi ${name},</p>
            <p>Thank you for reaching out to learn more about our courses! We're excited that you're considering Upskillize for your learning journey.</p>
            <p>We've received your inquiry and our team will respond within 24 hours with detailed course information tailored to your interests.</p>
            <p>If you'd like to connect sooner, feel free to reach out:</p>
            <p style="margin-left: 20px;">
              <strong>Amit Agrawal – Co-Founder & Chief Sales Officer</strong><br>
              📱 <a href="tel:+919820397297">+91 98203 97297</a><br>
              ✉️ <a href="mailto:amit@upskillize.com">amit@upskillize.com</a>
            </p>
            <p>Looking forward to helping you achieve your goals!</p>
            <p>Warm regards,<br><strong>Upskillize Team</strong></p>
            <p style="text-align: center; margin-top: 20px;">
              🌐 <a href="https://www.upskillize.com">www.upskillize.com</a>
            </p>
          </div>
        </div>
      `;
    } else if (inquiry === 'Corporate Training' || inquiry === 'Partnership' || inquiry === 'General Support') {
      // Template 2: Corporate Training / Partnership / General Support
      userSubject = 'Thank You for Reaching Out to Upskillize!';
      userHtml = `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4f46e5;">Thank You for Reaching Out to Upskillize!</h2>
            <p>Hi ${name},</p>
            <p>Thank you for getting in touch with us! We truly appreciate you considering Upskillize and are excited about the opportunity to work with you.</p>
            <p>We've received your inquiry and our team will respond within 24 hours to address your needs and explore how we can help.</p>
            <p>If you'd like to connect sooner, please feel free to reach out directly:</p>
            <p style="margin-left: 20px;">
              <strong>Amit Agrawal – Co-Founder & Chief Sales Officer</strong><br>
              📱 <a href="tel:+919820397297">+91 98203 97297</a><br>
              ✉️ <a href="mailto:amit@upskillize.com">amit@upskillize.com</a>
            </p>
            <p>We look forward to connecting with you soon!</p>
            <p>Warm regards,<br><strong>Upskillize Team</strong></p>
            <p style="text-align: center; margin-top: 20px;">
              🌐 <a href="https://www.upskillize.com">www.upskillize.com</a>
            </p>
          </div>
        </div>
      `;
    } else {
      // Default template
      userSubject = 'Thank you for contacting Upskillize';
      userHtml = `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4f46e5;">Thank You!</h2>
            <p>Hi ${name},</p>
            <p>Thank you for getting in touch with us! We truly appreciate you considering Upskillize and are excited about the opportunity to work with you.</p>
            <p>We've received your inquiry and our team will respond within 24 hours to address your needs and explore how we can help.</p>
            <p>If you'd like to connect sooner, please feel free to reach out directly:</p>
            <p style="margin-left: 20px;">
              <strong>Amit Agrawal – Co-Founder & Chief Sales Officer</strong><br>
              📱 <a href="tel:+919820397297">+91 98203 97297</a><br>
              ✉️ <a href="mailto:amit@upskillize.com">amit@upskillize.com</a>
            </p>
            <p>We look forward to connecting with you soon!</p>
            <p>Warm regards,<br><strong>Upskillize Team</strong></p>
            <p style="text-align: center; margin-top: 20px;">
              🌐 <a href="https://www.upskillize.com">www.upskillize.com</a>
            </p>
          </div>
        </div>
      `;
    }

    // Send confirmation to user
    const userEmail = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: userSubject,
      html: userHtml,
    });

    console.log('✅ User confirmation sent:', userEmail.id, '\n');
    res.json({ success: true, message: 'Message sent successfully!' });

  } catch (error) {
    console.error('❌ Email failed:', error.message);
    console.error('Error details:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send email', 
      error: error.message 
    });
  }
});

// ============================================
// ROUTE 2: Career Application
// ============================================
app.post('/send-career-application', upload.single('resume'), async (req, res) => {
  const { name, email, phone, opportunity, portfolio } = req.body;
  const resume = req.file;

  console.log('\n📨 New Career Application');
  console.log('Name:', name);
  console.log('Opportunity:', opportunity);
  console.log('Origin:', req.get('origin'));

  if (!name || !email || !opportunity) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields'
    });
  }

  if (!resend) {
    return res.status(503).json({ 
      success: false, 
      message: 'Email not configured' 
    });
  }

  try {
    const emailData = {
      from: FROM_EMAIL,
      to: ALL_ADMIN_EMAILS,
      reply_to: email,
      subject: `Career Application: ${opportunity} - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>💼 New Career Application</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Opportunity:</strong> ${opportunity}</p>
          <p><strong>Portfolio:</strong> ${portfolio || 'Not provided'}</p>
          ${resume ? '<p>📎 Resume attached</p>' : ''}
        </div>
      `,
    };

    if (resume) {
      emailData.attachments = [{
        filename: resume.originalname,
        content: resume.buffer,
      }];
    }

    const adminEmail = await resend.emails.send(emailData);
    console.log('✅ Admin notification sent:', adminEmail.id);

    const userEmail = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Application Received - ${opportunity}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Application Received!</h2>
          <p>Hi ${name},</p>
          <p>Thank you for applying for <strong>${opportunity}</strong>!</p>
          <p>We'll review within 1-3 business days.</p>
          <p>Best Regards,<br><strong>Upskillize Career Team</strong></p>
        </div>
      `,
    });

    console.log('✅ User confirmation sent:', userEmail.id, '\n');
    res.json({ success: true, message: 'Application submitted' });

  } catch (error) {
    console.error('❌ Email failed:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to submit', 
      error: error.message 
    });
  }
});

// ============================================
// ROUTE 3: Course Notification
// ============================================
app.post('/send-notification', async (req, res) => {
  const { email, courseName, date } = req.body;

  console.log('\n📨 Course Notification Request');
  console.log('Email:', email);
  console.log('Course:', courseName);
  console.log('Origin:', req.get('origin'));

  if (!email || !courseName) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields'
    });
  }

  if (!resend) {
    return res.status(503).json({ 
      success: false, 
      message: 'Email not configured' 
    });
  }

  try {
    const adminEmail = await resend.emails.send({
      from: FROM_EMAIL,
      to: ALL_ADMIN_EMAILS,
      reply_to: email,
      subject: `Course Notification: ${courseName}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>🔔 Course Notification Request</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Course:</strong> ${courseName}</p>
          <p><strong>Date:</strong> ${date || new Date().toLocaleDateString()}</p>
        </div>
      `,
    });

    console.log('✅ Admin notification sent:', adminEmail.id);

    const userEmail = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Thanks for Your Interest – Exciting Things Coming Soon!',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4f46e5;">Thanks for Your Interest – Exciting Things Coming Soon!</h2>
            <p>Hi there,</p>
            <p>Thank you for your interest in this program! We're thrilled to see your enthusiasm.</p>
            <p>This course is currently under development and will be launching soon. We'll make sure to keep you updated and notify you as soon as it's available.</p>
            <p>In the meantime, if you'd like to explore our other programs or have any questions, feel free to reach out:</p>
            <p style="margin-left: 20px;">
              <strong>Amit Agrawal – Co-Founder & Chief Sales Officer</strong><br>
              📱 <a href="tel:+919820397297">+91 98203 97297</a><br>
              ✉️ <a href="mailto:amit@upskillize.com">amit@upskillize.com</a>
            </p>
            <p>Stay tuned for something amazing!</p>
            <p>Warm regards,<br><strong>Upskillize Team</strong></p>
            <p style="text-align: center; margin-top: 20px;">
              🌐 <a href="https://www.upskillize.com">www.upskillize.com</a>
            </p>
          </div>
        </div>
      `,
    });

    console.log('✅ Notification sent:', userEmail.id, '\n');
    res.json({ success: true, message: 'Notification request sent' });

  } catch (error) {
    console.error('❌ Email failed:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Failed', 
      error: error.message 
    });
  }
});

// ============================================
// ROUTE 4: Internship Application
// ============================================
app.post('/send-internship-application', upload.single('resume'), async (req, res) => {
  const { name, email, phone, college, course, internshipType, startDate, message } = req.body;
  const resume = req.file;

  console.log('\n📨 New Internship Application');
  console.log('Name:', name);
  console.log('Internship Type:', internshipType);
  console.log('Origin:', req.get('origin'));

  if (!name || !email || !internshipType) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields: name, email, internshipType'
    });
  }

  if (!resend) {
    return res.status(503).json({
      success: false,
      message: 'Email not configured'
    });
  }

  try {
    // Email to Admins
    const emailData = {
      from: FROM_EMAIL,
      to: ALL_ADMIN_EMAILS,
      reply_to: email,
      subject: `🎓 Internship Application: ${internshipType} - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4f46e5;">🎓 New Internship Application</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee;">Name:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee;">Email:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee;">Phone:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${phone || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee;">College:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${college || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee;">Course/Year:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${course || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee;">Internship Type:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>${internshipType}</strong></td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee;">Start Date:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${startDate || 'Flexible'}</td>
              </tr>
            </table>
            ${message ? `
            <div style="background-color: #f8f9fa; padding: 20px; margin-top: 20px; border-radius: 5px;">
              <h3 style="color: #333; margin-top: 0;">Message:</h3>
              <p style="color: #555; white-space: pre-wrap;">${message}</p>
            </div>` : ''}
            ${resume ? '<p style="margin-top: 15px;">📎 Resume attached</p>' : ''}
          </div>
        </div>
      `,
    };

    if (resume) {
      emailData.attachments = [{
        filename: resume.originalname,
        content: resume.buffer,
      }];
    }

    const adminEmail = await resend.emails.send(emailData);
    console.log('✅ Admin notification sent:', adminEmail.id);

    // Confirmation Email to Applicant
    const userEmail = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Application Received – ${internshipType} Internship at Upskillize!`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4f46e5;">🎓 Application Received!</h2>
            <p>Hi ${name},</p>
            <p>Thank you for applying for the <strong>${internshipType}</strong> internship at Upskillize! We're excited about your interest.</p>
            <p>Our team will review your application and get back to you within <strong>3-5 business days</strong>.</p>
            <p>In the meantime, if you have any questions feel free to reach out:</p>
            <p style="margin-left: 20px;">
              <strong>Amit Agrawal – Co-Founder & Chief Sales Officer</strong><br>
              📱 <a href="tel:+919820397297">+91 98203 97297</a><br>
              ✉️ <a href="mailto:amit@upskillize.com">amit@upskillize.com</a>
            </p>
            <p>Best of luck and we look forward to speaking with you!</p>
            <p>Warm regards,<br><strong>Upskillize Team</strong></p>
            <p style="text-align: center; margin-top: 20px;">
              🌐 <a href="https://www.upskillize.com">www.upskillize.com</a>
            </p>
          </div>
        </div>
      `,
    });

    console.log('✅ Applicant confirmation sent:', userEmail.id, '\n');
    res.json({ success: true, message: 'Internship application submitted successfully!' });

  } catch (error) {
    console.error('❌ Email failed:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to submit application',
      error: error.message
    });
  }
});

// ============================================
// Health Check
// ============================================
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    emailConfigured: resend !== null,
    emailProvider: 'Resend',
    fromEmail: FROM_EMAIL,
    adminEmails: ALL_ADMIN_EMAILS,
    corsEnabled: true,
    allowedOrigins: allowedOrigins,
    timestamp: new Date().toISOString()
  });
});

// ============================================
// Root
// ============================================
app.get('/', (req, res) => {
  res.json({
    message: 'Upskillize Email API',
    version: '5.0.0 - Manual CORS (Working)',
    emailStatus: resend ? '✅ Configured' : '❌ Not configured',
    corsStatus: '✅ Enabled (Manual Headers)',
    endpoints: [
      'POST /send-mail',
      'POST /send-career-application',
      'POST /send-notification',
      'POST /send-internship-application',
      'GET /health'
    ]
  });
});

// ============================================
// 404 Handler
// ============================================
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    path: req.path,
    method: req.method
  });
});

// ============================================
// Error Handler
// ============================================
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
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
app.listen(PORT, '0.0.0.0', () => {
  console.log('\n╔═══════════════════════════════════════════╗');
  console.log('║   🚀 UPSKILLIZE EMAIL API SERVER         ║');
  console.log('║   📧 Powered by Resend                   ║');
  console.log('║   🌐 CORS: MANUAL HEADERS (WORKING)      ║');
  console.log('╚═══════════════════════════════════════════╝\n');
  console.log(`🌐 Port: ${PORT}`);
  console.log(`📧 From: ${FROM_EMAIL}`);
  console.log(`📬 Admin Emails: ${ALL_ADMIN_EMAILS.join(', ')}`);
  console.log(`📮 Email Status: ${resend ? '✅ Ready' : '❌ Not Configured'}`);
  console.log(`🔒 CORS Origins: ${allowedOrigins.join(', ')}`);
  console.log('\n╔═══════════════════════════════════════════╗');
  console.log('║   ✅ Server Ready - CORS Fixed            ║');
  console.log('╚═══════════════════════════════════════════╝\n');
});
