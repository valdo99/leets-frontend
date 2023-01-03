import cx from "classnames";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Post } from "@api/posts";
import SpotifyIcon from "@icons/spotify.svg";

interface PlayerSongInfoProps {
  song: Post;
  className?: string;
}

export const PlayerSongInfo = ({ song, className }: PlayerSongInfoProps) => {
  return (
    <div className={cx("flex items-center w-[200px]", className)}>
      {/* Song Image */}
      {song.image && (
        <div className="relative h-14 w-14 shrink-0">
          <Link href={`/song/${song._id}`}>
            <a>
              <Image
                className="rounded-btn h-full object-cover"
                src={song.image}
                alt="song"
                layout="fill"
              />
            </a>
          </Link>
        </div>
      )}

      {/* Song Details */}
      <div className="ml-3 flex min-w-0 flex-col justify-center">
        <Link href={`/artist/${song.artist._id}`}>
          <a className="text-2xs truncate font-bold uppercase leading-4 hover:text-base-content-neutral">
            {song.artist.name}
          </a>
        </Link>
        <Link href={`/song/${song._id}`}>
          <a className="mt-1 truncate text-lg font-bold leading-4 hover:text-base-content-neutral">
            {song.title}
          </a>
        </Link>
      </div>

      <div className="ml-5">
        {/* Spotify Icon */}
        <a
          href={`https://open.spotify.com/track/${song.spotify_id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer"
        >
          <SpotifyIcon className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
};
