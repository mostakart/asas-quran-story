# Quran Story CLI

Tiny Node.js + TypeScript CLI that outputs JSON for Instagram story automation:
- Quran ayah text (Arabic)
- Surah/ayah metadata
- Egyptian reciter verse-by-verse MP3 URL from EveryAyah

## Install

```bash
npm install
```

## Build

```bash
npm run build
```

## Usage

### Fetch specific ayah

```bash
npm run build && node dist/index.js --ayah 2:255
```

### Fetch random ayah

```bash
npm run build && node dist/index.js --random
```

## Reciter selection

Use env var `RECITER`:
- `abdulbasit_murattal` (default)
- `al_husary`
- `al_minshawi`

Example:

```bash
RECITER=al_husary node dist/index.js --ayah 36:58
```

## Output format

The CLI prints JSON **only** to stdout.

```json
{
  "arabic_text": "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...",
  "surah_number": 2,
  "ayah_number": 255,
  "ayah_key": "2:255",
  "surah_name_en": "Al-Baqara",
  "audio_download_url": "https://everyayah.com/data/Abdul_Basit_Murattal_192kbps/002255.mp3",
  "reciter": "Abdul Basit (Murattal)"
}
```

Error example:

```json
{"error":"Invalid ayah format. Use \"surah:ayah\" (example: 2:255)."}
```

## n8n integration (Execute Command)

In an **Execute Command** node, run:

```bash
cd /path/to/asas-quran-story && node dist/index.js --random
```

For a fixed ayah:

```bash
cd /path/to/asas-quran-story && RECITER=al_minshawi node dist/index.js --ayah 18:10
```

n8n will receive the JSON string from stdout, which you can parse in the next node.

## Tests

```bash
npm test
```
