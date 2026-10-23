/*
 * Database access point.
 * Uses Node's built-in SQLite (node:sqlite), so there is nothing native to compile
 * and installs work on Windows, macOS and Linux. Requires Node 22.13+.
 *
 * Later: replace this file with a MySQL/Postgres pool and adapt the repositories.
 * Controllers never touch SQL directly.
 */
import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { env } from '../config/env.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(process.cwd(), env.dbFile);
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

export const db = new DatabaseSync(dbPath);
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA foreign_keys = ON;');

const schema = fs.readFileSync(path.join(here, 'schema.sql'), 'utf8');

/*
 * One-time upgrade for databases created before the "verified" status existed
 * (old statuses: new / contacted / accepted / rejected, phone was required).
 * Existing rows are kept; "accepted" becomes "verified".
 */
const current = db.prepare("SELECT sql FROM sqlite_master WHERE type = 'table' AND name = 'applications'").get();
if (current && !current.sql.includes("'verified'")) {
  db.exec('BEGIN');
  try {
    db.exec('ALTER TABLE applications RENAME TO applications_old');
    db.exec('DROP INDEX IF EXISTS idx_applications_status');
    db.exec('DROP INDEX IF EXISTS idx_applications_created');
    db.exec(schema);
    db.exec(`INSERT INTO applications
      (id, full_name, email, phone, course, neet_score, college_slug, college_name, college_category,
       message, status, admin_notes, created_at, updated_at)
      SELECT id, full_name, email, phone, course, neet_score, college_slug, college_name, college_category,
       message, CASE status WHEN 'accepted' THEN 'verified' ELSE status END, admin_notes, created_at, updated_at
      FROM applications_old`);
    db.exec('DROP TABLE applications_old');
    db.exec('COMMIT');
    console.log('Database upgraded: applications table migrated.');
  } catch (err) {
    db.exec('ROLLBACK');
    throw err;
  }
} else {
  db.exec(schema);
}
