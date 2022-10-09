import { atom, useAtom } from "jotai";

interface TrackState {
  id: string | null;
  isPlaying: boolean;
}

const trackAtom = atom<TrackState>({
  id: null,
  isPlaying: false,
});

export const useTrack = () => {
  return useAtom(trackAtom);
};
