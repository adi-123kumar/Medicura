export const STATUS_META = {
  new: { label: 'New', badge: 'bg-blue-50 text-blue-700' },
  contacted: { label: 'Contacted', badge: 'bg-coral-50 text-coral-600' },
  accepted: { label: 'Accepted', badge: 'bg-green-50 text-green-700' },
  rejected: { label: 'Rejected', badge: 'bg-red-50 text-red-700' },
};
export const STATUS_KEYS = Object.keys(STATUS_META);
export const formatDate = (s) => (s ? new Date(s.replace(' ', 'T') + 'Z').toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : '');
