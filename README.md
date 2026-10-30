# Swatch Studio

A browser-local 3D explorer with fifty colours and seven palettes for a local educational study.

## Run

```sh
npm install
npm run dev
```

`npm run build` creates the static website in `dist/`. React + Vite handle the interface; Three.js renders the original STL assets directly. No backend, API keys, or account are needed locally.

## Interaction

Drag horizontally to rotate. Click a 3D swatch or a colour chip to bring it to six o'clock. The selected swatch lifts and turns toward the viewer. Previous/next and focused wheel arrow keys support keyboard exploration. Filter the colour strip by palette, and copy HEX or RGB from the detail panel. The wheel retains all 50 unique shades for context.

## Themes and arrival

Use the sun/moon button in the header. The separate Wheel control switches the stand between black and white in either theme. Both preferences are stored in localStorage. The compact layout shows the wheel immediately and starts each load at the top.

## Performance and fallback

Shared swatch geometry, cached environment lighting, capped device pixel ratio, and animation frames only during drag, resize, or settling. Reduced motion is respected. Geometry loading and WebGL failures show a retry state while leaving the colour library usable. Font files are bundled locally.

## Verification

Production build; browser checks for drag, swatch selection, palette filtering, previous/next, keyboard, and clipboard; visual review at desktop, 390px mobile and the app panel width. Mobile layout has no horizontal overflow.

## Publishing preference
Local-only development. Ask the user before any hosting, deployment, or source upload. A previously created private Sites copy exists; local changes must not automatically update it.

## Playback and framing
Play/pause sits beside reset. Play waits two seconds, then advances one colour every two seconds within the current palette. Manual colour changes or dragging pause playback. Camera zoom fits projected rim points and the full raised swatch to the canvas; stage height is viewport-aware. The restored collection includes pastels, tropical brights, and deep reds.

## Centre mark and tighter framing
The centre uses a 2048px canvas texture of a bold, two-line Swatch Studio wordmark, with locally loaded Inter Tight, maximum supported anisotropy and contrasting ink for either stand colour. Camera fitting centres the projected silhouette and fits its extents, including the raised swatch, rather than centring an oversized empty scene.
# swatch-studio
