import { createTransport } from 'nodemailer';

// Email configuration
const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: 'imjaethetech@gmail.com',
    pass: process.env.EMAIL_APP_PASSWORD
  }
});

// Store verification codes temporarily (in production, use a database)
const verificationCodes = new Map();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  // In production, verify against database
  if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  try {
    // Generate verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    verificationCodes.set(email, {
      code: verificationCode,
      timestamp: Date.now()
    });

    // Send verification email
    await transporter.sendMail({
      from: 'imjaethetech@gmail.com',
      to: email,
      subject: 'Admin Login Verification Code',
      html: `
        <h1>Admin Verification Code</h1>
        <p>Your verification code is: <strong>${verificationCode}</strong></p>
        <p>This code will expire in 10 minutes.</p>
        <p>If you didn't request this code, please ignore this email.</p>
      `
    });

    res.status(200).json({ success: true, message: 'Verification code sent' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Failed to send verification code' });
  }
}