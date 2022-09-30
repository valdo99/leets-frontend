import { Trans } from "@lingui/macro";
import React from "react";

import { Container } from "@components/Layout/Container";
import HeartIcon from "@icons/heart.svg";

export const Footer = () => {
  return (
    <footer>
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-base-300/50 py-6 text-sm">
          <div className="shrink-0 md:flex-1">© 2022, Leets</div>
          <p className="order-1 basis-full text-center md:order-none md:basis-auto">
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
                href="https://www.linkedin.com/in/mattia-pomelli-b857511b1/"
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

          <div className="flex items-center justify-end md:flex-1">
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
