import { sum } from "../day01";

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

// Problem two, get a list of how many matching numbers are on each ticket
export function parseAllLines(input: string) {
  return input
    .split(/\n/)
    .map((line) => parseLine(line))
    .map((matches) => matches.length);
}

export function incrementNextElements(
  arr: number[],
  index: number,
  count: number,
  numberOfTickets: number
) {
  // starting from index + 1, increment the next `count` elements by 1
  const nextElements = [...new Array(count)].map(
    (_, i) => (arr[index + i + 1] ?? 0) + numberOfTickets
  );
  return [
    ...arr.slice(0, index + 1),
    ...nextElements,
    ...arr.slice(index + count + 1),
  ];
}

// tickets count should grow as each ticket is processed, could also do a DFS or BFS approach
export function howManyTickets(matches: number[]) {
  // one of each starting card
  let tickets = matches.map(() => 1);
  let index = 0;
  while (index < tickets.length) {
    tickets = incrementNextElements(
      tickets,
      index,
      matches[index],
      tickets[index]
    );
    index++;
  }
  console.log({ tickets, matches });
  return sum(tickets);
}
