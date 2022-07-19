export type StandardResponse<R = {}> =
  | StandardSuccessResponse<R>
  | StandardErrorResponse;

export interface StandardSuccessResponse<T extends {}> {
  success: true;
  data: T;
  meta?: StandardResponseMetaData;
  // links?: StandardResponseLinks | StandardResponseLinks[];
}

export interface StandardErrorResponse {
  success: false;
  error: ErrorResponse;
  meta?: StandardResponseMetaData;
}
// interface StandardErrorResponse<T>
//   extends Omit<StandardSuccessResponse<T>, "success" | "data"> {
//   success: false;
//   error: ErrorResponse;
// }

type ErrorResponse = {
  status: ErrorStatusCodes;
  message: string;
  type?: ErrorTypes;
  detail?: string;
};

// if more detail needs to be added
interface StandardResponseMetaData {}
interface StandardResponseLinks {}
type ErrorTypes = string;

// status codes
export type StatusCodes = NonErrorStatusCodes | ErrorStatusCodes;

type NonErrorStatusCodes =
  | 200
  | 201
  | 202
  | 203
  | 204
  | 301
  | 302
  | 304
  | 307
  | 308;

export type ErrorStatusCodes =
  | 400
  | 401
  | 402
  | 403
  | 404
  | 405
  | 406
  | 407
  | 408
  | 409
  | 410
  | 411
  | 412
  | 413
  | 414
  | 415
  | 418
  | 429
  | 451
  | 500
  | 501
  | 502
  | 503
  | 504
  | 505;
