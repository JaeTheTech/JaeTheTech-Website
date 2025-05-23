import { sign } from 'jsonwebtoken';

// Access verification codes from login endpoint
const verificationCodes = new Map();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, code } = req.body;

  try {
    const storedData = verificationCodes.get(email);

    if (!storedData) {
      return res.status(400).json({ 
        success: false, 
        message: 'Verification code expired or not found' 
      });
    }

    // Check if code is expired (10 minutes)
    if (Date.now() - storedData.timestamp > 600000) {
      verificationCodes.delete(email);
      return res.status(400).json({ 
        success: false, 
        message: 'Verification code expired' 
      });
    }

    if (storedData.code !== code) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid verification code' 
      });
    }

    // Clear used verification code
    verificationCodes.delete(email);

    // Generate JWT token
    const token = sign(
      { email, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({ 
      success: true, 
      token,
      message: 'Successfully verified' 
    });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to verify code' 
    });
  }
}