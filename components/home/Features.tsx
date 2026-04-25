import { ShieldCheck, Truck, Sparkles, Wallet, Flower, Gift, Crown, Heart } from 'lucide-react';
import type { SiteContent } from '@/types';

const ICONS: Record<string, typeof ShieldCheck> = {
  'shield-check': ShieldCheck,
  truck: Truck,
  sparkles: Sparkles,
  wallet: Wallet,
  flower: Flower,
  gift: Gift,
  crown: Crown,
  heart: Heart,
};

export function Features({ features }: { features: SiteContent['features'] }) {
  return (
    <section className="py-16 lg:py-24 bg-espresso text-cream">
      <div className="container-duna">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-[10px] tracking-widest3 uppercase text-gold mb-3">Nuestra promesa</p>
          <h2 className="font-display text-4xl md:text-5xl font-light">
            {features.title.split(' ').slice(0, -1).join(' ')}{' '}
            <span className="italic text-gold">{features.title.split(' ').slice(-1)}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {features.items.map((item, i) => {
            const Icon = ICONS[item.icon] || Sparkles;
            return (
              <div
                key={i}
                className="group flex flex-col items-center text-center p-6 border border-sand-800 hover:border-gold transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-gold/15 flex items-center justify-center mb-5 group-hover:bg-gold transition-colors">
                  <Icon className="w-6 h-6 text-gold group-hover:text-espresso transition-colors" />
                </div>
                <h3 className="font-display text-xl text-cream mb-2">{item.title}</h3>
                <p className="text-sm text-sand-400 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
