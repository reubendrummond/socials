import { yupResolver } from "@hookform/resolvers/yup";
import {
  UserRegistrationData,
  UserRegistrationSchema,
} from "@lib/forms/validationSchemas";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { StyledInput } from "./utils";
import LoadingSpinner from "@components/Animations/Loading/small";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { AFTER_SIGNIN_PAGE, SIGNIN_PAGE } from "@lib/constants";
import { useRouter } from "next/router";

export const NewUserForm = () => {
  const { register, handleSubmit, formState, trigger, setError } =
    useForm<UserRegistrationData>({
      resolver: yupResolver(UserRegistrationSchema, { abortEarly: false }),
      mode: "onSubmit",
    });
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const { data: session } = useSession();
  const [isSuccessful, setIsSuccessful] = useState(false);
  const router = useRouter();

  const onSubmit = handleSubmit(async (values) => {
    return fetch("/api/user/update", {
      method: "PATCH",
      body: JSON.stringify({
        username: values.username,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsSuccessful(true);
        router.push(AFTER_SIGNIN_PAGE);
      })
      .catch((err) => {
        setError("username", { message: "Server error. Please try again." });
      });
  });

  useEffect(() => {
    if (username.length < 6) {
      trigger("username");
      setLoading(false);
      return;
    }

    setLoading(true);
    const timeout = setTimeout(async () => {
      await trigger("username");
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [username, trigger]);

  return (
    <form className="flex flex-col gap-y-4" onSubmit={onSubmit}>
      <StyledInput error={formState.errors.username}>
        {({ error, isValid, shouldDisplayError }) => (
          <div className="flex flex-col gap-y-2">
            <label htmlFor="username">Enter username:</label>
            <input
              {...register("username")}
              onKeyUp={(e) => setUsername((e.target as HTMLInputElement).value)}
              className="px-4 py-2 rounded-md"
              name="username"
            />
            <div className="flex gap-x-2 items-center">
              <div className="w-8 ">
                {loading ? (
                  <LoadingSpinner />
                ) : error ? (
                  <XCircleIcon />
                ) : (
                  <CheckCircleIcon />
                )}
              </div>
              <p>
                {loading
                  ? "Checking valid..."
                  : Boolean(error)
                  ? error
                  : "Username valid"}
              </p>
            </div>
          </div>
        )}
      </StyledInput>
      <button
        type="submit"
        disabled={
          Boolean(formState.errors.username?.message) ||
          loading ||
          formState.isSubmitting ||
          isSuccessful
        }
        className="w-full py-2 rounded-lg bg-primary text-white disabled:cursor-not-allowed disabled:opacity-60 hover:opacity-80"
      >
        Set username
      </button>
    </form>
  );
};
