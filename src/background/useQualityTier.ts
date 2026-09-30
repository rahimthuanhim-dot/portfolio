import { useEffect, useState } from 'react';

export type QualityTier = 'low' | 'medium' | 'high';

function getQualityTier(): QualityTier {
  const isSmallOrTouch = window.matchMedia(
    '(max-width: 48rem), (pointer: coarse)',
  ).matches;
  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = 'deviceMemory' in navigator
    ? (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8
    : 8;

  if (isSmallOrTouch || cores <= 4 || memory <= 4) {
    return 'low';
  }

  if (cores >= 8 && memory >= 8 && window.devicePixelRatio >= 2) {
    return 'high';
  }

  return 'medium';
}

export function useQualityTier() {
  const [tier, setTier] = useState<QualityTier>(getQualityTier);

  useEffect(() => {
    const coarsePointer = window.matchMedia('(pointer: coarse)');
    const updateTier = () => setTier(getQualityTier());
    window.addEventListener('resize', updateTier);
    coarsePointer.addEventListener('change', updateTier);

    return () => {
      window.removeEventListener('resize', updateTier);
      coarsePointer.removeEventListener('change', updateTier);
    };
  }, []);

  return tier;
}
