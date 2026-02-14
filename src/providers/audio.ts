import { ReciterConfig } from "../config";

function pad3(value: number): string {
  return value.toString().padStart(3, "0");
}

export function getEveryAyahAudioUrl(
  surahNumber: number,
  ayahNumber: number,
  reciter: ReciterConfig
): string {
  return `https://everyayah.com/data/${reciter.everyAyahFolder}/${pad3(surahNumber)}${pad3(ayahNumber)}.mp3`;
}
