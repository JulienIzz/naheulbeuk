const mockPlayer = {
  replace: jest.fn(),
  play: jest.fn(),
  pause: jest.fn(),
  seekTo: jest.fn(),
  addListener: jest.fn(() => ({ remove: jest.fn() })),
  setActiveForLockScreen: jest.fn(),
  updateLockScreenMetadata: jest.fn(),
  clearLockScreenControls: jest.fn(),
};

export const useAudioPlayer = jest.fn(() => mockPlayer);

export const useAudioPlayerStatus = jest.fn(() => ({
  playing: false,
  didJustFinish: false,
  currentTime: 0,
  duration: 0,
}));

export const setAudioModeAsync = jest.fn();
