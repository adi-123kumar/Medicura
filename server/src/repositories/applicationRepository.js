import { db } from '../db/index.js';

const toApi = (r) =>
  r && {
    id: r.id,
    fullName: r.full_name,
    email: r.email,
    phone: r.phone,
    course: r.course,
    neetScore: r.neet_score,
    collegeSlug: r.college_slug,
    collegeName: r.college_name,
    collegeCategory: r.college_category,
    message: r.message,
    source: r.source,
    status: r.status,
    adminNotes: r.admin_notes,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };

function filters({ status, q }) {
  const where = [];
  const params = {};
  if (status) {
    where.push('status = @status');
    params.status = status;
  }
  if (q) {
    where.push('(full_name LIKE @q OR email LIKE @q OR phone LIKE @q OR college_name LIKE @q OR message LIKE @q)');
    params.q = `%${q}%`;
  }
  return { clause: where.length ? `WHERE ${where.join(' AND ')}` : '', params };
}

export const applicationRepository = {
  create(data) {
    const info = db
      .prepare(
        `INSERT INTO applications
         (full_name, email, phone, course, neet_score, college_slug, college_name, college_category, message, source)
         VALUES (@fullName, @email, @phone, @course, @neetScore, @collegeSlug, @collegeName, @collegeCategory, @message, @source)`
      )
      .run({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone ?? null,
        course: data.course,
        neetScore: data.neetScore ?? null,
        collegeSlug: data.collegeSlug ?? null,
        collegeName: data.collegeName ?? null,
        collegeCategory: data.collegeCategory ?? null,
        message: data.message ?? null,
        source: data.source ?? 'contact',
      });
    return this.findById(info.lastInsertRowid);
  },

  findById: (id) => toApi(db.prepare('SELECT * FROM applications WHERE id = ?').get(id)),

  list({ status, q, page = 1, limit = 20 }) {
    const { clause, params } = filters({ status, q });
    const total = db.prepare(`SELECT COUNT(*) AS n FROM applications ${clause}`).get(params).n;
    const rows = db
      .prepare(`SELECT * FROM applications ${clause} ORDER BY created_at DESC, id DESC LIMIT @limit OFFSET @offset`)
      .all({ ...params, limit, offset: (page - 1) * limit });
    return { items: rows.map(toApi), total, page, limit, pages: Math.max(1, Math.ceil(total / limit)) };
  },

  /** Every row that matches the filters, newest first (used for the CSV export). */
  listAll({ status, q }) {
    const { clause, params } = filters({ status, q });
    return db.prepare(`SELECT * FROM applications ${clause} ORDER BY created_at DESC, id DESC`).all(params).map(toApi);
  },

  stats() {
    const rows = db.prepare('SELECT status, COUNT(*) AS n FROM applications GROUP BY status').all();
    const out = { total: 0, new: 0, verified: 0, contacted: 0, rejected: 0 };
    for (const r of rows) {
      out[r.status] = r.n;
      out.total += r.n;
    }
    return out;
  },

  update(id, { status, adminNotes }) {
    const current = db.prepare('SELECT * FROM applications WHERE id = ?').get(id);
    if (!current) return null;
    db.prepare(
      `UPDATE applications SET status = @status, admin_notes = @notes, updated_at = datetime('now') WHERE id = @id`
    ).run({
      id,
      status: status ?? current.status,
      notes: adminNotes ?? current.admin_notes,
    });
    return this.findById(id);
  },

  remove: (id) => db.prepare('DELETE FROM applications WHERE id = ?').run(id).changes > 0,
};
