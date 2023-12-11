import { describe, expect, it } from "vitest";
import {
  parse,
  parseMaps,
  parseSeedsLine,
  processAllMaps,
  processAllSeeds,
  processMap,
} from "./soil";
import { data, sample } from "./data";

describe("parseSeedsLine", () => {
  it("sample", () => {
    expect(parseSeedsLine("seeds: 79 14 55 13")).toEqual([79, 14, 55, 13]);
  });
});

describe("parseMaps", () => {
  it("sample", () => {
    expect(parseMaps(`50 98 2\n52 50 48`)).toEqual([
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

  it("returns seed destination for matching source", () => {
    expect(processMap(4, [{ destination: 2, source: 4, length: 1 }])).toBe(2);
  });

  it("returns seed destination + 1 for matching source", () => {
    expect(processMap(5, [{ destination: 2, source: 4, length: 2 }])).toBe(3);
  });

  it("returns seed if greater than range", () => {
    expect(processMap(6, [{ destination: 2, source: 4, length: 2 }])).toBe(6);
  });

  it("returns seed if greater than range", () => {
    expect(
      processAllMaps(5, [
        [{ destination: 6, source: 9, length: 2 }],
        [{ destination: 2, source: 4, length: 2 }],
      ])
    ).toBe(3);
  });
});

describe("parse", () => {
  it("handles sample", () => {
    expect(parse(sample)).toEqual({
      seeds: [79, 14, 55, 13],
      maps: expect.arrayContaining([
        [
          { destination: 50, source: 98, length: 2 },
          { destination: 52, source: 50, length: 48 },
        ],
        [
          { destination: 0, source: 15, length: 37 },
          { destination: 37, source: 52, length: 2 },
          { destination: 39, source: 0, length: 15 },
        ],
      ]),
    });
  });
});

describe("processAllSeeds", () => {
  it("sample results", () => {
    expect(processAllSeeds(sample)).toEqual([82, 43, 86, 35]);
  });

  it("sample min", () => {
    expect(Math.min(...processAllSeeds(sample))).toEqual(35);
  });

  it("data min", () => {
    expect(Math.min(...processAllSeeds(data))).toEqual(35);
  });
});

// NOTE: part 2 looks harder, and has huge arrays,
// I think it might work better doing it backwards
