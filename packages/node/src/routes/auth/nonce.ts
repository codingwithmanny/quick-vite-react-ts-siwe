// Imports
// ========================================================
import { Router, Request, Response } from 'express';
import { generateNonce } from 'siwe';
import { buildSuccessResponse } from '../../utils/helpers';

// Config
// ========================================================
const router = Router();

// Route
// ========================================================
const Nonce = async (req: Request, res: Response) => {
  const currentDate = new Date();
  req.session.nonce = generateNonce();
  req.session.issuedAt = currentDate.toISOString();
  req.session.expirationTime = new Date(
    currentDate.getTime() + 5 * 60 * 1000,
  ).toISOString();
  await req.session.save();
  return res.json(
    buildSuccessResponse({
      nonce: req.session.nonce,
      issuedAt: req.session.issuedAt,
      expirationTime: req.session.expirationTime,
    }),
  );
};

// Middlewares
// ========================================================
router.get('/nonce', Nonce);

// Exports
// ========================================================
export default router;
