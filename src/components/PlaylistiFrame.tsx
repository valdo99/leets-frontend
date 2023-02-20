import { Trans } from "@lingui/macro";

import { Button } from "./Basic/Button";

export const PlaylistiFrame = () => {
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold leading-tight">
          <Trans>Leets playlist</Trans>
        </h2>
        <a
          href="https://open.spotify.com/playlist/2AhYizKYg7kmhbb7MtgmQk?go=1&sp_cid=610247c8788f8a1f3196d5665be676d9"
          target="_blank"
          rel="noreferrer"
        >
          <Button>Listen on Spotify</Button>
        </a>
      </div>
      <div className="flex flex-col">
        <iframe
          className="rounded-xl"
          src="https://open.spotify.com/embed/playlist/2AhYizKYg7kmhbb7MtgmQk?utm_source=generator&theme=0"
          width="100%"
          height="380"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
    </div>
  );
};
