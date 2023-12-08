export function parseSeedsLine(input: string) {
  return input
    .replace("seeds: ", "")
    .split(/\s/)
    .map((x) => parseInt(x, 10));
}

export function parseMaps(input: string) {
  return input.split(/\n/).map((line) => {
    const [destination, source, length] = line.split(/\s/);
    return {
      destination: parseInt(destination, 10),
      source: parseInt(source, 10),
      length: parseInt(length, 10),
    };
  });
}

export function processMap(seed: number, map: ReturnType<typeof parseMaps>) {
  // find the correct map?
  const m = map.find(
    ({ source, length }) => seed >= source && seed < source + length
  );
  // apply map somehow
  if (m) return m.destination + (seed - m.source);
  // if none, return seed
  return seed;
}

export function processAllMaps(
  seed: number,
  maps: ReturnType<typeof parseMaps>[]
) {
  return maps.reduce(processMap, seed);
}
