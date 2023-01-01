import { createContext, ReactNode, useContext } from "react";
import { useEffect, useState } from "react";

import { Post } from "@api/posts";

interface PlayerContextValue {
  isPlaying: boolean;
  song: Post | null;
  play: (song: Post) => void;
  pause: () => void;
  audio: HTMLAudioElement | undefined;
  queue: Post[];
  setQueue: (queue: Post[], index: number) => void;
}

const PlayerContext = createContext<PlayerContextValue | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [song, setSong] = useState<Post | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState<Post[]>([]);
  const [queueIndex, setQueueIndex] = useState(0);

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

  const onAudioEnded = () => {
    if (queueIndex === queue.length - 1) {
      pause();
    } else {
      setQueueIndex(queueIndex + 1);
      setSong(queue[queueIndex + 1]);
    }
  };

  const onSetQueue = (queue: Post[], index: number) => {
    setQueue(queue);
    setQueueIndex(index);
  };

  const handleAudioRef = (audio: HTMLAudioElement | null) => {
    if (!audio) return;

    setAudio(audio);
    audio.onended = onAudioEnded;
  };

  return (
    <PlayerContext.Provider
      value={{
        song,
        isPlaying,
        pause,
        play,
        audio,
        queue,
        setQueue: onSetQueue,
      }}
    >
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
