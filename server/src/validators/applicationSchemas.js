import { z } from 'zod';

const clean = (max) => z.string().trim().max(max);

export const COURSES = ['MBBS India', 'MBBS Abroad', 'MD / MS', 'Not sure yet'];
export const STATUSES = ['new', 'contacted', 'accepted', 'rejected'];

export const createApplicationSchema = z.object({
  fullName: clean(100).min(2, 'Please enter your full name'),
  email: clean(150).email('Enter a valid email address'),
  phone: clean(20).regex(/^(\+?91[\s-]?)?[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  course: z.enum(COURSES),
  neetScore: z.coerce.number().int().min(0).max(720).optional().nullable(),
  collegeSlug: clean(200).optional().nullable(),
  collegeName: clean(250).optional().nullable(),
  collegeCategory: z.enum(['mbbs-india', 'mbbs-abroad', 'md-ms']).optional().nullable(),
  message: clean(1000).optional().nullable(),
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
