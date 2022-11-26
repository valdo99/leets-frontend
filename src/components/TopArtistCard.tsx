import { Trans } from "@lingui/macro";
import Image from "next/image";
import Link from "next/link";

import { TopArtist } from "@api/artists";
import { formatDate } from "@utils/dates";

interface TopArtistCardProps {
  artist: TopArtist;
}

export const TopArtistCard = ({ artist }: TopArtistCardProps) => {
  return (
    <div className="rounded-btn flex w-full items-center justify-between space-x-3 bg-secondary px-2.5 py-4 text-secondary-content xs:space-x-4 xs:px-3">
      <div className="flex items-center space-x-2 text-left">
        <span className="relative h-10 w-10 shrink-0">
          <Image
            src={artist.image}
            alt={`Artist - ${artist.name}`}
            layout="fill"
            className="rounded-full"
          />
        </span>
        <div>
          <Link href={`/artist/${artist._id}`}>
            <a className="font-bold text-secondary-content hover:text-secondary-content/60">
              {artist.name}
            </a>
          </Link>
          <p className="text-sm">
            <Trans>Hunted on {formatDate(artist.createdAt)}</Trans>
          </p>
        </div>
      </div>
      <div className="text-lg font-bold">{artist.points}</div>
    </div>
  );
};
