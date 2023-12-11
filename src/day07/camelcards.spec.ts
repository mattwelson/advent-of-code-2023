import { describe, expect, it } from "vitest";
import { sortHands } from "./camelcards";
import { data, sample } from "./data";

describe("sort", () => {
  it("handles sample", () => expect(sortHands(sample)).toEqual(6440));
  it("handles data", () => expect(sortHands(data)).toEqual(253638586));
});
