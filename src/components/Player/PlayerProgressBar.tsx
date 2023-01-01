import { useEffect, useState } from "react";

import { usePlayer } from "@providers/PlayerProvider";

export const PlayerProgressBar = () => {
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
    <div className="h-[0.4rem] w-[10rem] rounded-full bg-secondary">
      <div
        className="h-full rounded-full bg-primary"
        style={{ width: `${percentagePlayed}%` }}
      />
    </div>
  );
};
