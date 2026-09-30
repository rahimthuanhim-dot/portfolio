# Portfolio architecture

This document is the implementation reference for the portfolio. Keep content,
presentation, and browser capabilities separated as the project grows.

## Project structure

```text
src/
  background/
    DeferredTopoCanvas.tsx # Idle-scheduled canvas chunk
    TopoCanvas.tsx        # Canvas shell and FPS-based quality fallback
    TopoTerrain.tsx       # Subdivided wireframe plane and shader material
    shaders/
      terrain.vert.glsl
      terrain.frag.glsl
    useQualityTier.ts     # low | medium | high
    useMouseUniform.ts    # Eased pointer ripple, desktop only
    useSectionLineOpacity.ts # Scroll-linked line opacity
    Fallback.tsx          # Static CSS/SVG WebGL fallback
  components/
    ui/                   # GlassPanel, Button, Tag, NavBar
    sections/             # Hero, Work, About, Services, Contact
  styles/
    tokens.css            # Design tokens
    glass.css
    base.css
  hooks/
    useReducedMotion.ts   # Static canvas mode when requested
    useInView.ts          # One-time section reveals
  data/
    projects.ts           # Portfolio content, separate from markup
  main.tsx
```

## Implementation constraints

- Keep portfolio copy and project data outside presentation components.
- Keep shared visual values in `styles/tokens.css`.
- Keep reusable primitives in `components/ui/`; build page-specific sections
  separately in `components/sections/`.
- Use glass treatments selectively. `GlassPanel` supports `subtle`, `medium`,
  and `strong` intensity; keep surfaces translucent so the background remains
  visible without compromising text contrast.
- The terrain background is a progressive enhancement. Its canvas chunk is
  loaded during browser idle time, and its fixed full-screen layer remains
  pointer-transparent and hidden from assistive technology.
- Use the `low`, `medium`, or `high` device tier for baseline antialiasing and
  multisampling. The FPS monitor steps down DPR, then geometry segments, then
  pauses the terrain loop if measured FPS remains below 45.
- Read pointer input only on desktop and ease it into the terrain ripple.
- Scroll visibility adjusts the single `uLineOpacity` uniform between 0.30 and
  0.15; a radial vignette and section scrims keep lines behind text.
- Do not add motion or rendering dependencies until implementing the terrain
  background; do not use effects that are not required by the design.
- Use DPR 1 and 64x64 segments at widths up to 48rem; use DPR capped at 1.5 and
  128x128 segments on larger screens. Disable Bloom and pointer input on mobile.
- Reduced-motion users receive a demand-rendered static canvas frame.

## Current scope

The portfolio includes the app bootstrap, design tokens, base and glass styles,
reusable UI primitives, the hero/about/work/contact sections, and data-driven
project details. The topographic background remains an independent rendering
layer, dynamically loaded after the initial page paint.
