// Imports
// ========================================================
import { expect, test } from '@jest/globals';
import { buildSuccessResponse, buildErrorResponse } from '../helpers';

// Mocks
// ========================================================

// Tests
// ========================================================
/**
 * Validates successful response message formatting
 */
test("- buildSuccessResponse - { hello: 'there' }", () => {
  // Setup
  const data = { hello: 'there' };

  // Init
  const result = buildSuccessResponse(data);

  // Expectations
  expect(result.success).toBeTruthy();
  expect(result.data).toBe(data);
  expect(result.pagination).toBeUndefined();
});

/**
 * Validates successful response message formatting with pagination
 */
test("- buildSuccessResponse - { hello: 'there' }, pagination { limit: 1, offset: 2, total: 3 }", () => {
  // Setup
  const data = { hello: 'there' };
  const pagination = { limit: 1, offset: 2, total: 3 };

  // Init
  const result = buildSuccessResponse(data, pagination);

  // Expectations
  expect(result.success).toBeTruthy();
  expect(result.data).toBe(data);
  expect(result.pagination).toBe(pagination);
});

/**
 * Validates successful response message formatting
 */
test("- buildErrorResponse - { hello: 'there' }", () => {
  // Setup
  const data = { hello: 'there' };

  // Init
  const result = buildErrorResponse(data);

  // Expectations
  expect(result.success).toBeFalsy();
  expect(result.errors).toBe(data);
});
