import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

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
  const audioRef = useRef<HTMLAudioElement>();

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

  useEffect(() => {
    if (!audioRef.current) return;

    if (playerState.isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [playerState.isPlaying, playerState.song]);

  const handleAudioRef = (audio: HTMLAudioElement | null) => {
    if (!audio) return;

    audioRef.current = audio;
    audioRef.current.onended = pause;
  };

  return {
    ...playerState,
    play,
    pause,
    handleAudioRef,
    audioRef,
  };
};
