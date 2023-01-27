import { Transition } from "@headlessui/react";
import { Trans } from "@lingui/macro";
import { useAtom } from "jotai";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

import { Button } from "@components/Basic/Button";
import { LanguageMenu } from "@components/Layout/Navbar/LanguageMenu";
import { ProfileMenu } from "@components/Layout/Navbar/ProfileMenu";
import { useTransitionControl } from "@hooks/useTransitionControl";
import CloseIcon from "@icons/close.svg";
import HamburgerIcon from "@icons/hamburger.svg";
import { useApiClient } from "@providers/AuthProvider";
import { userAtom } from "@state/user";

interface RightMenuProps {
  showMenu: boolean;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
}

export const RightMenu = ({ showMenu, setShowMenu }: RightMenuProps) => {
  const [{ user, loading }, setUser] = useAtom(userAtom);
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
    <div className="flex justify-end lg:flex-1">
      <Transition
        show={show}
        enter="transition-opacity duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="flex items-center space-x-4 xxs:space-x-2 xs:space-x-4">
          {user ? (
            <>
              <Link href="/upload">
                <a className="hidden xxs:block">
                  <Button>
                    <Trans>Upload song</Trans>
                  </Button>
                </a>
              </Link>
              <ProfileMenu
                onClick={() => setShowMenu(false)}
                user={user}
                onLogout={onLogout}
              />
            </>
          ) : (
            <div className="hidden space-x-2 xxs:flex">
              <Link href="/login">
                <a>
                  <Button color="secondary" className="min-w-0">
                    <Trans>Login</Trans>
                  </Button>
                </a>
              </Link>
              <Link href="/signup">
                <a>
                  <Button>
                    <Trans>Upload song</Trans>
                  </Button>
                </a>
              </Link>
            </div>
          )}
          <LanguageMenu onClick={() => setShowMenu(false)} />
          {/* Hamburger Icon  / Close Icon */}
          <button
            onClick={() => setShowMenu((show) => !show)}
            className="rounded-btn p-1.5 text-2xl hover:bg-base-200 lg:hidden"
            aria-expanded="false"
          >
            <span className="sr-only">
              {showMenu ? "Close menu" : "Open menu"}
            </span>
            {showMenu ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </div>
      </Transition>
    </div>
  );
};
