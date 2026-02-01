require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
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

// Gmail Configuration
const GMAIL_USER = process.env.GMAIL_USER || 'upskillize@gmail.com';
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

// ============================================
// Middleware
// ============================================
app.use(cors({ origin: '*', methods: ['GET', 'POST'], credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
// Gmail SMTP Configuration
// ============================================
let transporter = null;

if (!GMAIL_APP_PASSWORD) {
  console.error('\n⚠️  ============================================');
  console.error('⚠️  WARNING: GMAIL_APP_PASSWORD not set!');
  console.error('⚠️  Get app password: https://myaccount.google.com/apppasswords');
  console.error('⚠️  ============================================\n');
} else {
  try {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    transporter.verify((error, success) => {
      if (error) {
        console.error('\n❌ Gmail SMTP connection failed:', error.message);
        transporter = null;
      } else {
        console.log('\n✅ ============================================');
        console.log('✅ Gmail SMTP configured successfully!');
        console.log('✅ ============================================');
        console.log(`📧 From Email: ${GMAIL_USER}`);
        console.log(`📬 Admin Emails: ${ALL_ADMIN_EMAILS.join(', ')}\n`);
      }
    });
  } catch (error) {
    console.error('\n❌ Gmail SMTP initialization failed:', error.message);
    transporter = null;
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

  if (!transporter) {
    console.error('❌ Gmail SMTP not configured');
    return res.status(503).json({ 
      success: false, 
      message: 'Email service not configured',
      error: 'GMAIL_NOT_CONFIGURED'
    });
  }

  try {
    await transporter.sendMail({
      from: `"Upskillize Contact" <${GMAIL_USER}>`,
      to: ALL_ADMIN_EMAILS,
      replyTo: email,
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

    console.log('✅ Admin notification sent');

    await transporter.sendMail({
      from: `"Upskillize" <${GMAIL_USER}>`,
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

    console.log('✅ User confirmation sent\n');
    res.json({ success: true, message: 'Message sent successfully!' });
    
  } catch (error) {
    console.error('❌ Email failed:', error.message);
    res.status(500).json({ success: false, message: 'Failed to send', error: error.message });
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

  if (!transporter) {
    return res.status(503).json({ success: false, message: 'Email not configured' });
  }

  try {
    const mailOptions = {
      from: `"Upskillize Careers" <${GMAIL_USER}>`,
      to: ALL_ADMIN_EMAILS,
      replyTo: email,
      subject: `Career Application: ${opportunity} - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>💼 New Career Application</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Opportunity:</strong> ${opportunity}</p>
          <p><strong>Portfolio:</strong> ${portfolio || 'Not provided'}</p>
          <p>📎 Resume attached</p>
        </div>
      `,
    };

    if (resume) {
      mailOptions.attachments = [{
        filename: resume.originalname,
        content: resume.buffer,
        contentType: resume.mimetype
      }];
    }

    await transporter.sendMail(mailOptions);
    console.log('✅ Admin notification sent');

    await transporter.sendMail({
      from: `"Upskillize" <${GMAIL_USER}>`,
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

    console.log('✅ User confirmation sent\n');
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

  if (!transporter) {
    return res.status(503).json({ success: false, message: 'Email not configured' });
  }

  try {
    await transporter.sendMail({
      from: `"Upskillize" <${GMAIL_USER}>`,
      to: ALL_ADMIN_EMAILS,
      replyTo: email,
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

    await transporter.sendMail({
      from: `"Upskillize" <${GMAIL_USER}>`,
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

    console.log('✅ Notification sent\n');
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
    emailConfigured: transporter !== null,
    emailProvider: 'Gmail SMTP',
    emailUser: GMAIL_USER,
    adminEmails: ALL_ADMIN_EMAILS
  });
});

// ============================================
// Root
// ============================================
app.get('/', (req, res) => {
  res.json({
    message: 'Upskillize Email API',
    version: '3.0.0 - Gmail',
    emailStatus: transporter ? '✅ Configured' : '❌ Not configured',
    endpoints: [
      'POST /send-mail',
      'POST /send-career-application',
      'POST /send-notification',
      'GET /health'
    ]
  });
});

// ============================================
// Error Handler
// ============================================
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  res.status(500).json({ success: false, error: err.message });
});

// ============================================
// Start Server
// ============================================
app.listen(PORT, () => {
  console.log('\n╔═══════════════════════════════════════════╗');
  console.log('║   🚀 UPSKILLIZE EMAIL API SERVER         ║');
  console.log('║   📧 Powered by Gmail SMTP               ║');
  console.log('╚═══════════════════════════════════════════╝\n');
  console.log(`🌐 Port: ${PORT}`);
  console.log(`📧 Gmail: ${GMAIL_USER}`);
  console.log(`📬 Admin Emails: ${ALL_ADMIN_EMAILS.join(', ')}`);
  console.log(`📮 Status: ${transporter ? '✅ Ready' : '❌ Not Configured'}`);
  console.log('\n╔═══════════════════════════════════════════╗');
  console.log('║   Server Ready                            ║');
  console.log('╚═══════════════════════════════════════════╝\n');
});