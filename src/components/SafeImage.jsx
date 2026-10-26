import React, { useState } from 'react';

/**
 * SafeImage ensures an image renders reliably, falling back to a backup image
 * or graceful placeholder if the remote URL fails.
 */
export default function SafeImage({ src, fallbackSrc, alt, className = '', ...props }) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError && fallbackSrc && currentSrc !== fallbackSrc) {
      setHasError(true);
      setCurrentSrc(fallbackSrc);
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading="lazy"
      onError={handleError}
      className={className}
      {...props}
    />
  );
}
