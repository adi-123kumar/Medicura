import bcrypt from 'bcryptjs';
import { env } from './config/env.js';
import './db/index.js';
import { adminRepository } from './repositories/adminRepository.js';
import { createApp } from './app.js';

// Create the first admin automatically if none exists.
if (adminRepository.count() === 0 && env.adminEmail && env.adminPassword) {
  adminRepository.create(env.adminEmail, bcrypt.hashSync(env.adminPassword, 12));
  console.log(`First admin created: ${env.adminEmail}`);
}

createApp().listen(env.port, () => console.log(`API running on http://localhost:${env.port}`));
