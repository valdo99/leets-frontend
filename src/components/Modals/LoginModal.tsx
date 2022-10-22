import { t, Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useAtom } from "jotai";
import React, { useState } from "react";
import { toast } from "react-toastify";

import { Button } from "@components/Basic/Button";
import { Checkbox } from "@components/Basic/Checkbox";
import { Input } from "@components/Basic/Input";
import { Modal } from "@components/Basic/Modal";
import { BaseModalProps } from "@components/Basic/Modal/Modal";
import { useForm } from "@hooks/useForm";
import { useApiClient } from "@providers/AuthProvider";
import { userAtom } from "@state/user";

export const LoginModal = ({ show, onClose }: BaseModalProps) => {
  const { i18n } = useLingui();
  const apiClient = useApiClient();
  const [, setUser] = useAtom(userAtom);
  const [isRegister, setIsRegister] = useState(true);

  const { formData, handleChange, handleSubmit, errors, disabled } = useForm(
    {
      email: "",
      password: "",
      repeatPassword: "",
      name: "",
      surname: "",
      username: "",
      terms: false,
    },
    {
      resetOnSuccess: true,
    }
  );

  const LoginIcon = () => (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      // className="mr-2"
      xmlns="http://www.w3.org/2000/svg"
      data-locator-target="vscode"
    >
      <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
        <path
          fill="#4285F4"
          d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
        />
        <path
          fill="#34A853"
          d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
        />
        <path
          fill="#FBBC05"
          d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
        />
        <path
          fill="#EA4335"
          d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
        />
      </g>
    </svg>
  );

  const onSubmit = handleSubmit(async (data) => {
    if (isRegister) {
      await apiClient.users.create(data);
      toast.success(
        t(
          i18n
        )`Account created, you'll receive an email to confirm your account`
      );
      onClose();
    } else {
      await apiClient.auth.login(data);
      const loggedUser = await apiClient.auth.getLoggedUser();

      setUser({
        user: loggedUser,
        loading: false,
      });
      onClose();
    }
  });

  return (
    <Modal
      show={show}
      onClose={onClose}
      title={isRegister ? t(i18n)`Get started on Leets` : t(i18n)`Login`}
    >
      <form className="flex flex-col gap-3 " onSubmit={onSubmit}>
        <Input
          placeholder={t(i18n)`Email`}
          variant="bordered"
          name="email"
          onChange={handleChange}
          error={errors.email}
        />
        <Input
          type="password"
          placeholder={t(i18n)`Password`}
          variant="bordered"
          name="password"
          onChange={handleChange}
          error={errors.password}
        />
        {isRegister && (
          <>
            <Input
              type="password"
              placeholder={t(i18n)`Repeat Password`}
              variant="bordered"
              name="repeatPassword"
              onChange={handleChange}
              error={errors.repeatPassword}
            />
            <Input
              placeholder={t(i18n)`Name`}
              variant="bordered"
              name="name"
              onChange={handleChange}
              error={errors.name}
            />
            <Input
              placeholder={t(i18n)`Surname`}
              variant="bordered"
              name="surname"
              onChange={handleChange}
              error={errors.surname}
            />
            <Input
              placeholder={t(i18n)`Username`}
              variant="bordered"
              name="username"
              onChange={handleChange}
              error={errors.username}
            />
            <div>
              <Checkbox
                id="terms"
                name="terms"
                label={t(i18n)`Accept terms and conditions`}
                checked={formData.terms}
                onChange={handleChange}
                variant="bordered"
              />
              <p className="mt-2 text-xs text-error">{errors.terms}</p>
            </div>
          </>
        )}
        <p className="text-sm">
          {isRegister ? (
            <Trans>
              Already have an account?{" "}
              <span
                onClick={() => setIsRegister((isRegister) => !isRegister)}
                className="cursor-pointer text-blue-300 hover:underline"
              >
                Login
              </span>
            </Trans>
          ) : (
            <Trans>
              Don&apos; have an account?{" "}
              <span
                onClick={() => setIsRegister((isRegister) => !isRegister)}
                className="cursor-pointer text-blue-300 hover:underline"
              >
                Signup
              </span>
            </Trans>
          )}
        </p>
        <Button
          block
          disabled={disabled}
          type="submit"
          color="primary"
          loading={disabled}
          className="mt-4"
        >
          {isRegister ? <Trans>Create account</Trans> : <Trans>Sign in</Trans>}
        </Button>
      </form>

      <Button
        block
        onClick={async () => {
          await apiClient.auth.googleLogin();
        }}
        color="secondary"
        className="mt-4"
        leftIcon={<LoginIcon />}
      >
        Signin with Google
      </Button>
    </Modal>
  );
};
