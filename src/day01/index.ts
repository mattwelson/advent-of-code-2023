export function parse(input: string) {
  return input
    .split(/\n/)
    .map((l) => [...l].filter((c) => /\d/.test(c)))
    .map((l) => `${l[0]}${l[l.length - 1]}`)
    .map((n) => parseInt(n, 10));
}

export function sum(input: number[]) {
  return input.reduce((acc, curr) => acc + curr, 0);
}

const allNumbers = [
  { text: "one", value: 1 },
  { text: "two", value: 2 },
  { text: "three", value: 3 },
  { text: "four", value: 4 },
  { text: "five", value: 5 },
  { text: "six", value: 6 },
  { text: "seven", value: 7 },
  { text: "eight", value: 8 },
  { text: "nine", value: 9 },
];

// Problem 2 is quite different, so instead I've inverted the way we're parsing the text
export function parseAlphaNumeric(input: string) {
  return input
    .split("\r")
    .map((l) =>
      [...l]
        .reduce((acc, curr, i) => {
          let n = parseInt(curr, 10);
          if (!Number.isNaN(n)) return [...acc, n];
          let subString = l.slice(i, i + 6);
          let alpha = allNumbers.find(({ text }) => subString.startsWith(text));
          if (alpha) return [...acc, alpha.value];
          return acc;
        }, [] as number[])
        .join("")
    )
    .map((l) => `${l[0]}${l[l.length - 1]}`)
    .map((n) => parseInt(n, 10));
}
