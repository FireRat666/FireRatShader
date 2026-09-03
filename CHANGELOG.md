# Changelog

All notable changes to FireRatShader are documented in this file.

Versions cover both the BRP (`FireRatShader/`) and URP (`FireRatShaderURP/`) pipeline variants, which are kept in sync.

## [1.1.1] - 2026-09-03

### Added
- **VRChat Avatar Setup Tool**: Automated tool (`FireRatAvatarSetup.cs`) under `Tools > FireRat Shader > Avatar Setup` to generate VRChat Expressions Menus, radial puppets, toggles, submenus, and parameter assets for controlling shader features in-game with built-in 256-bit parameter budget tracking.
- **Safe Optional VRChat SDK Integration**: Dedicated assembly definition (`FireRatShader.AvatarSetup.Editor.asmdef`) with `versionDefines` and `defineConstraints` for `com.vrchat.avatars`, plus a fallback window (`FireRatAvatarSetupFallback.cs`) so the project compiles cleanly with zero errors in non-VRChat Unity projects.
- **LTCGI Polygon Area Lighting**: Real-time Linearly Transformed Cosines (LTCGI) area lighting evaluation with polygon clipping and specular/diffuse response across both BRP and URP (`_UseLTCGI`).
- **Multi-Language Web Documentation & i18n System**: Full documentation translation pipeline with localized docs in 14 languages (de-DE, en-US, es-ES, fr-FR, it-IT, ja-JP, ko-KR, pl-PL, pt-BR, ru-RU, th-TH, vi-VN, zh-CN, zh-TW) and a dynamic in-page language switcher.

### Changed
- **Forward+ & Clustered Lighting Upgrade (URP 17+ / Unity 6)**: Modernized additional light looping to use `_CLUSTER_LIGHT_LOOP` instead of deprecated `_FORWARD_PLUS`.
- **LTCGI & Dither Integer Performance**: Optimized LTCGI polygon loops using unsigned integer (`uint`) arithmetic and converted 4x4 Bayer matrix lookup to bitwise operations to eliminate slow signed integer division.
- **AudioLink Frequency Band Pre-Caching**: Pre-cached all four AudioLink frequency bands once per fragment, eliminating redundant texture fetches and branching across audio-reactive overlays, emission layers, and transition effects.
- **URP Additional Light Loop Performance**: Reused pre-sampled hair specular mask across main and additional lights in URP forward shading, eliminating redundant texture fetches per light.
- **BRP Refraction Grab Texture Fallback**: Added `_GrabTexture` fallback handling for BRP screen refraction when camera depth texture is unavailable.
- **Master Shaders Property Parity**: Master shaders synchronized to 833 properties across all 6 shaders in 100% lockstep parity.

### Fixed
- **Parallax Occlusion Mapping Derivative Gradients**: Precomputed UV screen derivatives (`ddx`/`ddy`) outside the POM linear search loop to prevent undefined gradient calculation warnings in dynamic loops.
- **ForwardAdd Fur & Detail Normal Rendering**: Added full fur shading and detail normal evaluation (`detailNormalSample`) to BRP ForwardAdd lighting passes.
- **Fur Geometry Shader Vertex Mutation**: Fixed vertex copy mutation in BRP and URP fur geometry shaders and enabled proper geometry stages on ForwardAdd passes.
- **ShadowCaster & DepthOnly Pass Parity**: Added missing dissolve, grid mask keywords, and stencil operations across URP ShadowCaster and DepthOnly auxiliary passes.
- **Meta Pass Emission & Lightmapping**: Corrected emission calculation, texture sampling, and instancing setups in both BRP and URP Meta passes for clean lightmap baking.
- **AudioLink Uninitialized Variable Flow**: Initialized explicit return variables and unified branch exits in `FRAudioSpectrum`, `FRAudioWaveform`, and `EvaluateAudioSpectrumWaterfall` to eliminate uninitialized variable compiler warnings.
- **DepthNormals Pass Vertex Collapse Compilation**: Declared missing `on_end`, `vis_end`, and `off_end` variables in `FireRatDepthNormals.cginc` for vertex collapse animations.
- **Material Lock Optimizer Inactive Keyword Stripping**: Corrected `StripShaderFeatures` in `FireRatShaderOptimizer.cs` where disabled single-keyword pragmas were incorrectly `#define`d as `1` instead of being stripped when locking materials.
- **Pipeline Parity & Animation Timing**: Aligned vertex collapse and planar wipe animation time calculations across BRP and URP passes (`FireRatDepthNormalsURP.hlsl`, `FireRatMotionVectors.cginc`, `FireRatMotionVectorsURP.hlsl`).
- **Light Volume Spot Angle Division**: Guarded against potential division by zero in light volume spot light attenuation math.
- **URP Outline Fog & LookAt Normals**: Added fog calculation to URP Outline pass and corrected normal calculation for LookAt billboarding.
- **Internal Parallax Tangent Space View Direction**: Corrected matrix multiplication order (`mul(viewDir, tbn)`) for transforming the camera view vector into tangent space, fixing inverted interior parallax ray offsets.
- **SDF Face Shadow Tangent Basis**: Corrected the world-space tangent basis vector unpacking in BRP and URP face shadow lighting (`float3(i.tspace0.x, i.tspace1.x, i.tspace2.x)` instead of `i.tspace0.xyz`), resolving distorted face shadow angles.
- **BRP Clear Coat Reflection Probe Blending**: Replaced raw single-probe cubemap sampling with `GetBiRPIndirectSpecular` to support box projection and dual reflection probe blending on clear coat reflections.
- **Procedural Texture Sampling Derivative Artifacts**: Converted stochastic, internal parallax, bicubic, and animated gradient lookups to explicit LOD sampling (`tex2Dlod` / `SAMPLE_TEXTURE2D_LOD`), preventing mipmap derivative spikes and compilation warnings in dynamic branches.
- **Material Lock Optimizer Trailing Pragma Comments**: Stripped trailing line comments (`//`) from `#pragma` directives during keyword regex extraction in `FireRatShaderOptimizer.cs` to prevent comment text from being incorrectly parsed as keywords.
- **Inspector Property Search Cross-Version Support**: Handled `[HideInInspector]` property detection via reflection across Unity versions (`propertyFlags` vs. `flags`) in `FireRatShaderGUIBase.Drawers.cs`, resolving obsolete API warnings and ensuring hidden properties remain filtered in Unity 2022 and Unity 6.
- **Shade Shift Map Keyword Synchronization**: Registered `_USE_SHADE_SHIFT_ON` keyword and UV requirements in the material editor so shade shift maps activate properly at runtime.
- **Global Auto Color Shift Evaluation**: Fixed early exit check in `GetAnimatedColor` so automatic color and gradient animations run even when manual shift values are set to zero.
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
- **Unity 6 URP Adaptive Probe Volumes (APV)**: APV evaluation via `SampleProbeVolumeSH` for `PROBE_VOLUMES_L1` and `PROBE_VOLUMES_L2` in URP 17+.
- **Two-Pass Transparency Sibling Shaders**: Dedicated BRP and URP variants with a backface depth prepass and frontface forward pass, solving alpha self-sorting on complex meshes.
- **Shell / Fur Sibling Shaders**: Dedicated BRP and URP variants with up to 8 extruded shell layers, gravity, wind sway, noise masking, tip thinning, root-to-tip gradient, and root AO. Inactive or capped shells collapse to zero raster cost, and the optimizer strips unused shell passes on material lock.
- **Multi-Material Batch Editor**: Scan an avatar hierarchy, batch-edit common properties, switch pipeline variants, and lock/optimize materials in one pass (`Tools/FireRat Shader/Multi-Material Batch Editor`).
- **VRChat Quest Fallback Baker**: Bake complex shader composites into mobile textures and generate a Quest-compatible avatar material (`Tools/FireRat Shader/VRChat Quest Fallback Baker`).

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
- **Smoothed Normal Baker**: Editor tool (`FireRatSmoothedNormalBaker.cs`) averaging split normals into vertex colors/UV2/UV3 to remove outline seams.
- **Batch Keyword Re-Sync Tool**: Editor utility (`FireRatBatchKeywordSync.cs`) to re-sync material keywords in bulk after shader updates.
- **Community Localization System**: Inspector UI localized via JSON packs in 14 languages with real-time hot-reloading, English fallback, and a language selector toolbar (`FireRatLocalization.cs`, `Languages/`).
- **OpenLit Harmony Mode**: Toggleable diffuse half-Lambert calculation conforming to CC0 OpenLit conventions for lighting consistency across avatar crowds (`_UseOpenLitMath`, `_USE_OPENLIT_MATH_ON`).
- **Inspector Property Search Bar**: Live filtering toolbar in `FireRatShaderGUIBase.Drawers.cs` with fuzzy property name / label search and auto-expanding section matching.
- **In-Editor Texture Channel Packer & Material Baker**: Editor window (`FireRatTextureBaker.cs`) under `Tools/FireRat/` to bake HSV shifts, RGBA color masks, and decals into unified albedo maps, plus linear RGBA mask/metallic/AO/smoothness channel packing.
- **Automated Material Migration Converter**: Editor window (`FireRatMaterialConverter.cs`) to convert Poiyomi, lilToon, Standard, and UTS materials to FireRatShader with automatic texture and parameter remapping.
- **VRC Light Volumes**: Per-pixel voxel ambient lighting in worlds using REDSIM's VRCLightVolumes v2, including its analytic point/spot/area lights (`_UseVRCLV`, `_VRCLVIntensity`, `_VRCLVNormalBias`). Falls back transparently to standard light-probe SH outside VRCLV worlds and below SM4.5; gated to the High performance tier.

### Changed
- Auxiliary passes (shadow, depth-normals, depth-only, motion vectors, outline) now match the main pass for camera visibility filtering, LookAt billboarding, PS1 vertex snapping, near-camera fade, and AudioLink waveform vertex displacement; URP DepthOnly additionally applies planar wipe, chroma key, hologram clipping, dithered alpha, and clipping masks.
- Overlay effects (scanline, interlace, noise, posterize, invert, grid, rim) are now keyword-gated, so disabled effects compile to zero cost.
- Expensive surface effects (glitter, grid, psychedelic, fractals) are skipped beyond the effect distance LOD, and trivial color math is skipped at default values.
- UV0/UV1 are packed into a single float4 interpolator in both pipelines, freeing a TEXCOORD slot.
- URP additional lights now work under Forward+ / cluster light loop rendering paths (`_CLUSTER_LIGHT_LOOP`, Unity 6).
- Unified Cutout clipping and Alpha-to-Coverage sharpening in `FireRatFrag.cginc`, `FireRatFrag.hlsl`, and `FireRatForwardAdd.cginc` with strict `#if defined(_RENDER_MODE_CUTOUT)` compile-time gating.
- Detail-normal distance LOD fade hardened to prevent high-frequency VR normal shimmering.
- Lit forward passes (BRP ForwardBase/ForwardAdd, URP UniversalForward) target shader model 4.5 to support Light Volume sampling (VRChat PC builds are DX11-only).
- Vendored REDSIM VRCLightVolumes v2 sampling core as mirrored includes `FireRatLightVolumes.cginc`/`.hlsl` (MIT); attribution added to `LICENSE.txt` so it survives the comment-stripping release builder.

### Fixed
- Chroma key clipping now also applies in the additive (ForwardAdd) lighting pass.
- Flipbook Ping-Pong and Random playback modes now correctly toggle their keywords.
- AudioLink avatar-parameter fallback now applies when no world AudioLink source is present (editor companion/stub path).
- AudioLink stub texture lookups use correct texel-size math, fixing spectrum/waveform/history sampling with the editor companion.
- Dissolve glitch block pattern is now hashed in world space in every pass for camera-independent, VR-stable behavior; remaining POM step-count divisions guarded.
- Stereo screen-space macros modernized (`UNITY_STEREO_INSTANCING_ENABLED`) for current Unity versions.
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
- Added SafeGetFloat helper with error handling in GUI.
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
- **Material Lock Shader Optimizer** (`FireRatShaderOptimizer.cs`): Upgraded toolbar material locking into an automated shader optimizer that strips unused passes (e.g. Outline, Refraction) and dead keyword variants on demand when locking materials for avatars, worlds, and standalone builds.
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
- Optimizer now generates unique shader names (material GUID suffix) and defers lock/unlock via `delayCall` to avoid inspector GUI errors.

### Fixed
- Outline normal source UV2/UV3 now read the correct TEXCOORD channels; hair specular mask UVs fixed in the ForwardAdd pass.
- AudioLink theme color interpolation now blends smoothly between theme colors.
- Dissolve animation timing (advanced anim, ping-pong, min/max) now matches across shadow, depth-normal, and motion-vector passes; AudioLink dissolve strength tuned.
- Planar wipe hardness clamped to avoid division issues in depth and motion passes.
- Outline and Refraction are now built-in passes of the main shader, so the separate `_Outline` and `_Refraction` variant shaders were removed.

## [1.0.4] - 2026-08-16

### Added
- AudioLink global controls: `_AL_GlobalSmoothing`, `_AL_GlobalMin`, `_AL_GlobalMax` that apply to all AudioLink-driven features via a new `ProcessAudioLinkValue` remapping function (BRP and URP, including stubs and wrapper generators).
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
- Rewrote `FireRatShaderVariables.cginc` so all uniforms and texture samplers are declared unconditionally instead of being wrapped in feature-specific `#if` guards.
- Presets now default to saving texture transforms.
- Section Reset now respects each material's lock state and no longer writes selection-wide texture assignments.
- Detail normal map now supports tiling/offset (removed `[NoScaleOffset]`).
- Release-draft workflow now triggers only on `main` branch pushes and tags (explicit dispatches still allowed).
- Documentation updated to V1.0.4 covering the new material tools, global AudioLink controls, and new properties.

### Fixed
- Shader compilation failures caused by excessive keyword counts from the `_DISTORTION_MODE_*` and `_PROCEDURAL_MODE_*` `#pragma shader_feature_local` declarations in all BRP and URP passes.
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
- Restructured URP keyword management (master interpolator, surface styles, AudioLink activation) to reduce variant bloat and prevent keyword conflicts.
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
- Extracted duplicated VAT and ripple displacement code into shared `ApplyVAT` and `ApplyRipple` helpers (BRP `FireRatShaderFunctions.cginc`, URP `FireRatShaderFunctions.hlsl`) and applied them across vertex, outline, shadow-caster, depth-normals, and motion-vector passes.
- Converted many global `#pragma shader_feature` directives to `shader_feature_local` to reduce variant explosion.
- Replaced the separate `depthScreenPos` interpolator with `screenPos` everywhere for depth-based overlays and intersection fade.
- Simplified the URP custom inspector and aligned keyword synchronization between BRP and URP.
- Documentation and GEMINI.md updated for the dual-pipeline structure.

### Fixed
- URP real-time lighting calculations.
- Re-enabled subsurface scattering (`_USE_SSS_ON`), clear coat (`_USE_CLEAR_COAT_ON`), anisotropy (`_USE_ANISOTROPIC_ON`), and distortion-mode keyword selection in both BRP and URP.
- Restored metallic-gloss map (`_METALLICGLOSSMAP_ON`) and vertex-color emission (`_USE_VC_EMISSION_ON`) keyword handling.
- Transparency so `_USE_TRANSPARENCY_ON` is set for Transparent and Additive render modes, not only when the manual transparency toggle is on.
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
- Custom-lighting configuration example (`FireRatCustomLighting.cginc.example`).

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


