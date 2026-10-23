import { z } from 'zod';

const clean = (max) => z.string().trim().max(max);
// Empty strings from the form become null so optional fields stay optional.
const emptyToNull = (v) => (typeof v === 'string' && v.trim() === '' ? null : v);

export const COURSES = ['MBBS in India', 'MBBS Abroad', 'MD / MS', 'NEET guidance', 'Other'];
export const STATUSES = ['new', 'verified', 'contacted', 'rejected'];
export const SOURCES = ['contact', 'college', 'neet-predictor'];

export const createApplicationSchema = z.object({
  fullName: clean(100).min(2, 'Please enter your full name'),
  email: clean(150).email('Enter a valid email address'),
  phone: z.preprocess(
    emptyToNull,
    clean(20).regex(/^\+?[0-9][0-9\s-]{6,17}$/, 'Enter a valid phone number').optional().nullable()
  ),
  course: z.enum(COURSES, { errorMap: () => ({ message: 'Choose what you are interested in' }) }),
  neetScore: z.preprocess(emptyToNull, z.coerce.number().int().min(0).max(720).optional().nullable()),
  collegeSlug: clean(200).optional().nullable(),
  collegeName: clean(250).optional().nullable(),
  collegeCategory: z.enum(['mbbs-india', 'mbbs-abroad', 'md-ms']).optional().nullable(),
  message: clean(1500).min(5, 'Tell us how we can help'),
  source: z.enum(SOURCES).default('contact'),
  // Honeypot: real visitors never see or fill this field.
  website: z.string().max(200).optional(),
});

export const loginSchema = z.object({
  email: clean(150).email(),
  password: z.string().min(1).max(200),
});

export const updateApplicationSchema = z
  .object({
    status: z.enum(STATUSES).optional(),
    adminNotes: clean(2000).optional(),
  })
  .refine((v) => v.status !== undefined || v.adminNotes !== undefined, { message: 'Nothing to update' });

export const listQuerySchema = z.object({
  status: z.enum(STATUSES).optional(),
  q: clean(100).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const exportQuerySchema = z.object({
  status: z.enum(STATUSES).optional(),
  q: clean(100).optional(),
});
