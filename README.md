# FireRatShader

**The single shader that does everything — for every Unity project.**

FireRatShader is a high-performance Uber shader for Unity that consolidates hundreds of effects, lighting models, and tools into one master shader per render pipeline. It's built for creators who want one material that works everywhere: VR, mobile, desktop, anime, realistic, audio-reactive, you name it.

## Why FireRatShader?

- **One shader, every pipeline.** True 100% feature parity between Built-in (BRP) and URP — same properties, same inspector, same look. Switch render pipelines without rebuilding your materials.
- **Born for VR and mobile.** Optimized for Meta Quest, SteamVR, and standalone Android from the ground up. The Material Lock optimizer physically strips unused passes and dead variants at lock time, so what ships is exactly what you use.
- **AudioLink, done right.** Four emission layers, spectrum and waveform visualizers, raymarched fractals, and dozens of effects all driven by AudioLink. The editor companion lets you tune audio reactivity without entering Play Mode.
- **Everything you'd expect, and then some.** 14+ surface styles, 5 lighting models, shell fur, decals, dissolve, glitch, refraction, outlines, parallax, VAT — 800+ properties, every one keyword-gated so disabled features cost zero GPU time.

## Get FireRatShader

FireRatShader is a commercial product. See the [docs introduction](docs/index.html) for purchase information and current availability.

> Requires Unity 2022.3 LTS or Unity 6. Works on Windows, macOS, Linux, Meta Quest, SteamVR, iOS, and Android.

## Features

- Surface styles: Standard PBR, Toon, MatCap, Skin, Hair, Eye, Galaxy, Crystal, Glitter, Grid, Procedural Patterns, Psychedelic, 3D Fractal, and more
- Lighting: Light Layers (URP), custom light overrides, clear coat, subsurface scattering, anisotropy, environment reflections, LPPV-aware ambient, shadowmask
- Emission: 4 independent layers, AudioLink frequency reactivity, and HDR Bloom Luminance Clamping with soft-knee roll-off
- Audio-reactive: AudioLink integration with spectrum and waveform visualizers
- Effects: shell fur extrusion, dissolve, glitch, intersection, outline with dedicated stencil control, refraction, decals, wetness, vertex distortion, VAT animation, parallax occlusion
- Transitions: dynamic Proximity Effects (camera, pivot, custom pos), distance fade, near-camera fade, chroma key, dithered alpha
- Texture projection modes: UV, world, local, screen, planar, spherical, cylindrical, triplanar, panosphere, polar
- Advanced animation controls, color controls, and 14-language localization

See the [full feature list](FEATURES.md) for a complete breakdown.

## Localization

The inspector UI is fully localized. Language packs live in [`Languages/`](Languages/) as JSON files. To add or update a translation, edit the corresponding `xx-XX.json` file. The default language is `en-US.json`.

## Documentation & Resources

- **[Docs](docs/index.html)** — full user documentation (features, properties, workflow, performance)
- **[FEATURES.md](FEATURES.md)** — complete feature reference
- **[CHANGELOG.md](CHANGELOG.md)** — version history
- **[LICENSE.txt](LICENSE.txt)** — CC-BY-4.0 license for this repository's documentation and language packs

## License

The contents of this repository (documentation, marketing material, and language packs) are licensed under [Creative Commons Attribution 4.0 International (CC-BY-4.0)](LICENSE.txt). You are free to copy, redistribute, and adapt the material, including for commercial purposes, provided that you give appropriate credit.

**Note:** The FireRatShader Unity asset itself is **not** included in this repository. The shader is a separate commercial product distributed under its own End User License Agreement. Please see the documentation and product page for purchase and licensing terms.