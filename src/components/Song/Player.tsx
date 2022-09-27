import cx from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { useTrack } from "@state/player";

interface PlayerProps {
  previewTrackUrl: string;
  id: string;
  size?: number;
  className?: string;
  playerClassName?: string;
}

export const Player = ({
  previewTrackUrl,
  id,
  size = 4,
  className,
  playerClassName,
}: PlayerProps) => {
  const [track, setTrack] = useTrack();
  const [percentagePlayed, setPercentagePlayed] = useState(0);

  const audio = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (track.isPlaying) {
      const interval = setInterval(() => {
        setPercentagePlayed(
          audio.current
            ? (44 * audio.current.currentTime) / audio.current.duration
            : 0
        );
      }, 11);

      return () => {
        clearInterval(interval);
      };
    }
  }, [track.isPlaying]);

  const play = () => {
    setTrack({
      id,
      isPlaying: true,
    });
  };

  const pause = useCallback(() => {
    setTrack((track) => ({
      id: track.id,
      isPlaying: false,
    }));
  }, [setTrack]);

  useEffect(() => {
    return () => {
      pause();
    };
  }, [pause]);

  const togglePlay = () => {
    if (track.id === id && track.isPlaying) {
      pause();
    } else {
      play();
    }
  };

  useEffect(() => {
    if (audio.current) {
      audio.current.onended = pause;
    }
  }, [pause]);

  useEffect(() => {
    if (!audio.current) return;

    if (track.id === id && track.isPlaying) {
      audio.current.play();
    } else {
      audio.current.pause();
    }
  }, [track, id]);

  return (
    <div className={className}>
      <audio
        style={{ display: "none" }}
        ref={audio}
        src={previewTrackUrl}
      ></audio>
      <svg
        onClick={togglePlay}
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 16 16"
        height={`${size}em`}
        width={`${size}em`}
        className={cx("cursor-pointer", playerClassName)}
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
          strokeWidth={percentagePlayed > 0 ? 1 : 0}
          strokeLinecap="round"
          fill="#33d985"
          strokeDasharray={`${percentagePlayed} 100`}
        />

        {track.id === id && track.isPlaying ? (
          <g transform="translate(3,2.7) scale(0.65)">
            <path
              fill="#050e1f"
              d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"
            ></path>
          </g>
        ) : (
          <g transform="translate(3.5,2.7) scale(0.65)">
            <path
              fill="#050e1f"
              d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"
            ></path>
          </g>
        )}
      </svg>
    </div>
  );
};
