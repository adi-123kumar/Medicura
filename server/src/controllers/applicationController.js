import { applicationRepository } from '../repositories/applicationRepository.js';

export function createApplication(req, res) {
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
