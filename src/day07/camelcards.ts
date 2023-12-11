const rank = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
  "9": 9,
  "8": 8,
  "7": 7,
  "6": 6,
  "5": 5,
  "4": 4,
  "3": 3,
  "2": 2,
} as Record<string, number>;

export function rankHand(hand: string) {
  const matches = Object.entries(
    [...hand]
      .slice(0, 5)
      .reduce(
        (acc, cur) => ({ ...acc, [cur]: (acc[cur] ?? 0) + 1 }),
        {} as Record<string, number>
      )
  ).sort((a, b) => b[1] - a[1]);
  // check for cases:
  // 3.5 - full house
  // 2.5 - 2 pair
  if (matches[1] && matches[1][1] === 2) return matches[0][1] === 3 ? 3.5 : 2.5;
  // 5 - 5 of a kind
  // 4 - 4 of a kind
  // 3 - 3 of a kind
  // 2 - 2 of a kind
  // 1 - high card
  return matches[0][1];
}

// two sorting functions - first sort by head to head card matching, then by hand value
export function sortHands(input: string) {
  return input
    .split(/\n/)
    .sort((a, b) => {
      return [...a]
        .slice(0, 5)
        .reduce(
          (acc, curr, i) => (acc !== 0 ? acc : rank[curr] - rank[b[i]]),
          0
        );
    })
    .map((hand) => ({
      hand,
      bid: parseInt(hand.split(/\s/)[1], 10),
      rank: rankHand(hand),
    }))
    .sort((a, b) => a.rank - b.rank)
    .map((hand, i) => hand.bid * (i + 1))
    .reduce((acc, cur) => acc + cur);
}
