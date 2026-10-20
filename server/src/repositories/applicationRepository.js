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
    status: r.status,
    adminNotes: r.admin_notes,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };

export const applicationRepository = {
  create(data) {
    const info = db
      .prepare(
        `INSERT INTO applications
         (full_name, email, phone, course, neet_score, college_slug, college_name, college_category, message)
         VALUES (@fullName, @email, @phone, @course, @neetScore, @collegeSlug, @collegeName, @collegeCategory, @message)`
      )
      .run({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        course: data.course,
        neetScore: data.neetScore ?? null,
        collegeSlug: data.collegeSlug ?? null,
        collegeName: data.collegeName ?? null,
        collegeCategory: data.collegeCategory ?? null,
        message: data.message ?? null,
      });
    return this.findById(info.lastInsertRowid);
  },

  findById: (id) => toApi(db.prepare('SELECT * FROM applications WHERE id = ?').get(id)),

  list({ status, q, page = 1, limit = 20 }) {
    const where = [];
    const params = {};
    if (status) {
      where.push('status = @status');
      params.status = status;
    }
    if (q) {
      where.push('(full_name LIKE @q OR email LIKE @q OR phone LIKE @q OR college_name LIKE @q)');
      params.q = `%${q}%`;
    }
    const clause = where.length ? `WHERE ${where.join(' AND ')}` : '';
    const total = db.prepare(`SELECT COUNT(*) AS n FROM applications ${clause}`).get(params).n;
    const rows = db
      .prepare(`SELECT * FROM applications ${clause} ORDER BY created_at DESC, id DESC LIMIT @limit OFFSET @offset`)
      .all({ ...params, limit, offset: (page - 1) * limit });
    return { items: rows.map(toApi), total, page, limit, pages: Math.max(1, Math.ceil(total / limit)) };
  },

  stats() {
    const rows = db.prepare('SELECT status, COUNT(*) AS n FROM applications GROUP BY status').all();
    const out = { total: 0, new: 0, contacted: 0, accepted: 0, rejected: 0 };
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
