import Container from "@components/layout/Container";
import Footer from "@components/layout/Footer";
import Navbar from "@components/layout/Navbar";

export const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pb-20">
        <Container>{children}</Container>
      </main>
      <Footer />
    </div>
  );
};
