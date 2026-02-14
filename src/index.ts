import { getEveryAyahAudioUrl } from "./providers/audio";
import { fetchAyahText } from "./providers/text";
import { parseAyahKey, randomAyahRef } from "./utils/ayah";
import { resolveReciterFromEnv } from "./config";

type StoryPayload = {
  arabic_text: string;
  surah_number: number;
  ayah_number: number;
  ayah_key: string;
  surah_name_en: string;
  audio_download_url: string;
  reciter: string;
};

function printJsonAndExit(payload: unknown, code = 0): never {
  process.stdout.write(`${JSON.stringify(payload)}\n`);
  process.exit(code);
}

function getAyahKeyFromArgs(args: string[]): string {
  const randomMode = args.includes("--random");
  const ayahIndex = args.indexOf("--ayah");

  if (randomMode && ayahIndex !== -1) {
    throw new Error("Use either --ayah <surah:ayah> OR --random, not both.");
  }

  if (randomMode) {
    return randomAyahRef().ayahKey;
  }

  if (ayahIndex === -1 || !args[ayahIndex + 1]) {
    throw new Error("Missing input. Use --ayah <surah:ayah> or --random.");
  }

  return parseAyahKey(args[ayahIndex + 1]).ayahKey;
}

async function run(): Promise<void> {
  const args = process.argv.slice(2);
  const reciter = resolveReciterFromEnv(process.env.RECITER);

  const ayahKey = getAyahKeyFromArgs(args);
  const ayahText = await fetchAyahText(ayahKey);

  const payload: StoryPayload = {
    arabic_text: ayahText.arabicText,
    surah_number: ayahText.surahNumber,
    ayah_number: ayahText.ayahNumber,
    ayah_key: ayahText.ayahKey,
    surah_name_en: ayahText.surahNameEn,
    audio_download_url: getEveryAyahAudioUrl(ayahText.surahNumber, ayahText.ayahNumber, reciter),
    reciter: reciter.label
  };

  printJsonAndExit(payload);
}

run().catch((error) => {
  const message = error instanceof Error ? error.message : "Unexpected error";
  printJsonAndExit({ error: message }, 1);
});
