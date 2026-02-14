import { API_TIMEOUT_MS, RETRY_ATTEMPTS } from "../config";

export type AyahTextPayload = {
  arabicText: string;
  surahNumber: number;
  ayahNumber: number;
  ayahKey: string;
  surahNameEn: string;
};

type AlQuranCloudAyahResponse = {
  code: number;
  status: string;
  data?: {
    text: string;
    numberInSurah: number;
    surah: {
      number: number;
      englishName: string;
    };
  };
};

async function fetchWithRetry(url: string): Promise<Response> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= RETRY_ATTEMPTS; attempt += 1) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

    try {
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      lastError = error;
      if (attempt === RETRY_ATTEMPTS) {
        break;
      }
    }
  }

  throw new Error(`Unable to fetch ayah text after ${RETRY_ATTEMPTS + 1} attempts: ${String(lastError)}`);
}

export async function fetchAyahText(ayahKey: string): Promise<AyahTextPayload> {
  const url = `https://api.alquran.cloud/v1/ayah/${encodeURIComponent(ayahKey)}/quran-uthmani`;
  const response = await fetchWithRetry(url);
  const json = (await response.json()) as AlQuranCloudAyahResponse;

  if (json.code !== 200 || !json.data) {
    throw new Error(`Unexpected API response while fetching ayah text: ${json.status || "unknown status"}`);
  }

  return {
    arabicText: json.data.text,
    surahNumber: json.data.surah.number,
    ayahNumber: json.data.numberInSurah,
    ayahKey: `${json.data.surah.number}:${json.data.numberInSurah}`,
    surahNameEn: json.data.surah.englishName
  };
}
