import React from "react";

import { useApiClient } from "@providers/AuthProvider";
import { userAtom } from "@state/user";
import { useAtom } from "jotai";
import useForm from "@hooks/useForm";
import { toast } from "react-toastify";

import Modal from "@components/basic/modal";
import Input from "../basic/input";
import Checkbox from "../basic/checkbox";
import Button from "../basic/button";

const LoginModal = ({ show, onClose }) => {
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
    <Modal show={show} onClose={onClose} title="Get started on Leets">
      <form className="flex flex-col gap-3" onSubmit={onSubmit}>
        <Input
          fullWidth
          placeholder="Email"
          name="email"
          onChange={handleChange}
          error={errors.email}
        />
        <Input
          type="password"
          fullWidth
          placeholder="Password"
          name="password"
          onChange={handleChange}
          error={errors.password}
        />
        {isRegister && (
          <>
            <Input
              type="password"
              fullWidth
              placeholder="Repeat password"
              name="repeatPassword"
              onChange={handleChange}
              error={errors.repeatPassword}
            />
            <Input
              fullWidth
              placeholder="Name"
              name="name"
              onChange={handleChange}
              error={errors.name}
            />
            <Input
              fullWidth
              placeholder="Surname"
              name="surname"
              onChange={handleChange}
              error={errors.surname}
            />
            <Input
              fullWidth
              placeholder="Username"
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
              />
              <p className="text-danger text-xs mt-2">{errors.terms}</p>
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
        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={onClose} variant="secondary">
            Close
          </Button>
          <Button
            disabled={disabled}
            onClick={onSubmit}
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

export default LoginModal;
