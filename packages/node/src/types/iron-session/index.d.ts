// Imports
// ========================================================
import 'iron-session';
import { SiweMessage } from 'siwe';

// Types
// ========================================================
declare module 'iron-session' {
  interface IronSessionData {
    nonce?: string;
    issuedAt?: string;
    expirationTime?: string;
    siwe?: SiweMessage;
  }
}
