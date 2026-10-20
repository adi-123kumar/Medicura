/*
 * Turns raw records (india.js / abroad.js / mdms.js) into a clean, consistent shape
 * for the UI. Raw files stay untouched, so you can keep pasting new data in.
 */

const NOTE_PAREN = /\s*\((?:as listed|collected|listed|directory|our collected|check|verify|not independently)[^)]*\)/gi;
const NOT_PROVIDED = /^(not (stated|listed|available|provided)|n\/a|-)/i;

export const clean = (value) =>
  typeof value === 'string' ? value.replace(NOTE_PAREN, '').replace(/\s+/g, ' ').trim() : value;

// Rewrites source attribution in free text so it reads as our own information.
export const tidyText = (value) =>
  typeof value === 'string'
    ? value
        .replace(/The (?:our college|Future Mind Educare)[^.]*?(?:summary|directory)/gi, 'Our information')
        .replace(/\bour college (?:information summary|directory)/gi, 'our information')
        .replace(/Future Mind Educare/gi, 'our directory')
        .replace(/Not stated in the collected information/gi, 'not stated')
        .replace(/Not listed in the collected information/gi, 'not listed')
        .replace(/collected-information (claims?|wording)/gi, '$1')
        .replace(/listed informations/gi, 'listed information')
        .replace(/collected information/gi, 'available information')
        .replace(/\s+/g, ' ')
        .trim()
    : value;

export const isMissing = (value) => value == null || value === '' || NOT_PROVIDED.test(String(value).trim());

export function normalizeType(raw) {
  const t = String(clean(raw) || '').toUpperCase();
  if (t.includes('GOVERNMENT') || t === 'GOVT') return 'Government';
  if (t.includes('DEEMED')) return 'Deemed';
  if (t.includes('TRUST')) return 'Trust';
  if (t.includes('SOCIETY')) return 'Society';
  if (t.includes('PRIVATE')) return 'Private';
  return t ? t.charAt(0) + t.slice(1).toLowerCase() : 'Not specified';
}

const toSeats = (raw) => {
  const n = Number(String(raw ?? '').replace(/[^0-9]/g, ''));
  return Number.isFinite(n) && n > 0 && !isMissing(raw) ? n : null;
};

const orNull = (v) => (isMissing(v) ? null : tidyText(clean(v)));
const yearLabel = (v) => (String(v || '').match(/\d{4}\s*[–-]\s*\d{2,4}/) || [''])[0];

export function normalizeCollege(raw, category) {
  const group = clean(raw.country || raw.state) || 'Other';
  const recognition = clean(raw.recognition || '');
  return {
    id: `${category}:${raw.slug}`,
    category,
    slug: raw.slug,
    order: raw.order ?? 9999,
    name: raw.name,
    shortName: raw.shortName || raw.name,
    city: clean(raw.city || ''),
    state: raw.state ? clean(raw.state) : null,
    country: raw.country ? clean(raw.country) : null,
    group, // state for India listings, country for abroad
    type: normalizeType(raw.type),
    seats: toSeats(raw.seats),
    ranking: orNull(raw.ranking),
    recognition,
    isNmc: /NMC|MCI/i.test(recognition),
    isWho: /WHO/i.test(recognition),
    medium: orNull(raw.medium),
    duration: orNull(raw.duration),
    feature: orNull(raw.directoryFeature),
    image: raw.image || null,
    fees: {
      tuition: orNull(raw.annualTuition) || 'Contact us for fee details',
      total: orNull(raw.annualTotal || raw.approximateAnnualTotal),
      nri: orNull(raw.nriFee),
      hostel: orNull(raw.hostelAndMess),
      other: orNull(raw.otherFees),
      note: tidyText(raw.feeNote),
    },
    about: tidyText(raw.about),
    highlights: (raw.academicHighlights || []).map((h) => tidyText(clean(h))),
    establishment: orNull(raw.establishment),
    admission: {
      year: yearLabel(raw.admissionYearLabel),
      intro: tidyText(raw.admissionIntro),
      steps: (raw.admissionSteps || []).map((s) => ({ title: s.title, detail: tidyText(s.detail) })),
      exams: (raw.entranceExams || []).map(clean),
      eligibility: tidyText(raw.eligibility),
    },
    placement: {
      quote: tidyText(raw.placementQuote),
      metrics: (raw.careerMetrics || []).map((m) => ({ value: m.value, label: tidyText(clean(m.label)) })),
      internship: tidyText(raw.internship),
      postGraduation: tidyText(raw.postGraduation),
      stipend: orNull(raw.stipendClaim),
    },
    documents: (raw.documents || []).map((d) => tidyText(clean(d))),
    documentNote: tidyText(raw.documentNote),
    notice: raw.flags?.[0] ? tidyText(raw.flags[0]) : null,
  };
}
