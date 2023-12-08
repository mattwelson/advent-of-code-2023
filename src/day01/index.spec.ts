import { describe, expect, it } from "vitest";

import sampleData from "./sample.txt?raw";
import sampleData2 from "./sample2.txt?raw";
import data from "./data.txt?raw";
import { parse, parseAlphaNumeric, sum } from ".";

describe("problem 1 - sample data", () => {
  it("imports and parses", () => {
    expect(parse(sampleData)).toHaveLength(4);
    expect(parse(sampleData)[0]).toBe(12);
    expect(parse(sampleData)[1]).toBe(38);
    expect(parse(sampleData)[2]).toBe(15);
    expect(parse(sampleData)[3]).toBe(77);
  });

  it("sum", () => {
    expect(sum(parse(sampleData))).toBe(142);
  });
});

describe("problem 1 - data", () => {
  it("sum", () => {
    expect(sum(parse(data))).toBe(54953);
  });
});

describe("problem 2 - sample data", () => {
  it("parse", () => {
    expect(parseAlphaNumeric(sampleData2)).toHaveLength(7);
    expect(parseAlphaNumeric(sampleData2)[0]).toBe(29);
    expect(parseAlphaNumeric(sampleData2)[1]).toBe(83);
    expect(parseAlphaNumeric(sampleData2)[2]).toBe(13);
    expect(parseAlphaNumeric(sampleData2)[3]).toBe(24);
    expect(parseAlphaNumeric(sampleData2)[4]).toBe(42);
    expect(parseAlphaNumeric(sampleData2)[5]).toBe(14);
    expect(parseAlphaNumeric(sampleData2)[6]).toBe(76);
  });

  it("sum", () => {
    expect(sum(parseAlphaNumeric(sampleData2))).toBe(281);
  });
});

describe("problem 2 - data", () => {
  it("sum", () => {
    expect(sum(parseAlphaNumeric(data))).toBe(53868);
  });
});
