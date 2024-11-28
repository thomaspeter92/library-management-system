export const ERROR_MESSAGES = {
  SERVER_ERROR:
    "The request couldn't be proccessed right now. Please try again or contact support.",
  INVALID_DATA:
    'The was an issue with your request. Please check and try again.',
  NOT_FOUND: "We couldn't find what you're looking for, please try again.",
  EMAIL_NOT_FOUND: 'There was a problem with your email/password combination',
  INVALID_PASSWORD: 'There was an issue with your email/password combination.',
  AUTH_TOKEN: 'You are not authorised to do this action.',
};

export interface ApiResponse<T = unknown> {
  statusCode: number;
  status: 'error' | 'success';
  message?: keyof typeof ERROR_MESSAGES;
  data: T;
  total?: number;
  totalPages?: number;
  currentPage?: number;
  limit?: number;
}
