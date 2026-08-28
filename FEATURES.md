# FireRatShader — Feature List

> **Version 1.1.0** · Dual-Pipeline Uber Shader for Unity  
> BRP (Built-in) · URP (Universal) · VR · Mobile · Desktop

---

## Platform Support

| Platform | Status |
|---|---|
| Meta Quest (Standalone VR) | ✅ Optimized |
| SteamVR (PC VR) | ✅ Optimized |
| PC Desktop (DX11, DX12, Vulkan) | ✅ Full Support |
| Mobile (iOS / Android) | ✅ Optimized |
| OpenGL ES 3.0+ | ✅ Full Support |
| Metal | ✅ Full Support |
| Single Pass Instanced (Stereo VR) | ✅ Native |

---

## Pipeline Variants & Master Shaders

| Master Shader Variant | BRP Shader (`FireRatShader/`) | URP Shader (`FireRatShaderURP/`) | Primary Use Case |
|---|---|---|---|
| **Master Uber Shader** | `FireRat/FireRatShader` | `FireRat/FireRatShader_URP` | Standard characters, props, clothing, VRChat avatars |
| **Two-Pass Transparency** | `FireRat/FireRatShader_TwoPass` | `FireRat/FireRatShader_URP_TwoPass` | Complex alpha meshes (backface depth prepass + frontface) |
| **Shell Fur Extrusion** | `FireRat/FireRatShader_Fur` | `FireRat/FireRatShader_URP_Fur` | Furry avatars, velvet fabrics, plush toys (1–8 layers) |

All 6 shader variants expose **identical features, properties, and inspector layout** (828 properties) and are maintained in 100% lockstep parity.

---

## Rendering & Core

- **Render Modes**: Opaque, Cutout, Transparent, Additive, Multiply, Premultiplied (Fade)
- **Alpha to Coverage (A2C)**: MSAA-based anti-aliased cutout edges for VR foliage/hair, with adjustable **Edge Sharpening** and **Derivative Mip Scaling** to prevent distance edge thinning in VR
- **Dithered Transparency**: Smooth transparency for opaque shaders without sorting issues
- **Depth Test Override (`ZTest`)**: Per-material depth test control — `Always`, `LEqual`, `Greater`, etc. for overlays and HUDs
- **Color Write Mask**: Hardware-level RGB/A channel write control for stencil-only passes
- **Render Queue Offset**: Fine-tune render ordering for layered transparent materials (hair, clothing)
- **Main Stencil Buffer**: Full stencil operations (Ref, ReadMask, WriteMask, Comp, Pass, Fail, ZFail)
- **Dedicated Outline Stencil Buffer**: Independent stencil testing and masking for outlines (prevents outline bleeding onto inner face/body/hair)
- **Culling Modes**: Front, Back, Off (double-sided)
- **Depth Write Override**: Force depth write on/off independent of render mode
- **LOD Crossfade**: Native Unity LOD Group dithered crossfade support

---

## Texturing

- **Main Albedo Texture** with UV tiling, offset, scrolling, and rotation
- **Stochastic Texture Sampling**: Procedurally blends randomized texture samples across triangular lattices to completely eliminate repetitive tiling patterns on large surfaces
- **UV Flow (Pathing)**: Dual-phase continuous vector flow map texture animation with seamless crossfading
- **10 Texture Projection Modes**: Standard UV0/UV1, World/Local Triplanar, Screen Space, Planar, Spherical, Cylindrical, Biplanar, Panosphere (360 Equirectangular), and Polar Coordinates
- **Normal Mapping**: Primary + Detail normal maps with adjustable strength and blend modes (RNM, Whiteout, UDN)
- **Metallic / Smoothness Map**: Standard PBR workflow
- **Roughness / Occlusion Map**: Alternative PBR workflow
- **Detail Texture**: Overlay detail with mask and blend modes
- **Flipbook / Sprite Sheet Animation**: Configurable rows, columns, speed
- **UV Scrolling & Rotation**: Per-axis speed, ping-pong mode
- **Parallax Occlusion Mapping (POM)**: Adjustable step count with depth map and linear search interpolation
- **Vertex Animation Textures (VAT)**: Baked animation playback from texture data
- **Clipping Mask**: Texture-driven alpha masking with channel selection (R/G/B/A)
- **UV Tile Discard**: Toggle clothing/accessories per tile of a 4×4 UV grid, applied across all passes (main color, outline, shadow, depth)
- **Video Player Mode**: AVPro and Unity Video Player support with automatic gamma correction and Y-flip

---

## Lighting Models

| Mode | Description |
|---|---|
| **Unlit** | Zero lighting — pure texture/color output |
| **Basic** | Simple diffuse Lambert shading |
| **Toon / Cel Shading** | Multi-tone ramp shading with adjustable steps, shadow color, dual-step cel shadows, **Shadow Border offset**, **Shadow Blur softening**, and **AO Shadow Modulation** |
| **Stylized PBR** | Physically-based rendering with artistic control over specular and reflections |
| **Standard PBR** | Full physically-based rendering with GGX specular, metallic workflow |

- **Detail Normal System (1–4 Layers + Bicubic Filtering)**: Micro-surface detail normal stacking supporting up to 4 independently scrolled and scaled layers, 5-tap Catmull-Rom bicubic spline reconstruction, and RNM/Whiteout blending
- **VRSL (VRC Studio Lighting) GI**: Real-time reception module for DMX stage fixtures, moving heads, lasers, and club lighting in VRSL-compatible VRChat worlds
- **OKLab Color Blending**: Perceptually uniform Björn Ottosson OKLab color space interpolation for color tints, theme colors, and mask blends to eliminate muddy desaturation
- **Global Mask Routing Matrix**: Routes RGBA Color Mask channels to modulate MatCap, Rim, Glitter, and Dissolve modules
- **Shader Diagnostic & Debug View HUD**: 11 in-viewport buffer isolation modes (BaseColor, Normals, World Normals, Smoothness, Metallic, Direct Shading, Roughness/GI, Emission, AudioLink, Texel Density, and Shader Complexity) plus inspector Stats HUD
- **URP Light Layers Support**: Fragment-level filtering for main and additional lights via `_LIGHT_LAYERS` in URP 14+ / URP 17 / Unity 6, allowing lights to selectively illuminate mesh layers. BRP inspector displays an informative fallback notice.
- **OpenLit Harmony Mode**: CC0 OpenLit standard half-Lambert diffuse calculation for consistent lighting across avatar crowds in photo worlds
- **SDF Face Shadows**: Light-following anime face shadow mapping with softness, offset, and invert controls
- **Toon Shadow Granularity**: Dedicated Shadow Border, Shadow Blur, and Occlusion Map modulation
- **Monochrome & As-Unlit Lighting**: Scene light color desaturation and ambient unlit floor protection
- **Environmental Rim**: Modulates and tints rim lighting using ambient SH probes and scene reflections
- **Subsurface Scattering (SSS)**: Skin/wax/foliage translucency with thickness map and transmission map
- **Anisotropic Specular**: Ward and Kajiya-Kay models for hair and brushed metal
- **Clear Coat**: Secondary specular layer for car paint, lacquered surfaces
- **Skin Diffuse Wrap**: Pre-integrated skin shading model
- **Eye Refraction**: Physically-based iris depth refraction
- **Ambient Lighting Control**: Override/disable environment lighting
- **VRC Light Volumes**: Per-pixel voxel ambient lighting in worlds using REDSIM's VRCLightVolumes, with normal-bias sampling, intensity control, and automatic fallback to standard light probes elsewhere (SM 4.5+, High performance tier)
- **Scene Light Overrides**: Custom light direction and color for material-specific lighting
- **Geometric Specular Anti-Aliasing**: Reduces specular shimmer and flickering on dense meshes in VR (Kaplanyan 2016)
- **MatCap (Material Capture)**: Primary + secondary MatCap textures with blend modes
- **Custom Fog Color**: Override Unity fog color per-material

---

## Surface Styles

| Style | Description |
|---|---|
| **MatCap** | Material capture sphere mapping with dual layers |
| **Skybox Reflection** | Environment reflection with adjustable blur |
| **Galaxy** | Procedural animated galaxy/nebula effect |
| **Triplanar** | World-space projected textures with per-axis normal maps |
| **Iridescence** | Thin-film interference color shifting |
| **Glitter / Sparkle** | Procedural glitter particles (screen-space or world-space) |
| **Psychedelic** | Animated color cycling procedural effect |
| **3D Fractal** | Real-time procedural 3D fractal rendering with 18 mathematical formulas |

---

## Procedural Textures & Patterns

- **30-Pattern Generator Library**: Perlin/Simplex/Cellular noise, Voronoi, Truchet, Fractals, Houndstooth, Argyle, Herringbone, Tartan, Scales, and more
- **Target Modes**: Apply procedural textures to Base Color, Emission, Metallic, Smoothness, Detail, or Dissolve

---

## Emission & Overlays

- **4 Independent Emission Layers**:
  - Primary, Secondary, Third, and Fourth Emission slots
  - Individual HDR Color tints, strength, and scrolling animation (X/Y)
  - Dedicated AudioLink frequency band reactivity per slot
  - Emission Pulse waveforms and AudioLink audio beat blinks
  - Texture Alpha to Emission and Emission Mask support
- **Bloom / Emission Luminance Clamp**: Clamps maximum HDR luminance with a $C^1$-continuous soft-knee compression curve, preventing blinding AudioLink bloom whiteouts in VR
- **Fluorescence Emission**: Automatically reacts to dark/lit scenes (glow-in-the-dark)
- **RGBA Color Masking (Recolor Workflow)**:
  - 4 independent color zones driven by RGBA mask channels
  - Independent color tint and HDR emission per zone
- **Grid Overlay**: Customizable grid lines with mask support
- **Scanlines**: Horizontal/vertical scanline effects with speed and intensity
- **Noise Overlay**: Animated noise pattern overlay
- **Hologram Effect**: Sci-fi holographic display effect with scanlines and flicker
- **Wetness / Rain Ripples**: Dynamic surface wetness with animated ripple patterns
- **3 Decal Layers**: Each with:
  - Texture, UV set selection (UV0/UV1), rotation, clamping
  - Blend modes (Alpha Blend, Multiply, Additive, Replace, etc.)
  - Strength with AudioLink reactivity
  - **PBR Overrides**: Per-decal Normal Map, Metallic, and Smoothness for physically accurate decals

---

## Effects & Vertex Animation

- **Shell Fur Master Shaders**: Multi-pass shell extrusion (1 to 8 layers) along vertex normals with procedural wind sway, gravity vectors, tip strand noise thinning, root-to-tip color gradients, and root AO shadowing (`FireRatShader_Fur`, `FireRatShader_URP_Fur`)
- **Rim Glow / Fresnel**: Edge lighting with color, power, and AudioLink reactivity
- **PS1 Retro Vertex Snapping**: Quantizes vertex positions to emulate classic PlayStation 1 aesthetic
- **LookAt Billboarding**: Aligns meshes/sprites toward the active camera (3D or Y-axis)
- **Network-Synced Animation Time**: Synchronizes shader animation clocks across all network clients via AudioLink/Udon
- **Photosensitivity Strobe Clamp**: Safety feature clamping high-frequency flashing/strobing to prevent seizures
- **Camera & Mirror Visibility Filtering**: Hide elements from mirrors, desktop cameras, or custom camera IDs
- **Intersection Fade**: Soft blending where objects intersect other geometry
- **Outline**: Inverted-hull second pass with:
  - Dedicated Stencil Buffer (Ref, Read/Write masks, Comp, Pass, Fail, ZFail)
  - Width map for per-vertex control
  - World-space, screen-space, or local-space width
  - Color, transparency, and pulse animation
  - Smoothed Normal Baker integration
- **Ripple Effect**: Animated surface ripples
- **UV Distortion**: Animated UV warping with 16 distortion algorithms
- **Screen-Space Refraction** (URP only): Real glass/water refraction using the camera opaque texture with adjustable IOR
- **Crystal Refraction**: Internal UV distortion simulating crystal/gemstone refraction
- **Depth Fade**: Soft particle blending using scene depth

---

## Color Controls

- **Hue / Saturation / Value (HSV)**: Global and masked color adjustment
- **HSV Mask**: Texture-driven selective HSV adjustment
- **Hue Shift Animation**: Automatic rainbow cycling with adjustable speed
- **Brightness / Contrast / Gamma**: Full color grading controls
- **Color Invert**: Toggle color inversion
- **Pixelation**: Resolution reduction effect
- **Posterize**: Color quantization effect
- **Gradient Mapping**: Remap luminance to a gradient texture
- **Vertex Color Support**: Use mesh vertex colors as base color or emission

---

## Glitch Effects

- **Flicker**: Screen flicker with multiple modes (Random, Sine, Square)
- **Transparency Glitch**: Random transparency drop-outs

---

## Transitions

- **Proximity Effects**: Distance-based visual reactions relative to Camera/Player Head, Object Pivot, or Custom World Position:
  - **4 Action Modes**: Glow / Emission, Dissolve / Fade, Dither Transparency, Color Tint
  - Smooth radius, softness roll-off, color shift animation hook, and distance inversion
- **Dissolve**: 4 modes with adjustable edge width, color, and emission:
  - **Noise Dissolve**: Texture-based organic dissolve
  - **Directional Wave**: Sweeping dissolve with direction control
  - **Spherical**: Point-origin expanding dissolve
  - **Glitch**: VR-safe world-space block dissolve (consistent across both eyes)
- **Planar Wipe**: Axis-aligned reveal/hide with adjustable plane position
- **Distance Fade**: Fade in/out based on camera distance
- **Depth Fade**: Soft particles — fade near intersecting geometry
- **Effect Distance LOD**: Automatically disable expensive effects at distance for performance
- **Chroma Key**: Green/blue screen masking with adjustable threshold
- **Vertex Collapse**: Animated mesh collapse to a point

---

## Advanced Backface Rendering

- **Backface Color**: Separate color for back-facing triangles
- **Backface Texture**: Completely different texture for back faces (jacket interiors, capes)
- **Backface Emission**: Independent emission color and strength on back faces
- **Two-Pass Transparency Shaders**: Dual-pass backface depth prepass (`Cull Front`) and frontface forward pass (`Cull Back`) for solving alpha self-sorting artifacts on complex meshes (`FireRatShader_TwoPass`, `FireRatShader_URP_TwoPass`)

---

## AudioLink Integration

Deep integration with VRChat's AudioLink system across almost all visual features:

- **Global Smoothing**: Adjustable temporal smoothing for all AudioLink-driven effects
- **Spectrum Visualizer**: Audio frequency spectrum display
- **Waveform Visualizer**: Audio waveform display
- **Reactive Features**: Emission, procedural textures, grid overlay, distortion, dissolve, decals, rim glow, and more — each with per-band (Bass/Low Mid/High Mid/Treble) and strength controls

---

## Performance & Optimization

### Three-Tier Performance System

| Level | Target | Behavior |
|---|---|---|
| **High** | PC VR, Desktop | All features enabled |
| **Medium** | Quest, Mobile | Disables SSS, Anisotropy, Eye Refraction |
| **Low** | Low-end Mobile | Disables Distortion, Parallax + all Medium restrictions |

### Zero-Overhead Architecture

- **Zero Cost for Disabled Features**: Every feature is disabled by default. When off, it incurs zero GPU time, zero dummy math, and zero texture lookups.
- **Hardware Vertex Collapsing**: Disabled passes (e.g., Outline, Fur layers) collapse vertices to `(0,0,0,0)` at primitive assembly — culled before rasterization.
- **Keyword-Driven Compilation**: `shader_feature` pragmas ensure only active code branches are compiled into GPU microcode.
- **Dynamic Interpolator Optimization**: `v2f` struct members are conditionally compiled to stay within mobile GPU limits (16 vector registers).

### Material Lock Optimizer

One-click material locking that:
1. Physically deletes unused shader passes (Outline, Fur layers, ForwardAdd, DepthNormals, MotionVectors)
2. Bakes active shader keywords as `#define` directives — eliminates all variant compilation
3. Strips inactive `shader_feature` permutations
4. Rewrites include paths for standalone operation

---

## Inspector & Editor Tools

- **Unified Custom Inspector**: Identical layout and styling across BRP and URP variants
- **Live Property Search**: Dynamic search filter toolbar with auto-expanding section matching
- **Section Foldouts**: Organized, collapsible sections with per-section Copy / Paste / Reset
- **Conditional Visibility**: Properties only shown when their parent feature is enabled
- **Performance Warnings**: Automatic warnings and guidance when expensive features are active on unlocked materials
- **Material Preset System**: One-click JSON preset saving and loading — export the full material state (floats, colors, vectors, textures with tiling and offset) to JSON and re-import it onto other materials
- **Multi-Material Batch Editor**: Scan avatar hierarchies, batch-edit common properties, switch pipeline variants, and batch lock/optimize materials (`Tools > FireRat Shader > Multi-Material Batch Editor`)
- **Sprite Sheet & Flipbook Importer (with Animated GIF Converter)**: Automatically configure flipbook grid layouts, pack loose image frames into power-of-two atlases, and decode multi-frame Animated GIFs with 1-click atlas generation (`Tools > FireRat Shader > Sprite Sheet & Flipbook Importer`)
- **VRChat Quest Fallback Baker**: Bake composite materials into mobile albedo maps and generate Quest-compatible avatar materials (`Tools > FireRat Shader > VRChat Quest Fallback Baker`)
- **Re-sync All Material Keywords**: Project-wide utility to clean up stale keywords and ensure 100% synchronization between material properties and shader variants
- **Texture Channel Packer & Baker**: In-editor tool to bake HSV shifts, RGBA color masks, and decals into unified albedo textures, plus 4-channel linear packing
- **Smoothed Normal Baker**: Averages vertex normals across split UV seams to eliminate anime outline gaps
- **Material Migration Converter**: 1-click automated converter from Poiyomi, lilToon, Standard, and UTS shaders to FireRatShader
- **Inspector Localization**: Community-driven UI translation packs in 14 languages with real-time hot-reloading and English fallback (`Languages/`)
- **AudioLink Offline Simulation Rig**: In-editor AudioLink Companion component to test audio-reactive materials without running VRChat or entering Play Mode

---

## Technical Specifications

| Spec | Value |
|---|---|
| Total Properties | 828 |
| Shader Keywords | 112+ `shader_feature_local` |
| Render Passes (BRP) | ForwardBase, ForwardAdd, Outline, Fur_Layer_1..8, ShadowCaster, DepthNormals, MotionVectors, Meta |
| Render Passes (URP) | UniversalForward, Outline, Fur_Layer_1..8, ShadowCaster, DepthOnly, DepthNormals, MotionVectors, Meta |
| Supported Graphics APIs | DirectX 11/12, OpenGL ES 3.0+, Vulkan, Metal |
| Unity Version | Unity 2022.3 LTS (VRChat official), 2023.x, Unity 6 (6000.x) |
| Dependencies | None (fully self-contained, no runtime scripts) |

---

*FireRatShader is a product of FireRat. All rights reserved.*
