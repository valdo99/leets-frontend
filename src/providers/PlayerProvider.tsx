import { createContext, ReactNode, useContext } from "react";
import { useEffect, useState } from "react";

import { Song } from "@api/songs";

interface PlayerContextValue {
  isPlaying: boolean;
  song: Song | null;
  play: (song: Song) => void;
  pause: () => void;
  audio: HTMLAudioElement | undefined;
  queue: Song[];
  queueIndex: number;
  setQueue: (queue: Song[], index: number) => void;
  goToNextSong: () => void;
  goToPreviousSong: () => void;
}

const PlayerContext = createContext<PlayerContextValue | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [song, setSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState<Song[]>([]);
  const [queueIndex, setQueueIndex] = useState(0);

  const [audio, setAudio] = useState<HTMLAudioElement>();

  const play = (song: Song) => {
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

  const goToNextSong = () => {
    if (queueIndex === queue.length - 1) {
      pause();
    } else {
      setQueueIndex((index) => index + 1);
      setSong(queue[queueIndex + 1]);
    }
  };

  const goToPreviousSong = () => {
    if (queueIndex === 0) return;

    setQueueIndex((index) => index - 1);
    setSong(queue[queueIndex - 1]);
  };

  const onSetQueue = (queue: Song[], index: number) => {
    setQueue(queue);
    setQueueIndex(index);
  };

  const handleAudioRef = (audio: HTMLAudioElement | null) => {
    if (!audio) return;

    setAudio(audio);
    audio.onended = goToNextSong;
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
        queueIndex,
        setQueue: onSetQueue,
        goToNextSong,
        goToPreviousSong,
      }}
    >
      {song?.preview_url && (
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
