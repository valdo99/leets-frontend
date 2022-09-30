import { Trans } from "@lingui/macro";
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
  const [isRegister, setIsRegister] = useState(false);

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
        i18n._(
          "Utente registrato, riceverai una mail per confermare il tuo profilo"
        )
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
      title={isRegister ? i18n._("Get started on Leets") : i18n._("Login")}
    >
      <form className="flex flex-col gap-3" onSubmit={onSubmit}>
        <Input
          placeholder={i18n._("Email")}
          variant="bordered"
          name="email"
          onChange={handleChange}
          error={errors.email}
        />
        <Input
          type="password"
          placeholder={i18n._("Password")}
          variant="bordered"
          name="password"
          onChange={handleChange}
          error={errors.password}
        />
        {isRegister && (
          <>
            <Input
              type="password"
              placeholder={i18n._("Repeat Password")}
              variant="bordered"
              name="repeatPassword"
              onChange={handleChange}
              error={errors.repeatPassword}
            />
            <Input
              placeholder={i18n._("Name")}
              variant="bordered"
              name="name"
              onChange={handleChange}
              error={errors.name}
            />
            <Input
              placeholder={i18n._("Surname")}
              variant="bordered"
              name="surname"
              onChange={handleChange}
              error={errors.surname}
            />
            <Input
              placeholder={i18n._("Username")}
              variant="bordered"
              name="username"
              onChange={handleChange}
              error={errors.username}
            />
            <div>
              <Checkbox
                id="terms"
                name="terms"
                label={i18n._("Accept terms and conditions")}
                checked={formData.terms}
                onChange={handleChange}
                variant="bordered"
              />
              <p className="mt-2 text-xs text-error">{errors.terms}</p>
            </div>
          </>
        )}
        <div className="flex justify-between">
          <p
            onClick={() => setIsRegister((isRegister) => !isRegister)}
            className="cursor-pointer text-sm"
          >
            {!isRegister ? (
              <Trans>Create account</Trans>
            ) : (
              <Trans>Log in</Trans>
            )}
          </p>
          {!isRegister && (
            <p className="cursor-pointer text-sm">
              <Trans>Forgot password?</Trans>
            </p>
          )}
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <Button onClick={onClose} color="secondary" type="button">
            <Trans>Close</Trans>
          </Button>
          <Button
            disabled={disabled}
            type="submit"
            color="primary"
            loading={disabled}
          >
            {isRegister ? (
              <Trans>Create account</Trans>
            ) : (
              <Trans>Sign in</Trans>
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
