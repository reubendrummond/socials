export interface StandardResponse {
  errors?: StandardErrorResponse | StandardErrorResponse[];
  data?: {} | {}[];
  meta?: StandardResponseMetaData;
  links?: StandardResponseLinks | StandardResponseLinks[];
}

interface StandardErrorResponse {
  id?: string;
  status?: ErrorStatusCodes;
  title?: string;
  detail?: string;
}

interface StandardResponseMetaData {}

interface StandardResponseLinks {}

export type StatusCodes = NeutralStatusCodes | ErrorStatusCodes;

type NeutralStatusCodes =
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

type ErrorStatusCodes =
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
