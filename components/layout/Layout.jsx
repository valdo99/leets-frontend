import { Footer } from "@components/footer/Footer";
import { Navbar } from "@components/navbar/Navbar";
import { Container } from "@nextui-org/react";

export const Layout = ({ children }) => {
  return (
    <Container
      css={{
        "@mdMax": {
          px: "$7",
          py: "$10",
        },
        "@md": {
          px: "$28",
          py: "$10",
        },
      }}
    >
      <Navbar />
      <main>{children}</main>
      <Footer />
    </Container>
  );
};
