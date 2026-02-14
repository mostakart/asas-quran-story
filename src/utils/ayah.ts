export type AyahRef = {
  surahNumber: number;
  ayahNumber: number;
  ayahKey: string;
};

const AYAH_COUNTS_BY_SURAH: number[] = [
  7, 286, 200, 176, 120, 165, 206, 75, 129, 109, 123, 111, 43, 52, 99, 128, 111,
  110, 98, 135, 112, 78, 118, 64, 77, 227, 93, 88, 69, 60, 34, 30, 73, 54, 45,
  83, 182, 88, 75, 85, 54, 53, 89, 59, 37, 35, 38, 29, 18, 45, 60, 49, 62, 55,
  78, 96, 29, 22, 24, 13, 14, 11, 11, 18, 12, 12, 30, 52, 52, 44, 28, 28, 20,
  56, 40, 31, 50, 40, 46, 42, 29, 19, 36, 25, 22, 17, 19, 26, 30, 20, 15, 21,
  11, 8, 8, 19, 5, 8, 8, 11, 11, 8, 3, 9, 5, 4, 7, 3, 6, 3, 5, 4, 5, 6
];

export function parseAyahKey(input: string): AyahRef {
  const normalized = input.trim();
  const match = normalized.match(/^(\d{1,3}):(\d{1,3})$/);

  if (!match) {
    throw new Error('Invalid ayah format. Use "surah:ayah" (example: 2:255).');
  }

  const surahNumber = Number(match[1]);
  const ayahNumber = Number(match[2]);

  if (surahNumber < 1 || surahNumber > 114) {
    throw new Error("Surah number must be between 1 and 114.");
  }

  const maxAyah = AYAH_COUNTS_BY_SURAH[surahNumber - 1];
  if (ayahNumber < 1 || ayahNumber > maxAyah) {
    throw new Error(`Ayah number must be between 1 and ${maxAyah} for surah ${surahNumber}.`);
  }

  return {
    surahNumber,
    ayahNumber,
    ayahKey: `${surahNumber}:${ayahNumber}`
  };
}

export function randomAyahRef(random: () => number = Math.random): AyahRef {
  const surahNumber = Math.floor(random() * 114) + 1;
  const maxAyah = AYAH_COUNTS_BY_SURAH[surahNumber - 1];
  const ayahNumber = Math.floor(random() * maxAyah) + 1;

  return {
    surahNumber,
    ayahNumber,
    ayahKey: `${surahNumber}:${ayahNumber}`
  };
}
