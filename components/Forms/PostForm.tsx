import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { yupResolver } from "@hookform/resolvers/yup";
import { PostData, PostFormSchema } from "@lib/forms/validationSchemas";
import React from "react";
import { useForm } from "react-hook-form";
import { StyledInput } from "./utils";

export const PostForm = () => {
  const { register, handleSubmit, formState, reset } = useForm<PostData>({
    resolver: yupResolver(PostFormSchema),
    mode: "onChange",
  });

  const onSubmit = handleSubmit(
    async (data, e) => {
      try {
        await new Promise((res) => setTimeout(res, 1000));
        const d = await fetch("/api/post", {
          method: "POST",
          body: JSON.stringify(data),
        }).then((res) => res.json());
        reset();
      } catch (err) {
        if (err instanceof Error) console.error("failed req");
      }
    },
    (errors) => {
      console.log("error", errors);
    }
  );
  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-y-2">
      <StyledInput
        error={formState.errors.body}
        isDirty={formState.dirtyFields.body}
        isTouched={formState.touchedFields.body}
      >
        {({ error, isValid, shouldDisplayError }) => (
          <div className="w-full rounded-lg relative shadow-md">
            <textarea
              {...register("body")}
              rows={5}
              className="w-full rounded-lg p-2 resize-none"
            />
            {shouldDisplayError && (
              <ExclamationCircleIcon className="absolute w-6 right-2 top-2" />
            )}
          </div>
        )}
      </StyledInput>
      <button
        type="submit"
        className="w-full py-2 rounded-lg bg-primary text-white disabled:cursor-not-allowed disabled:opacity-60"
        disabled={!formState.isValid || formState.isSubmitting}
      >
        Post
      </button>
    </form>
  );
};
