// Imports
// ========================================================
import { jest } from '@jest/globals';

/**
 *
 * @param overrides
 */
export const buildRequest = (overrides: any = {}) => {
  const req = {
    body: null,
    query: null,
    ...overrides,
  };
  return req;
};

/**
 *
 * @param overrides
 */
export const buildResponse = (overrides: any = {}) => {
  const res: any = {
    status: jest.fn(() => res).mockName('status'),
    send: jest.fn(() => res).mockName('send'),
    json: jest.fn(() => res).mockName('json'),
    ...overrides,
  };

  return res;
};

/**
 *
 * @param impl
 */
export const buildNext = (impl: any) => {
  return jest.fn(impl).mockName('next');
};
