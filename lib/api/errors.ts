import { ErrorStatusCodes } from "@lib/types/backend";

export class ApiError extends Error {
  statusCode: ErrorStatusCodes;
  additionalInfo: {} = {};

  constructor(
    message: string,
    statusCode: ErrorStatusCodes = 500,
    additionalInfo: {} = {}
  ) {
    super(message);
    this.statusCode = statusCode;
    this.additionalInfo = additionalInfo;
  }
}
