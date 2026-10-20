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
db.exec(fs.readFileSync(path.join(here, 'schema.sql'), 'utf8'));
