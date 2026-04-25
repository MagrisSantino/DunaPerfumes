'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ProductPlaceholder } from './ProductPlaceholder';

export function ProductGallery({
  images,
  brand,
  model,
}: {
  images: string[];
  brand: string;
  model: string;
}) {
  const [active, setActive] = useState(0);
  const has = images && images.length > 0;
  return (
    <div className="grid grid-cols-[80px_1fr] sm:grid-cols-[100px_1fr] gap-4">
      <div className="flex flex-col gap-2">
        {has ? (
          images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative aspect-square overflow-hidden bg-sand-100 border transition-colors ${
                active === i ? 'border-gold' : 'border-transparent hover:border-sand-300'
              }`}
            >
              <Image src={src} alt={`${brand} ${model} ${i + 1}`} fill sizes="100px" className="object-cover" />
            </button>
          ))
        ) : (
          <div className="relative aspect-square overflow-hidden bg-sand-100 border border-sand-200">
            <ProductPlaceholder brand={brand} model={model} compact />
          </div>
        )}
      </div>
      <div className="relative aspect-[4/5] overflow-hidden bg-sand-100">
        {has ? (
          <Image
            src={images[active]}
            alt={`${brand} ${model}`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        ) : (
          <ProductPlaceholder brand={brand} model={model} />
        )}
      </div>
    </div>
  );
}
