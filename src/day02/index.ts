import { sum } from "../day01";

export function parse(input: string) {
  return input.split("\r\n").map((line) => {
    const groups = /Game (\d+): (.+)/i.exec(line)!;
    const rounds = groups[2]
      .split("; ")
      .map((line) => line.split(", "))
      .flatMap((group) => group.map((colour) => colour.split(" ")))
      .map(([count, colour]) => ({ count: parseInt(count, 10), colour }));
    return {
      id: parseInt(groups[1], 10),
      rounds,
    };
  });
}

export function filterToValid(
  rounds: ReturnType<typeof parse>,
  limits: Record<string, number>
) {
  return rounds.filter((round) =>
    round.rounds.every(({ count, colour }) => count <= limits[colour])
  );
}

export function sumRounds(rounds: ReturnType<typeof filterToValid>) {
  return sum(rounds.map(({ id }) => id));
}

export function calculateMinimumCubes(rounds: ReturnType<typeof parse>) {
  return rounds
    .map((round) =>
      ["red", "green", "blue"].map((colour) =>
        Math.max(
          ...round.rounds.filter((c) => c.colour === colour).map((c) => c.count)
        )
      )
    )
    .map(([a, b, c]) => a * b * c);
}
