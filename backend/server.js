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
// Middleware
// ============================================
// Enhanced CORS configuration for production
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allowed origins
    const allowedOrigins = [
      'https://upskillize.com',
      'https://www.upskillize.com',
      'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:5000'
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all origins for now (you can restrict later)
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
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
    allowedTypes.includes(file.mimetype) ? cb(null, true) : cb(new Error('Only PDF, DOC, DOCX allowed'));
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

    // Send confirmation to user
    const userEmail = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Thank you for contacting Upskillize',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4f46e5;">Thank You!</h2>
            <p>Hi ${name},</p>
            <p>We've received your message regarding <strong>${inquiry}</strong>.</p>
            <p>Our team will respond within 24 hours.</p>
            <p>Best regards,<br><strong>Upskillize Team</strong></p>
          </div>
        </div>
      `,
    });

    console.log('✅ User confirmation sent:', userEmail.id, '\n');
    res.json({ success: true, message: 'Message sent successfully!' });

  } catch (error) {
    console.error('❌ Email failed:', error.message);
    console.error('Error details:', error);
    res.status(500).json({ success: false, message: 'Failed to send email', error: error.message });
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

  if (!resend) {
    return res.status(503).json({ success: false, message: 'Email not configured' });
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
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Application Received!</h2>
          <p>Hi ${name},</p>
          <p>Thank you for applying for <strong>${opportunity}</strong>!</p>
          <p>We'll review within 3-5 business days.</p>
          <p>Best regards,<br><strong>Upskillize Career Team</strong></p>
        </div>
      `,
    });

    console.log('✅ User confirmation sent:', userEmail.id, '\n');
    res.json({ success: true, message: 'Application submitted' });

  } catch (error) {
    console.error('❌ Email failed:', error.message);
    res.status(500).json({ success: false, message: 'Failed to submit', error: error.message });
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

  if (!resend) {
    return res.status(503).json({ success: false, message: 'Email not configured' });
  }

  try {
    // Notify admins
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
          <p><strong>Date:</strong> ${date}</p>
        </div>
      `,
    });

    console.log('✅ Admin notification sent:', adminEmail.id);

    // Send confirmation to user
    const userEmail = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `You're on the list! - ${courseName}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>🎉 You're on the List!</h2>
          <p>Thank you for your interest in <strong>${courseName}</strong>!</p>
          <p>We'll notify you when the course launches with exclusive discounts.</p>
          <p>Best regards,<br><strong>Upskillize Team</strong></p>
        </div>
      `,
    });

    console.log('✅ Notification sent:', userEmail.id, '\n');
    res.json({ success: true, message: 'Notification request sent' });

  } catch (error) {
    console.error('❌ Email failed:', error.message);
    res.status(500).json({ success: false, message: 'Failed', error: error.message });
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
    timestamp: new Date().toISOString()
  });
});

// ============================================
// Root
// ============================================
app.get('/', (req, res) => {
  res.json({
    message: 'Upskillize Email API',
    version: '4.1.0 - Resend (Enhanced CORS)',
    emailStatus: resend ? '✅ Configured' : '❌ Not configured',
    endpoints: [
      'POST /send-mail',
      'POST /send-career-application',
      'POST /send-notification',
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
  console.log('╚═══════════════════════════════════════════╝\n');
  console.log(`🌐 Port: ${PORT}`);
  console.log(`📧 From: ${FROM_EMAIL}`);
  console.log(`📬 Admin Emails: ${ALL_ADMIN_EMAILS.join(', ')}`);
  console.log(`📮 Status: ${resend ? '✅ Ready' : '❌ Not Configured'}`);
  console.log('\n╔═══════════════════════════════════════════╗');
  console.log('║   Server Ready                            ║');
  console.log('╚═══════════════════════════════════════════╝\n');
});
