import { Component, type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import {
  ArrowRight,
  Compass,
  HelpCircle,
  Info,
  RotateCcw,
  Volume2,
  VolumeX,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import {
  KALSUBAI_DESTINATION,
  KALSUBAI_SUMMIT_EXPERIENCE,
  type SummitHotspot,
} from '../data/kalsubaiDemo';
import {
  KALSUBAI_PANORAMA_4K_URL,
  loadPanoramaImage,
  sphericalToCartesian,
  yawDegToCanvasU,
} from './equirectangularTexture';
import { MountainWindAudio } from './windAudio';

interface ImmersiveSummitModalProps {
  onClose: () => void;
}

function detectWebGLCapabilities(): {
  supported: boolean;
  isSoftwareGl: boolean;
  maxTextureSize: number;
} {
  try {
    const probeCanvas = document.createElement('canvas');
    const gl =
      (probeCanvas.getContext('webgl2') as WebGL2RenderingContext | null) ||
      (probeCanvas.getContext('webgl') as WebGLRenderingContext | null);
    if (!gl) {
      return { supported: false, isSoftwareGl: true, maxTextureSize: 2048 };
    }
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) || '');
    const maxTextureSize = Number(gl.getParameter(gl.MAX_TEXTURE_SIZE) || 2048);
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    const isSoftwareGl = /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    return { supported: true, isSoftwareGl, maxTextureSize };
  } catch {
    return { supported: false, isSoftwareGl: true, maxTextureSize: 2048 };
  }
}

class WebGLErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { fallback: ReactNode; children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

interface CameraTargetRequest {
  yawDeg: number;
  pitchDeg: number;
  fov: number;
  nonce: number;
}

interface SummitDomeSceneProps {
  panoramaSource: HTMLImageElement | HTMLCanvasElement;
  hotspots: [SummitHotspot, SummitHotspot, SummitHotspot];
  activeHotspotId: SummitHotspot['id'] | null;
  onSelectHotspot: (hotspot: SummitHotspot) => void;
  targetFov: number;
  cameraRequest: CameraTargetRequest;
  isSoftwareGl: boolean;
  prefersReducedMotion: boolean;
}

function SummitDomeScene({
  panoramaSource,
  hotspots,
  activeHotspotId,
  onSelectHotspot,
  targetFov,
  cameraRequest,
  isSoftwareGl,
  prefersReducedMotion,
}: SummitDomeSceneProps) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const { camera, gl } = useThree();
  const isTransitioningRef = useRef(false);
  const desiredCameraPosRef = useRef(new THREE.Vector3());
  const currentLookVecRef = useRef(new THREE.Vector3());
  const desiredLookVecRef = useRef(new THREE.Vector3());
  const lastNonceRef = useRef(-1);

  // Build inverted sphere geometry once and dispose on unmount
  const sphereGeometry = useMemo(() => {
    const geom = new THREE.SphereGeometry(500, 96, 64);
    geom.scale(-1, 1, 1);
    return geom;
  }, []);

  useEffect(() => {
    return () => {
      sphereGeometry.dispose();
    };
  }, [sphereGeometry]);

  // Upload full-resolution 4096x2048 equirectangular Texture in SRGBColorSpace
  const equirectTexture = useMemo(() => {
    const tex = new THREE.Texture(panoramaSource);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = true;
    tex.anisotropy = gl.capabilities.getMaxAnisotropy();
    tex.needsUpdate = true;
    return tex;
  }, [panoramaSource, gl]);

  useEffect(() => {
    return () => {
      equirectTexture.dispose();
    };
  }, [equirectTexture]);

  // Trigger camera rotation when Reset View or a Hotspot quick-jump runs
  useEffect(() => {
    if (cameraRequest.nonce === lastNonceRef.current) return;
    lastNonceRef.current = cameraRequest.nonce;

    const [tx, ty, tz] = sphericalToCartesian(cameraRequest.yawDeg, cameraRequest.pitchDeg, 1);
    desiredCameraPosRef.current.set(-tx * 0.05, -ty * 0.05, -tz * 0.05);

    if (prefersReducedMotion || isSoftwareGl) {
      camera.position.copy(desiredCameraPosRef.current);
      if (camera instanceof THREE.PerspectiveCamera) {
        camera.fov = cameraRequest.fov;
        camera.updateProjectionMatrix();
      }
      controlsRef.current?.update();
      isTransitioningRef.current = false;
    } else {
      isTransitioningRef.current = true;
    }
  }, [cameraRequest, camera, prefersReducedMotion, isSoftwareGl]);

  // Smoothly damp FOV and preset transitions without fighting manual user drags
  useFrame((_, delta) => {
    if (camera instanceof THREE.PerspectiveCamera) {
      const fovDiff = Math.abs(camera.fov - targetFov);
      if (fovDiff > 0.08) {
        camera.fov = prefersReducedMotion
          ? targetFov
          : THREE.MathUtils.damp(camera.fov, targetFov, 9, delta);
        camera.updateProjectionMatrix();
      } else if (fovDiff > 0) {
        camera.fov = targetFov;
        camera.updateProjectionMatrix();
      }
    }

    if (isTransitioningRef.current) {
      const currentDist = camera.position.length() || 0.05;
      currentLookVecRef.current.copy(camera.position).normalize();
      desiredLookVecRef.current.copy(desiredCameraPosRef.current).normalize();

      const alpha = 1 - Math.exp(-7 * delta);
      currentLookVecRef.current.lerp(desiredLookVecRef.current, alpha).normalize();
      camera.position.copy(currentLookVecRef.current).multiplyScalar(currentDist);
      controlsRef.current?.update();

      if (currentLookVecRef.current.distanceTo(desiredLookVecRef.current) < 0.008) {
        camera.position.copy(desiredCameraPosRef.current);
        controlsRef.current?.update();
        isTransitioningRef.current = false;
      }
    }
  });

  const hotspotPositions = useMemo(
    () =>
      hotspots.map((h) => ({
        hotspot: h,
        position: sphericalToCartesian(h.spherical.yawDeg, h.spherical.pitchDeg, 420),
      })),
    [hotspots]
  );

  return (
    <>
      <OrbitControls
        ref={controlsRef}
        makeDefault
        target={[0, 0, 0]}
        enableZoom={false}
        enablePan={false}
        minDistance={0.01}
        maxDistance={1}
        rotateSpeed={-0.38}
        enableDamping={!isSoftwareGl && !prefersReducedMotion}
        dampingFactor={0.07}
        minPolarAngle={0.22}
        maxPolarAngle={Math.PI - 0.22}
        onStart={() => {
          isTransitioningRef.current = false;
        }}
      />

      {/* Inward-facing equirectangular sphere with DoubleSide for cross-driver rendering safety */}
      <mesh geometry={sphereGeometry}>
        <meshBasicMaterial map={equirectTexture} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>

      {/* Three interactive hotspots anchored inside the spherical panorama */}
      {hotspotPositions.map(({ hotspot, position }) => {
        const isActive = hotspot.id === activeHotspotId;
        return (
          <Html key={hotspot.id} position={position} center zIndexRange={[10, 0]}>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectHotspot(hotspot);
              }}
              aria-label={`Inspect ${hotspot.title}`}
              className={`group flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium whitespace-nowrap transition-transform duration-150 cursor-pointer shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D68A45] ${
                isActive
                  ? 'bg-[#D68A45] text-[#151B19] border-[#F5F0E7] scale-105'
                  : 'bg-[#151B19]/88 text-[#F5F0E7] border-[#C9B99D]/70 hover:bg-[#183C32] hover:border-[#D68A45]'
              }`}
            >
              <span
                className={`font-mono text-[11px] tabular-nums ${
                  isActive ? 'text-[#151B19]' : 'text-[#D68A45]'
                }`}
              >
                {hotspot.indexLabel}
              </span>
              <span>{hotspot.title}</span>
            </button>
          </Html>
        );
      })}
    </>
  );
}

interface Fallback2DPanoramaProps {
  panoramaUrl: string;
  hotspots: [SummitHotspot, SummitHotspot, SummitHotspot];
  activeHotspotId: SummitHotspot['id'] | null;
  onSelectHotspot: (hotspot: SummitHotspot) => void;
  zoomScale: number;
  panOffsetU: number;
  onPanOffsetChange: (nextU: number) => void;
}

function Fallback2DPanorama({
  panoramaUrl,
  hotspots,
  activeHotspotId,
  onSelectHotspot,
  zoomScale,
  panOffsetU,
  onPanOffsetChange,
}: Fallback2DPanoramaProps) {
  const dragStateRef = useRef<{ dragging: boolean; startX: number; startU: number }>({
    dragging: false,
    startX: 0,
    startU: 0,
  });

  return (
    <div
      className="relative w-full h-full overflow-hidden bg-[#151B19] select-none cursor-grab active:cursor-grabbing touch-none"
      onPointerDown={(e) => {
        dragStateRef.current = {
          dragging: true,
          startX: e.clientX,
          startU: panOffsetU,
        };
      }}
      onPointerMove={(e) => {
        if (!dragStateRef.current.dragging) return;
        const deltaU = -(e.clientX - dragStateRef.current.startX) / 1400;
        onPanOffsetChange((dragStateRef.current.startU + deltaU + 1) % 1);
      }}
      onPointerUp={() => {
        dragStateRef.current.dragging = false;
      }}
      onPointerLeave={() => {
        dragStateRef.current.dragging = false;
      }}
    >
      <div
        className="w-full h-full bg-repeat-x bg-cover transition-transform duration-150"
        style={{
          backgroundImage: `url(${panoramaUrl})`,
          backgroundPosition: `${panOffsetU * 100}% 50%`,
          transform: `scale(${zoomScale})`,
        }}
      />

      {hotspots.map((hotspot) => {
        const u = yawDegToCanvasU(hotspot.spherical.yawDeg);
        let rel = u - panOffsetU;
        if (rel > 0.5) rel -= 1;
        if (rel < -0.5) rel += 1;
        const leftPct = 50 + rel * 180;
        const topPct = 50 - (hotspot.spherical.pitchDeg / 90) * 45;
        if (leftPct < 6 || leftPct > 94) return null;

        const isActive = hotspot.id === activeHotspotId;
        return (
          <button
            key={hotspot.id}
            type="button"
            onClick={() => onSelectHotspot(hotspot)}
            style={{ left: `${leftPct}%`, top: `${topPct}%` }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium whitespace-nowrap cursor-pointer shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D68A45] ${
              isActive
                ? 'bg-[#D68A45] text-[#151B19] border-[#F5F0E7]'
                : 'bg-[#151B19]/90 text-[#F5F0E7] border-[#C9B99D]/60 hover:bg-[#183C32]'
            }`}
          >
            <span
              className={`font-mono text-[11px] tabular-nums ${
                isActive ? 'text-[#151B19]' : 'text-[#D68A45]'
              }`}
            >
              {hotspot.indexLabel}
            </span>
            <span>{hotspot.title}</span>
          </button>
        );
      })}
    </div>
  );
}

export default function ImmersiveSummitModal({ onClose }: ImmersiveSummitModalProps) {
  const { hotspots, initialYawDeg, initialPitchDeg, defaultFov, minFov, maxFov } =
    KALSUBAI_SUMMIT_EXPERIENCE;

  const webglCheck = useMemo(() => detectWebGLCapabilities(), []);
  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
    []
  );

  const [panoramaSource, setPanoramaSource] = useState<HTMLImageElement | HTMLCanvasElement | null>(
    null
  );
  const [loadError, setLoadError] = useState<string | null>(null);
  const audioRef = useRef<MountainWindAudio | null>(null);

  const [webglLost, setWebglLost] = useState(false);
  const [targetFov, setTargetFov] = useState(defaultFov);
  const [activeHotspot, setActiveHotspot] = useState<SummitHotspot | null>(null);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [fallbackPanU, setFallbackPanU] = useState(() => yawDegToCanvasU(initialYawDeg));
  const [cameraRequest, setCameraRequest] = useState<CameraTargetRequest>({
    yawDeg: initialYawDeg,
    pitchDeg: initialPitchDeg,
    fov: defaultFov,
    nonce: 0,
  });

  // Load full-resolution 4096x2048 equirectangular panorama on demand when viewer opens
  useEffect(() => {
    let cancelled = false;
    loadPanoramaImage(webglCheck.maxTextureSize)
      .then((source) => {
        if (!cancelled) {
          setPanoramaSource(source);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setLoadError(
            err instanceof Error ? err.message : 'Unable to load 360° summit panorama.'
          );
        }
      });

    return () => {
      cancelled = true;
    };
  }, [webglCheck]);

  // Clean up wind audio on unmount
  useEffect(() => {
    return () => {
      audioRef.current?.dispose();
      audioRef.current = null;
    };
  }, []);

  // ESC key closes viewer immediately
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleToggleAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new MountainWindAudio();
    }
    if (isAudioOn) {
      audioRef.current.stop();
      setIsAudioOn(false);
    } else {
      audioRef.current.start();
      setIsAudioOn(true);
    }
  }, [isAudioOn]);

  const handleZoomIn = useCallback(() => {
    setTargetFov((prev) => Math.max(minFov, prev - 10));
  }, [minFov]);

  const handleZoomOut = useCallback(() => {
    setTargetFov((prev) => Math.min(maxFov, prev + 10));
  }, [maxFov]);

  const handleResetView = useCallback(() => {
    setTargetFov(defaultFov);
    setFallbackPanU(yawDegToCanvasU(initialYawDeg));
    setActiveHotspot(null);
    setCameraRequest((prev) => ({
      yawDeg: initialYawDeg,
      pitchDeg: initialPitchDeg,
      fov: defaultFov,
      nonce: prev.nonce + 1,
    }));
  }, [defaultFov, initialYawDeg, initialPitchDeg]);

  const handleSelectHotspot = useCallback(
    (hotspot: SummitHotspot) => {
      setActiveHotspot(hotspot);
      setFallbackPanU(yawDegToCanvasU(hotspot.spherical.yawDeg));
      setCameraRequest((prev) => ({
        yawDeg: hotspot.spherical.yawDeg,
        pitchDeg: hotspot.spherical.pitchDeg,
        fov: targetFov,
        nonce: prev.nonce + 1,
      }));
    },
    [targetFov]
  );

  const handleWheelZoom = useCallback(
    (e: React.WheelEvent) => {
      if (e.deltaY === 0) return;
      setTargetFov((prev) =>
        Math.min(maxFov, Math.max(minFov, prev + (e.deltaY > 0 ? 5 : -5)))
      );
    },
    [minFov, maxFov]
  );

  const initialCameraPos = useMemo((): [number, number, number] => {
    const [tx, ty, tz] = sphericalToCartesian(initialYawDeg, initialPitchDeg, 0.05);
    return [-tx, -ty, -tz];
  }, [initialYawDeg, initialPitchDeg]);

  const useFallback2D = !webglCheck.supported || webglLost;
  const fallbackZoomScale = Number((defaultFov / targetFov).toFixed(2));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Kalsubai Summit 360-degree immersive preview"
      onWheel={handleWheelZoom}
      className="fixed inset-0 z-50 bg-[#151B19] text-[#F5F0E7] flex flex-col select-none"
    >
      {/* Fullscreen 360° Sphere Viewport */}
      <div className="absolute inset-0 touch-none">
        {loadError ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#151B19]">
            <Compass className="w-9 h-9 text-[#D68A45] mb-4" />
            <h2 className="font-editorial text-2xl text-[#FFFFFF] mb-2">
              Panorama unavailable
            </h2>
            <p className="text-sm text-[#C9B99D] max-w-md mb-6">{loadError}</p>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg bg-[#D68A45] text-[#151B19] text-sm font-semibold cursor-pointer"
            >
              Return to Trip Details
            </button>
          </div>
        ) : !panoramaSource ? (
          <div
            role="status"
            aria-live="polite"
            className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#151B19]"
          >
            <div className="w-8 h-8 rounded-full border-2 border-[#C9B99D]/30 border-t-[#D68A45] animate-spin mb-4" />
            <p className="font-editorial text-xl text-[#FFFFFF]">
              Loading 360° Summit Panorama
            </p>
            <p className="text-xs text-[#C9B99D] mt-1">
              Preparing high-resolution equirectangular mountain view…
            </p>
          </div>
        ) : useFallback2D ? (
          <Fallback2DPanorama
            panoramaUrl={KALSUBAI_PANORAMA_4K_URL}
            hotspots={hotspots}
            activeHotspotId={activeHotspot?.id ?? null}
            onSelectHotspot={handleSelectHotspot}
            zoomScale={fallbackZoomScale}
            panOffsetU={fallbackPanU}
            onPanOffsetChange={setFallbackPanU}
          />
        ) : (
          <WebGLErrorBoundary
            fallback={
              <Fallback2DPanorama
                panoramaUrl={KALSUBAI_PANORAMA_4K_URL}
                hotspots={hotspots}
                activeHotspotId={activeHotspot?.id ?? null}
                onSelectHotspot={handleSelectHotspot}
                zoomScale={fallbackZoomScale}
                panOffsetU={fallbackPanU}
                onPanOffsetChange={setFallbackPanU}
              />
            }
          >
            <Canvas
              flat
              dpr={webglCheck.isSoftwareGl ? 1 : [1, 2]}
              gl={{
                antialias: !webglCheck.isSoftwareGl,
                powerPreference: 'high-performance',
              }}
              camera={{
                fov: defaultFov,
                near: 0.01,
                far: 1200,
                position: initialCameraPos,
              }}
              onCreated={({ gl }) => {
                gl.outputColorSpace = THREE.SRGBColorSpace;
                gl.domElement.addEventListener('webglcontextlost', (ev) => {
                  ev.preventDefault();
                  setWebglLost(true);
                });
              }}
            >
              <SummitDomeScene
                panoramaSource={panoramaSource}
                hotspots={hotspots}
                activeHotspotId={activeHotspot?.id ?? null}
                onSelectHotspot={handleSelectHotspot}
                targetFov={targetFov}
                cameraRequest={cameraRequest}
                isSoftwareGl={webglCheck.isSoftwareGl}
                prefersReducedMotion={prefersReducedMotion}
              />
            </Canvas>
          </WebGLErrorBoundary>
        )}
      </div>

      {/* Compact Top HUD Bar — Solid/high-opacity #151B19 surface (zero backdrop-filter over WebGL) */}
      <div className="relative z-20 flex items-center justify-between gap-4 px-4 sm:px-6 py-2.5 bg-[#151B19]/88 border-b border-[#C9B99D]/20">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5">
            <span className="font-editorial text-base sm:text-lg text-[#FFFFFF] whitespace-nowrap">
              {KALSUBAI_DESTINATION.name}
            </span>
            <span aria-hidden="true" className="text-[#C9B99D]/60 hidden sm:inline">
              ·
            </span>
            <span className="text-xs font-medium text-[#D68A45] whitespace-nowrap">
              {KALSUBAI_SUMMIT_EXPERIENCE.panoramaLabel}
            </span>
            {useFallback2D && (
              <>
                <span aria-hidden="true" className="text-[#C9B99D]/60">
                  ·
                </span>
                <span className="text-xs text-[#C9B99D]">2D Panoramic Mode</span>
              </>
            )}
          </div>
          <p className="hidden lg:block text-[11px] text-[#C9B99D]/85 truncate max-w-2xl">
            {KALSUBAI_SUMMIT_EXPERIENCE.disclaimer}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setShowHelp((prev) => !prev)}
            aria-expanded={showHelp}
            aria-label="How to navigate 360-degree view"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D68A45] ${
              showHelp
                ? 'bg-[#183C32] border-[#D68A45] text-[#FFFFFF]'
                : 'bg-[#151B19] border-[#C9B99D]/30 text-[#F5F0E7] hover:border-[#C9B99D]'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-[#D68A45]" />
            <span className="hidden sm:inline">Help</span>
          </button>

          <button
            type="button"
            onClick={handleToggleAudio}
            aria-pressed={isAudioOn}
            aria-label={isAudioOn ? 'Turn off ambient wind sound' : 'Turn on ambient wind sound'}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D68A45] ${
              isAudioOn
                ? 'bg-[#183C32] border-[#D68A45] text-[#FFFFFF]'
                : 'bg-[#151B19] border-[#C9B99D]/30 text-[#F5F0E7] hover:border-[#C9B99D]'
            }`}
          >
            {isAudioOn ? (
              <Volume2 className="w-4 h-4 text-[#D68A45]" />
            ) : (
              <VolumeX className="w-4 h-4 text-[#C9B99D]" />
            )}
            <span className="hidden sm:inline whitespace-nowrap">
              {isAudioOn ? 'Wind On' : 'Wind Off'}
            </span>
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Exit 360-degree preview"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#F5F0E7] text-[#151B19] text-xs font-semibold hover:bg-[#FFFFFF] transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D68A45]"
          >
            <X className="w-4 h-4" />
            <span>Exit</span>
          </button>
        </div>
      </div>

      {/* Help & Instructions Popover */}
      {showHelp && (
        <div className="relative z-20 mx-4 sm:mx-6 mt-3 max-w-md ml-auto bg-[#151B19]/95 border border-[#C9B99D]/40 rounded-xl p-4 shadow-xl text-xs space-y-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 font-medium text-[#FFFFFF]">
              <Compass className="w-4 h-4 text-[#D68A45]" />
              <span>Exploring the 360° Summit View</span>
            </div>
            <button
              type="button"
              onClick={() => setShowHelp(false)}
              aria-label="Close help instructions"
              className="text-[#C9B99D] hover:text-[#FFFFFF] p-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <ul className="space-y-1.5 text-[#F5F0E7]/85 leading-relaxed">
            <li>• Drag with mouse or swipe on touchscreens to look 360° horizontally and vertically.</li>
            <li>• Tap any of the 3 markers inside the panorama or use the bottom strip to inspect viewpoints.</li>
            <li>• Scroll or use + / − buttons to zoom, Reset to center, or Esc to return to trip details.</li>
            <li className="text-[#C9B99D]">
              • Note: Photorealistic illustrative 360° sample environment for preview demonstration.
            </li>
          </ul>
        </div>
      )}

      {/* Unobstructed Central Panorama Space */}
      <div className="flex-1 pointer-events-none" />

      {/* Active Hotspot Contextual Panel */}
      {activeHotspot && (
        <aside
          aria-label={activeHotspot.title}
          className="relative z-20 mx-4 sm:mx-6 mb-3 max-w-sm bg-[#151B19]/94 border border-[#C9B99D]/45 rounded-xl p-4 sm:p-5 shadow-2xl"
        >
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <p className="text-[11px] font-mono text-[#D68A45] tabular-nums">
                {activeHotspot.indexLabel} · {activeHotspot.subtitle}
              </p>
              <h2 className="font-editorial text-xl text-[#FFFFFF] mt-0.5">
                {activeHotspot.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setActiveHotspot(null)}
              aria-label="Close hotspot details"
              className="p-1.5 rounded-md text-[#C9B99D] hover:text-[#FFFFFF] hover:bg-[#183C32] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D68A45]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs sm:text-sm text-[#F5F0E7]/90 leading-relaxed">
            {activeHotspot.description}
          </p>
        </aside>
      )}

      {/* Compact Bottom Control Dock */}
      <div className="relative z-20 px-4 sm:px-6 py-2.5 bg-[#151B19]/90 border-t border-[#C9B99D]/20">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="hidden xl:inline-flex items-center gap-1.5 text-xs text-[#C9B99D] mr-1">
              <Info className="w-3.5 h-3.5 text-[#D68A45]" />
              Drag to look around
            </span>
            <div
              role="group"
              aria-label="Summit viewpoints"
              className="flex items-center gap-1.5 overflow-x-auto"
            >
              {hotspots.map((hotspot) => {
                const isSelected = activeHotspot?.id === hotspot.id;
                return (
                  <button
                    key={hotspot.id}
                    type="button"
                    onClick={() => handleSelectHotspot(hotspot)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D68A45] ${
                      isSelected
                        ? 'bg-[#D68A45] text-[#151B19]'
                        : 'bg-[#183C32]/85 text-[#F5F0E7] hover:bg-[#183C32] border border-[#C9B99D]/25'
                    }`}
                  >
                    <span className="font-mono text-[11px] mr-1.5 opacity-80">
                      {hotspot.indexLabel}
                    </span>
                    {hotspot.title}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
            <div className="flex items-center gap-1 bg-[#151B19] border border-[#C9B99D]/30 rounded-lg p-1">
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={targetFov >= maxFov}
                aria-label="Zoom out"
                title="Zoom Out"
                className="p-1.5 rounded-md text-[#F5F0E7] hover:bg-[#183C32] disabled:opacity-35 transition-colors cursor-pointer disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[#D68A45]"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleResetView}
                aria-label="Reset camera view"
                title="Reset View"
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-[#F5F0E7] hover:bg-[#183C32] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D68A45]"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#D68A45]" />
                <span className="hidden sm:inline">Reset</span>
              </button>
              <button
                type="button"
                onClick={handleZoomIn}
                disabled={targetFov <= minFov}
                aria-label="Zoom in"
                title="Zoom In"
                className="p-1.5 rounded-md text-[#F5F0E7] hover:bg-[#183C32] disabled:opacity-35 transition-colors cursor-pointer disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[#D68A45]"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#D68A45] text-[#151B19] text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 hover:bg-[#e19652] transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5F0E7]"
            >
              <span>Continue to Trip Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
