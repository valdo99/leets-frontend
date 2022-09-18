import Button from "@components/button";
import Player from "@components/player";
import classNames from "classnames";
import Image from "next/image";
import React from "react";
import { FaSpotify, FaHeart } from "react-icons/fa";

export const SongCard = ({
  position,
  spotifyId,
  artistName,
  trackTitle,
  postImage,
  likeCount,
  previewTrackUrl,
  id,
  isLiked,
  image = true,
}) => {
  return (
    <div className="flex bg-background-secondary rounded-xl relative p-4 sm:p-3 gap-4">
      <FaSpotify
        color="#050e1d"
        onClick={() =>
          window
            .open("https://open.spotify.com/track/".concat(spotifyId), "_blank")
            .focus()
        }
        className="absolute top-2 right-2 z-10 w-6 h-6 cursor-pointer"
      />
      {image && (
        <div className="hidden sm:block relative shrink-0 h-28 w-28">
          <Image
            className="rounded-xl h-full object-cover"
            src={postImage}
            alt="song"
            layout="fill"
          />
        </div>
      )}
      <div className="flex flex-col w-full justify-center sm:gap-1 text-text-secondary">
        <span className="uppercase font-bold text-xs">{artistName}</span>
        <span className="font-bold text-xl">{trackTitle}</span>
        <div className="flex justify-between items-center mt-2 sm:mt-0">
          {previewTrackUrl ? (
            <Player
              id={spotifyId}
              previewTrackUrl={previewTrackUrl}
              className="-ml-1"
              playerClassName="w-10 h-10"
            />
          ) : (
            <Button
              onClick={() =>
                window
                  .open(
                    "https://open.spotify.com/track/".concat(spotifyId),
                    "_blank"
                  )
                  .focus()
              }
              leftIcon={<FaSpotify size={22} />}
              size="small"
            >
              Listen on Spotify
            </Button>
          )}
          <div className="flex items-center gap-2">
            <FaHeart className={classNames({ "text-red-500": isLiked })} />
            {likeCount}
          </div>
        </div>
      </div>
    </div>
  );
};
