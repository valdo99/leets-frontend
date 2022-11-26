import { Transition } from "@headlessui/react";
import { t, Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import cx from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

import { Button } from "@components/Basic/Button";
import { Container } from "@components/Layout/Container";
import { useUser } from "@providers/AuthProvider";

interface NavItemProps {
  text: string;
  href: string;
  onClick?: () => void;
}

const NavItem = ({ text, href, onClick }: NavItemProps) => {
  const router = useRouter();

  return (
    <Link href={href}>
      <a
        onClick={onClick}
        className={cx(
          "rounded-btn flex items-center py-2 px-4 font-medium hover:bg-base-200",
          {
            "bg-base-200": router.pathname === href,
          }
        )}
      >
        {text}
      </a>
    </Link>
  );
};

interface MobileMenuProps {
  showMenu: boolean;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
}

export const MobileMenu = ({ showMenu, setShowMenu }: MobileMenuProps) => {
  const { i18n } = useLingui();
  const { user } = useUser();

  const closeMenu = () => setShowMenu(false);

  return (
    <Transition
      show={showMenu}
      enter="transition-opacity duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {/* Overlay */}
      <div
        className="fixed inset-0 top-[6.25rem] z-20 bg-black opacity-20 md:hidden"
        onClick={closeMenu}
      />
      <div className="rounded-b-box absolute top-full z-30 w-full bg-base-100 pb-6 md:hidden">
        <Container>
          <nav className="flex flex-col space-y-2">
            <NavItem text={t(i18n)`Feed`} href="/feed" onClick={closeMenu} />
            <NavItem
              text={t(i18n)`Hunters`}
              href="/hunters"
              onClick={closeMenu}
            />
            <NavItem
              text={t(i18n)`Artists`}
              href="/artists"
              onClick={closeMenu}
            />
          </nav>
          <hr className="my-4 border-t border-t-base-200 xxs:hidden" />
          <div className="flex space-x-2 xxs:hidden">
            {user ? (
              <Link href="/upload">
                <a className="flex-1">
                  <Button onClick={closeMenu} block>
                    <Trans>Upload song</Trans>
                  </Button>
                </a>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <a className="flex-1">
                    <Button
                      onClick={closeMenu}
                      color="secondary"
                      className="min-w-0"
                      block
                    >
                      <Trans>Login</Trans>
                    </Button>
                  </a>
                </Link>
                <Link href="/signup">
                  <a className="flex-1">
                    <Button onClick={closeMenu} block>
                      <Trans>Get started</Trans>
                    </Button>
                  </a>
                </Link>
              </>
            )}
          </div>
        </Container>
      </div>
    </Transition>
  );
};
