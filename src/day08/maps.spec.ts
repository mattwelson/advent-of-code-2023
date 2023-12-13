import { describe, expect, it } from "vitest";
import { parse, process } from "./maps";
import { data, sample2, sample6 } from "./data";

describe("parse", () => {
  it("produces instructions and locations", () => {
    expect(parse(sample6)).toEqual(
      expect.objectContaining({
        instructions: ["L", "L", "R"],
        locations: {
          AAA: { key: "AAA", L: "BBB", R: "BBB" },
          BBB: { key: "BBB", L: "AAA", R: "ZZZ" },
          ZZZ: { key: "ZZZ", L: "ZZZ", R: "ZZZ" },
        },
      })
    );
  });

  it("parses the instructions from data", () =>
    expect(parse(data).instructions.join("")).toEqual(
      "LRRLLRRLLRRRLRLRRLRLRLRRLRLRLRLLLRRRLRLRRLLRLRRRLRRRLRLRLRRRLLRRLLRLRLRRRLRLLRRRLRLLRLRRRLRLRRRLRRRLLRRRLLRRRLRRLRRRLLRRRLRRLRRLRRLLRLRRLRRLRRRLRLRLRLRLRLRRRLLRLRRLRLRRLLRRLLRLRRLRRRLRLRLRLRRRLRRLRRLRRLRRLRRLRLRRRLRRRLRRRLRLRLLRRLRRRLRRLRLRRRLRRLRRRLRRLLRRLLLRRRR"
    ));
});

describe("process", () => {
  it("solves sample2 in 2 steps", () =>
    expect(process(parse(sample2))).toBe(2));
  it("solves sample6 in 6 steps", () =>
    expect(process(parse(sample6))).toBe(6));
  it("solves data in x steps", () => expect(process(parse(data))).toBe(18673));
});
