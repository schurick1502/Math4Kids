// Score = 70 % accuracy + 30 % speed (speed can exceed 100 when faster than the target).
export function calculatePerformance(correct, total, seconds, targetPerQuestion) {
  const accuracy = total ? (correct / total) * 100 : 0;
  const targetTotal = total * targetPerQuestion;

  let speed;
  if (seconds > targetTotal) {
    speed = Math.max(0, 100 - ((seconds - targetTotal) / targetTotal) * 50);
  } else {
    speed = Math.min(150, 100 + ((targetTotal - seconds) / targetTotal) * 50);
  }

  const points = accuracy * 0.7 + speed * 0.3;
  let rank = 5;
  if (points >= 95) rank = 1;
  else if (points >= 85) rank = 2;
  else if (points >= 75) rank = 3;
  else if (points >= 65) rank = 4;

  return {
    accuracy: Math.round(accuracy),
    speed: Math.round(speed),
    points: Math.round(points),
    rank,
    stars: starsForRank(rank),
    avgSeconds: total ? seconds / total : 0,
    targetTotal,
  };
}

export const starsForRank = (rank) => (rank <= 2 ? 3 : rank === 3 ? 2 : rank === 4 ? 1 : 0);

export const formatTime = (seconds) => {
  const s = Math.max(0, Math.floor(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
};
