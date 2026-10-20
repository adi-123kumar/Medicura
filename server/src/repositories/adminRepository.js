import { db } from '../db/index.js';

export const adminRepository = {
  findByEmail: (email) => db.prepare('SELECT * FROM admins WHERE email = ?').get(email.toLowerCase()),
  findById: (id) => db.prepare('SELECT id, email FROM admins WHERE id = ?').get(id),
  count: () => db.prepare('SELECT COUNT(*) AS n FROM admins').get().n,
  create: (email, passwordHash) =>
    db.prepare('INSERT INTO admins (email, password_hash) VALUES (?, ?)').run(email.toLowerCase(), passwordHash),
};
