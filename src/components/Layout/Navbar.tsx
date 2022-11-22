import { Transition } from "@headlessui/react";
import { Trans } from "@lingui/macro";
import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@components/Basic/Button";
import { LanguageMenu } from "@components/LanguageMenu";
import { Container } from "@components/Layout/Container";
import { UserDropdown } from "@components/UserDropdown";
import { useTransitionControl } from "@hooks/useTransitionControl";
import CloseIcon from "@icons/close.svg";
import HamburgerIcon from "@icons/hamburger.svg";
import LoginIcon from "@icons/login.svg";
import { useApiClient } from "@providers/AuthProvider";
import { userAtom } from "@state/user";

export const Navbar = () => {
  const [{ user, loading }, setUser] = useAtom(userAtom);
  const apiClient = useApiClient();

  const [showMenu, setShowMenu] = useState(false);

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
    <header className="relative z-20">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-6 py-6">
          {/* Logo */}
          <div className="shrink-0 md:flex-1">
            <Link href="/">
              <a className="cursor-pointer" onClick={() => setShowMenu(false)}>
                <span className="hidden sm:block">
                  <Image
                    src="/logo.png"
                    height="46px"
                    width="113px"
                    alt="Leets logo"
                    priority
                  />
                </span>
                <span className="sm:hidden">
                  <Image
                    src="/logo_only.png"
                    height="46px"
                    width="35.74px"
                    alt="Leets logo"
                    priority
                  />
                </span>
              </a>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden gap-10 md:flex">
            <Link href={"/feed"}>
              <a className="font-medium">Feed</a>
            </Link>
            <Link href={"/feed"}>
              <a className="font-medium">Hunters</a>
            </Link>
            <Link href={"/feed"}>
              <a className="font-medium">Artists</a>
            </Link>
          </div>

          {/* Right Menu */}
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
              <div className="flex items-center gap-4 xxs:gap-2 xs:gap-4">
                {user ? (
                  <>
                    <Link href="/upload">
                      <a className="hidden xxs:block">
                        <Button>
                          <Trans>Upload song</Trans>
                        </Button>
                      </a>
                    </Link>
                    <UserDropdown
                      onClick={() => setShowMenu(false)}
                      user={user}
                      onLogout={onLogout}
                    />
                  </>
                ) : (
                  <div className="hidden gap-2 xxs:flex">
                    <Link href="/login">
                      <a>
                        <Button color="secondary" className="min-w-0">
                          <Trans>Login</Trans>
                        </Button>
                      </a>
                    </Link>
                    <Link href="/signup">
                      <a>
                        <Button
                          leftIcon={
                            <LoginIcon className="hidden h-6 w-6 sm:block" />
                          }
                        >
                          <Trans>Get started</Trans>
                        </Button>
                      </a>
                    </Link>
                  </div>
                )}
                <LanguageMenu onClick={() => setShowMenu(false)} />
                {/* Hamburger Icon  / Close Icon */}
                <button
                  onClick={() => setShowMenu((show) => !show)}
                  className="rounded-btn p-1.5 text-2xl hover:bg-base-200 md:hidden"
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
        </div>
      </Container>

      {/* Menu Mobile */}
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
          onClick={() => setShowMenu(false)}
        />
        <div className="rounded-b-box absolute top-full z-30 w-full bg-base-100 pb-6 md:hidden">
          <Container>
            <nav className="flex flex-col gap-y-2">
              <Link href="/feed">
                <a
                  role="none"
                  onClick={() => setShowMenu(false)}
                  className="rounded-btn flex items-center py-2 px-4 font-medium hover:bg-base-200"
                >
                  <Trans>Feed</Trans>
                </a>
              </Link>
              <Link href="/top-hunters">
                <a
                  role="none"
                  onClick={() => setShowMenu(false)}
                  className="rounded-btn flex items-center py-2 px-4 font-medium hover:bg-base-200"
                >
                  <Trans>Hunters</Trans>
                </a>
              </Link>
              <Link href="/top-songs">
                <a
                  role="none"
                  onClick={() => setShowMenu(false)}
                  className="rounded-btn flex items-center py-2 px-4 font-medium hover:bg-base-200"
                >
                  <Trans>Artists</Trans>
                </a>
              </Link>
            </nav>
            <hr className="my-4 border-t border-t-base-200 xxs:hidden" />
            <div className="flex gap-2 xxs:hidden">
              {user ? (
                <Link href="/upload">
                  <a className="flex-1">
                    <Button block>
                      <Trans>Upload song</Trans>
                    </Button>
                  </a>
                </Link>
              ) : (
                <>
                  <Link href="/login">
                    <a className="flex-1">
                      <Button
                        onClick={() => setShowMenu(false)}
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
                      <Button onClick={() => setShowMenu(false)} block>
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
    </header>
  );
};
