# Portfolio architecture

This document is the implementation reference for the portfolio. Keep content,
presentation, and browser capabilities separated as the project grows.

## Project structure

```text
src/
  background/
    TopoCanvas.tsx        # Canvas shell, tier selection, and reduced-motion fallback
    TopoTerrain.tsx       # Plane mesh and shader material
    shaders/
      terrain.vert.glsl
      terrain.frag.glsl
    useQualityTier.ts     # low | medium | high
    useMouseUniform.ts    # Eased pointer input, desktop only
    Fallback.tsx          # Static CSS/SVG version
  components/
    ui/                   # GlassPanel, Button, Tag, NavBar
    sections/             # Hero, Work, About, Services, Contact
  styles/
    tokens.css            # Design tokens
    glass.css
    base.css
  hooks/
    useReducedMotion.ts
    useInView.ts
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
- The terrain background is a progressive enhancement. Provide a static
  fallback and respect reduced-motion preferences. Keep the full-screen canvas
  rendering while the page is visible; browsers throttle animation frames for
  background tabs.
- Select a `low`, `medium`, or `high` quality tier based on device capability.
- Read pointer input only on desktop and ease it through shader uniforms.
- Do not add motion or rendering dependencies until implementing the terrain
  background; do not use effects that are not required by the design.
- Keep the background as a fixed, pointer-transparent canvas behind the app.
- Keep the shader displacement low-amplitude; use low-resolution geometry and
  pixel ratio on small or touch devices, and pause the render loop when hidden.
- Reduced-motion users receive the static SVG/CSS fallback rather than the
  animated canvas.

## Current scope

This foundation includes the app bootstrap, design tokens, base and glass
styles, reusable UI primitives, shared hooks, and the projects data module.
The topographic background is implemented as a separate rendering layer;
portfolio sections remain unimplemented.
