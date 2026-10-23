import { applicationRepository } from '../repositories/applicationRepository.js';

export function createApplication(req, res) {
  // Bots tend to fill every field, including the hidden honeypot. Pretend it worked, store nothing.
  if (req.body.website) return res.status(201).json({ message: 'Thank you! Our counsellor will contact you shortly.' });
  const saved = applicationRepository.create(req.body);
  res.status(201).json({ message: 'Thank you! Our counsellor will contact you shortly.', id: saved.id });
}

export const listApplications = (req, res) => res.json(applicationRepository.list(req.query));

export const applicationStats = (req, res) => res.json(applicationRepository.stats());

export function updateApplication(req, res) {
  const updated = applicationRepository.update(Number(req.params.id), req.body);
  if (!updated) return res.status(404).json({ message: 'Application not found' });
  res.json(updated);
}

export function deleteApplication(req, res) {
  const ok = applicationRepository.remove(Number(req.params.id));
  if (!ok) return res.status(404).json({ message: 'Application not found' });
  res.json({ ok: true });
}

// Spreadsheet apps run text that starts with = + - @ as a formula. Prefix those cells with a quote.
const cell = (v) => {
  let s = v == null ? '' : String(v);
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
};

export function exportApplications(req, res) {
  const rows = applicationRepository.listAll(req.query);
  const head = ['ID', 'Received (UTC)', 'Name', 'Email', 'Phone', 'Interested in', 'NEET score', 'College', 'Message', 'Status', 'Notes'];
  const lines = rows.map((a) =>
    [a.id, a.createdAt, a.fullName, a.email, a.phone, a.course, a.neetScore, a.collegeName, a.message, a.status, a.adminNotes].map(cell).join(',')
  );
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="medicura-inquiries.csv"');
  res.send('\uFEFF' + [head.map(cell).join(','), ...lines].join('\r\n'));
}
