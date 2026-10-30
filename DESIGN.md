---
name: Swatch Studio
description: A tactile colour instrument in a neutral off-white studio.
colors:
  studio: "#f6f5f1"
  ink: "#30332e"
  muted: "#62695d"
  index-secondary: "#697060"
  line: "#dedfd6"
  stage: "#eeeee8"
  control-blue: "#e8eef5"
  select-surface: "#e9edf0"
  select-label: "#536577"
  focus: "#53729b"
  selection: "#485441"
  panel: "#fcfcf8"
typography:
  display:
    fontFamily: "Inter Tight, sans-serif"
    fontSize: "clamp(31px, 3.2vw, 46px)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-1.5px"
  title:
    fontFamily: "Inter Tight, sans-serif"
    fontSize: "29px"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.6px"
  body:
    fontFamily: "Inter Tight, sans-serif"
    fontSize: "15px"
    fontWeight: 400
  label:
    fontFamily: "Inter Tight, sans-serif"
    fontSize: "10px"
    fontWeight: 400
    letterSpacing: "1.5px"
rounded:
  chip: "3px"
  swatch: "5px"
  select: "7px"
  panel: "10px"
  stage: "12px"
  round: "50%"
spacing:
  chip-gap: "5px"
  stage-inset: "23px"
  explorer-gap: "38px"
components:
  stage:
    backgroundColor: "{colors.stage}"
    rounded: "{rounded.stage}"
  arrow-button:
    textColor: "{colors.ink}"
    rounded: "{rounded.round}"
    width: "32px"
    height: "32px"
  arrow-button-hover:
    backgroundColor: "{colors.control-blue}"
  palette-select:
    backgroundColor: "{colors.select-surface}"
    rounded: "{rounded.select}"
    padding: "10px 13px"
  about-panel:
    backgroundColor: "{colors.panel}"
    rounded: "{rounded.panel}"
    padding: "28px"
---

# Design System: Swatch Studio

## Overview

A tactile colour instrument: the user-pinned neutral off-white studio, charcoal typography and restrained pale blue controls frame a physical swatch wheel. Colour belongs principally to the specimens. Fine rules, compact instrument labels and generous space around the object make the interface quiet and precise.

**Key Characteristics:**
- Supplied STL geometry provides the signature physical form.
- Inter Tight connects regular-weight headings with compact labels.
- Flat studio surfaces support the physical shadows of the 3D scene.

## Colors

The palette is warm and neutral; pale blue identifies controls without competing with the collection. Normative values appear in the frontmatter.

### Primary
- **Pale control blue:** navigation hover fill; the native palette selector has a slightly greyer companion surface.
- **Focus blue:** keyboard outlines and text-action hover.

### Neutral
- **Studio off-white:** page canvas.
- **Charcoal ink:** primary typography.
- **Muted olive grey:** secondary copy and instrument metadata. Final contrast values are `#62695d` for muted labels, `#697060` for the secondary index and `#536577` for the selector label.
- **Fine warm rule:** structural separators and control outlines.
- **Stage grey:** the contained 3D environment.

Specimen colours come from `src/colors.json`; preserve their values rather than turning them into interface accents.

## Typography

Inter Tight is locally bundled at weights 400, 500 and 600, with sans-serif fallback. Display type follows the frontmatter scale. Colour titles use 29px/400 and library headings 20px/400. Value text is 13px/500 with tabular numerals. Metadata is predominantly 10–11px; uppercase tracking separates instrument labels from prose. The 26px brand mixes 600 and 400 weights.

## Layout

The centered page has a 1680px maximum width and 4.2% horizontal padding. A 102px header precedes the introduction. The explorer pairs a flexible wheel stage with a 316px details column across a 38px gap; the stage is at least 480px high. The palette library follows below, with a single row of narrow swatches on desktop.

At 1450px and above, the detail column becomes 350px, gap 48px and stage 550px. At 1000px and below, the column becomes 270px with a 22px gap. At 720px and below, padding becomes 6%, the explorer stacks and the stage is 370px high. Details place a 120px specimen beside metadata, with navigation spanning both columns. Chips wrap to 13 columns. The 78px mobile header hides edition metadata; the collection badge moves beneath the introduction.

## Elevation & Depth

Depth comes mainly from the rendered wheel, lighting and cast shadow. UI surfaces use tonal separation and fine borders. Specimens have an inset edge (`inset 0 0 0 1px #00000006`); chips use `#00000009`. The transient About panel alone uses a floating shadow: `0 15px 55px #30352b25`.

## Shapes

Corners are softly restrained: 3px chips, 5px specimens, 7px selector, 10px About panel and 12px stage. Navigation and reset controls are circular. The collection badge is an outlined pill. Fine 1px rules preserve instrument-like precision.

## Components

- **Wheel stage:** top labels and bottom gesture guidance frame the supplied STL geometry. Drag rotates; selection lifts a swatch toward the viewer. Arrow keys select neighbours; reset returns to Cloud Dancer.
- **Selected specimen:** true-colour rectangle with a lower-left Pantone caption. Caption text switches between dark and white according to the selected colour. A translucent tag marks Cloud Dancer.
- **Copy rows:** full-width HEX and RGB buttons with fine separators, tabular values and right-aligned copy/check icons. Copy feedback appears briefly in the navigation caption.
- **Circular controls:** outlined 32px arrows gain pale blue fill on hover. The 33px reset has a lighter resting fill.
- **Palette selector:** pale grey-blue native select with label, divider and chevron. The label hides on mobile.
- **Colour chips:** 48px high on desktop and 33px on mobile. Selection adds a 1px olive outline offset by 3px, a 3px lift and a dot below. Hover lifts 5px; hover and keyboard focus reveal a name tooltip.
- **Text navigation:** small text with restrained line icons and blue hover colour. Keyboard focus uses a 2px blue outline offset by 5px.

Chip transforms transition over 180ms; specimen backgrounds over 300ms. Reduced-motion mode disables CSS animation and transitions and restores automatic scrolling. No raster assets ship: the visual system uses CSS, bundled type, SVG icons and 3D geometry.

## Do's and Don'ts

- **Do** preserve the user-pinned off-white studio, pale blue controls and Inter Tight.
- **Do** associate colour names, values and specimens clearly with selection.
- **Do** preserve visible focus, tabular values and the responsive detail layout.
- **Don't** introduce a competing interface accent or alternate font direction.
- **Don't** replace physical geometry with decorative imagery or add shadows to every surface.
