import React from "react";

import { Container } from "@components/Layout/Container";
import { usePlayer } from "@providers/PlayerProvider";

import { PlayerControls } from "./PlayerControls";
import { PlayerProgressBar } from "./PlayerProgressBar";
import { PlayerSongInfo } from "./PlayerSongInfo";
import { PlayerVolumeControl } from "./PlayerVolumeControls";

export const Player = () => {
  const { song } = usePlayer();

  if (!song) return null;

  return (
    <div className="border-t border-base-300/50 bg-base-100">
      <Container className="flex h-full flex-wrap items-center justify-between py-2">
        <PlayerSongInfo song={song} className="min-w-0 flex-1 justify-start" />
        <PlayerControls song={song} className="order-1 mx-4 md:order-none" />
        <PlayerVolumeControl className="hidden flex-1 justify-end sm:flex" />
        <PlayerProgressBar className="order-1 mt-2 basis-full md:hidden" />
      </Container>
    </div>
  );
};
