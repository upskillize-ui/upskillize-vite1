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
// Middleware - CORS Configuration
// ============================================

// Define allowed origins
const allowedOrigins = [
  'https://upskillize.com',
  'https://www.upskillize.com',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5000'
];

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, curl)
    if (!origin) {
      console.log('✅ Request with no origin allowed');
      return callback(null, true);
    }
    
    // Check if origin is in allowed list
    if (allowedOrigins.includes(origin)) {
      console.log('✅ Origin allowed:', origin);
      callback(null, true);
    } else {
      console.log('⚠️ Origin not in whitelist but allowing:', origin);
      // For now, allow all origins (change to callback(new Error('Not allowed by CORS')) to restrict)
      callback(null, true);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  optionsSuccessStatus: 200,
  preflightContinue: false
};

// Apply CORS middleware (automatically handles OPTIONS preflight requests)
app.use(cors(corsOptions));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging with CORS info
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
  limits: { fileSize: 3 * 1024 * 1024 }, // 3MB limit
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

  // Validation
  if (!name || !email || !opportunity) {
    console.log('❌ Missing required fields');
    return res.status(400).json({
      success: false,
      message: 'Missing required fields: name, email, and opportunity are required'
    });
  }

  if (!resend) {
    console.error('❌ Resend not configured');
    return res.status(503).json({ 
      success: false, 
      message: 'Email service not configured' 
    });
  }

  try {
    const emailData = {
      from: FROM_EMAIL,
      to: ALL_ADMIN_EMAILS,
      reply_to: email,
      subject: `Career Application: ${opportunity} - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4f46e5;">💼 New Career Application</h2>
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
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee;">Opportunity:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>${opportunity}</strong></td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee;">Portfolio:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${portfolio || 'Not provided'}</td>
              </tr>
            </table>
            ${resume ? '<p style="margin-top: 20px;">📎 <strong>Resume attached</strong></p>' : '<p style="margin-top: 20px; color: #999;">No resume attached</p>'}
          </div>
        </div>
      `,
    };

    // Add attachment if resume exists
    if (resume) {
      emailData.attachments = [{
        filename: resume.originalname,
        content: resume.buffer,
      }];
    }

    const adminEmail = await resend.emails.send(emailData);
    console.log('✅ Admin notification sent:', adminEmail.id);

    // Send confirmation to applicant
    const userEmail = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Application Received - ${opportunity}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4f46e5;">Application Received!</h2>
            <p>Hi ${name},</p>
            <p>Thank you for applying for <strong>${opportunity}</strong> at Upskillize!</p>
            <p>We've successfully received your application and our team will review it carefully. You can expect to hear back from us within 1-3 business days.</p>
            <p>If you have any questions in the meantime, feel free to reach out:</p>
            <p style="margin-left: 20px;">
              <strong>Amit Agrawal – Co-Founder & Chief Sales Officer</strong><br>
              📱 <a href="tel:+919820397297">+91 98203 97297</a><br>
              ✉️ <a href="mailto:amit@upskillize.com">amit@upskillize.com</a>
            </p>
            <p>Best regards,<br><strong>Upskillize Career Team</strong></p>
            <p style="text-align: center; margin-top: 20px;">
              🌐 <a href="https://www.upskillize.com">www.upskillize.com</a>
            </p>
          </div>
        </div>
      `,
    });

    console.log('✅ User confirmation sent:', userEmail.id, '\n');
    res.json({ 
      success: true, 
      message: 'Application submitted successfully!' 
    });

  } catch (error) {
    console.error('❌ Email failed:', error.message);
    console.error('Error details:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to submit application', 
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

  // Validation
  if (!email || !courseName) {
    console.log('❌ Missing required fields');
    return res.status(400).json({
      success: false,
      message: 'Missing required fields: email and courseName are required'
    });
  }

  if (!resend) {
    console.error('❌ Resend not configured');
    return res.status(503).json({ 
      success: false, 
      message: 'Email service not configured' 
    });
  }

  try {
    // Notify admins
    const adminEmail = await resend.emails.send({
      from: FROM_EMAIL,
      to: ALL_ADMIN_EMAILS,
      reply_to: email,
      subject: `Course Notification: ${courseName}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4f46e5;">🔔 Course Notification Request</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee;">Email:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee;">Course:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>${courseName}</strong></td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee;">Date Requested:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${date || new Date().toLocaleDateString()}</td>
              </tr>
            </table>
            <p style="margin-top: 20px; padding: 15px; background-color: #fff3cd; border-left: 4px solid #ffc107; color: #856404;">
              <strong>Action Required:</strong> Add this user to the notification list for when <strong>${courseName}</strong> becomes available.
            </p>
          </div>
        </div>
      `,
    });

    console.log('✅ Admin notification sent:', adminEmail.id);

    // Send confirmation to user - Template 3: Coming Soon
    const userEmail = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Thanks for Your Interest – Exciting Things Coming Soon!',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4f46e5;">Thanks for Your Interest – Exciting Things Coming Soon!</h2>
            <p>Hi there,</p>
            <p>Thank you for your interest in <strong>${courseName}</strong>! We're thrilled to see your enthusiasm.</p>
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
    res.json({ 
      success: true, 
      message: 'You will be notified when the course is available!' 
    });

  } catch (error) {
    console.error('❌ Email failed:', error.message);
    console.error('Error details:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send notification request', 
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
    timestamp: new Date().toISOString(),
    nodeVersion: process.version
  });
});

// ============================================
// Root Endpoint
// ============================================
app.get('/', (req, res) => {
  res.json({
    message: 'Upskillize Email API',
    version: '4.2.0 - Resend (CORS Fixed)',
    emailStatus: resend ? '✅ Configured' : '❌ Not configured',
    corsStatus: '✅ Enabled',
    endpoints: [
      'POST /send-mail - Contact form submissions',
      'POST /send-career-application - Career applications with resume upload',
      'POST /send-notification - Course availability notifications',
      'GET /health - Health check and configuration status',
      'GET / - This information page'
    ],
    documentation: {
      '/send-mail': {
        method: 'POST',
        requiredFields: ['name', 'email', 'inquiry', 'message'],
        optionalFields: ['phone', 'company']
      },
      '/send-career-application': {
        method: 'POST',
        requiredFields: ['name', 'email', 'opportunity'],
        optionalFields: ['phone', 'portfolio', 'resume (file)']
      },
      '/send-notification': {
        method: 'POST',
        requiredFields: ['email', 'courseName'],
        optionalFields: ['date']
      }
    }
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
    method: req.method,
    availableEndpoints: [
      'GET /',
      'GET /health',
      'POST /send-mail',
      'POST /send-career-application',
      'POST /send-notification'
    ]
  });
});

// ============================================
// Error Handler
// ============================================
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.message);
  console.error('Stack:', err.stack);
  
  // Handle Multer errors
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ 
        success: false, 
        message: 'File too large. Maximum size is 3MB.',
        error: err.message 
      });
    }
    return res.status(400).json({ 
      success: false, 
      message: 'File upload error',
      error: err.message 
    });
  }
  
  // Handle other errors
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'An error occurred'
  });
});

// ============================================
// Start Server
// ============================================
app.listen(PORT, '0.0.0.0', () => {
  console.log('\n╔═══════════════════════════════════════════╗');
  console.log('║   🚀 UPSKILLIZE EMAIL API SERVER         ║');
  console.log('║   📧 Powered by Resend                   ║');
  console.log('║   🌐 CORS: ENABLED                       ║');
  console.log('╚═══════════════════════════════════════════╝\n');
  console.log(`🌐 Port: ${PORT}`);
  console.log(`📧 From Email: ${FROM_EMAIL}`);
  console.log(`📬 Admin Emails: ${ALL_ADMIN_EMAILS.join(', ')}`);
  console.log(`📮 Email Status: ${resend ? '✅ Ready' : '❌ Not Configured'}`);
  console.log(`🔒 CORS Origins: ${allowedOrigins.join(', ')}`);
  console.log(`💻 Node Version: ${process.version}`);
  console.log('\n╔═══════════════════════════════════════════╗');
  console.log('║   ✅ Server Ready - CORS Configured       ║');
  console.log('╚═══════════════════════════════════════════╝\n');
});