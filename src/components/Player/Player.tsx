import Image from "next/image";
import Link from "next/link";
import React from "react";

import { PlayButton } from "@components/Song/PlayButton";
import SpotifyIcon from "@icons/spotify.svg";
import { usePlayer } from "@providers/PlayerProvider";

import { PlayerProgressBar } from "./PlayerProgressBar";
import { PlayerVolumeControl } from "./PlayerVolumeControls";

export const Player = () => {
  const { song } = usePlayer();

  if (!song) return null;

  return (
    <div className="flex h-full items-center justify-between">
      <div className="flex min-w-0 space-x-3">
        {/* Song Image */}
        {song.image && (
          <div className="relative h-20 w-20 shrink-0">
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
        <div className="flex w-full min-w-0 flex-col justify-center">
          <Link href={`/artist/${song.artist._id}`}>
            <a className="text-xs font-bold uppercase hover:text-base-content-neutral">
              {song.artist.name}
            </a>
          </Link>
          <Link href={`/song/${song._id}`}>
            <a className="mb-1 truncate text-xl font-bold hover:text-base-content-neutral">
              {song.title}
            </a>
          </Link>
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

      <div className="flex items-center justify-between">
        <PlayButton post={song} size={3} className="mr-4" />
        <PlayerProgressBar />
      </div>

      <PlayerVolumeControl />
    </div>
  );
};
