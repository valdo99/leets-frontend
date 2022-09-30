import { Transition } from "@headlessui/react";
import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { Login } from "react-iconly";

import { Button } from "@components/Basic/Button";
import { Container } from "@components/Layout/Container";
import { UserDropdown } from "@components/UserDropdown";
import { useTransitionControl } from "@hooks/useTransitionControl";
import { useApiClient, useLoginModal } from "@providers/AuthProvider";
import { userAtom } from "@state/user";

export const Navbar = () => {
  const [{ user, loading }, setUser] = useAtom(userAtom);
  const openLoginModal = useLoginModal();
  const apiClient = useApiClient();

  const [show] = useTransitionControl(loading);

  const onLogout = async () => {
    try {
      await apiClient.auth.logout();
      setUser({ user: null, loading: false });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="flex items-center py-6">
      <Container className="flex w-full items-center justify-between">
        <Link href="/">
          <a className="cursor-pointer">
            <span className="hidden sm:block">
              <Image
                src="/logo.png"
                height="46px"
                width="113px"
                alt="Leets logo"
              />
            </span>
            <span className="sm:hidden">
              <Image
                src="/logo_only.png"
                height="46px"
                width="35.74px"
                alt="Leets logo"
              />
            </span>
          </a>
        </Link>
        <Transition
          show={show}
          enter="transition-opacity duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="flex items-center gap-6">
            {user ? (
              <>
                <Link href="/upload">
                  <a>
                    <Button>Upload song</Button>
                  </a>
                </Link>
                <UserDropdown user={user} onLogout={onLogout} />
              </>
            ) : (
              <Button leftIcon={<Login />} onClick={openLoginModal}>
                Get started
              </Button>
            )}
          </div>
        </Transition>
      </Container>
    </header>
  );
};
