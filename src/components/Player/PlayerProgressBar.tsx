import cx from "classnames";
import { useEffect, useState } from "react";

import { usePlayer } from "@providers/PlayerProvider";

interface PlayerProgressBarProps {
  className?: string;
}

export const PlayerProgressBar = ({ className }: PlayerProgressBarProps) => {
  const { isPlaying, song, audio } = usePlayer();
  const [percentagePlayed, setPercentagePlayed] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    const intervalId = setInterval(() => {
      if (!audio) return;

      setPercentagePlayed((audio.currentTime / audio.duration) * 100);
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, [isPlaying, audio, song]);

  return (
    <div
      className={cx(
        "h-[0.4rem] w-[16rem] lg:w-[24rem] rounded-full bg-secondary",
        className
      )}
    >
      <div
        className="h-full rounded-full bg-primary"
        style={{ width: `${percentagePlayed}%` }}
      />
    </div>
  );
};
