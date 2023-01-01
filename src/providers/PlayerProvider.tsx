import { createContext, ReactNode, useContext } from "react";
import { useEffect, useState } from "react";

import { Post } from "@api/posts";

interface PlayerContextValue {
  isPlaying: boolean;
  song: Post | null;
  play: (song: Post) => void;
  pause: () => void;
  audio: HTMLAudioElement | undefined;
}

const PlayerContext = createContext<PlayerContextValue | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [song, setSong] = useState<Post | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [audio, setAudio] = useState<HTMLAudioElement>();

  const play = (song: Post) => {
    setSong(song);
    setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    if (!audio) return;

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying, song, audio]);

  const handleAudioRef = (audio: HTMLAudioElement | null) => {
    if (!audio) return;

    setAudio(audio);
    audio.onended = pause;
  };

  return (
    <PlayerContext.Provider value={{ song, isPlaying, pause, play, audio }}>
      {song && (
        <audio className="hidden" ref={handleAudioRef} src={song.preview_url} />
      )}
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);

  if (context === undefined) {
    throw new Error("usePlayer must be used within an PlayerProvider");
  }

  return context;
};
