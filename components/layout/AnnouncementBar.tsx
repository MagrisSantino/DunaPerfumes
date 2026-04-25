'use client';

import { useEffect, useMemo, useState } from 'react';

export function AnnouncementBar({ items }: { items: string[] }) {
  const active = items.filter(Boolean);
  const [i, setI] = useState(0);

  const list = useMemo(() => (active.length === 0 ? [''] : active), [active]);

  useEffect(() => {
    if (list.length <= 1) return;
    const id = setInterval(() => setI((n) => (n + 1) % list.length), 4500);
    return () => clearInterval(id);
  }, [list.length]);

  if (!list[0]) return null;

  return (
    <div className="bg-espresso text-cream text-xs tracking-widest overflow-hidden">
      <div className="container-duna py-2.5 flex items-center justify-center text-center">
        <div className="relative h-4 overflow-hidden w-full">
          {list.map((text, idx) => (
            <p
              key={idx}
              className="absolute inset-0 flex items-center justify-center transition-all duration-700"
              style={{
                transform: `translateY(${(idx - i) * 100}%)`,
                opacity: idx === i ? 1 : 0,
              }}
            >
              {text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
