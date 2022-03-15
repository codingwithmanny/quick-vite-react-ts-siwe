// Imports
// ========================================================
import { Router, Request, Response } from 'express';
import { SiweMessage } from 'siwe';
import { body, validationResult } from 'express-validator';
import { buildErrorResponse, buildSuccessResponse } from '../../utils/helpers';
import dictionary from '../../utils/dictionary.json';

// Config
// ========================================================
const router = Router();

// Route
// ========================================================
const Verify = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(buildErrorResponse(errors.array()));
  }

  try {
    const { message, signature } = req.body;
    const siweMessage = new SiweMessage(message);
    const fields = await siweMessage.validate(signature);

    if (fields.nonce !== req.session.nonce)
      return res
        .status(422)
        .json(buildErrorResponse(dictionary.AUTH.ERROR.INVALID_NONCE));

    req.session.siwe = fields;
    await req.session.save();
    return res.json(buildSuccessResponse({ ok: true }));
  } catch (error) {
    return res.status(401).json(buildErrorResponse({ ok: false }));
  }
};

// Middlewares
// ========================================================
router.post(
  '/verify',
  body('message').isObject(),
  body('message.address').isString(),
  body('message.chainId').isInt(),
  body('message.domain').isString(),
  body('message.issuedAt').isString(),
  body('message.expirationTime').isString(),
  body('message.nonce').isString(),
  body('message.statement').isString(),
  body('message.uri').isString(),
  body('message.version').isString(),
  body('signature').isString(),
  Verify,
);

// Exports
// ========================================================
export default router;
