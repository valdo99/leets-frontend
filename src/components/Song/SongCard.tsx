import cx from "classnames";
import Image from "next/image";
import React from "react";
import { FaSpotify, FaHeart } from "react-icons/fa";

import { Post } from "@api/posts";
import { Button } from "@components/Basic/Button";

import { Player } from "./Player";

interface SongCardProps {
  post: Post;
  position: number;
}

export const SongCard = ({ post }: SongCardProps) => {
  return (
    <div className="relative flex gap-4 rounded-xl bg-secondary p-4 sm:p-3">
      <a
        href={`https://open.spotify.com/track/${post.spotify_id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-2 right-2 z-10 cursor-pointer"
      >
        <FaSpotify color="#050e1d" className="h-6 w-6" />
      </a>
      {post.image && (
        <div className="relative hidden h-28 w-28 shrink-0 sm:block">
          <Image
            className="h-full rounded-xl object-cover"
            src={post.image}
            alt="song"
            layout="fill"
          />
        </div>
      )}
      <div className="flex w-full flex-col justify-center text-secondary-content sm:gap-1">
        <span className="text-xs font-bold uppercase">{post.artist.name}</span>
        <span className="text-xl font-bold">{post.title}</span>
        <div className="mt-2 flex items-center justify-between sm:mt-0">
          {post.preview_url ? (
            <Player
              id={post.spotify_id}
              previewTrackUrl={post.preview_url}
              className="-ml-1"
              playerClassName="w-10 h-10"
            />
          ) : (
            <a href={`https://open.spotify.com/track/${post.spotify_id}`}>
              <Button leftIcon={<FaSpotify size={22} />} size="xs">
                Listen on Spotify
              </Button>
            </a>
          )}
          <div className="flex items-center gap-2">
            <FaHeart className={cx({ "text-red-500": post.isLiked })} />
            {post.likes}
          </div>
        </div>
      </div>
    </div>
  );
};
