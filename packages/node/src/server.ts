// Imports
// ========================================================
import app from './index';
import dotenv from 'dotenv';

// ENV VARS
// ========================================================
dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 10);
const NODE_ENV: string = process.env.NODE_ENV || 'development';
const VERSION: string = process.env.VERSION || 'unknown';

// Server
// ========================================================
app.listen(PORT, () =>
  console.log(
    `Listening on PORT ${PORT}\nEnvironment: ${NODE_ENV}\nVersion: ${VERSION}`,
  ),
);

// Exports
// ========================================================
export default app;
