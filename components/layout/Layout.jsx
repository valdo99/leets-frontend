import Container from "@components/Container";
import Footer from "@components/footer/Footer";
import Navbar from "@components/navbar/Navbar";

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
