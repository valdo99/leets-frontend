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
      <form className="flex flex-col gap-3" onSubmit={onSubmit}>
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
    </Modal>
  );
};
