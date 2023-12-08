import { describe, expect, it } from "vitest";
import { sampleData } from "./sample";
import { data } from "./data";
import { findAdjacentNumbers, findGears, parse, toArray } from ".";
import { sum } from "../day01";

describe("parse", () => {
  it("creates a list of numbers", () => {
    expect(parse(sampleData)).toEqual([467, 35, 633, 617, 592, 755, 664, 598]);
  });

  it("sums numbers", () => {
    expect(sum(parse(sampleData))).toEqual(4361);
  });

  it("sums numbers - problem 1", () => {
    expect(sum(parse(data))).toEqual(549908);
  });
});

describe("findGears", () => {
  it('returns x, y coordinates for each "*" char', () => {
    expect(findGears(sampleData)).toEqual([16345, 451490]);
  });

  it("solves sample", () => {
    expect(sum(findGears(sampleData))).toEqual(467835);
  });

  it("solves data", () => {
    expect(sum(findGears(data))).toEqual(81166799);
  });
});

describe("findAdjacentNumbers", () => {
  it("finds orthogonal numbers", () => {
    expect(findAdjacentNumbers(toArray(sampleData), [3, 1])).toEqual([467, 35]);
  });
});
