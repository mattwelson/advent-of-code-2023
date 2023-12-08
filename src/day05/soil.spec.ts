import { describe, expect, it } from "vitest";
import { parseMaps, parseSeedsLine, processMap } from "./soil";

describe("parseSeedsLine", () => {
  it("sample", () => {
    expect(parseSeedsLine("seeds: 79 14 55 13")).toEqual([79, 14, 55, 13]);
  });
});

describe("parseMaps", () => {
  it("sample", () => {
    expect(
      parseMaps(`50 98 2
52 50 48`)
    ).toEqual([
      { destination: 50, source: 98, length: 2 },
      {
        destination: 52,
        source: 50,
        length: 48,
      },
    ]);
  });
});

describe("processMap", () => {
  it("returns seed for no match", () => {
    expect(processMap(1, [{ destination: 2, source: 4, length: 1 }])).toBe(1);
  });

  it("returns seed for no match", () => {
    expect(processMap(4, [{ destination: 2, source: 4, length: 1 }])).toBe(2);
  });
});
