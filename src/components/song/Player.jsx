import { useAtom } from "jotai";
import React from "react";
import { trackPlayingAtom } from "@state/player";

import classNames from "classnames";

const Player = ({
  previewTrackUrl,
  id,
  size = 4,
  className,
  playerClassName,
  ...props
}) => {
  const [isPlay, setIsPlay] = React.useState(false);
  const [trackPlaying, setTrackPlaying] = useAtom(trackPlayingAtom);
  const [percentagePlayed, setPercentagePlayed] = React.useState(0);

  function play() {
    setIsPlay(true);
    audio.current.play();
  }

  React.useEffect(() => {
    if (isPlay) {
      const interval = setInterval(() => {
        if (isPlay === false) {
          clearInterval(interval);
        }
        setPercentagePlayed(
          (44 * audio.current.currentTime) / audio.current.duration
        );
      }, 11);
      return () => {
        clearInterval(interval);
      };
    }
  }, [isPlay]);

  function pause() {
    audio.current.pause();
    setIsPlay(false);
  }

  let audio = React.useRef();

  function audioEnded() {
    setIsPlay(false);
  }

  React.useEffect(() => {
    if (audio.current) {
      // audio.current.ontimeupdate = changeTimelinePosition;
      audio.current.onended = audioEnded;
    }

    () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      audio = React.useRef();
    };
    // timeline.current.addEventListener("change", changeSeek);
  }, []);

  React.useEffect(() => {
    if (audio.current) {
      if (trackPlaying === id) {
        audio.current.play();
      } else {
        audio.current.pause();
      }
    }
  }, [trackPlaying]);

  return (
    <div className={className}>
      <audio
        style={{ display: "none" }}
        ref={audio}
        src={previewTrackUrl}
      ></audio>
      <svg
        onClick={() => {
          if (isPlay) {
            pause();
          } else {
            setTrackPlaying(id);
            play();
          }
        }}
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 16 16"
        height={`${size}em`}
        width={`${size}em`}
        className={classNames("cursor-pointer", playerClassName)}
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

        {!isPlay ? (
          <g transform="translate(3.5,2.7) scale(0.65)">
            <path
              fill="#050e1f"
              d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"
            ></path>
          </g>
        ) : (
          <g transform="translate(3,2.7) scale(0.65)">
            <path
              fill="#050e1f"
              d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"
            ></path>
          </g>
        )}
      </svg>
    </div>
  );
};

export default Player;
