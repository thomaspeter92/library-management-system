import { environment } from '../environments/environment.dev';

export const ApiPaths = {
  User: `${environment.baseUrl}/user`,
  Loans: `${environment.baseUrl}/loans`,
  Books: `${environment.baseUrl}/books`,
} as const;

export type ApiPaths = (typeof ApiPaths)[keyof typeof ApiPaths];
