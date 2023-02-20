import { Trans } from "@lingui/macro";
import Link from "next/link";
import React from "react";

import { Container } from "@components/Layout/Container";
import HeartIcon from "@icons/heart.svg";

export const Footer = () => {
  return (
    <footer>
      <Container>
        <div className="flex flex-wrap items-center justify-between space-x-4 border-t border-base-300/50 py-6 text-sm">
          <div className="shrink-0 md:flex-1">© 2022, Leets</div>

          <p className="order-1 basis-full text-center lg:order-none lg:basis-auto">
            <Trans>
              Made with <HeartIcon className="inline h-6 w-6" /> by{" "}
              <a
                href="https://www.linkedin.com/in/federica-alderighi-b712a9188/"
                className="text-blue-300 hover:underline"
              >
                Federica
              </a>{" "}
              ,{" "}
              <a
                href="https://www.linkedin.com/in/edvaldo-g-20a271121/"
                className="text-blue-300 hover:underline"
              >
                Edvaldo
              </a>{" "}
              and{" "}
              <a
                href="https://twitter.com/mattiapomelli"
                className="text-blue-300 hover:underline"
              >
                Mattia
              </a>
              , designed by{" "}
              <a
                href="https://www.linkedin.com/in/guido-bambi-1458b8200/"
                className="text-blue-300 hover:underline"
              >
                Guido
              </a>
            </Trans>
          </p>

          <div className="flex items-center justify-end space-x-3 lg:flex-1">
            <Link href="privacy-policy">
              <a className="text-blue-300 hover:underline">
                <Trans>Privacy Policy</Trans>
              </a>
            </Link>
            <Link href="terms-and-conditions">
              <a className="text-blue-300 hover:underline">
                <Trans>Terms</Trans>
              </a>
            </Link>
            <a
              href="mailto:edvaldogjonikaj@gmail.com"
              className="text-blue-300 hover:underline"
            >
              <Trans>Support</Trans>
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};
