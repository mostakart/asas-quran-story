import test from "node:test";
import assert from "node:assert/strict";
import { parseAyahKey } from "../src/utils/ayah";

test("parseAyahKey parses valid key", () => {
  const parsed = parseAyahKey("2:255");
  assert.equal(parsed.surahNumber, 2);
  assert.equal(parsed.ayahNumber, 255);
  assert.equal(parsed.ayahKey, "2:255");
});

test("parseAyahKey rejects bad format", () => {
  assert.throws(() => parseAyahKey("2-255"), /Invalid ayah format/);
});

test("parseAyahKey rejects ayah out of surah range", () => {
  assert.throws(() => parseAyahKey("1:8"), /between 1 and 7/);
});
