import cx from "classnames";
import React from "react";

import { Song } from "@api/songs";
import { usePlayer } from "@providers/PlayerProvider";

interface PlayButtonProps {
  song: Song;
  size?: number;
  className?: string;
  playerClassName?: string;
  onClick?: () => void;
}

export const PlayButton = ({
  song,
  size = 4,
  onClick,
  className,
  playerClassName,
}: PlayButtonProps) => {
  const { song: currentSong, isPlaying, pause, play } = usePlayer();

  const isSongPlaying = currentSong?._id === song._id && isPlaying;

  const togglePlay = () => {
    if (isSongPlaying) {
      pause();
    } else {
      play(song);
    }

    onClick?.();
  };

  return (
    <button onClick={togglePlay} className={className}>
      <svg
        strokeWidth="0"
        viewBox="0 0 16 16"
        height={`${size}em`}
        width={`${size}em`}
        className={cx(
          "cursor-pointer text-primary hover:text-primary-focus",
          playerClassName
        )}
      >
        <circle
          cx="50%"
          cy="50%"
          r="7"
          stroke="#33d985"
          strokeWidth="0.9"
          strokeLinecap="round"
          fill="#33d985"
        />
        <circle
          style={{
            transformBox: "fill-box",
            transformOrigin: "center",
            transform: "rotate(-90deg)",
          }}
          cx="50%"
          cy="50%"
          r="7"
          stroke="#050e1f"
          strokeLinecap="round"
          fill="currentColor"
        />

        {isSongPlaying ? (
          <g transform="translate(3,2.7) scale(0.65)">
            <path
              fill="#050e1f"
              d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"
            />
          </g>
        ) : (
          <g transform="translate(3.5,2.7) scale(0.65)">
            <path
              fill="#050e1f"
              d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"
            />
          </g>
        )}
      </svg>
    </button>
  );
};
