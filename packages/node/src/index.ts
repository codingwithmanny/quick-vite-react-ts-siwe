// Imports
// ========================================================
import 'express-async-errors';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import Routes from './routes';
import { buildErrorResponse } from './utils/helpers';
import { BadRequest, Forbidden, NotFound } from './utils/errorHandlers';
import { ironSession } from 'iron-session/express';

// ENV VARS
// ========================================================
dotenv.config();

/**
 *
 */
const NODE_ENV: string = process.env.NODE_ENV || 'development';

/**
 *
 */
const VERSION: string = process.env.VERSION || 'unknown';

/**
 *
 */
const SECRET_COOKIE_PASSWORD: string =
  process.env.SECRET_COOKIE_PASSWORD || 'unknown_secret_cookie_password';

/**
 *
 */
const session = ironSession({
  cookieName: 'iron-session/examples/express',
  password: SECRET_COOKIE_PASSWORD,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
});

// Init
// ========================================================
/**
 *
 */
const app = express();

// Middlewares
// ========================================================
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  }),
);
app.use(helmet());
app.use(session);
app.use(express.json());

// Endpoints / Routes
// ========================================================
/**
 *
 */
app.get('/', (_req, res) =>
  res.send({ version: VERSION, environment: NODE_ENV }),
);

/**
 *
 */
app.get('/healthz', (_req, res) => res.send({ status: 'ok' }));

/**
 *
 */
app.use('/api', Routes);

// Error Handler
// ========================================================
app.use((error: any, _req: Request, res: Response, next: NextFunction) => {
  if (
    error instanceof BadRequest ||
    error instanceof Forbidden ||
    error instanceof NotFound
  ) {
    return res
      .status(error?.httpStatusCode ?? 400)
      .json(buildErrorResponse(error?.message ?? 'Unknown error'));
  }

  next(error);
});

// Exprots
// ========================================================
export default app;
