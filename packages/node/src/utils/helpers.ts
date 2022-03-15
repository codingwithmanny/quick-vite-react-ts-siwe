// Imports
// ========================================================

// Types
// ========================================================
interface ResponseFormat {
  success: boolean;
  data?: any;
  errors?: any;
  pagination?: any;
}

// Helper Functions
// ========================================================
/**
 * Create success response object
 * @param data Any object
 * @returns {ResponseFormat}
 */
export const buildSuccessResponse = (
  data: any,
  pagination?: {
    limit?: number;
    offset?: number;
    total?: number;
  },
): ResponseFormat => {
  const response: ResponseFormat = {
    success: true,
    data,
  };

  if (pagination) {
    response.pagination = pagination;
  }

  return response;
};

/**
 * Create errors response object
 * @param data Any object
 * @returns {ResponseFormat}
 */
export const buildErrorResponse = (errors: any): ResponseFormat => {
  return {
    success: false,
    errors,
  };
};
