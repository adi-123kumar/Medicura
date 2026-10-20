import bcrypt from 'bcryptjs';
import { env } from '../config/env.js';
import { adminRepository } from '../repositories/adminRepository.js';

const [email = env.adminEmail, password = env.adminPassword] = process.argv.slice(2);
if (!email || !password) {
  console.error('Usage: npm run seed:admin -- <email> <password>  (or set ADMIN_EMAIL / ADMIN_PASSWORD)');
  process.exit(1);
}
if (adminRepository.findByEmail(email)) {
  console.log('Admin already exists:', email);
} else {
  adminRepository.create(email, bcrypt.hashSync(password, 12));
  console.log('Admin created:', email);
}
