// Imports
// ========================================================
import { Router, Request, Response } from 'express';
import { buildSuccessResponse } from '../../utils/helpers';

// Config
// ========================================================
const router = Router();

// Route
// ========================================================
const Logout = async (req: Request, res: Response) => {
  req.session.destroy();
  return res.json(buildSuccessResponse({ ok: true }));
};

// Middlewares
// ========================================================
router.get('/logout', Logout);

// Exports
// ========================================================
export default router;
