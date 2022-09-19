import React from "react";
import Container from "@components/Container";

import { Heart2 } from "react-iconly";

const Footer = () => {
  return (
    <footer>
      <Container>
        <div className="flex items-center justify-between flex-wrap gap-4 border-t py-6 border-gray-700">
          <div className="md:flex-1 shrink-0">copyright leets 2022</div>

          <span className="basis-full order-1 md:basis-auto md:order-none text-center">
            <p>
              Made with <Heart2 className="inline" /> by{" "}
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
            </p>
          </span>

          <div className="flex justify-end items-center md:flex-1">
            <p>
              For support contact:{" "}
              <a
                href="mailto:edvaldogjonikaj@gmail.com"
                className="text-blue-300"
              >
                leets
              </a>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
