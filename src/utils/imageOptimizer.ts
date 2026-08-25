import { REAL_SOLAR_IMAGE_124KW } from '../data/portfolioImages';

/**
 * Utility to compress and resize images on client-side
 * Ensures high visual quality while keeping size under ~200KB-300KB
 * Prevents localStorage QuotaExceededError and Firestore 1MB document limit.
 */
export async function optimizeImageFile(file: File, maxWidth = 1600, maxHeight = 1200, quality = 0.84): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('이미지 파일이 아닙니다.'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('파일을 읽는 중 오류가 발생했습니다.'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('이미지를 디코딩할 수 없습니다.'));
      img.onload = () => {
        try {
          let width = img.width;
          let height = img.height;

          // Calculate aspect ratio preserving dimensions
          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            // fallback to original base64 if canvas 2d context fails
            resolve(e.target?.result as string);
            return;
          }

          // Smooth rendering
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);

          // Output as JPEG for maximum compatibility & compression
          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedDataUrl);
        } catch (err) {
          // fallback
          resolve(e.target?.result as string);
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Fallback solar panel background if image fails to load
 * Guaranteed self-contained data URI that works offline and cross-origin
 */
export const FALLBACK_SOLAR_IMAGE = REAL_SOLAR_IMAGE_124KW;
