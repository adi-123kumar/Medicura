CREATE TABLE IF NOT EXISTS admins (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

-- One row per "Request a conversation" form submission.
CREATE TABLE IF NOT EXISTS applications (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  full_name        TEXT NOT NULL,
  email            TEXT NOT NULL,
  phone            TEXT,
  course           TEXT NOT NULL,
  neet_score       INTEGER,
  college_slug     TEXT,
  college_name     TEXT,
  college_category TEXT,
  message          TEXT,
  source           TEXT NOT NULL DEFAULT 'contact',
  status           TEXT NOT NULL DEFAULT 'new'
                   CHECK (status IN ('new','verified','contacted','rejected')),
  admin_notes      TEXT,
  created_at       TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at       TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_applications_status  ON applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_created ON applications(created_at DESC);
