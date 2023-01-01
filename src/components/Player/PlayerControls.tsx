import cx from "classnames";

import { Post } from "@api/posts";
import { PlayButton } from "@components/Song/PlayButton";

import { PlayerProgressBar } from "./PlayerProgressBar";

interface PlayerControlsProps {
  song: Post;
  className?: string;
}

export const PlayerControls = ({ song, className }: PlayerControlsProps) => {
  return (
    <div
      className={cx("flex flex-col items-center justify-between", className)}
    >
      <PlayButton post={song} size={2.2} className="mb-2" />
      <PlayerProgressBar />
    </div>
  );
};
