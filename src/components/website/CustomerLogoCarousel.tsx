import React, { useEffect, useState } from 'react';
import { Building2 } from 'lucide-react';
import {
  CUSTOMER_LOGOS,
  CustomerLogoItem,
  buildMarqueeTrack
} from '../../data/customerLogos';

interface CustomerLogoCarouselProps {
  variant?: 'home' | 'customers';
  onSelectCustomerAction?: (customer: CustomerLogoItem) => void;
  onViewAllCustomers?: () => void;
}

/**
 * Removes solid white or grey-gradient bounding boxes from uploaded JPG/PNG logo assets
 * so only the pure logo mark floats directly on the page background without any box.
 */
function processLogoToTransparentDataUrl(
  img: HTMLImageElement,
  logoId: string
): string {
  const canvas = document.createElement('canvas');
  const w = img.naturalWidth || img.width;
  const h = img.naturalHeight || img.height;
  if (!w || !h) return img.src;

  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) return img.src;

  ctx.drawImage(img, 0, 0, w, h);
  const imageData = ctx.getImageData(0, 0, w, h);
  const data = imageData.data;

  if (logoId === 'trever' || logoId === 'pnb-gilts') {
    // Flood-fill from outer border edges to strip the surrounding white/light box
    // while keeping interior white letters inside Trever and PNB Gilts emblems intact.
    const visited = new Uint8Array(w * h);
    const queue = new Int32Array(w * h);
    let head = 0;
    let tail = 0;

    const isOuterBg = (idx: number): boolean => {
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const avg = (r + g + b) / 3;
      const maxDiff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
      return avg > 215 && maxDiff < 30;
    };

    const enqueue = (x: number, y: number) => {
      if (x < 0 || x >= w || y < 0 || y >= h) return;
      const pos = y * w + x;
      if (visited[pos]) return;
      visited[pos] = 1;
      if (isOuterBg(pos * 4)) {
        queue[tail++] = pos;
      }
    };

    for (let x = 0; x < w; x++) {
      enqueue(x, 0);
      enqueue(x, h - 1);
    }
    for (let y = 0; y < h; y++) {
      enqueue(0, y);
      enqueue(w - 1, y);
    }

    while (head < tail) {
      const pos = queue[head++];
      const pIdx = pos * 4;
      data[pIdx + 3] = 0;

      const x = pos % w;
      const y = (pos - x) / w;
      enqueue(x + 1, y);
      enqueue(x - 1, y);
      enqueue(x, y + 1);
      enqueue(x, y - 1);
    }
  } else if (logoId === 'owasp') {
    // OWASP has a grey-to-white gradient background and a pure black emblem + wordmark
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const avg = (r + g + b) / 3;
      if (avg >= 135) {
        data[i + 3] = 0;
      } else if (avg > 75) {
        const alphaScale = (135 - avg) / (135 - 75);
        data[i + 3] = Math.round(data[i + 3] * alphaScale);
      }
    }
  } else {
    // Key out near-white background pixels across the wordmark/seal with smooth anti-aliased edges
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4;

        // Strip tiny third-party corner watermark on OpenSSL image
        if (logoId === 'openssl' && y < h * 0.16 && x > w * 0.78) {
          data[i + 3] = 0;
          continue;
        }

        // Preserve the white ship wheel inside Kubernetes blue heptagon
        if (
          logoId === 'kubernetes' &&
          x > w * 0.39 &&
          x < w * 0.61 &&
          y > h * 0.22 &&
          y < h * 0.55
        ) {
          continue;
        }

        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const minChannel = Math.min(r, g, b);
        const maxChannel = Math.max(r, g, b);
        const saturation = maxChannel - minChannel;

        if (saturation < 28 && minChannel > 215) {
          if (minChannel >= 242) {
            data[i + 3] = 0;
          } else {
            const alphaScale = (242 - minChannel) / (242 - 215);
            data[i + 3] = Math.round(data[i + 3] * alphaScale);
          }
        }
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL('image/png');
}

export const CustomerLogoCarousel: React.FC<CustomerLogoCarouselProps> = () => {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [transparentUrls, setTransparentUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    let isMounted = true;

    CUSTOMER_LOGOS.forEach((customer) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        if (!isMounted) return;
        try {
          const cleanUrl = processLogoToTransparentDataUrl(img, customer.id);
          setTransparentUrls((prev) => ({ ...prev, [customer.id]: cleanUrl }));
        } catch {
          // Fallback to original URL if canvas processing is unavailable
        }
      };
      img.src = customer.logoUrl;
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // Duplicate 2x with symmetric item margins so -50% translate3d is seamless
  const marqueeItems = buildMarqueeTrack(CUSTOMER_LOGOS, 2);

  return (
    <div
      aria-label="Our Customers Logo Carousel"
      className="relative overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      data-testid="customer-logo-marquee"
    >
      <div className="animate-customer-marquee items-center">
        {marqueeItems.map((customer, idx) => {
          const hasFailed = failedImages[customer.id];
          const resolvedSrc = transparentUrls[customer.id] || customer.logoUrl;

          return (
            <div
              key={`${customer.id}-${idx}`}
              className="shrink-0 mx-8 sm:mx-12 h-20 w-40 sm:w-44 flex items-center justify-center transition-transform duration-200 hover:scale-105"
            >
              {!hasFailed ? (
                <img
                  src={resolvedSrc}
                  alt={`${customer.name} logo`}
                  referrerPolicy="no-referrer"
                  onError={() =>
                    setFailedImages((prev) => ({ ...prev, [customer.id]: true }))
                  }
                  className={`object-contain select-none ${
                    customer.imgScaleClass || 'max-h-16 max-w-[150px]'
                  }`}
                />
              ) : (
                <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <span>{customer.name}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
