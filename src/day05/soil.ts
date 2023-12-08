export function parseSeedsLine(input: string) {
  return input
    .replace("seeds: ", "")
    .split(/\s/)
    .map((x) => parseInt(x, 10));
}

interface Map {
  destination: number;
  source: number;
  length: number;
}
export function parseMaps(input: string) {
  return input
    .split(/\n/)
    .map((line) => {
      if (line.includes("-to-")) return undefined;
      const [destination, source, length] = line.split(/\s/);
      return {
        destination: parseInt(destination, 10),
        source: parseInt(source, 10),
        length: parseInt(length, 10),
      };
    })
    .filter((x) => x != undefined) as Map[];
}

export function processMap(seed: number, map: Map[]) {
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

export function parse(input: string) {
  const [seedsLine, ...mapsStrings] = input.split(/\n\n/);
  return {
    seeds: parseSeedsLine(seedsLine),
    maps: mapsStrings.map((m) => parseMaps(m)),
  };
}

export function processAllSeeds(input: string) {
  const { seeds, maps } = parse(input);
  return seeds.map((s) => processAllMaps(s, maps));
}
