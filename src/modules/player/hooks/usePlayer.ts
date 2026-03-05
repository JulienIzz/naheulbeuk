import { useContext } from "react";

import {
  PlayerContext,
  type PlayerContextValue,
} from "#modules/player/context/Player.context";

export const usePlayer = (): PlayerContextValue => {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
};
