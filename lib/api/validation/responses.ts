import * as yup from "yup";
import { StandardErrorResponse } from "@lib/types/backend";

export const StandardErrorResponseSchema = yup.object().shape({
  success: yup.bool().isFalse().required(),
  error: yup
    .object()
    .shape({
      status: yup.number().required(),
      message: yup.string().required(),
      type: yup.string(),
      detail: yup.string(),
    })
    .required(),
});

export const StandardSuccessResponseSchema = yup.object().shape({
  success: yup.bool().isTrue().required(),
  data: yup.object().required(),
});

const PostSchema = yup.object().shape({
  body: yup.string().required(),
});

export const PostsData = yup.object().shape({
  posts: yup.array().of(PostSchema),
});
