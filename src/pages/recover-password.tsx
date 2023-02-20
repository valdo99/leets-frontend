import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";

import { Button } from "@components/Basic/Button";
import { Input } from "@components/Basic/Input";
import { useForm } from "@hooks/useForm";
import { useApiClient } from "@providers/AuthProvider";

const RecoverPassowrdPage = () => {
  const apiClient = useApiClient();

  const [countdown, setCountdown] = useState(0);

  const { formData, handleChange, handleSubmit, errors, disabled } = useForm(
    {
      email: "",
    },
    {
      resetOnSuccess: true,
    }
  );

  const onSubmit = handleSubmit(async (data) => {
    const res = await apiClient.auth.forgotPassword(data);
    setCountdown(res.data.duration);
    toast.success("Check your email for the reset link");
  });

  React.useEffect(() => {
    if (countdown > 0) {
      setTimeout(() => setCountdown(countdown - 1), 1000);
    }
  }, [countdown]);

  return (
    <div className="mx-auto max-w-sm pt-10">
      <h1 className="mb-8 text-center text-2xl font-bold">
        Recover your password
      </h1>
      <form className="flex w-full flex-col rounded" onSubmit={onSubmit}>
        <Input
          label={`Email`}
          name="email"
          onChange={handleChange}
          error={errors.email}
          value={formData.email}
        />
        {countdown > 0 && (
          <p className="mt-2 text-sm text-gray-600">
            Wait {countdown} seconds to retry
          </p>
        )}
        <Button
          block
          disabled={disabled || countdown > 0}
          type="submit"
          color="primary"
          loading={disabled}
          className="mt-4"
        >
          Recover now!
        </Button>
        <p className="mt-4 text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup">
            <a className="cursor-pointer  text-blue-300 hover:underline">
              Signup
            </a>
          </Link>
        </p>
        <p className="mt-4 text-sm">
          Remember your password?{" "}
          <Link href="/login">
            <a className="cursor-pointer  text-blue-300 hover:underline">
              Login
            </a>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RecoverPassowrdPage;
