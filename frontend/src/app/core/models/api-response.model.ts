export interface ApiResponse<T = unknown> {
  statusCode: number;
  status: 'error' | 'success';
  data: T;
}
