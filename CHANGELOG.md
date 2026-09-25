# Changelog

All notable changes to FireRatShader are documented in this file.

Versions cover both the Built-in Render Pipeline (BRP) and Universal Render Pipeline (URP) variants, which are kept in 100% lockstep feature parity.

## [1.2.0] - 2026-09-25

### Added
- **AudioLink Chronotensity Beat-Sync**: Added musical tempo beat-sync time source with 8 selectable modes (4 tempo speeds from 1/4 to 2×, plus 4 inverse speeds) and per-feature beat-sync toggles across Color Shift, Procedural Textures, Glitter, Grid Overlay, Ripple, Scanlines, Flicker, Dissolve, Outline, 3D Fractal, and Emission Pulse.
- **Beat-Sync Auto-Detection & Quick-Fix**: The material inspector detects when feature beat-sync toggles are enabled without master beat-sync time, displaying an inline reminder with a one-click "Enable Beat-Sync Time" quick-fix button.
- **AudioLink World Theme Color Tinting**: Added world theme color tinting targeting Albedo, Emission, or Both across all 4 venue theme colors broadcast by world AudioLink systems.
- **Audio Spectrum Modes**: Added **Band History Strip** (Mode 4) with 4 side-by-side history lanes and ColorChord tinting, and **VU Meter** (Mode 5) rendering a segmented vertical volume meter.
- **VU Meter Overlay Add-on**: Draw a 4-band LED ladder VU meter on top of any Audio Spectrum mode, with independent position, scale, rotation, intensity, and color modes (Broadcast green/amber/red or Low/High gradient).
- **Dual Trace Spectrum Mode**: Added dual trace rendering with floating peak hold caps over EQ bars and a raw transient trace line over smoothed continuous curves.
- **Triggered Oscilloscope (Waveform Mode 5)**: Real-time oscilloscope with multi-tap zero-crossing search for rock-steady waveform stabilization and a 2× zoomed inspection window.
- **Stereo Split Waveform Channel**: Added stereo split channel rendering for waveforms, with channel brightness scaling toward white with Velocity and Beat Pulse.
- **Expanded AudioLink Modulation Targets**: Added dedicated modulation target selectors for Glitter (Brightness, Sparkle Size, Sparsity, Sparsity Inverse), Grid (Thickness, Alpha, Hue), Rim Glow (Intensity, Width), Ripple (Strength, Radius, Speed), and Scanlines (Thickness, Density, Alpha).
- **Glitter Shapes, Direction & 6 Color Modes**: Added procedural geometric shapes (Circle, Square, Star) and organic Random sparkles, dynamic Size and Softness controls, independent per-sparkle color randomization across 6 color modes (Solid, Two-Color Ramp, Rainbow, Gradient Texture, AudioLink Theme, AudioLink Chord), 2D directional scroll steering, and decoupled Twinkle Speed vs. Scroll Speed.
- **Grid Overlay & Ripple Color Modes & Controls**: Added 4-way color modes (Solid, Rainbow, AudioLink Theme, AudioLink Chord) to both Grid and Ripple effects, plus a dedicated Grid Intensity slider for fine-grained opacity control.
- **Global Mask Channel Routing**: Route any individual channel (None, R, G, B, A) of the RGBA Color Mask to selectively scale MatCap, Rim, Glitter, or Dissolve effects from a unified selector.
- **HDR Emission Color**: New HDR Emission Color (default black) — Enable Emission now makes the surface glow in this color × Strength, and the Emission Mask acts as the emission map. Baked lighting (Meta pass) uses the same formula.
- **3D Fractal Offset & Repeat Size**: Added Offset and Repeat Size properties for positioning and repetition control in the 3D Fractal surface style.
- **Scene & Hierarchy Material Locking**: Added tools to batch lock/unlock all FireRat materials across active scenes or selected GameObject hierarchies in the Multi-Material Batch Editor.
- **Texture Mipmap & Quality Tools**: Material Inspector drawer offering 1-click batch configuration of Mipmap Generation (Enabled/Disabled), Mipmap Filter algorithms (Box: smooth averaging vs Kaiser: edge-sharpened downscaling), and Anisotropic Filtering levels (0 to 16) across all textures assigned to the material.
- **Unity 6 URP Adaptive Probe Volumes (APV)**: Native per-pixel probe volume evaluation in URP forward shading for scenes utilizing Unity 6 Adaptive Probe Volumes.

### Changed
- **Contextual Material Inspector Layout**: Material Inspector dynamically adapts to active modes and shapes across Glitter, Audio Spectrum, and Waveforms, displaying relevant controls and color pickers contextually to streamline material authoring.
- **Audio Spectrum Waterfall (Solid)**: Solid mode is now a single-color heatmap based on signal amplitude; Frequency Gradient mode retains the two-color heatmap transition from Color to Color 2.
- **Inspector Dynamic Visibility**: Audio Spectrum and Audio Waveform inspector sections now adaptively display only the controls relevant to the currently selected mode and color mode.
- **Waveform Stereo Color Evaluation**: Velocity and Beat Pulse now brighten waveform stereo channels cleanly towards white.
- **Dual-Eye VR Tangent Space Stability**: Enhanced tangent frame calculations for Anisotropic and Hair Specular highlights, preventing microscopic stereo disparity and eye strain in VR headsets.
- **Decal Layer Performance**: Optimized decal boundaries to eliminate redundant texture lookups and improve performance on mobile and VR platforms.
- **LTCGI Driver Stability**: Enhanced LTCGI area lighting loop safety for robust performance across mobile and standalone GPU drivers.
- **Master Shaders Parity**: All 6 BRP and URP master shaders synchronized to 887 properties in 100% lockstep parity.

### Fixed
- **Projected Texture Mipmapping**: Restored hardware mipmap filtering on standard texture projections, eliminating grazing-angle aliasing and texture shimmering.
- **Secondary Emission Decoupling**: Decoupled secondary glow features (Color Mask, Backface, Theme, and Internal Parallax) so they function independently of the primary emission toggle, and ensured the primary emission mask applies exclusively to primary emission.
- **Glitch Dissolve Shadow & Outline Stability**: Fixed flickering in shadows, depth prepasses, and outlines when using static glitch dissolve.
- **BRP Outline Fog Compatibility**: Resolved a shader compiler conflict between outlines and Unity fog in the Built-in Render Pipeline.
- **BRP Additional Light UV Consistency**: Synchronized UV animation, flow mapping, and video texture orientation in Built-in additional light passes.
- **Audio Visualizers on Untextured Surfaces**: Fixed visualizers not rendering on materials without other UV-dependent features.
- **Shell Fur Opaque Rendering**: Restricted fur tip alpha fade to cutout and transparent render modes, preventing opaque furry meshes from writing partial alpha.
- **ColorChord Fallback**: Fixed note-to-color mapping calculating incorrect hues when AudioLink is not active in the world.
- **Cross-Platform Graphics API Compatibility**: Resolved compilation and rendering edge cases across mobile GPUs, Vulkan, Metal, and OpenGL Core.
- **VRChat Avatar Setup Tool**: Resolved an issue where opening the Avatar Setup wizard (`Tools > FireRat Shader > Avatar Setup`) could incorrectly display the "VRChat SDK required" warning in projects where the VRChat Avatar SDK was already installed.
- **Proximity Color Cycle**: Cleaned up inspector toggle state for Proximity Color Cycle.

## [1.1.2] - 2026-09-19

### Added
- **Native URP Audio Smoothing CRT**: Added a dedicated Universal Render Pipeline variant of the AudioLink temporal smoothing CRT shader with full SRP compatibility.
- **Automatic Render Pipeline Setup for Audio CRT**: The AudioLink CRT creator now automatically detects whether your project uses Built-in or URP and configures the appropriate CRT asset seamlessly.
- **Dynamic Sample Rate & Standalone Support**: Improved AudioLink companion handling for dynamic audio sample rates and automatic cleanup in standalone and player builds.
- **Automated Material Keyword Syncing**: Keyword synchronization is now automatically performed when using the Material Converter, Multi-Material Batch Editor, and Quest Fallback Baker.

### Changed
- **Significant Mobile & Quest GPU Optimization**: Packed vertex-to-fragment interpolators and eliminated redundant texture coordinate channels, drastically reducing register pressure on Meta Quest and mobile hardware.
- **URP Forward+ & Multi-Light Performance**: Optimized surface evaluations and lighting lookups in URP, eliminating duplicate texture fetches when multiple real-time lights affect a mesh.
- **Optimized Projected Textures**: Streamlined planar, triplanar, spherical, cylindrical, and screen-space projection lookups by removing unnecessary default texture samples.
- **Mobile Raymarching & Fractal Safety**: Added strict iteration bounds to all procedural 3D fractals and raymarching surface styles to ensure stable framerates on mobile GPUs.
- **Cleaner ShaderLab Keyword Footprint**: Refactored shader toggle properties to eliminate unwanted global keyword pollution across projects.
- **Faster Inspector Performance**: Optimized material property lookups in the custom inspector for a smoother editing experience on complex avatars.
- **Enhanced Pass Stripping for Low-Performance Profiles**: Auxiliary depth and motion passes are now automatically stripped when locking materials in low-performance or Quest fallback modes.

### Fixed
- **BRP ForwardAdd Additional Light Shading**: Fixed cel shading, multi-tone toon ramps, highlight tiers, shade shift maps, and shadow ambient occlusion when illuminated by additional point and spot lights in the Built-in pipeline.
- **Additional Light Specular & SSS**: Restored step specular, anisotropic reflections, hair specular, and subsurface scattering (SSS) backlight transmission in additional light passes.
- **Numeric Stability & Highlight Artifacts**: Added guards against division-by-zero across scanlines, ripples, step specular, toon thresholds, and audio waveforms to eliminate flickering and black pixel artifacts.
- **Flipped Mirror Reflection Detection**: Improved mirror camera detection logic to reliably identify horizontally flipped or scaled mirror surfaces.
- **Material Lock Optimizer Stability**: Enhanced shader block extraction in the material optimizer to prevent syntax errors when stripping unused passes.

## [1.1.1] - 2026-09-03

### Added
- **VRChat Avatar Setup Tool**: Automated tool under `Tools > FireRat Shader > Avatar Setup` to generate VRChat Expressions Menus, radial puppets, toggles, submenus, and parameter assets for controlling shader features in-game with built-in 256-bit parameter budget tracking.
- **Safe Optional VRChat SDK Integration**: Dedicated fallback integration so the shader package compiles cleanly with zero errors in non-VRChat Unity projects while unlocking full avatar menu tools when the VRChat Avatar SDK is present.
- **LTCGI Polygon Area Lighting**: Real-time Linearly Transformed Cosines (LTCGI) area lighting evaluation with polygon clipping and specular/diffuse response across both BRP and URP (`_UseLTCGI`).
- **Multi-Language Web Documentation & i18n System**: Full documentation translation pipeline with localized docs in 14 languages (de-DE, en-US, es-ES, fr-FR, it-IT, ja-JP, ko-KR, pl-PL, pt-BR, ru-RU, th-TH, vi-VN, zh-CN, zh-TW) and a dynamic in-page language switcher.

### Changed
- **Forward+ & Clustered Lighting Upgrade (URP 17+ / Unity 6)**: Modernized additional light looping to use clustered light loops for enhanced multi-light performance in Unity 6 and URP 17+.
- **LTCGI & Dither Integer Performance**: Optimized LTCGI polygon loops using unsigned integer arithmetic and converted 4x4 Bayer matrix lookups to bitwise operations to eliminate slow signed integer division on mobile GPUs.
- **AudioLink Frequency Band Pre-Caching**: Pre-cached all four AudioLink frequency bands once per fragment, eliminating redundant texture fetches and branching across audio-reactive overlays, emission layers, and transition effects.
- **URP Additional Light Loop Performance**: Reused pre-sampled hair specular mask across main and additional lights in URP forward shading, eliminating redundant texture fetches per light.
- **BRP Refraction Grab Texture Fallback**: Added grab texture fallback handling for BRP screen refraction when camera depth textures are unavailable.
- **Master Shaders Property Parity**: Master shaders synchronized to 833 properties across all 6 shaders in 100% lockstep parity.

### Fixed
- **Parallax Occlusion Mapping Derivative Gradients**: Precomputed UV screen derivatives outside POM linear search loops to eliminate gradient calculation warnings and visual artifacts.
- **ForwardAdd Fur & Detail Normal Rendering**: Added full fur shading and detail normal evaluation to BRP ForwardAdd lighting passes.
- **Fur Geometry Shader Vertex Mutation**: Fixed vertex copy mutation in BRP and URP fur geometry shaders and enabled proper geometry stages on ForwardAdd passes.
- **ShadowCaster & DepthOnly Pass Parity**: Added missing dissolve, grid mask keywords, and stencil operations across URP ShadowCaster and DepthOnly auxiliary passes.
- **Meta Pass Emission & Lightmapping**: Corrected emission calculation, texture sampling, and instancing setups in both BRP and URP Meta passes for clean lightmap baking.
- **AudioLink Branch Safety**: Resolved uninitialized variable edge cases across audio spectrum, waveform, and waterfall visualizers.
- **DepthNormals Pass Vertex Collapse**: Fixed vertex collapse animation handling during depth-normal prepasses.
- **Material Lock Optimizer Keyword Stripping**: Corrected pass optimization so disabled features are cleanly stripped out rather than baked on when locking materials.
- **Pipeline Parity & Animation Timing**: Aligned vertex collapse and planar wipe animation timing across all BRP and URP passes.
- **Light Volume Spot Angle Division**: Guarded against potential division by zero in light volume spot light attenuation math.
- **URP Outline Fog & LookAt Normals**: Added fog calculation to URP Outline pass and corrected normal calculations for LookAt billboarding.
- **Internal Parallax Refraction Depth**: Corrected tangent-space camera view transformation in interior parallax, fixing inverted depth offsets.
- **SDF Face Shadow Tangent Basis**: Corrected the world-space tangent basis unpacking in anime face shadow lighting, resolving distorted face shadow angles.
- **BRP Clear Coat Reflection Probe Blending**: Added box projection and dual reflection probe blending support to clear coat reflections in Built-in pipeline.
- **Procedural Texture Sampling Stability**: Converted stochastic, internal parallax, bicubic, and animated gradient lookups to explicit LOD sampling, preventing mipmap derivative spikes and compilation warnings in dynamic branches.
- **Material Lock Optimizer Comment Handling**: Handled trailing comments on pragma directives properly during material optimization.
- **Inspector Property Search Cross-Version Support**: Improved hidden property detection via reflection to ensure hidden properties remain properly filtered across Unity 2022 and Unity 6.
- **Shade Shift Map Keyword Synchronization**: Corrected keyword states so shade shift maps activate immediately when assigned.
- **Global Auto Color Shift Evaluation**: Fixed color animation evaluation so automatic color and gradient shifts cycle even with zero initial manual offset.
- **Specular Highlight & Light Volume NaN Guards**: Guarded Kajiya-Kay specular highlights against zero-sin power evaluation NaNs, and added division-by-zero guards to Light Volumes GGX distribution and distance attenuation.

## [1.1.0] - 2026-08-28

### Added
- **Shader Diagnostic & Debug View HUD**: 11-mode in-viewport buffer isolation view (BaseColor, Normal, WorldNormal, Smoothness, Metallic, DirectShading, Roughness/GI, Emission, AudioLink, TexelDensity, Complexity) plus a live in-inspector Material Performance & Stats HUD.
- **OKLab Color Blending**: Perceptually uniform OKLab color space transforms for tint and theme-color blending, eliminating the muddy desaturation of RGB lerp.
- **Global Mask Channel Routing**: Route any RGBA color-mask channel into MatCap, Rim, Glitter, and Dissolve modules from a single inspector.
- **4-Layer Detail Normals with Bicubic Filtering**: Up to 4 independently scrolled and scaled detail normal layers, with 5-tap Catmull-Rom bicubic sampling and RNM/Whiteout blend options.
- **VRSL (VRC Studio Lighting) GI Reception**: Real-time reception for DMX stage fixtures, moving heads, lasers, and club lighting in VRSL-compatible VRChat worlds.
- **Alpha-to-Coverage Mip-Scaling**: Configurable derivative scaling on A2C cutout sharpening, preventing hair cards and foliage from thinning at distance in VR.
- **Animated GIF (GIF89a) Importer & Auto-Atlas**: Decode multi-frame GIFs in pure C#, auto-pack into a power-of-two square atlas, and apply the result to a target FireRat material.
- **HDR Bloom & Emission Luminance Clamp**: Quadratic-knee emission clamp with a soft knee to prevent blinding AudioLink bloom whiteouts in VR.
- **Dedicated Outline Stencil Controls**: Independent stencil mask, read/write, and pass/fail operations on the outline pass, so outlines can be excluded from interior, hair, or body meshes.
- **URP Light Layers**: Main and additional lights now respect mesh rendering layer masks in URP. BRP shows an informative fallback notice.
- **Dynamic Proximity Effects**: Distance-based Glow, Dissolve, Dither Transparency, and Color Tint actions triggered against the VR head, object pivot, or a custom world position.
- **Unity 6 URP Adaptive Probe Volumes (APV)**: Adaptive Probe Volume evaluation for probe volumes in URP 17+.
- **Two-Pass Transparency Sibling Shaders**: Dedicated BRP and URP variants with a backface depth prepass and frontface forward pass, solving alpha self-sorting on complex meshes.
- **Shell / Fur Sibling Shaders**: Dedicated BRP and URP variants with up to 8 extruded shell layers, gravity, wind sway, noise masking, tip thinning, root-to-tip gradient, and root AO. Inactive or capped shells collapse to zero raster cost, and the optimizer strips unused shell passes on material lock.
- **Multi-Material Batch Editor**: Scan an avatar hierarchy, batch-edit common properties, switch pipeline variants, and lock/optimize materials in one pass (`Tools > FireRat Shader > Multi-Material Batch Editor`).
- **VRChat Quest Fallback Baker**: Bake complex shader composites into mobile textures and generate a Quest-compatible avatar material (`Tools > FireRat Shader > VRChat Quest Fallback Baker`).

### Changed
- Master shaders synchronized to 828 properties across all 6 shaders in 100% lockstep parity.

## [1.0.8] - 2026-08-25

### Added
- **SDF Face Shadows**: Anime face shadow mapping via signed distance field textures (`_UseFaceSDF`, `_FaceShadowMap`).
- **Camera / Mirror Visibility Modes**: Hide materials from specific cameras, mirrors only, or a custom layer filter (`_CameraVisibilityMode`, `_MirrorDetectMode`, `_CustomCameraFilter`).
- **Emission Layers 2–4**: Three additional scrolling emission layers with independent maps, colors, masks, and AudioLink reactivity (`_UseEmission2/3/4`).
- **RGBA Color Mask**: Four-zone recolor workflow driven by an RGBA mask texture (`_UseRGBAColorMask`, `_RGBAColorMask`).
- **UV Tile Discard**: Toggle clothing/accessories per tile of a 4×4 UV grid across all passes (`_UseUVTileDiscard`).
- **Fluorescence Emission**: Emission that activates in dark scenes or reacts to scene brightness (`_UseFluorescence`).
- **UV Flow / Pathing**: Dual-phase cyclical UV scroll animation (`_UseUVFlow`).
- **PS1 Vertex Snapping**: Retro vertex snapping in screen- or object-space (`_UsePS1VertexSnapping`, `_PS1SnapResolution`).
- **LookAt Billboarding**: Faces the camera with full 3D or Y-axis-only modes (`_UseLookAt`, `_LookAtMode`, `_LookAtStrength`).
- **Stochastic Texture Sampling**: Hash-based sampling that eliminates tiling repetition (`_UseStochasticSampling`, `_StochasticScale`).
- **Network-Synced Time**: Animation time synchronized across players for multiplayer-consistent effects (`_UseNetworkTime`).
- **Photosensitivity Strobe Clamp**: Global intensity clamp for glitch/flicker/pulse effects (`_PhotosensitivitySafety`).
- **Toon Shadow Shaping**: Border, blur, and AO modulation controls for cel shadows (`_ToonShadowBorder`, `_ToonShadowBlur`, `_ToonShadowAO`).
- **Environmental Rim Light**: Rim lighting tinted by ambient/reflection probes (`_UseEnvRim`).
- **Monochrome & As-Unlit Lighting**: Toggles for monochrome light response and unlit-style shading (`_MonochromeLighting`, `_AsUnlitLighting`).
- **Outline Color Map**: Texture-driven outline coloring (`_OutlineColorTex`).
- **Multiply & Premultiplied Alpha Render Modes**: Additional blend setups alongside Opaque/Cutout/Transparent/Additive.
- **Panosphere & Polar Projection**: Two extra texture projection modes.
- **Separate Shadow Cull Mode**: Independent cull mode for the shadow caster pass.
- **Polygon Offset Controls**: Depth bias factor/units to resolve z-fighting (`_OffsetFactor`, `_OffsetUnits`).
- **VRC Fallback Tag Dropdown**: Shader fallback selection directly in the inspector.
- **Smoothed Normal Baker**: Editor tool under `Tools > FireRat Shader` averaging split normals into vertex colors/UV2/UV3 to remove outline seams.
- **Batch Keyword Re-Sync Tool**: Editor utility under `Tools > FireRat Shader` to re-sync material keywords in bulk after shader updates.
- **Community Localization System**: Inspector UI localized via JSON packs in 14 languages with real-time hot-reloading, English fallback, and a language selector toolbar.
- **OpenLit Harmony Mode**: Toggleable diffuse half-Lambert calculation conforming to CC0 OpenLit conventions for lighting consistency across avatar crowds (`_UseOpenLitMath`).
- **Inspector Property Search Bar**: Live filtering toolbar in the material inspector with fuzzy property name / label search and auto-expanding section matching.
- **In-Editor Texture Channel Packer & Material Baker**: Editor window under `Tools > FireRat Shader` to bake HSV shifts, RGBA color masks, and decals into unified albedo maps, plus linear RGBA mask/metallic/AO/smoothness channel packing.
- **Automated Material Migration Converter**: Editor window under `Tools > FireRat Shader` to convert Poiyomi, lilToon, Standard, and UTS materials to FireRatShader with automatic texture and parameter remapping.
- **VRC Light Volumes**: Per-pixel voxel ambient lighting in worlds using REDSIM's VRCLightVolumes v2, including its analytic point/spot/area lights (`_UseVRCLV`, `_VRCLVIntensity`, `_VRCLVNormalBias`). Falls back transparently to standard light-probe SH outside VRCLV worlds and below SM4.5; gated to the High performance tier.

### Changed
- Auxiliary passes (shadow, depth-normals, depth-only, motion vectors, outline) now match the main pass for camera visibility filtering, LookAt billboarding, PS1 vertex snapping, near-camera fade, and AudioLink waveform vertex displacement; URP DepthOnly additionally applies planar wipe, chroma key, hologram clipping, dithered alpha, and clipping masks.
- Overlay effects (scanline, interlace, noise, posterize, invert, grid, rim) are now keyword-gated, so disabled effects compile to zero cost.
- Expensive surface effects (glitter, grid, psychedelic, fractals) are skipped beyond the effect distance LOD, and trivial color math is skipped at default values.
- UV0/UV1 are packed into a single float4 interpolator in both pipelines, freeing a texture coordinate slot.
- URP additional lights now work under Forward+ and clustered lighting paths in Unity 6.
- Unified Cutout clipping and Alpha-to-Coverage sharpening across all forward passes with strict compile-time gating.
- Detail-normal distance LOD fade hardened to prevent high-frequency VR normal shimmering.
- Lit forward passes target shader model 4.5 to support Light Volume sampling.
- Integrated REDSIM VRCLightVolumes v2 sampling core with full MIT attribution in `LICENSE.txt`.

### Fixed
- Chroma key clipping now also applies in the additive (ForwardAdd) lighting pass.
- Flipbook Ping-Pong and Random playback modes now correctly toggle their keywords.
- AudioLink avatar-parameter fallback now applies when no world AudioLink source is present (editor companion/stub path).
- AudioLink stub texture lookups use correct texel-size math, fixing spectrum/waveform/history sampling with the editor companion.
- Dissolve glitch block pattern is now hashed in world space in every pass for camera-independent, VR-stable behavior; remaining POM step-count divisions guarded.
- Stereo screen-space macros modernized for current Unity versions.
- Motion-vector velocity calculation guards against zero-weight division artifacts.
- Advanced collapse animation timing fixed in the depth-normals pass (mismatched phase boundaries).

## [1.0.7] - 2026-08-23

### Added
- **Video Player Mode**: AVPro video texture support with flip and gamma handling for screen-space video playback.
- **Screen Refraction**: Real-time screen-space refraction for transparent materials with configurable intensity and chromatic aberration.
- **Geometric Specular AA**: Kaplanyan-style specular anti-aliasing for cleaner highlights at grazing angles.
- **PBR Decals**: Decals now support normal map, metallic, and smoothness for full PBR surface modification.
- **Backface Texture & Emission**: Separate texture and emission for back faces of double-sided materials.
- **A2C Edge Sharpening**: Alpha-to-coverage edge sharpening for cleaner cutout edges on MSAA.
- **Render Settings**: Per-material ZTest, ColorMask, and Queue Offset controls.
- **DepthOnly Pass (URP)**: Lightweight depth-only pass for URP to support depth-prepass and shadow cascades.
- **HSV Mask**: Per-pixel mask to restrict hue/saturation/value adjustments to specific regions.
- **SSS Transmission Map**: Subsurface scattering transmission color map for thickness-based light scattering.
- **Triplanar Normal Maps**: Triplanar projection support for normal maps.
- **Normal Blend Mode**: RNM (Reoriented Normal Mapping) vs Whiteout blend modes for detail normals.
- **Custom Fog Color Override**: Per-material fog color tint.
- **Emission Pulse**: Animated emission intensity pulsing with configurable speed and strength.
- **Outline Width Map**: Texture-driven outline width variation.
- **Effect Distance LOD**: Distance-based fade for heavy procedural effects (fractals, triplanar, etc.).
- **Vertex Color Alpha as Opacity**: Option to use vertex color alpha for opacity.
- **Two-Sided Lighting Toggle**: Per-material two-sided lighting enable/disable.
- **Decal Replace Blend Mode**: New replace blend mode for decals.
- **Depth Fade**: Soft particle depth fade for transparent materials near opaque geometry.
- **Shadow Receive Strength**: Per-material shadow intensity multiplier.
- **Alpha to Coverage**: MSAA-friendly alpha-to-coverage for cutout materials.
- **Rim Mask**: Texture mask for rim lighting.
- **Outline Lighting Mix & Z Offset**: Blend outline with scene lighting and control outline depth offset.
- **Decal Bounds Clamp**: Clamp decal projection to a defined bounding box.
- **Global Animation Speed Multiplier**: Master speed control for all animated effects.

### Changed
- Reworked toon tone tiers; secondary tones now gated to main light direction.
- Moved RNM normal blend and two-sided flag into ForwardAdd pass for parity.
- Removed MatCap stereo eye flip overrides.
- Optimizer now strips ForwardAdd pass for unlit/low-perf materials.
- Optimizer strips URP depth/motion passes and bakes shader features.
- Depth, motion, shadow, and outline passes now use world-space hashing for VR-safe dissolve glitch.
- AudioLink stub UV mapping fixed.
- POM steps guarded against zero division.
- Dissolve direction normalization guarded against zero vector.
- Audio spectrum inner radius clamped to avoid edge artifacts.
- URP LOD cross-fade and normal unpack macros fixed.
- Compile sweep runs on all pipeline shaders.
- Added null-safe property retrieval with error handling in GUI.
- Unity menu commands for standard and URP AudioLink companion objects.

### Fixed
- Dithered alpha clipping threshold now consistent across all passes.
- Planar wipe clip epsilon and URP depth fade sampling fixed.
- Toon lighting math corrected; secondary tones properly gated.
- Dissolve/clip logic unified across depth, motion, shadow, and outline passes.
- Outline near-camera fade and fresnel now use correct world position.
- View direction initialization fixed for URP.
- Raw UV pass-through for mask/dissolve-dependent features ensured.
- Color shift migration guard hardened.
- Flicker mode enum dropdown added to inspector.
- Chroma key and hologram clipping now apply in shadow and depth-normals passes.
- Shader keyword registration for chroma key and hologram.
- Known fallback shader names whitelisted in audit tests.
- Low-perf surface style override removed.

## [1.0.6] - 2026-08-19

### Added
- **Hologram Effect** (Overlays): `_UseHologram`, `_HoloColor`, `_HoloScanlineTiling`, `_HoloScanlineSpeed`, `_HoloRimPower`, `_HoloStrength`, `_HoloAlphaStrength` — animated scanline hologram with flicker, rim glow, and alpha modulation.
- **Chroma Key** (Transitions): `_UseChromaKey`, `_ChromaKeyColor`, `_ChromaKeyThreshold`, `_ChromaKeySmoothing` — green-screen keying that removes a key color from the material.
- **Value (Brightness) Adjustment** (Color Controls): `_ValueAdjust` HSV value control alongside hue shift and saturation.
- **Outline Pulse**: `_OutlinePulseSpeed`, `_OutlinePulseStrength` — pulse the outline brightness over time.
- **Outline AudioLink Color Shift**: Outline color shift now responds to a selectable AudioLink band instead of always using the global animation speed.
- **Distance LOD Start** (Performance): `_DistanceFade_LOD` inspector property for distance-based LOD shading simplification.
- **Avatar Param Fallback** (AudioLink): `_AL_AvatarParamFallback` inspector property to fall back to local avatar parameters / OSC inputs when no world AudioLink source is present.
- **Depth & Motion Pass Parity**: Depth-normals and motion-vector passes now match the main pass for VAT/ripple displacement, all dissolve modes (including advanced animation and AudioLink), planar wipe, dithered transparency, clipping-mask scroll, and UV-set selection.
- **Shadow & Forward-Add Parity**: Shadow-caster and additive-light passes now support dithered transparency, advanced dissolve animation, and UV-set selection; parallax occlusion mapping (POM) now applies in the ForwardAdd pass.

### Changed
- Unified the BRP and URP material inspectors into a shared base class, so both pipelines expose identical layouts and behavior.
- Fractal3D color shift now respects the "Enable Global Auto Color Shift" toggle and global animation speed.
- Added guard rails to the material lock optimizer.

### Fixed
- Toon mid/highlight colors (`_MidColor`, `_HighlightColor`) no longer incorrectly lerp with alpha.
- Specular highlight and energy-conservation math corrected in the lighting model.
- UV distortion now samples via explicit LOD to avoid derivative artifacts.
- Pattern sparsity division-by-zero safety and surface-style keyword guards tightened in both pipelines.
- Various BRP/URP stability and parity fixes.

## [1.0.5] - 2026-08-17

### Added
- **Material Lock Shader Optimizer**: Upgraded toolbar material locking into an automated shader optimizer that strips unused passes (e.g. Outline, Refraction) and dead keyword variants on demand when locking materials for avatars, worlds, and standalone builds.
- **Dual-Step Anime Cel Shadows**: Added 2nd shadow tier (`_Shadow2Color`, `_ToonThreshold2`, `_ToonHardness2`) for multi-tone cartoon and anime character shading.
- **Light Clamping**: Added min/max environment light brightness gates (`_MinLightBrightness`, `_MaxLightBrightness`) to prevent models from becoming pitch black in dark rooms or overexposed in bright worlds.
- **Shade Shift Map**: Added per-pixel shadow threshold biasing (`_ShadeShiftMap`, `_ShadeShiftMapUVSet`, `_ShadeShiftStrength`) for fixed clothing folds, muscle creases, and ambient occlusion.
- **Step Specular**: Added cartoon step specular highlight mode (`_StepSpecular`, `_StepSpecularThreshold`, `_StepSpecularHardness`).
- **Secondary MatCap**: Added MatCap 2 layer (`_UseMatCap2`, `_MatCap2Tex`, `_MatCap2BlendMode`, `_MatCap2Intensity`, `_MatCap2Mask`, `_MatCap2MaskUVSet`) with normal map perturbation (`_MatCapNormalPerturb`) and VR perspective correction (`_MatCapPerspectiveCorrection`).
- **Smoothed Outline Normals**: Added vertex stream normal source selection (`_OutlineNormalSource`: Mesh Normals, Vertex Colors, UV2, UV3) to eliminate split-normal seams on low-poly meshes.
- **Outline Polish**: Added screenspace min/max width distance clamping (`_OutlineMinWidth`, `_OutlineMaxWidth`) and animated vertex jitter noise (`_OutlineNoiseScale`, `_OutlineNoiseSpeed`, `_OutlineNoiseStrength`).
- **Dithered Transparency**: Added Bayer matrix screen-door stippled transparency (`_UseDitheredAlpha`, `_DitherStrength`) for sorting-free transparent fabrics, hair, and cross-fades in VR.
- **Shadow Cutoff Override**: Added independent shadow-caster alpha cutoff threshold (`_UseShadowCutoffOverride`, `_ShadowCutoff`).
- **AudioLink Decals & Proximity Dissolve**: Added AudioLink reactivity on Decals 1, 2, and 3 (`_AL_DecalBand`, `_AL_DecalStrength`), and near-camera VR proximity dissolve (`_UseNearCameraFade`, `_NearCameraFadeRadius`).
- **Hair Specular Mask**: Added `_HairSpecMask` (with `_HairSpecMaskUVSet`) to restrict Kajiya-Kay hair highlights per-pixel.
- **Decal Lighten / Overlay Blend Modes**: Added `Lighten` and `Overlay` blend modes to all three decal layers.
- **Outline Pass Transparency**: Outline passes now honor fresnel, uniform, and dithered transparency plus near-camera fade, matching the main surface (BRP & URP).
- **Shadow-Cast Animations**: Animated/AudioLink dissolve, planar wipe, and AudioLink waveform vertex displacement now apply in the shadow pass.

### Changed
- Hoisted normal-map sampling and the two-sided normal flip into the fragment entry so surface styles (MatCap, Triplanar, Skybox) use the perturbed normal; normal flip-Y added on BRP.
- Normalized the URP Fractal3D raymarch ray direction to match BRP.
- Moved `Cull`/`Blend`/`ZWrite` into the ForwardBase pass and synced `_ZWrite` with the render mode; transparent render mode now applies `_Alpha` without the manual transparency toggle.
- Replaced the instancing property buffer with plain uniforms to fix compile issues.
- Optimizer now generates unique shader names and defers lock/unlock via delayed editor calls to avoid inspector GUI errors.

### Fixed
- Outline normal source UV2/UV3 now read the correct texture coordinate channels; hair specular mask UVs fixed in the ForwardAdd pass.
- AudioLink theme color interpolation now blends smoothly between theme colors.
- Dissolve animation timing (advanced anim, ping-pong, min/max) now matches across shadow, depth-normal, and motion-vector passes; AudioLink dissolve strength tuned.
- Planar wipe hardness clamped to avoid division issues in depth and motion passes.
- Outline and Refraction are now built-in passes of the main shader, so the separate variant shaders were removed.

## [1.0.4] - 2026-08-16

### Added
- AudioLink global controls: `_AL_GlobalSmoothing`, `_AL_GlobalMin`, `_AL_GlobalMax` that apply to all AudioLink-driven features via a unified remapping function (BRP and URP, including stubs and wrapper generators).
- AudioLink-driven emission blinking (band-selected strobing) with adjustable strength.
- Material locking — lock/unlock materials to prevent accidental edits (persists via a hidden property and override tag).
- Save / Load Preset — export the full material state (floats, colors, vectors, textures with tiling/offset) to JSON and re-import it.
- Copy / Paste / Reset per inspector section for quick reuse of property groups across materials.
- Multiple decal layers (up to 3 independent decals) with rotation, UV set, blend mode, and strength.
- Back-face color for double-sided materials.
- Vertex color blending modes (Replace / Multiply / Add).
- Detail texture blend modes (Overlay / Multiply / Additive / Soft Light).
- Outline texture with scrolling and vertical gradient outlines.
- Rim modes (Outer / Inner) and depth-based rim highlighting.
- Hue shift and saturation adjustment controls.
- Grid tiling X/Y, glitter shape selection, MatCap masking, normal map flip-Y, and color-mask-driven alpha channel control.
- UV1 channel selection for the main texture, detail normal, emission mask, decals, outline, MatCap mask, rain ripple, and color mask.
- AudioLink temporal-history sampling and history blending for smoothed spectrum queries.

### Changed
- Standardized uniform and texture declarations across all passes.
- Presets now default to saving texture transforms.
- Section Reset now respects each material's lock state and no longer writes selection-wide texture assignments.
- Detail normal map now supports tiling/offset (removed `[NoScaleOffset]`).
- Release-draft workflow now triggers only on `main` branch pushes and tags (explicit dispatches still allowed).
- Documentation updated to V1.0.4 covering the new material tools, global AudioLink controls, and new properties.

### Fixed
- Shader compilation failures caused by excessive keyword counts from legacy procedural mode keywords in all BRP and URP passes.
- Missing-declaration compile errors from feature-guarded uniforms/samplers.
- GPU instancing property buffer that caused undeclared-variable issues in some passes.
- Preset load so texture scale/offset apply when transform fields are missing from JSON.
- AudioLink channel handling and spectrum history row lookups.
- Rain ripple UV coordinates.
- Detail-mode overlay blending.

## [1.0.3] - 2026-08-16

### Added
- **Audio Spectrum Visualizer** with four modes: EQ Bars, Continuous Curve, Radial Spectrum, and 2D Waterfall Spectrogram. Real-time FFT analysis on the shader, logarithmic frequency scaling, mirroring, multiple color modes (solid, gradient, hue shift, rainbow, AudioLink theme), and configurable projection spaces (UV, screen, world, local).
- **Audio Waveform Visualizer** with five modes: oscilloscope trace, filled ribbon, polar ring, stereo Lissajous X-Y scope, and vertex displacement (deforms geometry along normals). Channel selection (mono/left/right), cycle count, glow, color modes, and blending.
- AudioLink editor companion improvements (BRP & URP): perceptual log-binning of the spectrum, waveform phase-locking to zero-crossings, and frame-rate-independent exponential smoothing.
- AudioLink stub functions for spectrum, waveform, and theme color sampling that work with both the real AudioLink texture and the editor companion fallback.
- Dedicated "AudioLink Visualizers" inspector section.
- "Shadowmask Fallback" option.

### Changed
- Visualizers are keyword-gated, so they compile to zero cost when disabled.
- Restructured URP keyword management to reduce variant bloat and prevent keyword conflicts.
- Improved nav accessibility in the docs with a scrollable menu and nested sub-links.
- Documentation bumped to V1.0.3.

### Fixed
- Procedural color shift migration so legacy materials correctly use the dedicated toggle; legacy shift fallback restored.
- AudioLink spectrum wrapper reading non-DFT rows for history.
- Planar wipe shadow/depth/motion boundary consistency across shadow, depth-normal, and motion-vector passes.
- Tangent space, spherical projection clamping, gradient animation UV, dissolve edge handling, grid blending, wipe direction normalization, and pattern thickness safety in both BRP and URP.
- Blend modes for opaque/cutout/additive render modes.

## [1.0.2] - 2026-08-09

### Changed
- Refactored URP lighting into a per-surface parameter block so environment reflections, clear coat, subsurface scattering, and metallic/specular setup are computed once and applied after all light contributions.
- Added proper URP light/shadow multi-compile directives so main and additional lights cast and receive shadows correctly.
- Extracted duplicated VAT and ripple displacement code into shared displacement helpers and applied them across vertex, outline, shadow-caster, depth-normals, and motion-vector passes.
- Converted many global shader features to local variants to reduce variant explosion.
- Replaced the separate depth screen position interpolator with unified screen position across all depth-based overlays and intersection fade.
- Simplified the URP custom inspector and aligned keyword synchronization between BRP and URP.
- Documentation updated for the dual-pipeline structure.

### Fixed
- URP real-time lighting calculations.
- Re-enabled subsurface scattering (`_USE_SSS_ON`), clear coat (`_USE_CLEAR_COAT_ON`), anisotropy (`_USE_ANISOTROPIC_ON`), and distortion-mode keyword selection in both BRP and URP.
- Restored metallic-gloss map (`_METALLICGLOSSMAP_ON`) and vertex-color emission (`_USE_VC_EMISSION_ON`) keyword handling.
- Transparency so transparency keywords are set for Transparent and Additive render modes, not only when the manual transparency toggle is on.
- Surface-style feature gates (Skybox, Galaxy, Triplanar, MatCap, Fractal3D) so they correctly require the interpolators they use.
- Shadow parity and animated displacement consistency across all passes.

### Removed
- Obsolete/hidden properties: `_EditorSafeMode`, `_DistortionEnableAnim`, `_DissolveEnableAnim`, `_AnimateVoronoi`, `_VoronoiAnimSpeed`.

## [1.0.1] - 2026-08-08

### Added
- Flexible texture and procedural projection modes: UV, world, local, screen, planar, spherical, cylindrical, and triplanar mapping (main textures, dissolve, and detail overlays).
- Expanded lighting: toon shading, MatCap blending, custom light overrides, skin, hair, eye, clear-coat, thickness, and environment-reflection options.
- POM, wetness, decals, VAT animation, refraction materials, stencil controls, and improved dissolve effects.
- Motion-vector, depth-normal, meta, and additive-light rendering support.
- Complete Unity URP material editor with organized controls for surfaces, lighting, animation, effects, outlines, transparency, and advanced rendering.
- Optional audio-reactive shader support with playback-aware spectrum and frequency data, plus automatic fallback when AudioLink is unavailable.
- Outline space options (screen / local / world) with an expanded width range.
- Custom lighting configuration template.

### Changed
- Outline controls now support screen, local, and world space.
- Documentation updated to version 1.0.1 with BRP and URP guidance, expanded feature descriptions, new workflow examples, and improved badges and dark-theme table styling.

### Fixed
- Manual and automatic color-shift behavior across shader and outline animations.
- URP shader compilation issues; stopped tracking Unity `.meta` files.
- Tangent-space usage for Galaxy, Crystal, and Glitter surface styles.
- Outline shader compilation with lighting fallbacks; inspector null-safety.
- Depth buffer sampling via a dedicated depth screen position; device-depth handling in all variants.

## [1.0.0] - 2026-06-05

### Added
- Extensive AudioLink-driven controls across many effects.
- New Psychedelic and 3D Fractal surface styles.
- Standard PBR lighting and updated material UI/defaults.
- Documentation for AudioLink, lighting (Standard PBR), surface styles, and procedural patterns.

### Changed
- Refined shader logic for improved performance and consistency in AudioLink and dissolve animations.

### Fixed
- Improved numerical stability, stereo/single-pass robustness, safer defaults, and more reliable reset/section behavior across shader effects and editor UI.
- Outline fragment shader time handling for consistent color animation.

### Removed
- Legacy mobile/Quest shader and the editor-side audio helper.
