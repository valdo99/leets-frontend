import { ReactNode } from "react";

import { Container } from "@components/Layout/Container";
import { Footer } from "@components/Layout/Footer";
import { Navbar } from "@components/Layout/Navbar/Navbar";
import { Player } from "@components/Player/Player";

export const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex h-[calc(var(--vh,1vh)*100)] flex-col">
      <div className="relative flex-1 overflow-auto">
        <Navbar />
        <main className="flex-1 pb-20">
          <Container>{children}</Container>
        </main>
        <Footer />
      </div>
      <Player />
    </div>
  );
};
