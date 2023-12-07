export function parseLine(line: string) {
  const [_, targets, numbers] = line
    .split(/:|\|/)
    .map((chunk) => chunk.trim().split(/\s+/));

  return targets.filter((t) => numbers.includes(t));
}

export function calculateScore(matches: number) {
  return matches === 0 ? 0 : Math.pow(2, matches - 1);
}

export function parse(input: string) {
  return input
    .split(/\n/)
    .map((line) => parseLine(line))
    .map((matches) => calculateScore(matches.length));
}
