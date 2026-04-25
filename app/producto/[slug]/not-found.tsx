import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="container-duna py-32 text-center">
      <p className="eyebrow mb-3">404</p>
      <h1 className="font-display text-5xl text-espresso mb-4">Fragancia no encontrada</h1>
      <p className="text-espresso-lighter mb-8 max-w-md mx-auto">
        Puede que este producto ya no esté disponible o haya sido renombrado. Volvé a la tienda y seguimos explorando.
      </p>
      <Link href="/tienda" className="btn-primary">Volver a la tienda</Link>
    </section>
  );
}
