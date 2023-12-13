export function parse(input: string) {
  const [instructionsStr, locationsStr] = input.split(/\n\n/);
  const instructions = [...instructionsStr] as ("L" | "R")[];
  const locationsList = locationsStr.split(/\n/).map((line) => {
    const [_, key, L, R] = /(\w+) = \((\w+), (\w+)\)/.exec(line)!;
    return { key, L, R };
  });
  const locations = locationsList.reduce(
    (acc, cur) => ({ ...acc, [cur.key]: cur }),
    {} as Record<
      string,
      {
        key: string;
        L: string;
        R: string;
      }
    >
  );
  return {
    instructions,
    locations,
  };
}

export function process({ instructions, locations }: ReturnType<typeof parse>) {
  let i = 0;
  let location = locations["AAA"];
  while (location.key !== "ZZZ" && i < 100000) {
    const nextLocation = location[
      instructions[i++ % instructions.length]
    ] as string;
    location = locations[nextLocation];
  }
  return i;
}
