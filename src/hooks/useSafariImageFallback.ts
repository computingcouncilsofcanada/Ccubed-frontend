import { useEffect, useState } from 'react';

/**
 * Hook to handle Safari-specific image fallbacks
 * Safari has issues with SVGs containing embedded base64 PNG data
 * 
 * @param svgPath - Path to SVG file
 * @param pngPath - Path to PNG fallback file
 * @returns The appropriate image path based on browser
 */
export const useSafariImageFallback = (svgPath: string, pngPath: string) => {
  const [imageSrc, setImageSrc] = useState(svgPath);

  useEffect(() => {
    // Detect Safari browser
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    
    // Use PNG for Safari, SVG for other browsers
    setImageSrc(isSafari ? pngPath : svgPath);
  }, [svgPath, pngPath]);

  return imageSrc;
};