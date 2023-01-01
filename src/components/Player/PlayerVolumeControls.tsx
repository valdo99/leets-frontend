import * as SliderPrimitive from "@radix-ui/react-slider";
import cx from "classnames";
import { useRef, useState } from "react";

import VolumeMuteIcon from "@icons/volume-mute.svg";
import VolumeIcon from "@icons/volume.svg";
import { usePlayer } from "@providers/PlayerProvider";

interface PlayerVolumeControlProps {
  className?: string;
}

export const PlayerVolumeControl = ({
  className,
}: PlayerVolumeControlProps) => {
  const [volume, setVolume] = useState(1);
  const previousVolume = useRef(volume);

  const { audio } = usePlayer();

  const onVolumeChange = (value: number[]) => {
    if (!audio) return;
    setVolume(value[0]);
    audio.volume = value[0];
  };

  const onMuteVolume = () => {
    if (!audio) return;
    previousVolume.current = audio.volume;
    onVolumeChange([0]);
  };

  return (
    <div className={cx("flex items-center", className)}>
      {volume === 0 ? (
        <button onClick={() => onVolumeChange([previousVolume.current])}>
          <VolumeMuteIcon className="h-5 w-5" />
        </button>
      ) : (
        <button onClick={onMuteVolume}>
          <VolumeIcon className="h-5 w-5" />
        </button>
      )}

      <SliderPrimitive.Root
        value={[volume]}
        onValueChange={onVolumeChange}
        defaultValue={[0]}
        max={1}
        step={0.01}
        aria-label="value"
        className="relative ml-3 flex h-[0.4rem] w-[10rem] cursor-pointer touch-none items-center"
      >
        <SliderPrimitive.Track className="relative h-1 w-full grow rounded-full bg-secondary">
          <SliderPrimitive.Range className="absolute h-full rounded-full bg-primary" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className={cx(
            "block h-4 w-4 rounded-full bg-primary",
            "focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-opacity-50"
          )}
        />
      </SliderPrimitive.Root>
    </div>
  );
};
