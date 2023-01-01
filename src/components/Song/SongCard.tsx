import { Trans } from "@lingui/macro";
import { useMutation } from "@tanstack/react-query";
import cx from "classnames";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import { Post } from "@api/posts";
import { Button } from "@components/Basic/Button";
import { PostUserLikes } from "@components/Modals/PostUserLikes";
import HeartOutline from "@icons/heart-outline.svg";
import HeartSolid from "@icons/heart-solid.svg";
import SpotifyIcon from "@icons/spotify.svg";
import { useApiClient, useUser } from "@providers/AuthProvider";

import { PlayButton } from "./PlayButton";

interface SongCardProps {
  post: Post;
  onLikeChange?: () => void;
  showHunter?: boolean;
}

export const SongCard = ({
  post,
  onLikeChange,
  showHunter = true,
}: SongCardProps) => {
  const apiClient = useApiClient();
  const { user } = useUser();
  const [showUserLikesModal, setShowUserLikesModal] = useState(false);

  const { mutate: likeSong } = useMutation(
    () => apiClient.posts.like(post._id),
    {
      onSuccess: onLikeChange,
    }
  );

  const { mutate: unlikeSong } = useMutation(
    () => apiClient.posts.unlike(post._id),
    {
      onSuccess: onLikeChange,
    }
  );

  const toggleLike = () => {
    post.isLiked ? unlikeSong() : likeSong();
  };

  const isPreview = post.status !== "ONLINE";

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
        {post.image && (
          <div className="relative hidden h-24 w-24 shrink-0 xs:block xs:h-28 xs:w-28 [@media(min-width:320px)]:block">
            <Link href={`/song/${post._id}`}>
              <a>
                <Image
                  className="rounded-btn h-full object-cover"
                  src={post.image}
                  alt="song"
                  layout="fill"
                />
              </a>
            </Link>
          </div>
        )}

        {/* Song Details */}
        <div className="flex w-full min-w-0 flex-col justify-center xs:space-y-1">
          <Link href={`/artist/${post.artist._id}`}>
            <a className="text-xs font-bold uppercase hover:text-secondary-content/60">
              {post.artist.name}
            </a>
          </Link>
          <Link href={`/song/${post._id}`}>
            <a className="truncate text-xl font-bold hover:text-secondary-content/60">
              {post.title}
            </a>
          </Link>{" "}
          <div className="flex items-center space-x-2">
            {post.preview_url ? (
              <PlayButton
                post={post}
                className="-ml-1"
                playerClassName="w-9 h-9 xs:w-10 xs:h-10"
              />
            ) : (
              <a
                href={`https://open.spotify.com/track/${post.spotify_id}`}
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
          "flex items-center justify-between sm:flex-col sm:items-end",
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
            <Link href={`/${post.hunter.username}`}>
              <a className="font-bold hover:text-secondary-content/60">
                {post.hunter.username}
              </a>
            </Link>
          </div>
        )}

        <div className="flex items-center space-x-4">
          {/* Spotify Icon */}
          <a
            href={`https://open.spotify.com/track/${post.spotify_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer"
          >
            <SpotifyIcon className="h-5 w-5" />
          </a>

          {/* Status / Likes */}
          {/* {post.status === "UPLOADED" && (
            <span className="top-0 right-0 z-10 rounded-lg bg-info py-0.5 px-1.5 text-sm">
              <Trans>Under review</Trans>
            </span>
          )} */}
          {post.status === "ONLINE" && (
            <div className="flex cursor-pointer items-center space-x-1">
              {user ? (
                <button onClick={toggleLike} className="cursor-pointer">
                  {post.isLiked ? (
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
                {post.likes}
              </span>
            </div>
          )}
        </div>
      </div>
      {showUserLikesModal && (
        <PostUserLikes
          show={showUserLikesModal}
          onClose={() => setShowUserLikesModal(false)}
          postId={post._id}
        />
      )}
    </div>
  );
};
