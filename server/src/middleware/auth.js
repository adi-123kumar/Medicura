import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { adminRepository } from '../repositories/adminRepository.js';

export const COOKIE_NAME = 'medicura_admin';

export const cookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: env.isProd,
  maxAge: 1000 * 60 * 60 * 8,
  path: '/',
};

export const signToken = (admin) => jwt.sign({ sub: admin.id }, env.jwtSecret, { expiresIn: '8h' });

export function requireAdmin(req, res, next) {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) return res.status(401).json({ message: 'Please sign in' });
  try {
    const payload = jwt.verify(token, env.jwtSecret);
    const admin = adminRepository.findById(payload.sub);
    if (!admin) return res.status(401).json({ message: 'Please sign in' });
    req.admin = admin;
    next();
  } catch {
    res.status(401).json({ message: 'Session expired, please sign in again' });
  }
}
