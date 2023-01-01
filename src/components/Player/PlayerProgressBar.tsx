import * as SliderPrimitive from "@radix-ui/react-slider";
import cx from "classnames";
import { useEffect, useState } from "react";

import { usePlayer } from "@providers/PlayerProvider";

interface PlayerProgressBarProps {
  className?: string;
}

export const PlayerProgressBar = ({ className }: PlayerProgressBarProps) => {
  const { isPlaying, song, audio } = usePlayer();
  const [timePlayed, setTimePlayed] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    const intervalId = setInterval(() => {
      if (!audio) return;
      setTimePlayed(audio.currentTime);
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, [isPlaying, audio, song]);

  const onTimeChange = (value: number[]) => {
    if (!audio) return;
    setTimePlayed(value[0]);
    audio.currentTime = value[0];
  };

  return (
    <div className={className}>
      <SliderPrimitive.Root
        value={[timePlayed]}
        onValueChange={onTimeChange}
        defaultValue={[0]}
        max={audio?.duration}
        aria-label="Time"
        className="group relative flex h-[0.4rem] w-[16rem] cursor-pointer touch-none items-center lg:w-[24rem]"
      >
        <SliderPrimitive.Track className="relative h-1 w-full grow rounded-full bg-secondary">
          <SliderPrimitive.Range className="absolute h-full rounded-full bg-primary" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className={cx(
            "hidden group-hover:block h-4 w-4 rounded-full bg-primary",
            "focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-opacity-50"
          )}
        />
      </SliderPrimitive.Root>
    </div>
  );
};
