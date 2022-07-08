import { BACKUP_PROFILE_IMAGE } from "@lib/constants";
import { useAuth } from "@lib/hooks/useAuth";
import { PostData, PostFormSchema } from "@lib/forms/validationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { FC, useEffect } from "react";
import { FieldError, useForm } from "react-hook-form";
import { syncBuiltinESMExports } from "module";
import { ExclamationCircleIcon } from "@heroicons/react/outline";

const UserPost: FC = () => {
  const { user } = useAuth();
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
        console.log(d);
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
    <div className="flex flex-col gap-y-2 items-center w-full max-w-sm px-4 justify-end">
      <div className="flex items-center gap-x-3">
        <div className="w-12 rounded-full overflow-clip">
          {user && (
            <Image
              src={user?.photoURL || BACKUP_PROFILE_IMAGE}
              width="32px"
              height="32px"
              layout="responsive"
              alt={BACKUP_PROFILE_IMAGE}
            />
          )}
        </div>
        <p>{user?.displayName}</p>
      </div>
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
    </div>
  );
};

type ChildrenRenderProps<T extends {}> = (t: T) => React.ReactNode;

interface StyledInputProps {
  error?: FieldError;
  isDirty?: boolean;
  isTouched?: boolean;

  children:
    | React.ReactNode
    | ChildrenRenderProps<{
        error: string;
        isValid: boolean;
        shouldDisplayError: boolean;
      }>;
}

const StyledInput: FC<StyledInputProps> = (
  { children, isDirty, isTouched, error },
  props
) => {
  const isValid = Boolean(isDirty && !error);
  const shouldDisplayError = Boolean(!isValid && isTouched);

  if (typeof children !== "function") return <>{children}</>;

  return (
    <>
      {children({
        error: error?.message || "",
        isValid,
        shouldDisplayError,
      })}
    </>
  );
};

export default UserPost;
