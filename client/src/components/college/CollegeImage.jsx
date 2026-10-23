import { useState } from 'react';

/**
 * College photo with a graceful fallback. Remote images can be blocked, moved or deleted,
 * so when one fails to load we render `fallback` (or nothing) instead of a broken-image icon.
 */
export default function CollegeImage({ src, alt, className = '', fallback = null }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return fallback;
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
