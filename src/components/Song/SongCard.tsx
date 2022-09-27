import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { FaSpotify } from "react-icons/fa";

import { Post } from "@api/posts";
import { Button } from "@components/Basic/Button";
import HeartOutline from "@icons/heart-outline.svg";
import HeartSolid from "@icons/heart-solid.svg";
import { useApiClient, useLoginModal, useUser } from "@providers/AuthProvider";

import { Player } from "./Player";

interface SongCardProps {
  post: Post;
  onLikeChange?: () => void;
}

export const SongCard = ({ post, onLikeChange }: SongCardProps) => {
  const openLoginModal = useLoginModal();
  const apiClient = useApiClient();
  const { user } = useUser();

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
    if (!user) {
      openLoginModal();
    } else {
      post.isLiked ? unlikeSong() : likeSong();
    }
  };

  return (
    <div className="rounded-btn relative flex gap-3 bg-secondary p-2.5 text-secondary-content xs:gap-4 xs:p-3">
      {/* Spotify Icon */}
      <a
        href={`https://open.spotify.com/track/${post.spotify_id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-2 right-2 cursor-pointer"
      >
        <FaSpotify color="#050e1d" className="h-5 w-5 xs:h-6 xs:w-6" />
      </a>
      {/* Song Image */}
      {post.image && (
        <div className="relative hidden h-24 w-24 shrink-0 xs:block xs:h-28 xs:w-28 [@media(min-width:320px)]:block">
          <Image
            className="rounded-btn h-full object-cover"
            src={post.image}
            alt="song"
            layout="fill"
          />
        </div>
      )}
      {/* Song Details */}
      <div className="flex w-full min-w-0 flex-col justify-center xs:gap-1">
        <span className="text-xs font-bold uppercase">{post.artist.name}</span>
        <span className="truncate text-xl font-bold">{post.title}</span>
        {post.preview_url ? (
          <Player
            id={post.spotify_id}
            previewTrackUrl={post.preview_url}
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
              leftIcon={<FaSpotify size={18} />}
              size="xs"
              className="mt-1 px-2"
            >
              Listen on Spotify
            </Button>
          </a>
        )}
      </div>
      {/* Likes */}
      <div className="absolute bottom-2 right-2 flex cursor-pointer items-center gap-2">
        <button onClick={toggleLike} className="cursor-pointer">
          {post.isLiked ? (
            <HeartSolid className="text-xl" />
          ) : (
            <HeartOutline className="text-xl" />
          )}
        </button>
        <span className="text-base">{post.likes}</span>
      </div>
    </div>
  );
};
