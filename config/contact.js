export const contactConfig = {
  recipientEmail: 'imjaethetech@gmail.com',
  emailSubjects: {
    contact: 'New Contact Form Submission',
    support: 'New Support Request',
    business: 'New Business Inquiry'
  },
  autoReply: {
    enabled: true,
    subject: 'Thank you for contacting JaeTheTech',
    template: `Thank you for reaching out! I've received your message and will get back to you shortly.

Best regards,
JaeTheTech`
  },
  rateLimit: {
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5 // limit each IP to 5 requests per windowMs
  }
};