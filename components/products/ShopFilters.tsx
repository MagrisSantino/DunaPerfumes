'use client';

import { useMemo, useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FilterOptions {
  brands: string[];
  genders: string[];
  classifications: string[];
  families: string[];
  maxPrice: number;
  hideClassification?: boolean;
}

export function ShopToolbar({ total, onOpenFilters }: { total: number; onOpenFilters: () => void }) {
  const router = useRouter();
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const activeCount = useMemo(() => {
    let c = 0;
    params.forEach((v, k) => {
      if (v && k !== 'sort' && k !== 'q') c++;
    });
    return c;
  }, [params]);

  const sort = params.get('sort') ?? 'relevant';

  const update = (key: string, value: string | null) => {
    const next = new URLSearchParams(params.toString());
    if (value == null || value === '') next.delete(key);
    else next.set(key, value);
    startTransition(() => router.replace(`?${next.toString()}`, { scroll: false }));
  };

  return (
    <div className="flex items-center justify-between gap-4 py-5 border-b border-sand-200 mb-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenFilters}
          className="lg:hidden inline-flex items-center gap-2 px-4 py-2 border border-sand-300 text-sm text-espresso"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filtros {activeCount > 0 && <span className="text-gold">({activeCount})</span>}
        </button>
        <p className={cn('text-sm text-espresso-lighter', isPending && 'opacity-50')}>
          <span className="font-medium text-espresso tabular-nums">{total}</span>{' '}
          {total === 1 ? 'fragancia' : 'fragancias'}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <label className="text-xs uppercase tracking-widest text-espresso-lighter hidden sm:inline">
          Ordenar
        </label>
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => update('sort', e.target.value === 'relevant' ? null : e.target.value)}
            className="appearance-none bg-transparent border border-sand-300 px-4 py-2 pr-9 text-sm text-espresso cursor-pointer focus:border-gold focus:outline-none"
          >
            <option value="relevant">Relevancia</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="name-asc">Nombre A–Z</option>
            <option value="newest">Más nuevos</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-espresso-lighter pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

export function ShopSidebar({ options }: { options: FilterOptions }) {
  const router = useRouter();
  const params = useSearchParams();
  const [, startTransition] = useTransition();

  const update = (key: string, value: string | null) => {
    const next = new URLSearchParams(params.toString());
    if (value == null || value === '' || next.get(key) === value) {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    startTransition(() => router.replace(`?${next.toString()}`, { scroll: false }));
  };

  const clearAll = () => {
    startTransition(() => router.replace('?', { scroll: false }));
  };

  const activeCount = useMemo(() => {
    let c = 0;
    params.forEach((v, k) => {
      if (v && k !== 'sort' && k !== 'q') c++;
    });
    return c;
  }, [params]);

  return (
    <div className="space-y-8">
      {activeCount > 0 && (
        <button
          onClick={clearAll}
          className="text-xs uppercase tracking-widest text-gold hover:text-espresso"
        >
          Limpiar filtros ({activeCount})
        </button>
      )}

      {!options.hideClassification && (
        <FilterGroup title="Clasificación">
          <FilterOption
            checked={params.get('clasificacion') === 'ORIGINAL'}
            onClick={() => update('clasificacion', 'ORIGINAL')}
            label="Originales"
          />
          <FilterOption
            checked={params.get('clasificacion') === 'ALTERNATIVA'}
            onClick={() => update('clasificacion', 'ALTERNATIVA')}
            label="Alternativas"
          />
        </FilterGroup>
      )}

      <FilterGroup title="Género">
        {options.genders.map((g) => (
          <FilterOption
            key={g}
            checked={params.get('genero') === g}
            onClick={() => update('genero', g)}
            label={g.charAt(0) + g.slice(1).toLowerCase()}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Marca" collapsible>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2 no-scrollbar">
          {options.brands.map((b) => (
            <FilterOption
              key={b}
              checked={params.get('marca') === b}
              onClick={() => update('marca', b)}
              label={b}
            />
          ))}
        </div>
      </FilterGroup>

      {options.families.length > 1 && (
        <FilterGroup title="Familia olfativa" collapsible>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2 no-scrollbar">
            {options.families.map((f) => (
              <FilterOption
                key={f}
                checked={params.get('familia') === f}
                onClick={() => update('familia', f)}
                label={f}
              />
            ))}
          </div>
        </FilterGroup>
      )}

      <FilterGroup title="Disponibilidad">
        <FilterOption
          checked={params.get('stock') === '1'}
          onClick={() => update('stock', '1')}
          label="Solo con stock"
        />
      </FilterGroup>
    </div>
  );
}

export function ShopMobileFilters({
  options,
  total,
}: {
  options: FilterOptions;
  total: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ShopToolbar total={total} onOpenFilters={() => setOpen(true)} />
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-espresso/50" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-[85vw] max-w-sm bg-cream flex flex-col shadow-elegant">
            <header className="flex items-center justify-between p-4 border-b border-sand-200">
              <h3 className="font-display text-2xl">Filtros</h3>
              <button onClick={() => setOpen(false)} aria-label="Cerrar">
                <X className="w-5 h-5" />
              </button>
            </header>
            <div className="flex-1 overflow-y-auto p-5">
              <ShopSidebar options={options} />
            </div>
            <footer className="p-4 border-t border-sand-200">
              <button onClick={() => setOpen(false)} className="btn-primary w-full">
                Ver {total} {total === 1 ? 'fragancia' : 'fragancias'}
              </button>
            </footer>
          </aside>
        </div>
      )}
    </>
  );
}

function FilterGroup({
  title,
  children,
  collapsible = false,
}: {
  title: string;
  children: React.ReactNode;
  collapsible?: boolean;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <button
        onClick={() => collapsible && setOpen(!open)}
        className="flex items-center justify-between w-full mb-3 text-left"
        type="button"
      >
        <h4 className="text-[11px] font-medium tracking-widest3 uppercase text-espresso">{title}</h4>
        {collapsible && (
          <ChevronDown
            className={cn('w-4 h-4 text-espresso-lighter transition-transform', open && 'rotate-180')}
          />
        )}
      </button>
      {(!collapsible || open) && <div className="space-y-2">{children}</div>}
    </div>
  );
}

function FilterOption({
  checked,
  onClick,
  label,
}: {
  checked: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 w-full text-left text-sm py-1 group',
        checked ? 'text-gold' : 'text-espresso hover:text-gold',
      )}
      type="button"
    >
      <span
        className={cn(
          'w-4 h-4 border flex items-center justify-center shrink-0 transition-colors',
          checked ? 'bg-gold border-gold' : 'border-sand-400 group-hover:border-gold',
        )}
      >
        {checked && (
          <svg viewBox="0 0 12 12" className="w-2.5 h-2.5" fill="none">
            <path d="M2 6.5L4.5 9L10 3" stroke="#FBF4E4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {label}
    </button>
  );
}
