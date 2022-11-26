import { Trans } from "@lingui/macro";
import { NextSeo } from "next-seo";
import Link from "next/link";

import { WelcomeModal } from "@components/Modals/WelcomeModal";
import { SongsFeed } from "@components/SongsFeed";

export default function Songs() {
  return (
    <>
      <NextSeo />
      <div className="rounded-btn bg-primary/40 p-4 text-center text-white">
        <Trans>Are you new here?</Trans>{" "}
        <Link href="/about">
          <a className="cursor-pointer font-medium underline">
            <Trans>Discover what is Leets</Trans>
          </a>
        </Link>
      </div>
      <div className="mt-10 flex flex-col space-x-14 space-y-14 lg:flex-row">
        <div className="min-w-0 flex-1">
          <SongsFeed />
        </div>
        <div className="flex shrink-0 flex-col space-y-14 lg:w-[340px]">
          {/* <TopHuntersFeed />
          <TopArtistsFeed /> */}
        </div>
      </div>
      <WelcomeModal />
    </>
  );
}
