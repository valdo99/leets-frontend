import { Trans } from "@lingui/macro";
import Link from "next/link";

import { TopArtistsFeed } from "@components/Artists/TopArtistsFeed";
import { TopHuntersFeed } from "@components/Hunters/TopHuntersFeed";
import { WelcomeModal } from "@components/Modals/WelcomeModal";
import { PlaylistiFrame } from "@components/PlaylistiFrame";
import { TopSongsFeed } from "@components/Songs/TopSongsFeed";

export default function Home() {
  return (
    <>
      <div className="rounded-btn bg-primary/40 p-4 text-center text-white">
        <Trans>Are you new here?</Trans>{" "}
        <Link href="/about">
          <a className="cursor-pointer font-medium underline">
            <Trans>Discover what is Leets</Trans>
          </a>
        </Link>
      </div>
      <div className="mt-10 flex flex-col space-y-14 lg:flex-row lg:space-y-0 lg:space-x-14">
        <div className="min-w-0 flex-1">
          <TopSongsFeed />
        </div>
        <div className="flex shrink-0 flex-col space-y-14 lg:w-[340px]">
          <TopHuntersFeed />
          <TopArtistsFeed />
          <PlaylistiFrame />
        </div>
      </div>
      <WelcomeModal />
    </>
  );
}
