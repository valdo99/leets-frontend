import { track } from "@amplitude/analytics-browser";
import { Trans } from "@lingui/macro";
import { useMutation } from "@tanstack/react-query";
import cx from "classnames";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import { Song } from "@api/songs";
import { Button } from "@components/Basic/Button";
import { SongLikesModal } from "@components/Modals/SongLikesModal";
import HeartOutline from "@icons/heart-outline.svg";
import HeartSolid from "@icons/heart-solid.svg";
import SpotifyIcon from "@icons/spotify.svg";
import { useApiClient, useUser } from "@providers/AuthProvider";

import { PlayButton } from "./PlayButton";

interface SongCardProps {
  song: Song;
  onLikeChange?: () => void;
  showHunter?: boolean;
  onPlay?: () => void;
}

export const SongCard = ({
  song,
  onLikeChange,
  showHunter = true,
  onPlay,
}: SongCardProps) => {
  const apiClient = useApiClient();
  const { user } = useUser();
  const [showUserLikesModal, setShowUserLikesModal] = useState(false);

  const { mutate: likeSong } = useMutation(
    () => apiClient.songs.like(song._id),
    {
      onSuccess: onLikeChange,
    }
  );

  const { mutate: unlikeSong } = useMutation(
    () => apiClient.songs.unlike(song._id),
    {
      onSuccess: onLikeChange,
    }
  );

  const toggleLike = () => {
    song.isLiked ? unlikeSong() : likeSong();
  };

  const isPreview = song.status !== "ONLINE";

  return (
    <div
      className={cx(
        "rounded-btn relative w-full",
        "bg-secondary text-secondary-content",
        "p-2.5 xs:p-3",
        "flex justify-between flex-col sm:flex-row",
        "space-x-0 space-y-3 sm:space-y-0 sm:space-x-4"
      )}
    >
      <div className="flex min-w-0 space-x-3">
        {/* Song Image */}
        {song.image && (
          <div className="relative hidden h-24 w-24 shrink-0 xs:block xs:h-28 xs:w-28 [@media(min-width:320px)]:block">
            <Link href={`/song/${song._id}`}>
              <a>
                <Image
                  className="rounded-btn h-full object-cover"
                  src={song.image}
                  alt="song"
                  layout="fill"
                  unoptimized
                />
              </a>
            </Link>
          </div>
        )}

        {/* Song Details */}
        <div className="flex w-full min-w-0 flex-col justify-center xs:space-y-1">
          <Link href={`/artist/${song.artist._id}`}>
            <a className="text-xs font-bold uppercase hover:text-secondary-content/60">
              {song.artist.name}
            </a>
          </Link>
          <Link href={`/song/${song._id}`}>
            <a className="truncate text-xl font-bold hover:text-secondary-content/60">
              {song.title}
            </a>
          </Link>{" "}
          <div className="flex items-center space-x-2">
            {song.preview_url ? (
              <PlayButton
                song={song}
                className="-ml-1"
                playerClassName="w-9 h-9 xs:w-10 xs:h-10"
                onClick={onPlay}
              />
            ) : (
              <a
                href={`https://open.spotify.com/track/${song.spotify_id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  leftIcon={<SpotifyIcon className="h-4 w-4" />}
                  size="xs"
                  className="mt-1 px-2"
                >
                  <Trans>Listen on Spotify</Trans>
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>

      <div
        className={cx(
          "flex items-center justify-between sm:flex-col sm:items-end shrink-0",
          {
            "absolute top-2 right-2": isPreview,
          }
        )}
      >
        {/* Hunter */}
        {showHunter && (
          <div className="sm:text-right">
            <p className="text-xs leading-3">
              <Trans>Hunted by</Trans>
            </p>
            <Link href={`/${song.hunter.username}`}>
              <a className="font-bold hover:text-secondary-content/60">
                {song.hunter.username}
              </a>
            </Link>
          </div>
        )}

        <div className="flex items-center space-x-4">
          {/* Spotify Icon */}
          <a
            href={`https://open.spotify.com/track/${song.spotify_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer"
          >
            <Button
              size="xs"
              rightIcon={<SpotifyIcon className="h-4 w-4" />}
              onClick={() => {
                track("add_to_spotify");
              }}
            >
              Add to playlist
            </Button>
          </a>

          {/* Status / Likes */}
          {/* {song.status === "UPLOADED" && (
            <span className="top-0 right-0 z-10 rounded-lg bg-info py-0.5 px-1.5 text-sm">
              <Trans>Under review</Trans>
            </span>
          )} */}
          {song.status === "ONLINE" && (
            <div className="flex cursor-pointer items-center space-x-1">
              {user ? (
                <button onClick={toggleLike} className="cursor-pointer">
                  {song.isLiked ? (
                    <HeartSolid className="text-2xl" />
                  ) : (
                    <HeartOutline className="text-2xl" />
                  )}
                </button>
              ) : (
                <Link href="/signup">
                  <a>
                    <HeartOutline className="text-2xl" />
                  </a>
                </Link>
              )}

              <span
                onClick={() => setShowUserLikesModal(true)}
                className="text-lg"
              >
                {song.likes}
              </span>
            </div>
          )}
        </div>
      </div>
      {showUserLikesModal && (
        <SongLikesModal
          show={showUserLikesModal}
          onClose={() => setShowUserLikesModal(false)}
          songId={song._id}
        />
      )}
    </div>
  );
};
