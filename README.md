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

## Search, answer engines, and creator attribution

- Descriptive title, description, author, Open Graph and Twitter summary metadata are in `index.html`.
- `scripts/search-data.js` supplies JSON-LD Person, WebSite, WebPage and WebApplication entities with linked creator identity. The GitHub profile is an author/profile URL, never misrepresented as the source repository. No ratings, awards, endorsements or pricing are fabricated.
- A visible static HTML guide explains the app, controls, autoplay, mobile support and colour limitations. It is readable before JavaScript runs and with JavaScript disabled; structured descriptions match visible content.
- `public/llms.txt` is a supplementary descriptive guide for AI systems, not a recognized ranking guarantee or an authorization mechanism. `public/robots.txt` permits crawling; authentication and hosting policies still govern actual access. These files do not publish anything.
- GitHub attribution appears in the footer, About panel, static guide, metadata and structured creator profile.

### Approved production origin

After the user approves a public domain and publication, set `VITE_SITE_URL` to its HTTPS origin (no path/query). Vite then adds the absolute canonical and Open Graph URL, uses absolute entity IDs, and emits `sitemap.xml` plus its robots declaration. Without that variable, no canonical, sitemap or invented public URL is emitted. Do not set localhost, the previous unapproved hosted URL, or a GitHub profile as the site's canonical. Hosting and public indexing still require user approval. After authorized publication, verify with Search Console and appropriate validators. These preparations do not guarantee indexing, rankings or inclusion in AI answers.
