import { useAtom } from "jotai";
import React from "react";
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
  const apiClient = useApiClient();
  const [, setUser] = useAtom(userAtom);
  const [isRegister, setIsRegister] = React.useState(false);

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
        "Utente registrato, riceverai una mail per confermare il tuo profilo"
      );
    } else {
      await apiClient.auth.login(data);
      const loggedUser = await apiClient.auth.getLoggedUser();

      setUser({
        user: loggedUser,
        loading: false,
      });
    }
  });

  return (
    <Modal
      show={show}
      onClose={onClose}
      title={isRegister ? "Get started on Leets" : "Login"}
    >
      <form className="flex flex-col gap-3" onSubmit={onSubmit}>
        <Input
          placeholder="Email"
          variant="bordered"
          name="email"
          onChange={handleChange}
          error={errors.email}
        />
        <Input
          type="password"
          placeholder="Password"
          variant="bordered"
          name="password"
          onChange={handleChange}
          error={errors.password}
        />
        {isRegister && (
          <>
            <Input
              type="password"
              placeholder="Repeat password"
              variant="bordered"
              name="repeatPassword"
              onChange={handleChange}
              error={errors.repeatPassword}
            />
            <Input
              placeholder="Name"
              variant="bordered"
              name="name"
              onChange={handleChange}
              error={errors.name}
            />
            <Input
              placeholder="Surname"
              variant="bordered"
              name="surname"
              onChange={handleChange}
              error={errors.surname}
            />
            <Input
              placeholder="Username"
              variant="bordered"
              name="username"
              onChange={handleChange}
              error={errors.username}
            />
            <div>
              <Checkbox
                id="terms"
                name="terms"
                label="Accept terms and conditions"
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
            {!isRegister ? "Create account" : "Log in"}
          </p>
          {!isRegister && (
            <p className="cursor-pointer text-sm">Forgot password?</p>
          )}
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <Button onClick={onClose} color="secondary" type="button">
            Close
          </Button>
          <Button
            disabled={disabled}
            type="submit"
            color="primary"
            loading={disabled}
          >
            {isRegister ? "Create account" : "Sign in"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
