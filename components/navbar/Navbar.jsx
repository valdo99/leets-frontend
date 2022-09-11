import React, { useEffect } from "react";
import {
  Row,
  Button,
  Text,
  Image,
  Dropdown,
  Container,
} from "@nextui-org/react";
import { Login } from "react-iconly";
import { User } from "@nextui-org/react";

import PropTypes from "prop-types";
import { useApiClient } from "@providers/AuthProvider";
import LoginModal from "@modals/login";
import { useAtom } from "jotai";
import { userAtom } from "state/user";
import { loginModalAtom } from "state/loginModal";
import styled from "styled-components";

const UsernameDiv = styled.div`
  text-align: end;
  &:hover {
    cursor: pointer;
  }
`;

export const Navbar = () => {
  const [{ user }, setUser] = useAtom(userAtom);
  const [visible, setVisible] = useAtom(loginModalAtom);
  const apiClient = useApiClient();

  return (
    <>
      <Row justify="space-between" align="center" css={{}}>
        <Row justify="flex-start">
          <Image src="/logo_1.png" height={50} containerCss={{ m: 0 }} />
        </Row>
        <Row justify="flex-end" align="center">
          {user ? (
            <Dropdown placement="bottom-right">
              <Dropdown.Trigger>
                <UsernameDiv>{user.username}</UsernameDiv>
              </Dropdown.Trigger>
              <Dropdown.Menu
                color="primary"
                aria-label="Avatar Actions"
                css={{
                  p: "$8",
                  background: "$background",
                  boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
                }}
              >
                <Dropdown.Item key="profile" css={{ p: "$4" }}>
                  <Text b color="inherit">
                    Profile
                  </Text>
                </Dropdown.Item>

                <Dropdown.Item
                  key="logout"
                  css={{
                    marginTop: "$8",
                    px: "$0",
                    "@hover": { backgroundColor: "transparent" },
                  }}
                >
                  <Button
                    color="primary"
                    bordered
                    css={{ w: "100%" }}
                    onClick={async () => {
                      try {
                        await apiClient.auth.logout();
                        setUser({ user: null, loading: true });
                      } catch (error) {
                        console.log(error);
                      }
                      // TODO add toast
                    }}
                  >
                    Log Out
                  </Button>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Button
              flat
              color="primary"
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
