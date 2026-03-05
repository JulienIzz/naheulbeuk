export const formatSecondsAsMinutesAndSeconds = (seconds: number): string => {
  const totalSeconds = Math.floor(seconds);
  const minutes = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${minutes}:${String(secs).padStart(2, "0")}`;
};
