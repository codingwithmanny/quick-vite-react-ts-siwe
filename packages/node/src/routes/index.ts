// Imports
// ========================================================
import { Router } from 'express';
import Auth from './auth';

// Config
// ========================================================
const router = Router();

// Routes
// ========================================================
router.use('/auth', Auth);

// Exports
// ========================================================
export default router;
