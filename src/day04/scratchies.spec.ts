import { describe, expect, it } from "vitest";
import {
  calculateScore,
  howManyTickets,
  parse,
  parseAllLines,
  parseLine,
} from "./scrathies";
import { data, sample } from "./data";
import { sum } from "../day01";

describe("parseLine", () => {
  it("finds matches", () =>
    expect(parseLine(sample.split(/\n/)[0])).toEqual(["48", "83", "86", "17"]));
});

describe("calculateScore", () => {
  it("returns for 1", () => {
    expect(calculateScore(1)).toBe(1);
  });

  it("returns for 2", () => {
    expect(calculateScore(2)).toBe(2);
  });

  it("returns for 3", () => {
    expect(calculateScore(3)).toBe(4);
  });

  it("returns for 4", () => {
    expect(calculateScore(4)).toBe(8);
  });

  it("returns for 5", () => {
    expect(calculateScore(5)).toBe(16);
  });
});

describe("parse", () => {
  it("returns scores", () => expect(parse(sample)).toEqual([8, 2, 2, 1, 0, 0]));

  it("sums to 13 for sample", () => expect(sum(parse(sample))).toBe(13));

  it("solves data", () => expect(sum(parse(data))).toBe(20117));
});

describe("parseAllLines", () => {
  it("returns matches", () => {
    expect(parseAllLines(sample)).toEqual([4, 2, 2, 1, 0, 0]);
  });
});

describe("howManyTickets", () => {
  it("solves sample", () => {
    expect(howManyTickets([4, 2, 2, 1, 0, 0])).toEqual(30);
  });

  it("solves data", () => {
    expect(howManyTickets(parseAllLines(data))).toEqual(13768818);
  });
});
