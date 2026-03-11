import { createAudioPlayer } from "expo-audio";
import { useCallback, useRef } from "react";

import type { Track } from "#modules/tracks/domain/track.types";

export const useSoundPlayer = () => {
  const activePlayers = useRef<Set<ReturnType<typeof createAudioPlayer>>>(
    new Set(),
  );

  const playSound = useCallback((clip: Track) => {
    const player = createAudioPlayer(clip.audioUrl);

    activePlayers.current.add(player);

    const subscription = player.addListener(
      "playbackStatusUpdate",
      (status) => {
        if (status.didJustFinish) {
          subscription.remove();
          player.remove();
          activePlayers.current.delete(player);
        }
      },
    );

    player.play();
  }, []);

  return { playSound };
};
