'use client';

import { useEffect, useState } from 'react';

const IMAGES = [
  '/assets/images/impressions/cc71f6cb-7560-479b-bb59-03d00e18b780.jpg',
  '/assets/images/impressions/2fd8d139-fb60-47c9-9097-8618b6c91cba.jpg',
  '/assets/images/impressions/a2ede6e0-7063-484d-9189-3dda86fce813.jpg',
  '/assets/images/impressions/IMG_9213.jpeg',
  '/assets/images/impressions/IMG_9211.jpeg',
  '/assets/images/impressions/IMG_9209.jpeg',
  '/assets/images/impressions/IMG_9208.jpeg',
  '/assets/images/impressions/IMG_9205.jpeg',
];

export function SectionImpressions() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((index) => (index + 1) % IMAGES.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex grow overflow-hidden">
      {IMAGES.map((src, index) => (
        <div key={src} className={`image-container ${index === currentIndex ? 'show' : ''}`} style={{ backgroundImage: `url(${src})` }} />
      ))}

      <div className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-black/50 to-transparent py-6 lg:py-12">
        <div className="container mx-auto px-4 lg:px-16">
          <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-white">
            <span className="inline-block h-px w-8 bg-white" />
            Impressies
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">Een kijkje binnen</h2>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-6 flex justify-center gap-2">
        {IMAGES.map((src, index) => (
          <button
            key={src}
            type="button"
            aria-label="Toon deze afbeelding"
            className={`h-2.5 rounded-full transition-all ${index === currentIndex ? 'w-8 bg-white' : 'w-2.5 bg-white/60 hover:bg-white/90'}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
