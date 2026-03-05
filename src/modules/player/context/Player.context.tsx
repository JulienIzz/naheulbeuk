import {
  setAudioModeAsync,
  useAudioPlayer,
  useAudioPlayerStatus,
} from "expo-audio";
import type { ReactNode } from "react";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type { Track } from "#modules/tracks/domain/track.types";

export type PlayerContextValue = {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  hasNext: boolean;
  hasPrevious: boolean;
  loadPlaylist: (_tracks: Track[], _startIndex: number) => void;
  play: () => void;
  pause: () => void;
  playNext: () => void;
  playPrevious: () => void;
  seekTo: (_seconds: number) => void;
};

export const PlayerContext = createContext<PlayerContextValue | null>(null);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const player = useAudioPlayer("");
  const status = useAudioPlayerStatus(player);

  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const currentTrack = playlist[currentIndex] ?? null;
  const hasNext = currentIndex < playlist.length - 1 && currentIndex >= 0;
  const hasPrevious = currentIndex > 0;
  const isPlaying = status.playing;
  const currentTime = status.currentTime;
  const duration = status.duration;

  useEffect(function configureAudioMode() {
    void setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: true,
      interruptionMode: "doNotMix",
    });
  }, []);

  useEffect(
    function updateLockScreenControls() {
      if (!currentTrack) return;
      const metadata = {
        title: currentTrack.title,
        artist: "Le Donjon de Naheulbeuk",
        albumTitle: currentTrack.season
          ? `Saison ${currentTrack.season}`
          : undefined,
      };
      player.setActiveForLockScreen(true, metadata, {
        showSeekForward: true,
        showSeekBackward: true,
      });
    },
    [player, currentTrack],
  );

  const loadTrackAtIndex = useCallback(
    (tracks: Track[], index: number) => {
      const track = tracks[index];
      if (!track) return;
      player.replace({ uri: track.audioUrl });
      player.play();
    },
    [player],
  );

  const loadPlaylist = useCallback(
    (tracks: Track[], startIndex: number) => {
      setPlaylist(tracks);
      setCurrentIndex(startIndex);
      loadTrackAtIndex(tracks, startIndex);
    },
    [loadTrackAtIndex],
  );

  const play = useCallback(() => player.play(), [player]);
  const pause = useCallback(() => player.pause(), [player]);
  const seekTo = useCallback(
    (seconds: number) => player.seekTo(seconds),
    [player],
  );

  const playNextRef = useRef(() => {});

  const playNext = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = prev + 1;
      if (next >= playlist.length) return prev;
      const track = playlist[next];
      if (track) {
        player.replace({ uri: track.audioUrl });
        player.play();
      }
      return next;
    });
  }, [playlist, player]);

  const playPrevious = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = prev - 1;
      if (next < 0) return prev;
      const track = playlist[next];
      if (track) {
        player.replace({ uri: track.audioUrl });
        player.play();
      }
      return next;
    });
  }, [playlist, player]);

  playNextRef.current = playNext;

  useEffect(
    function autoAdvanceOnFinish() {
      const subscription = player.addListener(
        "playbackStatusUpdate",
        (event) => {
          if (event.didJustFinish) {
            playNextRef.current();
          }
        },
      );
      return () => subscription.remove();
    },
    [player],
  );

  const value = useMemo(
    (): PlayerContextValue => ({
      currentTrack,
      isPlaying,
      currentTime,
      duration,
      hasNext,
      hasPrevious,
      loadPlaylist,
      play,
      pause,
      playNext,
      playPrevious,
      seekTo,
    }),
    [
      currentTrack,
      isPlaying,
      currentTime,
      duration,
      hasNext,
      hasPrevious,
      loadPlaylist,
      play,
      pause,
      playNext,
      playPrevious,
      seekTo,
    ],
  );

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};
