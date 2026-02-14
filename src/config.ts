export type ReciterKey = "abdulbasit_murattal" | "al_husary" | "al_minshawi";

export type ReciterConfig = {
  key: ReciterKey;
  label: string;
  everyAyahFolder: string;
};

export const RECITER_MAP: Record<ReciterKey, ReciterConfig> = {
  abdulbasit_murattal: {
    key: "abdulbasit_murattal",
    label: "Abdul Basit (Murattal)",
    everyAyahFolder: "Abdul_Basit_Murattal_192kbps"
  },
  al_husary: {
    key: "al_husary",
    label: "Al-Husary",
    everyAyahFolder: "Husary_128kbps"
  },
  al_minshawi: {
    key: "al_minshawi",
    label: "Al-Minshawi",
    everyAyahFolder: "Minshawy_Murattal_128kbps"
  }
};

const DEFAULT_RECITER: ReciterKey = "abdulbasit_murattal";

export function resolveReciterFromEnv(envValue: string | undefined): ReciterConfig {
  if (!envValue) {
    return RECITER_MAP[DEFAULT_RECITER];
  }

  const normalized = envValue.trim().toLowerCase() as ReciterKey;
  return RECITER_MAP[normalized] ?? RECITER_MAP[DEFAULT_RECITER];
}

export const API_TIMEOUT_MS = 10_000;
export const RETRY_ATTEMPTS = 2;
