import React from "react";

import { Container } from "@components/Layout/Container";
import { usePlayer } from "@providers/PlayerProvider";

import { PlayerControls } from "./PlayerControls";
import { PlayerSongInfo } from "./PlayerSongInfo";
import { PlayerVolumeControl } from "./PlayerVolumeControls";

export const Player = () => {
  const { song } = usePlayer();

  if (!song) return null;

  return (
    <div className="border-t border-base-300/50 bg-base-100">
      <Container className="flex h-full items-center justify-between py-2">
        <PlayerSongInfo song={song} className="flex-1 justify-start" />
        <PlayerControls song={song} />
        <PlayerVolumeControl className="flex-1 justify-end" />
      </Container>
    </div>
  );
};
