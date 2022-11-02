import { t, Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { Button } from "@components/Basic/Button";
import { Input } from "@components/Basic/Input";
import { useForm } from "@hooks/useForm";
import GoogleIcon from "@icons/google.svg";
import { useApiClient, useUser } from "@providers/AuthProvider";

const LoginPage = () => {
  const { i18n } = useLingui();
  const apiClient = useApiClient();
  const { setUser } = useUser();
  const router = useRouter();

  const { formData, handleChange, handleSubmit, errors, disabled } = useForm(
    {
      email: "",
      password: "",
    },
    {
      resetOnSuccess: true,
    }
  );

  const onSubmit = handleSubmit(async (data) => {
    await apiClient.auth.login(data);
    const loggedUser = await apiClient.auth.getLoggedUser();

    setUser({
      user: loggedUser,
      loading: false,
    });

    router.push(`/${loggedUser?.username}`);
  });

  return (
    <div className="mx-auto max-w-sm">
      <h1 className="mb-8 text-center text-2xl font-bold">
        <Trans>Login</Trans>
      </h1>
      <form className="flex flex-col" onSubmit={onSubmit}>
        <Input
          variant="bordered"
          label={t(i18n)`Email`}
          name="email"
          onChange={handleChange}
          error={errors.email}
          value={formData.email}
        />
        <Input
          type="password"
          label={t(i18n)`Password`}
          variant="bordered"
          name="password"
          onChange={handleChange}
          error={errors.password}
          value={formData.password}
        />
        <p className="mt-4 text-sm">
          <Trans>Don&apos; have an account?</Trans>{" "}
          <Link href="/signup">
            <a className="cursor-pointer text-blue-300 hover:underline">
              Signup
            </a>
          </Link>
        </p>
        <Button
          block
          disabled={disabled}
          type="submit"
          color="primary"
          loading={disabled}
          className="mt-4"
        >
          <Trans>Login</Trans>
        </Button>
      </form>

      <Button
        block
        onClick={async () => {
          await apiClient.auth.googleLogin();
        }}
        color="secondary"
        className="mt-4"
        leftIcon={<GoogleIcon />}
      >
        Signin with Google
      </Button>
    </div>
  );
};

export default LoginPage;
