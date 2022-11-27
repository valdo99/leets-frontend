import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import cx from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { Container } from "@components/Layout/Container";

import { MobileMenu } from "./MobileMenu";
import { RightMenu } from "./RightMenu";

interface NavItemProps {
  text: string;
  href: string;
}

const NavItem = ({ text, href }: NavItemProps) => {
  const router = useRouter();

  return (
    <Link href={href}>
      <a
        className={cx("rounded-btn py-2 px-4 font-medium hover:bg-base-200", {
          "bg-base-200": router.pathname === href,
        })}
      >
        {text}
      </a>
    </Link>
  );
};

export const Navbar = () => {
  const { i18n } = useLingui();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="relative z-20">
      <Container>
        <div className="flex flex-wrap items-center justify-between space-x-4 py-6">
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
          <div className="hidden space-x-2 lg:flex">
            <NavItem text={t(i18n)`Search`} href="/search" />
            <NavItem text={t(i18n)`Feed`} href="/feed" />
            <NavItem text={t(i18n)`Hunters`} href="/hunters" />
            <NavItem text={t(i18n)`Artists`} href="/artists" />
          </div>

          {/* Right Menu */}
          <RightMenu showMenu={showMenu} setShowMenu={setShowMenu} />
        </div>
      </Container>

      {/* Mobile Mobile */}
      <MobileMenu showMenu={showMenu} setShowMenu={setShowMenu} />
    </header>
  );
};
