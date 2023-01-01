import cx from "classnames";

import { Post } from "@api/posts";
import { PlayButton } from "@components/Song/PlayButton";
import NextIcon from "@icons/next.svg";
import PreviousIcon from "@icons/previous.svg";
import { usePlayer } from "@providers/PlayerProvider";

import { PlayerProgressBar } from "./PlayerProgressBar";

interface PlayerControlsProps {
  song: Post;
  className?: string;
}

export const PlayerControls = ({ song, className }: PlayerControlsProps) => {
  const { goToPreviousSong, goToNextSong, queueIndex, queue } = usePlayer();

  return (
    <div
      className={cx("flex flex-col items-center justify-between", className)}
    >
      <div className="mb-2 flex items-center">
        <button
          onClick={goToPreviousSong}
          disabled={queueIndex === 0}
          className="disabled:opacity-60"
        >
          <PreviousIcon className="h-6 w-6 text-base-content hover:text-base-content/80" />
        </button>
        <PlayButton post={song} size={2.2} className="mx-1 sm:mx-2" />
        <button
          onClick={goToNextSong}
          disabled={queueIndex === queue.length - 1}
          className="disabled:opacity-60"
        >
          <NextIcon className="h-6 w-6 text-base-content hover:text-base-content/80" />
        </button>
      </div>
      <PlayerProgressBar className="hidden md:flex" />
    </div>
  );
};
