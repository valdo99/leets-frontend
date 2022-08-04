import React from "react";
import {
  Modal,
  Button,
  Text,
  Input,
  Row,
  Checkbox,
  Loading,
} from "@nextui-org/react";
import { useApiClient } from "providers/AuthProvider";
import { userAtom } from "state/user";
import { useAtom } from "jotai";
import useForm from "hooks/useForm";

export default function LoginModal({ visible, setVisible }) {
  const apiClient = useApiClient();
  const [, setUser] = useAtom(userAtom);
  const [loading, setLoading] = React.useState(false);
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
    setLoading(true);
    if (isRegister) {
      await apiClient.users.create(data);
      setVisible(false);
    } else {
      await apiClient.auth.login(data);
      const loggedUser = await apiClient.auth.getLoggedUser();

      setUser({
        user: loggedUser,
        loading: false,
      });
      setVisible(false);
    }
    setLoading(false);
  });

  const closeHandler = () => {
    setVisible(false);
  };

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={visible}
      onClose={closeHandler}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Get started on{" "}
          <Text b size={18}>
            Leets
          </Text>
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          helperColor="error"
          helperText={errors.email}
          css={{ pt: "$8" }}
        />
        <Input.Password
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          helperColor="error"
          helperText={errors.password}
          css={{ pt: "$8" }}
        />
        {isRegister && (
          <>
            <Input.Password
              name="repeatPassword"
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="Repeat password"
              onChange={handleChange}
              helperColor="error"
              helperText={errors.repeatPassword}
              css={{ pt: "$8" }}
            />
            <Input
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="Name"
              name="name"
              onChange={handleChange}
              helperColor="error"
              helperText={errors.name}
              css={{ pt: "$8" }}
            />
            <Input
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="Surname"
              name="surname"
              onChange={handleChange}
              helperColor="error"
              helperText={errors.surname}
              css={{ pt: "$8" }}
            />
            <Input
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              helperColor="error"
              helperText={errors.username}
              css={{ pt: "$8" }}
            />
            <Checkbox
              color={"primary"}
              css={{ pt: "$8" }}
              onChange={(isSelected) =>
                handleChange({
                  target: {
                    type: "checkbox",
                    checked: isSelected,
                    name: "terms",
                  },
                })
              }
              name="terms"
            >
              <Text
                color={!formData.terms && errors.terms && "error"}
                size={14}
              >
                Accept terms and conditions{" "}
                {!formData.terms && errors.terms && "(mandatory)"}
              </Text>
            </Checkbox>
          </>
        )}
        <Row justify="space-between">
          <Text
            size={14}
            onClick={() => {
              setIsRegister(!isRegister);
            }}
            as="a"
            css={{ "@hover": { cursor: "pointer" } }}
          >
            {!isRegister ? "Create account" : "Log in"}
          </Text>
          {!isRegister && (
            <Text size={14} ùas="a" css={{ "@hover": { cursor: "pointer" } }}>
              Forgot password?
            </Text>
          )}
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onClick={closeHandler}>
          Close
        </Button>
        <Button disabled={disabled} auto onClick={onSubmit}>
          {disabled ? (
            <Loading color="currentColor" size="sm" />
          ) : (
            <> {isRegister ? "Create account" : "Sign in"}</>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
