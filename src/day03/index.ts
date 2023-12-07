export function parse(input: string) {
  return input
    .split(/\s/)
    .flatMap((line, y, arr) =>
      [...line].map((c, x) => {
        const n = parseInt(c, 10);
        if (isNaN(n)) return null;
        // check the char to our left, if it's a digit, then we can ignore this node
        if (x - 1 >= 0 && !isNaN(parseInt(line[x - 1], 10))) return null;
        // then get all the next digits, if there's any
        const num = /\d+/.exec(line.slice(x))![0];
        // check adjacent lines for symbols, including the extra width
        const columns = [...new Array(num.length + 2)]
          .map((_, i) => x + i - 1)
          .filter((v) => v >= 0 && v < line.length);
        const rows = [-1, 0, 1]
          .map((modifier) => modifier + y)
          .filter((v) => v >= 0 && v < arr.length);
        if (
          // see if any symbols are present in adjacent squares (can check self, as we're a number, so it's fine!)
          rows.some((row) =>
            columns.some((col) =>
              [..."!@#$%^&/+*=-_{}[]|?\\"].includes(arr[row][col])
            )
          )
        )
          return parseInt(num, 10);
        return null;
      })
    )
    .filter((n) => !!n) as number[];
}

export function isDigit(char: string) {
  return char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57;
}

export function toArray(input: string) {
  return input.split(/\s/);
}

export function findGears(input: string) {
  return (
    input
      .split(/\s/)
      .flatMap((line, y) => {
        // find and return the coordinates for each '*'
        return [...line].map((c, x) => (c === "*" ? [x, y] : null));
      })
      .filter((c) => !!c) as number[][]
  )
    .map((coordinates) => findAdjacentNumbers(toArray(input), coordinates))
    .filter((result) => result.length === 2)
    .map(([a, b]) => a! * b!);
}

export function findNumber(line: string, index: number) {
  // if it's not a digit then exit
  if (!isDigit(line[index])) return undefined;
  // find start
  let i = index;
  while (i > 0 && isDigit(line[--i])) {}
  const num = /\d+/.exec(line.slice(i))![0];
  return parseInt(num, 10);
}

export function findAdjacentNumbers(
  input: ReturnType<typeof toArray>,
  [x, y]: number[]
) {
  // check each adjacent square for a digit, if there is one... then... something
  // but be mindful the top right might be a digit, and then top left might be a different digit?
  // check directly up and down first? then if that's a . then check left and right of that?

  // create a list of columns to check for valid numbers (with index 1 being directly up, down, or the * itself)
  const cols = [x - 1, x, x + 1].map((x) =>
    x >= 0 && x < input[0].length ? x : undefined
  );
  const rows = [y - 1, y, y + 1].map((y) =>
    y >= 0 && y < input.length ? y : undefined
  );
  const surrounds = rows.map((y) =>
    y === undefined
      ? undefined
      : cols.map((x) => (x === undefined ? undefined : findNumber(input[y], x)))
  );
  // figure out if the central nodes are numbers, if so, then ignore the number either side, else build an array of each number
  return surrounds
    .flatMap((row) => (row === undefined ? [] : row[1] ?? [row[0], row[2]]))
    .filter((x) => !!x);
}
