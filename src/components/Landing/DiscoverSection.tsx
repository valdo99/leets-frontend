import { Trans } from "@lingui/macro";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@components/Basic/Button";

interface DiscoverSectionProps {}

export const DiscoverSection = ({}: DiscoverSectionProps) => {
  return (
    <section className="relative z-20 mt-2 flex flex-col items-center space-x-8 space-y-8 md:flex-row">
      <div className="flex-1 text-center md:text-left">
        <h3 className="text-2xl font-bold sm:text-3xl">
          <Trans>
            Looking for <span className="text-primary">new songs</span>?
          </Trans>
        </h3>
        <p className="mx-auto mt-4 max-w-[40rem] text-lg text-base-content-neutral">
          <Trans>
            Are you bored of the same old music? Leets is a curation of the best
            new emerging music, where every day you can find new hits to make
            your playlists shine.
          </Trans>
        </p>
        <Link href="/feed">
          <Button size="lg" className="mt-10">
            <Trans>Discover new music</Trans>
          </Button>
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <Image
          width="316px"
          height="357px"
          src={"/music.svg"}
          alt="Discover music"
        />
      </div>
    </section>
  );
};
