import nodemailer from 'nodemailer';
import { authConfig } from '../config/auth';
import { contactConfig } from '../config/contact';

const transporter = nodemailer.createTransport(authConfig.emailService);

export const emailService = {
  async sendVerificationCode(email, code) {
    return transporter.sendMail({
      from: 'imjaethetech@gmail.com',
      to: email,
      subject: 'Your Verification Code',
      html: `
        <h1>Verification Code</h1>
        <p>Your verification code is: <strong>${code}</strong></p>
        <p>This code will expire in 10 minutes.</p>
      `
    });
  },

  async sendContactNotification(formData) {
    return transporter.sendMail({
      from: 'imjaethetech@gmail.com',
      to: contactConfig.recipientEmail,
      subject: contactConfig.emailSubjects[formData.type],
      html: `
        <h2>New Message from ${formData.name}</h2>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Message:</strong></p>
        <p>${formData.message}</p>
      `
    });
  },

  async sendOrderConfirmation(order) {
    return transporter.sendMail({
      from: 'imjaethetech@gmail.com',
      to: order.email,
      subject: 'Order Confirmation - JaeTheTech',
      html: `
        <h1>Thank you for your order!</h1>
        <p>Order ID: ${order.id}</p>
        <p>We'll process your order shortly.</p>
      `
    });
  }
};