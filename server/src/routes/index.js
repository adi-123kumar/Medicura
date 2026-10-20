import { Router } from 'express';
import { validate } from '../middleware/validate.js';
import { requireAdmin } from '../middleware/auth.js';
import { applicationLimiter, loginLimiter } from '../middleware/rateLimiters.js';
import { createApplicationSchema, loginSchema, updateApplicationSchema, listQuerySchema } from '../validators/applicationSchemas.js';
import * as auth from '../controllers/authController.js';
import * as apps from '../controllers/applicationController.js';

const router = Router();

router.get('/health', (req, res) => res.json({ ok: true }));

// Public: guidance form
router.post('/applications', applicationLimiter, validate(createApplicationSchema), apps.createApplication);

// Admin auth
router.post('/auth/login', loginLimiter, validate(loginSchema), auth.login);
router.post('/auth/logout', auth.logout);
router.get('/auth/me', requireAdmin, auth.me);

// Admin: applications
router.get('/admin/applications/stats', requireAdmin, apps.applicationStats);
router.get('/admin/applications', requireAdmin, validate(listQuerySchema, 'query'), apps.listApplications);
router.patch('/admin/applications/:id', requireAdmin, validate(updateApplicationSchema), apps.updateApplication);
router.delete('/admin/applications/:id', requireAdmin, apps.deleteApplication);

export default router;
