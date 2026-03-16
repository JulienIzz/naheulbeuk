import { createAudioPlayer } from "expo-audio";
import { useCallback, useEffect, useRef } from "react";

import type { Track } from "#modules/tracks/domain/track.types";

const MAX_CONCURRENT_PLAYERS = 8;

const releasePlayer = (
  player: ReturnType<typeof createAudioPlayer>,
  activePlayers: Set<ReturnType<typeof createAudioPlayer>>,
) => {
  activePlayers.delete(player);
  player.release();
};

export const useSoundPlayer = () => {
  const activePlayers = useRef<Set<ReturnType<typeof createAudioPlayer>>>(
    new Set(),
  );

  useEffect(function cleanupPlayersOnUnmount() {
    const players = activePlayers.current;
    return () => {
      for (const player of players) {
        player.release();
      }
      players.clear();
    };
  }, []);

  const playSound = useCallback((clip: Track) => {
    if (activePlayers.current.size >= MAX_CONCURRENT_PLAYERS) {
      const oldest = activePlayers.current.values().next().value;
      if (oldest) {
        releasePlayer(oldest, activePlayers.current);
      }
    }

    const player = createAudioPlayer(clip.audioUrl);

    activePlayers.current.add(player);

    const subscription = player.addListener(
      "playbackStatusUpdate",
      (status) => {
        if (status.didJustFinish) {
          subscription.remove();
          releasePlayer(player, activePlayers.current);
        }
      },
    );

    player.play();
  }, []);

  return { playSound };
};
