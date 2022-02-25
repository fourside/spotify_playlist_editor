export function msToTime(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  if (seconds > 60) {
    const minutes = Math.floor(seconds / 60);
    const s = seconds % 60;
    const formatSeconds = s < 10 ? `0${s}` : s;
    return `${minutes}:${formatSeconds}`;
  }
  const formatSeconds = seconds < 10 ? `0${seconds}` : seconds;
  return `00:${formatSeconds}`;
}
