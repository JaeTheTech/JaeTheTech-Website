export const authConfig = {
  adminEmail: 'imjaethetech@gmail.com',
  emailService: {
    service: 'gmail',
    auth: {
      user: 'imjaethetech@gmail.com',
      pass: process.env.EMAIL_APP_PASSWORD
    }
  },
  jwtExpiryTime: '24h',
  verificationCodeExpiry: 600000, // 10 minutes
  maxLoginAttempts: 5,
  lockoutDuration: 900000 // 15 minutes
};