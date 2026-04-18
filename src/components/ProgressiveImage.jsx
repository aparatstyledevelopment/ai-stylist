import { useState } from 'react';

export function ProgressiveImage({ src, onLoaded }) {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
    onLoaded?.();
  };

  return (
    <>
      {!loaded && (
        <span className="home__product-thumb-placeholder" aria-hidden />
      )}
      <img src={src} alt="" onLoad={handleLoad} style={{ opacity: loaded ? 1 : 0 }} />
    </>
  );
}
