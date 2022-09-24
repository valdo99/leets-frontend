import React from "react";
import { Heart2 } from "react-iconly";

import { Container } from "@components/Layout/Container";

export const Footer = () => {
  return (
    <footer>
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-base-300/50 py-6 text-sm">
          <div className="shrink-0 md:flex-1">© 2022, Leets</div>

          <span className="order-1 basis-full text-center md:order-none md:basis-auto">
            <p className="flex flex-wrap justify-center gap-1">
              <span>Made with </span>
              <Heart2 />
              <span>
                {" "}
                by{" "}
                <a
                  href="https://www.linkedin.com/in/federica-alderighi-b712a9188/"
                  className="text-blue-300"
                >
                  Federica
                </a>{" "}
                ,{" "}
                <a
                  href="https://www.linkedin.com/in/edvaldo-g-20a271121/"
                  className="text-blue-300"
                >
                  Edvaldo
                </a>{" "}
                and{" "}
                <a
                  href="https://www.linkedin.com/in/mattia-pomelli-b857511b1/"
                  className="text-blue-300"
                >
                  Mattia
                </a>
                , designed by{" "}
                <a
                  href="https://www.linkedin.com/in/guido-bambi-1458b8200/"
                  className="text-blue-300"
                >
                  Guido
                </a>
              </span>
            </p>
          </span>

          <div className="flex items-center justify-end md:flex-1">
            <a
              href="mailto:edvaldogjonikaj@gmail.com"
              className="text-blue-300"
            >
              Support
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};
