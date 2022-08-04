import React, { useEffect } from "react";
import { Row, Button, Text, Image, Dropdown } from "@nextui-org/react";
import { Login } from "react-iconly";
import { User } from "@nextui-org/react";

import PropTypes from "prop-types";
import { useApiClient } from "@providers/AuthProvider";
import LoginModal from "@modals/login";
import { useAtom } from "jotai";
import { userAtom } from "state/user";
import { loginModalAtom } from "state/loginModal";

export const Navbar = () => {
  const [{ user }, setUser] = useAtom(userAtom);
  const [visible, setVisible] = useAtom(loginModalAtom);
  const apiClient = useApiClient();

  useEffect(() => {}, [user]);

  return (
    <>
      <Row justify="space-between" align="center" css={{}}>
        <Row justify="flex-start">
          <Image src="/logo_1.png" height={50} containerCss={{ m: 0 }} />
        </Row>
        <Row justify="flex-end" align="center">
          {user ? (
            <Dropdown placement="bottom-left">
              <Dropdown.Trigger>
                <User
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  name={user.username}
                  css={{ "@hover": { cursor: "pointer" } }}
                />
              </Dropdown.Trigger>
              <Dropdown.Menu color="primary" aria-label="Avatar Actions">
                <Dropdown.Item key="profile" css={{ height: "$18" }}>
                  <Text b color="inherit" css={{ d: "flex" }}>
                    Signed in as
                  </Text>
                  <Text b color="inherit" css={{ d: "flex" }}>
                    {`${user.name} ${user.surname}`}
                  </Text>
                </Dropdown.Item>

                <Dropdown.Item
                  key="logout"
                  css={{
                    marginTop: "$8",
                    "@hover": { backgroundColor: "transparent" },
                  }}
                >
                  <Button
                    color="error"
                    onClick={async () => {
                      // TODO add toast
                      await apiClient.auth.logout();
                      setUser({ user: null, loading: true });
                    }}
                  >
                    Log Out
                  </Button>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Button
              shadow
              color="secondary"
              auto
              icon={<Login set="bold" primaryColor="currentColor" />}
              onClick={() => setVisible(true)}
            >
              Get started
            </Button>
          )}
        </Row>
      </Row>
      <LoginModal visible={visible} setVisible={setVisible} />
    </>
  );
};

Navbar.propTypes = {};
