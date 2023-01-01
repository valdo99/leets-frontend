import { atom, useAtom } from "jotai";
import { useRef } from "react";

import { Post } from "@api/posts";

interface PlayerState {
  isPlaying: boolean;
  song: Post | null;
}

const playerAtom = atom<PlayerState>({
  song: null,
  isPlaying: false,
});

export const usePlayer = () => {
  const [playerState, setPlayerState] = useAtom(playerAtom);
  const audioRef = useRef<HTMLAudioElement>(null);

  const play = (song: Post) => {
    setPlayerState((state) => ({
      ...state,
      song,
      isPlaying: true,
    }));
  };

  const pause = () => {
    setPlayerState((state) => ({
      ...state,
      isPlaying: false,
    }));
  };

  return {
    ...playerState,
    play,
    pause,
    audioRef,
  };
};
