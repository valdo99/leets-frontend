import { Trans } from "@lingui/macro";
import Image from "next/image";

import { Button } from "@components/Basic/Button";

interface DiscoverSectionProps {}

export const DiscoverSection = ({}: DiscoverSectionProps) => {
  return (
    <section className="mt-36 flex flex-col items-center gap-8 md:flex-row">
      <div className="flex-1 text-center md:text-left">
        <h3 className="text-2xl font-bold">
          <Trans>
            Looking for new <span className="text-primary">songs</span>?
          </Trans>
        </h3>
        <p className="mx-auto mt-4 max-w-[40rem] text-base-content-neutral">
          <Trans>
            Are you bored of the same old music? If you want to give a twist to
            your playlists, Leets is the perfect place to discover new music
            daily, by up-and-coming artists.
          </Trans>
        </p>
        <Button size="lg" className="mt-10">
          <Trans>Discover new music</Trans>
        </Button>
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
