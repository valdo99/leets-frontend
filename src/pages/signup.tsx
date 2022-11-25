import { t, Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";

import { Button } from "@components/Basic/Button";
import { Checkbox } from "@components/Basic/Checkbox";
import { Input } from "@components/Basic/Input";
import { useForm } from "@hooks/useForm";
import GoogleIcon from "@icons/google.svg";
import { useApiClient } from "@providers/AuthProvider";

const LoginPage = () => {
  const { i18n } = useLingui();
  const apiClient = useApiClient();

  const { formData, handleChange, handleSubmit, errors, disabled } = useForm(
    {
      email: "",
      password: "",
      repeatPassword: "",
      username: "",
      terms: false,
    },
    {
      resetOnSuccess: true,
    }
  );

  const onSubmit = handleSubmit(async (data) => {
    await apiClient.users.create(data);
    toast.success(
      t(i18n)`Account created, you'll receive an email to confirm your account`
    );
  });

  return (
    <div className="mx-auto max-w-sm pt-10">
      <h1 className="mb-8 text-center text-2xl font-bold">
        <Trans>Get started on Leets</Trans>
      </h1>
      <form className="flex flex-col" onSubmit={onSubmit}>
        <Input
          label={t(i18n)`Email`}
          name="email"
          onChange={handleChange}
          value={formData.email}
          error={errors.email}
        />
        <Input
          label={t(i18n)`Username`}
          name="username"
          onChange={handleChange}
          value={formData.username}
          error={errors.username}
        />
        <Input
          type="password"
          label={t(i18n)`Password`}
          name="password"
          onChange={handleChange}
          value={formData.password}
          error={errors.password}
        />
        <Input
          type="password"
          label={t(i18n)`Repeat Password`}
          name="repeatPassword"
          onChange={handleChange}
          value={formData.repeatPassword}
          error={errors.repeatPassword}
        />
        <div className="mt-4 flex flex-col">
          <Checkbox
            id="terms"
            name="terms"
            label={t(i18n)`Accept terms and conditions`}
            checked={formData.terms}
            onChange={handleChange}
          />
          {errors.terms && (
            <p className="mt-2 text-xs text-error">{errors.terms}</p>
          )}
        </div>
        <p className="mt-4 text-sm">
          <Trans>Already have an account?</Trans>{" "}
          <Link href="/login">
            <a className="cursor-pointer text-blue-300 hover:underline">
              <Trans>Login</Trans>
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
          <Trans>Create account</Trans>
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
