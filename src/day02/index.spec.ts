import { describe, expect, it } from "vitest";

import sampleData from "./sample.txt?raw";
import data from "./data.txt?raw";

import { calculateMinimumCubes, filterToValid, parse, sumRounds } from ".";
import { sum } from "../day01";

const valid = {
  red: 12,
  green: 13,
  blue: 14,
};

describe("problem 1 - sample data", () => {
  it("imports and parses", () => {
    expect(parse(sampleData)[0]).toMatchObject({
      id: 1,
      rounds: expect.arrayContaining([
        {
          colour: "blue",
          count: 3,
        },
        {
          colour: "blue",
          count: 6,
        },
      ]),
    });
  });

  it("filters to remove invalid", () => {
    expect(filterToValid(parse(sampleData), valid).map(({ id }) => id)).toEqual(
      [1, 2, 5]
    );

    expect(sumRounds(filterToValid(parse(sampleData), valid))).toBe(8);
  });
});

describe("problem 1 - real data", () => {
  it("filters to remove invalid", () => {
    expect(sumRounds(filterToValid(parse(data), valid))).toBe(2720);
  });
});

describe("problem 2 - sample data", () => {
  it("finds minimum solution in cubes for each colour", () => {
    expect(calculateMinimumCubes(parse(sampleData))).toEqual([
      48, 12, 1560, 630, 36,
    ]);
  });
});

describe("problem 2 - data", () => {
  it("finds minimum solution in cubes for each colour", () => {
    expect(sum(calculateMinimumCubes(parse(data)))).toEqual(71535);
  });
});
