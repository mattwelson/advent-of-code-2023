export function parse(input: string) {
  const [times, distances] = input.split(/\n/).map((line) =>
    line
      .replace(/(Time:\s+)|(Distance:\s+)/i, "")
      .split(/\s+/)
      .map((n) => parseInt(n, 10))
  );
  return times.map((time, i) => ({
    time,
    distance: distances[i],
  }));
}

export function race({ time, distance }: ReturnType<typeof parse>[0]) {
  return [...new Array(time)]
    .map((_, i) => (time - i) * i)
    .filter((d) => d > distance).length;
}

export function raceAll(input: string) {
  return parse(input)
    .map((r) => race(r))
    .reduce((acc, cur) => acc * cur, 1);
}

export function parse2(input: string) {
  const [time, distance] = input
    .split(/\n/)
    .map((line) =>
      parseInt(
        line.replace(/(Time:\s+)|(Distance:\s+)/i, "").replace(/\s+/g, ""),
        10
      )
    );
  return { time, distance };
}

// Very slow, could be redone using math? Or at least with some concept of
// finding the first value, then using that to get the middle range
export function raceAll2(input: string) {
  return race(parse2(input));
}
