import { NextSeo } from "next-seo";

import { WelcomeModal } from "@components/Modals/WelcomeModal";
import { TopHuntersFeed } from "@components/TopHuntersFeed";
import { TopSongsFeed } from "@components/TopSongsFeed";

export default function Home() {
  return (
    <>
      <NextSeo
        title="Leets"
        description="Condividi le tue scoperte musicali e promuovi artisti emergenti"
        canonical="https://www.leets.it/"
        openGraph={{
          url: "https://www.leets.it",
          title: "Leets",
          description:
            "Condividi le tue scoperte musicali e promuovi artisti emergenti",
          images: [
            {
              url: "https://www.leets.it/api/og-home",
              width: 800,
              height: 600,
              alt: "Leets logo",
              type: "image/png",
            },
          ],
          site_name: "Leets",
        }}
      />
      <div className="flex flex-col gap-14 lg:flex-row">
        <div className="min-w-0 flex-1">
          <TopSongsFeed />
        </div>
        <div className="shrink-0 lg:w-[340px]">
          <TopHuntersFeed />
        </div>
      </div>
      <WelcomeModal />
    </>
  );
}
