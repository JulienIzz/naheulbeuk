# Player Module

`src/modules/player/`

## Structure

```
src/modules/player/
├── components/
│   ├── Player.component.tsx          # Main player UI
│   ├── Player.component.test.tsx
│   ├── ProgressBar.component.tsx     # Interactive progress bar (see docs/progress-bar.md)
│   └── ProgressBar.component.test.tsx
├── context/
│   └── Player.context.tsx            # Audio state + playback controls
└── hooks/
    └── usePlayer.ts             # Context consumer hook
```

## Data flow

```
                     Cloudflare R2
                         │
                    (audio stream)
                         │
  TrackList ──loadPlaylist──▶ PlayerProvider ◀── expo-audio (useAudioPlayer)
                                  │
                          PlayerContext
                         ╱        │         ╲
               TrackInfo    ProgressBar    PlayPauseButton / Next / Previous
```

1. **TrackList** calls `loadPlaylist(tracks, startIndex)` when the user taps a track.
2. **PlayerProvider** loads the audio URL into `expo-audio` and exposes state via context.
3. **Player.component** reads context through `usePlayer()` and renders the UI.

## PlayerContext value

```ts
type PlayerContextValue = {
  // State
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number; // seconds
  duration: number; // seconds
  hasNext: boolean;
  hasPrevious: boolean;
  // Actions
  loadPlaylist: (tracks: Track[], startIndex: number) => void;
  play: () => void;
  pause: () => void;
  playNext: () => void;
  playPrevious: () => void;
  seekTo: (seconds: number) => void;
};
```

## PlayerProvider internals

### Audio setup

On mount, configures `expo-audio` via `setAudioModeAsync()`:

- `playsInSilentMode: true` — plays even when the iOS silent switch is on
- `shouldPlayInBackground: true` — continues when the app is backgrounded
- `interruptionMode: "doNotMix"` — pauses when another app plays audio

### State

- `playlist: Track[]` — ordered list of tracks
- `currentIndex: number` — position within the playlist

### Playback

- `loadTrackAtIndex(tracks, index)` — calls `player.replace({ uri: track.audioUrl })` then `player.play()`
- `playNext()` / `playPrevious()` — boundary-checked index navigation
- `seekTo(seconds)` — delegates to `player.seekTo(seconds)`

### Auto-advance

A `playbackStatusUpdate` listener watches for `didJustFinish` and auto-calls `playNext()`. Uses a ref (`playNextRef`) to avoid stale closures.

### Memoization

The context value is wrapped in `useMemo` to prevent unnecessary consumer re-renders.

## Player.component

### Layout

```
┌───────────────────────────────────┐
│           TrackInfo               │  Track title + season/episode
│                                   │
│   [ 0:32 |━━━━━●━━━━━━━━| 3:45 ]  │  ProgressBar (see docs/progress-bar.md)
│                                   │
│       ⏮       ▶/⏸       ⏭       │  Transport buttons
└───────────────────────────────────┘
                 ▲ safe area inset
```

### Sub-components

| Component         | Source        | Role                                                 |
| ----------------- | ------------- | ---------------------------------------------------- |
| `TrackInfo`       | inline        | Title + subtitle (season/episode or type label)      |
| `ProgressBar`     | separate file | Seek bar with reanimated gestures                    |
| `PlayPauseButton` | inline        | Toggles `play()`/`pause()`, swaps Play/Pause icon    |
| `NextButton`      | inline        | Calls `playNext()`, disabled when `!hasNext`         |
| `PreviousButton`  | inline        | Calls `playPrevious()`, disabled when `!hasPrevious` |

### Disabled states

When `currentTrack === null`:

- All buttons are disabled
- ProgressBar renders in disabled mode (opacity 0.4, time codes show `--:--`, dot hidden)
- TrackInfo shows placeholder text ("Aucune piste en cours")

### Track metadata display

`TypeToLabelMap` maps track types to French labels for the subtitle:

| Type         | Subtitle                       |
| ------------ | ------------------------------ |
| `episode`    | `S{season} · E{episodeNumber}` |
| `song`       | "Chanson"                      |
| `bonus`      | "Bonus"                        |
| `soundboard` | _(none)_                       |

### Styling

- `PlayerContainer` — bottom-anchored, uses safe area insets for padding
- Bottom padding: `max(spacing.xl, spacing.l + bottomInset)` to handle notched devices
- i18n: button labels use Lingui tagged templates (source locale: French)

## Integration points

- **Root layout** (`src/app/navigation/_layout.tsx`): `PlayerProvider` wraps the app, `Player` rendered at the bottom
- **TrackList**: calls `loadPlaylist()` on track tap, highlights current track via `currentTrack?.id`
- **Test utilities** (`src/testing/render.tsx`): `renderWithProviders` includes `PlayerProvider`
