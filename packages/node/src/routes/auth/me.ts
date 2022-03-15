// Imports
// ========================================================
import { Router, Request, Response } from 'express';
import { buildErrorResponse, buildSuccessResponse } from '../../utils/helpers';
import dictionary from '../../utils/dictionary.json';

// Config
// ========================================================
const router = Router();

// Route
// ========================================================
const Me = async (req: Request, res: Response) => {
  if (!req.session.siwe)
    return res
      .status(404)
      .json(buildErrorResponse(dictionary.AUTH.ERROR.NOT_FOUND));

  return res.json(buildSuccessResponse({ address: req.session.siwe?.address }));
};

// Middlewares
// ========================================================
router.get('/me', Me);

// Exports
// ========================================================
export default router;
