import * as THREE from 'three';

export const KALSUBAI_PANORAMA_4K_URL =
  '/src/assets/images/kalsubai_equirect_4k_final.jpg';

/**
 * Converts spherical look angles (yawDeg = 0 facing -Z, positive yawDeg turning right toward +X,
 * positive pitchDeg looking above horizon) to Cartesian coordinates inside the sphere.
 */
export function sphericalToCartesian(
  yawDeg: number,
  pitchDeg: number,
  radius = 420
): [number, number, number] {
  const yaw = THREE.MathUtils.degToRad(yawDeg);
  const pitch = THREE.MathUtils.degToRad(pitchDeg);
  const cosPitch = Math.cos(pitch);
  return [
    radius * cosPitch * Math.sin(yaw),
    radius * Math.sin(pitch),
    -radius * cosPitch * Math.cos(yaw),
  ];
}

/**
 * Maps a yaw angle (degrees) to normalized equirectangular texture U [0..1]
 * matching Three.js SphereGeometry with geometry.scale(-1, 1, 1).
 */
export function yawDegToCanvasU(yawDeg: number): number {
  const deg = (((270 + yawDeg) % 360) + 360) % 360;
  return deg / 360;
}

/**
 * Loads the pre-stitched 4096x2048 seamless 2:1 equirectangular panorama image.
 * Preserves full native 4K resolution whenever the GPU supports 4096+ textures,
 * and gracefully scales only if an older GPU reports MAX_TEXTURE_SIZE < 4096.
 */
export function loadPanoramaImage(maxTextureSize: number): Promise<HTMLImageElement | HTMLCanvasElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.referrerPolicy = 'no-referrer';
    img.decoding = 'async';

    img.onload = () => {
      if (maxTextureSize >= 4096 || (img.naturalWidth || img.width) <= maxTextureSize) {
        resolve(img);
        return;
      }

      // Only downscale if device WebGL MAX_TEXTURE_SIZE < 4096
      const targetW = Math.min(2048, maxTextureSize);
      const targetH = Math.round(targetW / 2);
      const canvas = document.createElement('canvas');
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(img);
        return;
      }
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, targetW, targetH);
      resolve(canvas);
    };

    img.onerror = () => {
      reject(new Error('Failed to load high-resolution 360° summit panorama asset.'));
    };

    img.src = KALSUBAI_PANORAMA_4K_URL;
  });
}
