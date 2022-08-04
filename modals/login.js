import React from "react";
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";
import { useApiClient } from "providers/AuthProvider";
import { userAtom } from "state/user";
import { useAtom } from "jotai";

export default function LoginModal({ visible, setVisible }) {
  const apiClient = useApiClient();
  const [, setUser] = useAtom(userAtom);

  const [email, setEmail] = React.useState("");
  const [psw, setPsw] = React.useState("");

  const closeHandler = () => {
    setVisible(false);
  };

  const onSubmit = async () => {
    await apiClient.auth.login({ email, password: psw });
    const loggedUser = await apiClient.auth.getLoggedUser();

    setUser({
      user: loggedUser,
      loading: false,
    });

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
          Welcome to
          <Text b size={18}>
            NextUI
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
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Password"
          onChange={(e) => setPsw(e.target.value)}
        />
        <Row justify="space-between">
          <Checkbox>
            <Text size={14}>Remember me</Text>
          </Checkbox>
          <Text size={14}>Forgot password?</Text>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onClick={closeHandler}>
          Close
        </Button>
        <Button auto onClick={onSubmit}>
          Sign in
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
