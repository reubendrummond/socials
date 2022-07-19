// yup schema + data interface -> success or error response

import {
  StandardErrorResponse,
  StandardResponse,
  StandardSuccessResponse,
} from "./types/backend";
import * as yup from "yup";
import { ApiError } from "./api/errors";
import { PostFormSchema } from "./forms/validationSchemas";
import {
  StandardErrorResponseSchema,
  StandardSuccessResponseSchema,
} from "./api/validation/responses";
type Validate = <
  Schema extends yup.AnyObjectSchema,
  SchemaType = yup.InferType<Schema>
>(
  jsonResponse: any,
  yupSchema: Schema
) => Promise<StandardResponse<SchemaType>>;

export const ValidateJsonResponse: Validate = async (
  jsonResponse,
  yupSchema
) => {
  // validate it looks like standard response
  if (jsonResponse.success === undefined)
    throw new Error("A non standard response was given");
  try {
    if (jsonResponse.error) {
      // check error response looks right
      await StandardErrorResponseSchema.validate(jsonResponse);
      return jsonResponse as StandardErrorResponse;
    } else if (jsonResponse.data) {
      // if success, validated data looks like the schema
      await StandardSuccessResponseSchema.validate(jsonResponse);
      await yupSchema.validate(jsonResponse.data);
      return jsonResponse as StandardSuccessResponse<
        yup.TypeOf<typeof yupSchema>
      >;
    }
    throw new Error();
  } catch (err) {
    throw new Error("There was an error validating the schema!!!");
  }
};

// ValidateJsonResponse({}, PostFormSchema).then((r) => {
//   if (r.success) {
//     r.data.body;
//     r.error;
//   } else {
//     r.error;
//     r.data;
//   }
// });
