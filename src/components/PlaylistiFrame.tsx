import { Trans } from "@lingui/macro";

export const PlaylistiFrame = () => {
  return (
    <div>
      <div className="mb-8 flex items-center gap-3">
        <h2 className="text-2xl font-bold leading-tight">
          <Trans>Leets playlist</Trans>
        </h2>
      </div>
      <div className="flex flex-col gap-4">
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
