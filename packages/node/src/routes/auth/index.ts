// Imports
// ========================================================
import { Router } from 'express';
import Nonce from './nonce';
import Verify from './verify';
import Me from './me';
import Logout from './logout';

// Config
// ========================================================
const router = Router();

// Routes
// ========================================================
router.use(Nonce);
router.use(Verify);
router.use(Me);
router.use(Logout);

// Exports
// ========================================================
export default router;
