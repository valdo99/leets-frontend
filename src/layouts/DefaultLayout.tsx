import { ReactNode } from "react";

import { Container } from "@components/Layout/Container";
import { Footer } from "@components/Layout/Footer";
import { Navbar } from "@components/Layout/Navbar/Navbar";
import { Player } from "@components/Player/Player";
import { ProductHuntButton } from "@components/ProductHuntButton";

interface DefaultLayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

export const DefaultLayout = ({
  children,
  showFooter = false,
}: DefaultLayoutProps) => {
  return (
    <div className="relative flex h-[calc(var(--vh,1vh)*100)] flex-col">
      <div className="relative flex-1 overflow-auto">
        <Navbar />
        <main className="flex-1 pb-20">
          <Container>{children}</Container>
        </main>
        {showFooter && <Footer />}
      </div>
      <div className="rounded-r-box absolute bottom-4 left-4 bg-base-100 p-2 sm:hidden">
        <ProductHuntButton />
      </div>
      <Player />
    </div>
  );
};
