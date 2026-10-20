import bcrypt from 'bcryptjs';
import { adminRepository } from '../repositories/adminRepository.js';
import { COOKIE_NAME, cookieOptions, signToken } from '../middleware/auth.js';

export function login(req, res) {
  const { email, password } = req.body;
  const admin = adminRepository.findByEmail(email);
  const ok = admin && bcrypt.compareSync(password, admin.password_hash);
  if (!ok) return res.status(401).json({ message: 'Incorrect email or password' });
  res.cookie(COOKIE_NAME, signToken(admin), cookieOptions);
  res.json({ admin: { id: admin.id, email: admin.email } });
}

export function logout(req, res) {
  res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: undefined });
  res.json({ ok: true });
}

export const me = (req, res) => res.json({ admin: req.admin });
