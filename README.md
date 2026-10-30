# Swatch Studio

A browser-local 3D exploration of Pantone's 2026 Colour of the Year, Cloud Dancer, and its seven accompanying palettes.

## Run

```sh
npm install
npm run dev
```

`npm run build` creates the static website in `dist/`. React + Vite handle the interface; Three.js renders the original STL assets directly. No backend, API keys, or account are needed locally.

## Interaction

Drag horizontally to rotate. Click a 3D swatch or a colour chip to bring it to six o'clock. The selected swatch lifts and turns toward the viewer. Previous/next and focused wheel arrow keys support keyboard exploration. Filter the colour strip by palette, and copy HEX or RGB from the detail panel. The wheel retains all 50 unique shades for context.

## Colour provenance

- Official collection and seven palette names: https://www.pantone.com/na/en-us/color-of-the-year/2026 and https://www.pantone.com/uk/en-gb/articles/color-of-the-year/color-of-the-year-2026-color-palettes
- Colour names, codes and approximate screen HEX values transcribed from the palette cards at https://renneritalia.com/fr/cloud-dancer-il-colore-pantone-dellanno-2026/ on 30 October 2026. Source has 56 entries, 50 distinct colours because Cloud Dancer repeats. Data is stored locally in `src/colors.json`; no live fetching or scraping happens for visitors.
- The HEX values are the reference page's approximations, not authenticated Pantone Connect colour measurements. Metallic TPM entries are represented by flat approximations. Lighting alters the 3D material appearance; the detail panel shows the unlit sRGB value.
- Original user-supplied stand Top and Bottom and Bambu Lab Style Filament Swatch STL files are preserved in `public/models/`. Source filenames were shortened only. Rights to the models remain with their original authors. This independent explorer is not affiliated with Pantone or Bambu Lab.

## Performance and fallback

Shared swatch geometry, cached environment lighting, capped device pixel ratio, and animation frames only during drag, resize, or settling. Reduced motion is respected. Geometry loading and WebGL failures show a retry state while leaving the colour library usable. Font files are bundled locally.

## Verification

Production build; browser checks for drag, swatch selection, palette filtering, previous/next, keyboard, and clipboard; visual review at desktop, 390px mobile and the app panel width. Mobile layout has no horizontal overflow.
