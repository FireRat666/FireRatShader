# FireRatShader

**The single shader that does everything — for every Unity project.**

FireRatShader is a high-performance Uber shader for Unity that consolidates hundreds of effects, lighting models, and tools into one master shader per render pipeline. Built for creators who want one material that works everywhere: VR, mobile, desktop, anime, realistic, audio-reactive, and beyond.

[![Website](https://img.shields.io/badge/Website-shader.firer.at-00c00a?style=flat-square)](https://shader.firer.at/)
[![Showcase](https://img.shields.io/badge/Showcase-130%2B%20Shader%20Captures-00d4ff?style=flat-square)](https://shader.firer.at/docs/showcase.html)
[![Documentation](https://img.shields.io/badge/Documentation-v1.3.0-blue?style=flat-square)](https://shader.firer.at/docs/index.html)
[![Parity](https://img.shields.io/badge/Parity-894%20Properties%20(100%25)-green?style=flat-square)](FEATURES.md)
[![Patreon](https://img.shields.io/badge/Get%20it%20on-Patreon-FF424D?style=flat-square&logo=patreon)](https://www.patreon.com/FireRat)

---

## Quick Links

- 🌐 **[Official Website](https://shader.firer.at/)** — Overview, stats, and download info
- ✨ **[Live Media Showcase](https://shader.firer.at/docs/showcase.html)** — 130+ looping video/WebP captures of shaders, AudioLink visualizers, fractals, and effects
- 📖 **[User Documentation](https://shader.firer.at/docs/index.html)** — Setup guides, inspector reference, and workflow tutorials
- 📋 **[Full Feature Reference](FEATURES.md)** — Exhaustive list of all 894 properties and capabilities
- 📝 **[Changelog](CHANGELOG.md)** — Release notes and version history
- 🌍 **[Language Packs](Languages/)** — 15 localized languages for the Unity inspector

---

## ✨ Live Interactive Showcase

Want to see FireRatShader in action before diving into the documentation?

Visit the **[Interactive Media Showcase](https://shader.firer.at/docs/showcase.html)** to explore over 130 high-framerate, looping captures categorized across five environments:

1. **Showcase Looks**: 20 complete avatars and shader-balls (Toon Anime, Hammered Gold, Cyber Grid, Hologram, Plush Fur, Galaxy, and more).
2. **AudioLink Stage**: Every spectrum and waveform visualizer, beat-synchronization modes, ColorChord mapping, and 18 audio-reactive effects driven in real-time.
3. **Surface Styles**: Iridescence, MatCap, Crystal Refraction, Triplanar mapping, and all 18 raymarched 3D fractals.
4. **Effects & Transitions**: Vertex distortions (including Harmonic Wobble), VR-stable glitch suite, dissolve modes, planar wipe, proximity glow, and shell fur.
5. **Lighting Lab**: Comparison of all 5 lighting models, cel ramps, subsurface scattering (SSS), clear coat, anisotropy, and hair specular.

---

## Why FireRatShader?

- **One Shader, Every Pipeline:** True 100% feature and property parity between Built-in (BRP) and Universal Render Pipeline (URP). Both variants share the exact same 894 properties, custom inspector, and rendering behavior. Switch pipelines with a single click without rebuilding materials.
- **Engineered for VR & Meta Quest:** Designed from the ground up for Meta Quest (Adreno mobile GPUs), SteamVR, and standalone Android. Fully compatible with Single-Pass Instanced (stereo) rendering.
- **Zero Cost for Disabled Features:** Every single feature is keyword-gated with `#pragma shader_feature_local`. When disabled, features compile to zero GPU instructions, zero texture lookups, and zero dummy math. Multi-pass features like Outlines and Shell Fur use hardware vertex-collapsing when toggled off in unlocked shaders to drop triangles at primitive assembly.
- **Material Lock Optimizer:** One-click material locking analyzes active features, physically strips unused passes (e.g. outline or shadowcaster passes when disabled), removes dead keywords, and rewrites include paths into an ultra-lean, customized shader asset.
- **AudioLink Without the Headache:** Includes an **AudioLink Editor Companion** that performs real-time audio analysis directly inside the Unity Editor scene/game view without entering Play Mode or requiring external world controllers.
- **Automated VRChat Avatar Setup:** Includes a 1-click Avatar Setup tool that automatically configures VRChat FX animators, Expression Menus, and Parameters to puppet shader features directly in-game.

---

## By the Numbers

| Specification | Value |
|---|---|
| **Total Synchronized Properties** | **894** (100% BRP & URP parity) |
| **Shader Keywords** | **112+** `shader_feature_local` |
| **Surface Styles** | **14+** unique styles + **18** Raymarched 3D Fractals |
| **Lighting Models** | **5** modes (Unlit, Basic Lambert, Toon Cel, Stylized PBR, Standard PBR) |
| **Glitch Modes** | **7** modes (Flicker, Scanlines, Blocky, Channel Shift, Interference, Signal Loss, Transparency) |
| **Vertex Distortion Algorithms** | **17** procedural modes (including Harmonic Wobble for seamless looping) |
| **Inspector Localizations** | **15** languages (`en-US`, `ja-JP`, `zh-CN`, `zh-TW`, `ko-KR`, `de-DE`, `es-ES`, `fr-FR`, etc.) |
| **Supported Engines** | Unity 2022.3 LTS (VRChat official) & Unity 6 / 6.3 LTS |
| **Target Platforms** | PC (DX11/12), Meta Quest (Vulkan/GLES3), SteamVR, Mobile (iOS/Android), macOS (Metal), Linux |

---

## Feature Overview

### 🎨 Surface Styles & Shading
- **5 Master Lighting Models**: Unlit, Basic Lambert, Toon / Cel Shading (with dual cel shadows, shadow blur, and received shadow tinting), Stylized PBR, and Standard PBR (with cross-pipeline GGX roughness parity and URP reflection probe sampling).
- **Specialized Surface Shaders**: Standard PBR, Toon, MatCap, Skin with Subsurface Scattering (SSS), Hair Specular (Kajiya-Kay), Eye Refraction, Galaxy, Crystal Refraction, Glitter & Sparkle, Cyber Grid, Procedural Patterns, Psychedelic, and 18 Raymarched 3D Fractals (Mandelbulb, Menger Sponge, Apollonian, Julia, KIFS, and more).
- **Advanced Shading Modules**: Clear Coat, Anisotropy, LTCGI (Linearly Transformed Cosines) area lighting, VRSL (VRC Studio Lighting) stage DMX fixtures, Detail Normal stacking (up to 4 layers with bicubic filtering), and OKLab color space interpolation.

### 🎵 AudioLink & Visualizers
- **Real-Time Audio Spectrum**: 6 spectrum modes (EQ Bars, Continuous Curve, Radial, 2D Waterfall Spectrogram, Band History, and VU Meter with physical peak hold decay).
- **Dual Trace Spectrum Mode**: Floating peak hold caps on EQ bars and transient trace line over smoothed curves, with customizable peak color modes (High Frequency, Hue Shift, or Match Spectrum).
- **Audio Waveform**: 6 waveform modes (Oscilloscope trace, Filled ribbon, Polar ring, Stereo Lissajous X-Y, Vertex displacement, and Triggered Oscilloscope zero-crossing lock).
- **GPU Temporal Buffer CRT**: Hardware-accelerated temporal smoothing with separate attack/release envelopes for ultra-smooth visualizer motion.
- **Audio Modulation Matrix**: Route 4 AudioLink frequency bands (Bass, Low Mid, High Mid, Treble) and ColorChord live musical chords to Emission, Rim Glow, Ripple, Glitch, Dissolve, Fur Swell, and more.

### ⚡ Effects & Transitions
- **Shell Fur Extrusion**: 1–8 procedural shell extrusion layers with gravity droop, wind sway physics, and noise strand thinning.
- **Procedural Vertex Distortion**: 17 algorithms including Harmonic Wobble (exact integer ratios for seamless periodic loops), Swirl, Twist, Vortex, Ripple, Pulse, and Wave, with singularity protection against mesh holes.
- **VR-Safe Glitch Suite**: 7 glitch patterns with **Glitch Coordinate Space** allowing glitch blocks and scanlines to anchor to mesh geometry in Object Space for stable, nausea-free VR viewing, or Screen Space for retro camera distortion.
- **Dissolve & Transitions**: 4 dissolve modes (Organic Noise, Spherical, Glitch, and Directional Wave with center offset), Planar Wipe with full fragment and light culling, Proximity Effects (distance-based glow/dissolve/dither), distance fade, and soft depth fade.
- **Outlines**: Hull extrusion with independent color, width map, vertex color modulation, emission, dissolve clipping, and stencil mask filtering.

For an exhaustive breakdown of every setting, see [FEATURES.md](FEATURES.md).

---

## Demo Package & Presets

FireRatShader includes an optional demo suite (`FireRatShader-Demo-v<version>.unitypackage`) containing:
- **5 Demonstration Scenes**: Showcase, AudioLink Stage (with embedded royalty-free audio loop), Surface Styles, Effects & Transitions, and Lighting Lab.
- **100+ Preconfigured Materials**: Ready to inspect, learn from, or drag directly onto your avatars and world props.
- **Automatic Pipeline Matcher**: 1-click tool (`Tools > FireRat Shader > Demo > Match Demo Materials To Render Pipeline`) to instantly adapt all demo materials between Built-in and URP.
- **Bundled Preset Library**: 13 ready-to-use overlay looks (Hologram, Gold, Cyberpunk, Galaxy, Toon Cel, Frozen Ice, etc.) accessible directly from the inspector toolbar dropdown.

---

## Localization

The FireRatShader inspector interface is localized in **15 languages**:
- English (`en-US`), Japanese (`ja-JP`), Simplified Chinese (`zh-CN`), Traditional Chinese (`zh-TW`), Korean (`ko-KR`), German (`de-DE`), Spanish (`es-ES`), French (`fr-FR`), Italian (`it-IT`), Polish (`pl-PL`), Portuguese (`pt-BR`), Russian (`ru-RU`), Thai (`th-TH`), Vietnamese (`vi-VN`), and a base template.

All language files reside in the [`Languages/`](Languages/) directory in clean JSON format. Community translation updates and improvements are welcome!

---

## Documentation & Repository Structure

- **[`docs/`](docs/)**: Full static web documentation and the interactive media showcase.
  - **[`docs/index.html`](docs/index.html)**: Comprehensive manual for all shader sections and inspector drawers.
  - **[`docs/showcase.html`](docs/showcase.html)**: 130-item media gallery with high-speed WebP/MP4 recordings.
- **[`FEATURES.md`](FEATURES.md)**: Complete technical specification of all 894 synchronized properties and capabilities.
- **[`CHANGELOG.md`](CHANGELOG.md)**: Detailed historical log of all releases, features, and fixes.
- **[`Languages/`](Languages/)**: Translation files for the custom editor.
- **[`LICENSE.txt`](LICENSE.txt)**: CC-BY-4.0 license covering documentation, showcase, and language assets.

---

## Get FireRatShader

FireRatShader is a commercial software product. You can purchase and download it on **[Patreon](https://www.patreon.com/FireRat)**. Check the page for tier details, immediate downloads, and upcoming updates.

> **Compatibility**: Tested and fully supported on **Unity 2022.3 LTS** (official VRChat engine) and **Unity 6 / 6.3 LTS**. Supported across Windows, macOS, Linux, Meta Quest (Android), SteamVR, and mobile.

---

## License

- The contents of this public repository (documentation, website, interactive showcase, media files, and language packs) are licensed under [Creative Commons Attribution 4.0 International (CC-BY-4.0)](LICENSE.txt). You are free to share and adapt this material with appropriate attribution.
- **Note:** The compiled shader code, master shaders, and proprietary C# editor assemblies are commercial software distributed separately under the FireRatShader End User License Agreement (EULA).