import rateLimit from 'express-rate-limit';
import { securityConfig } from '../config/security';

export function apiSecurityMiddleware(req, res, next) {
  // Add security headers
  Object.entries(securityConfig.headers).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  // CORS check
  const origin = req.headers.origin;
  if (securityConfig.cors.origin.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }

  // Rate limiting
  const limiter = rateLimit(securityConfig.rateLimiting);
  return limiter(req, res, next);
}