# FireRatShader — Feature List

> **Version 1.2.0** · Dual-Pipeline Uber Shader for Unity  
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

All 6 shader variants expose **identical features, properties, and inspector layout** (887 properties) and are maintained in 100% lockstep parity.

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
- **Stochastic Texture Sampling**: Procedurally blends randomized texture samples to eliminate repetitive tiling patterns on large surfaces
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
- **Texture Mipmap & Quality Tools**: 1-click inspector drawer to batch configure Mipmap Generation (Enabled/Disabled), Mipmap Filter algorithms (Box: smooth vs Kaiser: sharpened), and Anisotropic Filtering (0 to 16) across all assigned textures
- **Hardware Mipmapped Projections**: Standard texture projections utilize native hardware mipmap filtering, preventing grazing-angle aliasing and shimmering on angled surfaces

---

## Lighting Models

| Mode | Description |
|---|---|
| **Unlit** | Zero lighting — pure texture/color output |
| **Basic** | Simple diffuse Lambert shading |
| **Toon / Cel Shading** | Multi-tone ramp shading with adjustable steps, shadow color, dual-step cel shadows, **Shadow Border offset**, **Shadow Blur softening**, and **AO Shadow Modulation** |
| **Stylized PBR** | Physically-based rendering with artistic control over specular and reflections |
| **Standard PBR** | Full physically-based rendering with GGX specular, metallic workflow |

- **LTCGI (Linearly Transformed Cosines) Area Lighting**: Real-time polygon area lighting evaluation with specular and diffuse response and polygon clipping for video screens and emissive meshes in LTCGI-compatible worlds across both BRP and URP
- **Forward+ & Clustered Lighting (URP 17+ / Unity 6)**: Native support for URP 17 / Unity 6 clustered light looping, evaluating additional lights per fragment for efficient multi-light scenes
- **Unity 6 URP Adaptive Probe Volumes (APV)**: Native per-pixel probe volume evaluation in URP forward shading for scenes utilizing Unity 6 Adaptive Probe Volumes
- **Detail Normal System (1–4 Layers + Bicubic Filtering)**: Micro-surface detail normal stacking supporting up to 4 independently scrolled and scaled layers with high-quality bicubic filtering and RNM/Whiteout blending
- **VRSL (VRC Studio Lighting) GI**: Real-time reception module for DMX stage fixtures, moving heads, lasers, and club lighting in VRSL-compatible VRChat worlds
- **OKLab Color Blending**: Perceptually uniform OKLab color space interpolation for color tints, theme colors, and mask blends to eliminate muddy desaturation
- **Global Mask Routing Matrix**: Route individual RGBA Color Mask channels (None, R, G, B, A) to selectively scale MatCap, Rim, Glitter, and Dissolve modules, with consistent dissolve clipping evaluated across ShadowCaster, DepthNormals, DepthOnly, MotionVectors, and Outline passes
- **Shader Diagnostic & Debug View HUD**: 11 in-viewport buffer isolation modes (BaseColor, Normals, World Normals, Smoothness, Metallic, Direct Shading, Roughness/GI, Emission, AudioLink, Texel Density, and Shader Complexity) plus inspector Stats HUD
- **URP Light Layers Support**: Fragment-level filtering for main and additional lights in URP 14+ / URP 17 / Unity 6, allowing lights to selectively illuminate mesh layers. BRP inspector displays an informative fallback notice.
- **OpenLit Harmony Mode**: CC0 OpenLit standard half-Lambert diffuse calculation for consistent lighting across avatar crowds in photo worlds
- **SDF Face Shadows**: Light-following anime face shadow mapping with softness, offset, and invert controls
- **Toon Shadow Granularity**: Dedicated Shadow Border, Shadow Blur, and Occlusion Map modulation
- **Monochrome & As-Unlit Lighting**: Scene light color desaturation and ambient unlit floor protection
- **Environmental Rim**: Modulates and tints rim lighting using ambient SH probes and scene reflections
- **Subsurface Scattering (SSS)**: Skin/wax/foliage translucency with thickness map and transmission map
- **Anisotropic Specular**: Ward and Kajiya-Kay models for hair and brushed metal, optimized for stereo stability and comfort in VR headsets
- **Clear Coat**: Secondary specular layer for car paint, lacquered surfaces
- **Skin Diffuse Wrap**: Pre-integrated skin shading model
- **Eye Refraction**: Physically-based iris depth refraction
- **Ambient Lighting Control**: Override/disable environment lighting
- **VRC Light Volumes**: Per-pixel voxel ambient lighting in worlds using REDSIM's VRCLightVolumes, with bias control, intensity control, and automatic fallback to standard light probes elsewhere
- **Scene Light Overrides**: Custom light direction and color for material-specific lighting
- **Geometric Specular Anti-Aliasing**: Reduces specular shimmer and flickering on dense meshes in VR
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
| **Glitter / Sparkle** | Procedural glitter particles with organic Random sparkles and geometric shapes (Circle, Square, Star), per-sparkle independent color randomization, size and softness controls, directional 2D scroll vector steering, decoupled twinkle vs. scroll speeds, and 6 color modes (Solid, Two-Color Ramp, Rainbow, Gradient Texture, AudioLink Theme, AudioLink Chord) |
| **Psychedelic** | Animated color cycling procedural effect |
| **3D Fractal** | Real-time procedural 3D fractal rendering with 18 mathematical formulas, animated rotation/sway/pulsate modes, plus Offset and Repeat Size spatial controls |

---

## Procedural Textures & Patterns

- **30-Pattern Generator Library**: Perlin/Simplex/Cellular noise, Voronoi, Truchet, Fractals, Houndstooth, Argyle, Herringbone, Tartan, Scales, and more
- **Target Modes**: Apply procedural textures to Base Color, Emission, Metallic, Smoothness, Detail, or Dissolve

---

## Emission & Overlays

- **HDR Emission Color**: Dedicated HDR base emission tint (default black) that multiplies with Emission Strength and integrates with the Emission Mask (functioning as the emission map) across both forward shading and baked Meta lighting passes
- **4 Independent Emission Layers**:
  - Primary, Secondary, Third, and Fourth Emission slots
  - Individual HDR Color tints, strength, and scrolling animation (X/Y)
  - Dedicated AudioLink frequency band reactivity per slot
  - Emission Pulse waveforms and AudioLink audio beat blinks
  - Texture Alpha to Emission and Emission Mask support
- **Bloom / Emission Luminance Clamp**: Clamps maximum HDR luminance with a smooth soft-knee compression curve, preventing blinding AudioLink bloom whiteouts in VR
- **Fluorescence Emission**: Automatically reacts to dark/lit scenes (glow-in-the-dark)
- **RGBA Color Masking (Recolor Workflow)**:
  - 4 independent color zones driven by RGBA mask channels
  - Independent color tint and HDR emission per zone
- **Grid Overlay**: Customizable grid lines with mask support, 4-way color styling modes (Solid, Rainbow, AudioLink Theme, AudioLink Chord), and a dedicated **Grid Intensity** slider for precise opacity control
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
- **Ripple Effect**: Animated surface ripples with normal displacement, 4-way color styling modes (Solid, Rainbow, AudioLink Theme, AudioLink Chord), and selectable AudioLink modulation targets (Strength, Radius, Speed)
- **UV Distortion**: Animated UV warping with 16 distortion algorithms
- **Screen-Space Refraction**: Real glass/water refraction using the camera opaque texture in URP with a grab-texture fallback in BRP, supporting chromatic dispersion and adjustable IOR
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

- **Chronotensity Musical Beat-Sync**: Master beat-sync clock with 8 selectable tempo modes (1/4 to 2× forward speeds, 3/4 to 1/2 inverse speeds) and per-feature beat-sync toggles across Color Shift, Procedural Textures, Glitter, Grid Overlay, Ripple, Scanlines, Flicker, Dissolve, Outline, 3D Fractal, and Emission Pulse
- **Beat-Sync Auto-Detection & Quick-Fix**: The inspector identifies when feature beat-sync toggles are active without master beat-sync time enabled, providing an inline notification and a 1-click quick-fix button
- **AudioLink World Theme Color Tinting**: Dynamically tints Albedo, Emission, or Both across all 4 venue theme colors broadcast by world AudioLink systems
- **ColorChord Integration**: Live musical note-to-frequency color mapping (ColorChord Chromagram & ColorChord Chord) for visualizers, glitter, grid, and ripples
- **Extended AudioLink Modulation Targets**: Dedicated modulation target selectors for Glitter (Brightness, Size, Sparsity, Sparsity Inverse), Grid (Thickness, Alpha, Hue), Rim Glow (Intensity, Width), Ripple (Strength, Radius, Speed), and Scanlines (Thickness, Density, Alpha)
- **Audio Spectrum Visualizer**: Real-time Discrete Fourier Transform (DFT / FFT) frequency analysis directly on the shader:
  - **6 Spectrum Modes**: EQ Bars, Continuous Curve, Radial Spectrum, 2D Waterfall Spectrogram, Band History Strip (Mode 4), and VU Meter (Mode 5)
  - **Add-on VU Meter Overlay**: Standalone 4-band LED ladder meter overlay rendered over any spectrum mode, with independent position, scale, rotation, intensity, and Broadcast (green/amber/red) or Gradient color modes
  - **Dual Trace Mode**: Floating peak hold caps on EQ bars and raw transient trace line over smoothed curves
- **Audio Waveform Visualizer**: Raw time-domain audio signal visualization:
  - **6 Waveform Modes**: Oscilloscope trace, Filled ribbon, Polar ring, Stereo Lissajous X-Y scope, Vertex displacement, and Triggered Oscilloscope (Mode 5, zero-crossing lock with 2× zoom)
  - **Stereo Split Channel Mode**: Discrete Left and Right channels with velocity and beat-pulse brightening towards white
- **Global Smoothing**: Adjustable temporal smoothing for all AudioLink-driven effects
- **Temporal Buffer Smoothing**: Dedicated GPU-backed temporal smoothing of the spectrum and waveform with independent attack and release envelopes
- **Native Audio Smoothing CRT (BRP & URP)**: Dedicated GPU temporal-smoothing update shaders for each render pipeline, with automatic render-pipeline detection when creating the smoothed-audio CRT asset
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
- **Disabled Pass Culling**: Multi-pass effects that are switched off (e.g., Outline, Fur layers) are culled before rasterization, so they never consume GPU time.
- **Keyword-Driven Compilation**: Only the shader code for enabled features is compiled into the final GPU program — disabled features are never present.
- **Mobile Interpolator Budgeting**: The shader is engineered to stay within mobile GPU limits, keeping it lightweight on Meta Quest and low-end hardware.
- **Decal Layer Boundary Optimization**: Eliminates redundant texture sampling and processing outside active decal boundaries, maximizing efficiency on mobile and standalone VR.
- **Driver-Safe Area Lighting**: Enhanced LTCGI area lighting loop safety for robust performance across mobile and standalone GPU drivers.
- **Mobile & Quest GPU Optimization**: Streamlined shading, lighting, and projection paths reduce GPU register pressure on Quest and mobile GPUs; procedural fractals and raymarching enforce strict iteration bounds for stable frame rates.

### Material Lock Optimizer

One-click material locking that:
1. Removes shader passes your material never uses (e.g., Outline, Fur layers, ForwardAdd)
2. Freezes in your enabled feature set as a single optimized shader variant — no runtime variant switching
3. Strips everything your material doesn't need, leaving only the code that is actually in use
4. Produces a self-contained shader tuned for the target platform

---

## Inspector & Editor Tools

- **Unified Custom Inspector**: Identical layout and styling across BRP and URP variants
- **Live Property Search**: Dynamic search filter toolbar with auto-expanding section matching
- **Adaptive Visualizer Inspector Layout**: Dynamic conditional UI layout that adaptively displays only the settings and color pickers relevant to the currently active visualizer and color modes
- **Section Foldouts**: Organized, collapsible sections with per-section Copy / Paste / Reset
- **Conditional Visibility**: Properties only shown when their parent feature is enabled
- **Performance Warnings**: Automatic warnings and guidance when expensive features are active on unlocked materials
- **Material Preset System**: One-click JSON preset saving and loading — export the full material state (floats, colors, vectors, textures with tiling and offset) to JSON and re-import it onto other materials
- **Scene & Hierarchy Material Locking**: Quickly batch lock or unlock all FireRat materials across active scenes or selected GameObject hierarchies in the Multi-Material Batch Editor
- **Texture Mipmap & Quality Tools**: 1-click batch tool directly in the material inspector to configure Mipmap Generation (Enabled/Disabled), Mipmap Filter algorithms (Box: smooth averaging vs Kaiser: edge-sharpened downscaling), and Anisotropic Filtering levels (0 to 16) across all assigned textures via Unity's TextureImporter
- **VRChat Avatar Setup Wizard**: Automated tool (`Tools > FireRat Shader > Avatar Setup`) to generate VRChat Expressions Menus, radial puppets, toggles, submenus, FX Animator Controller layers, and parameter assets for controlling shader features in-game with built-in 256-bit parameter budget tracking
- **Safe Optional VRChat SDK Integration**: Built with a dedicated editor assembly and a zero-error fallback window ensuring clean compilation in standard non-VRChat Unity projects
- **Multi-Material Batch Editor**: Scan avatar hierarchies, batch-edit common properties, switch pipeline variants, and batch lock/optimize materials with automatic keyword re-syncing (`Tools > FireRat Shader > Multi-Material Batch Editor`)
- **Sprite Sheet & Flipbook Importer (with Animated GIF Converter)**: Automatically configure flipbook grid layouts, pack loose image frames into power-of-two atlases, and decode multi-frame Animated GIFs with 1-click atlas generation (`Tools > FireRat Shader > Sprite Sheet & Flipbook Importer`)
- **VRChat Quest Fallback Baker**: Bake composite materials into mobile albedo maps and generate Quest-compatible avatar materials with automatic keyword synchronization (`Tools > FireRat Shader > VRChat Quest Fallback Baker`)
- **Re-sync All Material Keywords**: Project-wide utility to clean up stale keywords and ensure 100% synchronization between material properties and shader variants
- **Automated Keyword Synchronization**: The Material Converter, Multi-Material Batch Editor, and VRChat Quest Fallback Baker re-sync shader keywords automatically, so converted, batch-edited, and baked materials render correctly immediately
- **Texture Channel Packer & Baker**: In-editor tool to bake HSV shifts, RGBA color masks, and decals into unified albedo textures, plus 4-channel linear packing
- **Smoothed Normal Baker**: Averages vertex normals across split UV seams to eliminate anime outline gaps
- **Material Migration Converter**: 1-click automated converter from Poiyomi, lilToon, Standard, and UTS shaders to FireRatShader, with automatic keyword synchronization
- **Inspector Localization**: Community-driven UI translation packs in 14 languages with real-time hot-reloading and English fallback (`Languages/`)
- **Multi-Language Web Documentation & i18n System**: Full documentation portal translated into 14 languages with dynamic client-side language switching and offline navigation
- **AudioLink Offline Simulation Rig**: In-editor AudioLink Companion component to test audio-reactive materials without running VRChat or entering Play Mode, with dynamic sample-rate support and automatic cleanup in standalone player builds

---

## Technical Specifications

| Spec | Value |
|---|---|
| Total Properties | 887 |
| Shader Keywords | 112+ `shader_feature_local` |
| Render Passes (BRP) | ForwardBase, ForwardAdd, Outline, Fur_Layer_1..8, ShadowCaster, DepthNormals, MotionVectors, Meta |
| Render Passes (URP) | UniversalForward, Outline, Fur_Layer_1..8, ShadowCaster, DepthOnly, DepthNormals, MotionVectors, Meta |
| Supported Graphics APIs | DirectX 11/12, OpenGL ES 3.0+, Vulkan, Metal |
| Unity Version | Unity 2022.3 LTS (VRChat official), 2023.x, Unity 6 (6000.x) |
| Dependencies | None (fully self-contained, no runtime scripts) |

---

*FireRatShader is a product of FireRat. All rights reserved.*
