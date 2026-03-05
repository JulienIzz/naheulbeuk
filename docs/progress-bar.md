# Progress Bar & Seek

`src/modules/player/components/ProgressBar.component.tsx`

## Overview

The progress bar displays playback position and allows the user to seek by panning. Visual updates (bar fill + dot position) run on the **UI thread** via `react-native-reanimated`, while time text and seek commands stay on the JS thread.

## Layout

```
[ 0:32 |━━━━━●━━━━━━━━━━━━━━━━━| 3:45 ]
  ^            ^                    ^
  TimeCode   TouchArea (flex:1)   TimeCode
  (left)     ├─ BarTrack          (right, duration)
             │  └─ FilledBar (animated width)
             └─ DotIndicator (animated translateX)
```

- **TimeCode** has a fixed width (`TIME_CODE_WIDTH = 40`) to prevent layout shifts when digits change (e.g. "0:00" → "0:01" in a proportional font).
- **TouchArea** captures gestures. Its `onLayout` stores the pixel width in `barWidthSV`.
- **DotIndicator** is absolutely positioned with `left: -DOT_SIZE/2` so its center aligns with `translateX: 0` at the bar's left edge.

## Shared values (UI thread)

| Shared value     | Range   | Meaning                                                       |
| ---------------- | ------- | ------------------------------------------------------------- |
| `barWidthSV`     | `>= 0`  | Pixel width of TouchArea, set via layout event                |
| `gestureRatioSV` | `-1..1` | Current gesture position; `-1` = not seeking                  |
| `pendingRatioSV` | `-1..1` | Seek committed but playback hasn't caught up yet; `-1` = none |
| `playRatioSV`    | `0..1`  | Current playback ratio, synced from JS via effect             |

## Display ratio priority

`getDisplayRatio()` (worklet) resolves which ratio to show:

```
gesture active?  →  gestureRatioSV    (user is dragging)
pending seek?    →  pendingRatioSV    (seek sent, waiting for playback to catch up)
otherwise        →  playRatioSV       (normal playback)
```

Both `filledBarAnimStyle` and `dotAnimStyle` use this same function, so the bar and dot always agree.

## Seek lifecycle

```
 User touches bar          User drags              User lifts finger
 ────────────────          ──────────              ─────────────────
 onBegin                   onUpdate (×N)           onFinalize
 ┌─────────────────────┐   ┌──────────────────┐   ┌─────────────────────────────────┐
 │ UI thread:          │   │ UI thread:       │   │ UI thread:                      │
 │  gestureRatioSV = r │   │  gestureRatioSV  │   │  gestureRatioSV = -1            │
 │                     │   │   = new r        │   │                                 │
 │ → JS thread:        │   │                  │   │ → JS thread (commitSeek):       │
 │  seekingTime = r×d  │   │ → JS thread:     │   │  seekTo(ratio × duration)       │
 │  (time text update) │   │  seekingTime     │   │  pendingSeekRatio = ratio       │
 └─────────────────────┘   │   = new r×d      │   │  pendingRatioSV = ratio         │
                           └──────────────────┘   │  seekingTime = null             │
                                                  └─────────────────────────────────┘
```

After `onFinalize`:

- The bar/dot stay at the seek position because `pendingRatioSV` takes over from `gestureRatioSV`.
- The time text shows `pendingSeekRatio × duration` until playback catches up.

## Pending seek clearing

The `syncPlayRatio` effect runs whenever `playRatio` changes (i.e. `currentTime` updates):

1. Syncs `playRatioSV.value = playRatio` (JS → UI thread).
2. If `|playRatio - pendingSeekRatio| < SEEK_SNAP_THRESHOLD` (0.02), the playback has caught up to the seek position. Clears both `pendingSeekRatio` (JS) and `pendingRatioSV` (UI), letting `playRatioSV` take over again.

## JS ↔ UI thread boundary

| Direction | Mechanism                | Used for                                   |
| --------- | ------------------------ | ------------------------------------------ |
| UI → JS   | `scheduleOnRN()`         | Time text updates during drag, seek commit |
| JS → UI   | `useEffect` + `.value =` | Syncing `playRatioSV` from props           |
| UI only   | `useAnimatedStyle`       | Bar width + dot position                   |

`scheduleOnRN` (from `react-native-worklets`) is the v4 replacement for the deprecated `runOnJS`.

## Key design decisions

- **Fixed-width time codes** prevent the flex bar from resizing when digit widths change, which would cause the dot to jitter.
- **Pixel-based positioning** (`ratio × barWidthSV`) instead of CSS percentages, so animated styles stay numeric and avoid string interpolation on the UI thread.
- **Dot centering offset in static style** (`left: -DOT_SIZE/2`) rather than in the animated `translateX`, preventing a one-frame glitch on mount where the transform isn't applied yet.
- **Refs for callbacks** (`seekToRef`, `durationRef`) avoid re-creating the gesture on every render when `seekTo` or `duration` change.
