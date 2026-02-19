export interface IApiResponse<T = any> {
    success: boolean;
    data: T;
    message: string;
    error?: string;
}



// 🔥 NEW: Error types
export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
  errors?: Record<string, string[]>; // Validation errors like { email: ["Invalid format"] }
}

// 🔥 Custom error class
export class ApiException extends Error {
  statusCode: number;
  error?: string;
  errors?: Record<string, string[]>;

  constructor(apiError: ApiError) {
    super(apiError.message);
    this.name = 'ApiException';
    this.statusCode = apiError.statusCode;
    this.error = apiError.error;
    this.errors = apiError.errors;
  }
}