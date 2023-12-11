import { describe, expect, it } from "vitest";
import { parse, race, raceAll, raceAll2 } from "./race";
import { data, sample } from "./data";

describe("parse", () => {
  it("stitches the two rows together", () => {
    expect(parse(sample)).toEqual([
      { time: 7, distance: 9 },
      { time: 15, distance: 40 },
      { time: 30, distance: 200 },
    ]);
  });
});

describe("race", () => {
  it("returns an array of results", () => {
    expect(race({ time: 7, distance: 9 })).toBe(4);
  });
});

describe("raceAll", () => {
  it("sample", () => expect(raceAll(sample)).toBe(288));
  it("data", () => expect(raceAll(data)).toBe(1159152));
});

// Really slow for the actual data one
describe.skip("raceAll2", () => {
  it("sample", () => expect(raceAll2(sample)).toBe(71503));
  it("sample", () => expect(raceAll2(data)).toBe(41513103));
});
