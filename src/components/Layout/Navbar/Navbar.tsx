import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Container } from "@components/Layout/Container";

import { MobileMenu } from "./MobileMenu";
import { RightMenu } from "./RightMenu";

export const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="relative z-20">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4 py-6">
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
          <div className="hidden gap-2 md:flex">
            <Link href={"/feed"}>
              <a className="rounded-btn py-2 px-4 font-medium hover:bg-base-200">
                Feed
              </a>
            </Link>
            <Link href={"/hunters"}>
              <a className="rounded-btn py-2 px-4 font-medium hover:bg-base-200">
                Hunters
              </a>
            </Link>
            <Link href={"/artists"}>
              <a className="rounded-btn py-2 px-4 font-medium hover:bg-base-200">
                Artists
              </a>
            </Link>
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
