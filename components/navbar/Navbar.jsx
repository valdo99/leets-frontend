import { Transition } from "@headlessui/react";
import Image from "next/image";

import Container from "@components/Container";

import { Login } from "react-iconly";

import { useApiClient } from "@providers/AuthProvider";
import LoginModal from "@components/LoginModal";
import { useAtom } from "jotai";
import { userAtom } from "state/user";
import Button from "@components/button";
import useTransitionControl from "hooks/useTransitionControl";
import { useState } from "react";
import UserDropdown from "@components/UserDropdown";

const Navbar = () => {
  const [{ user, loading }, setUser] = useAtom(userAtom);
  const [visible, setVisible] = useState(false);
  const apiClient = useApiClient();

  const [show] = useTransitionControl(loading);

  const onLogout = async () => {
    try {
      await apiClient.auth.logout();
      setUser({ user: null, loading: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="flex items-center py-6">
      <Container className="flex justify-between items-center w-full">
        <Image src="/logo_1.png" height="50px" width="123px" alt="Leets logo" />
        <Transition
          show={show}
          enter="transition-opacity duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {user ? (
            <UserDropdown user={user} onLogout={onLogout} />
          ) : (
            <>
              <Button leftIcon={<Login />} onClick={() => setVisible(true)}>
                Get started
              </Button>
              <LoginModal show={visible} onClose={() => setVisible(false)} />
            </>
          )}
        </Transition>
      </Container>
    </header>
  );
};

export default Navbar;
