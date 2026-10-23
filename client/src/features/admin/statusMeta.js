export const STATUS_META = {
  new: { label: 'New', badge: 'bg-navy-50 text-navy-700 ring-navy-200' },
  verified: { label: 'Verified', badge: 'bg-leaf-50 text-leaf-700 ring-leaf-100' },
  contacted: { label: 'Contacted', badge: 'bg-amber-50 text-amber-700 ring-amber-100' },
  rejected: { label: 'Rejected', badge: 'bg-red-50 text-red-700 ring-red-100' },
};
export const STATUS_KEYS = Object.keys(STATUS_META);

export const SOURCE_LABEL = { contact: 'Contact page', college: 'College page', 'neet-predictor': 'NEET Predictor' };

// SQLite stores UTC as "YYYY-MM-DD HH:MM:SS".
export const formatDate = (s) => (s ? new Date(s.replace(' ', 'T') + 'Z').toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : '');

export const digitsForWhatsApp = (phone) => {
  const d = String(phone || '').replace(/\D/g, '');
  return d.length === 10 ? `91${d}` : d.replace(/^0+/, '');
};

export const mailtoLink = (a) => {
  const subject = 'Your inquiry to MediCura World';
  const body = `Hello ${a.fullName},\n\nThank you for contacting MediCura World about ${a.course}${a.collegeName ? ` (${a.collegeName})` : ''}.\n\n`;
  return `mailto:${a.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};
