import { getContent, getProducts } from '@/lib/db';
import { Hero } from '@/components/home/Hero';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { Story } from '@/components/home/Story';
import { Features } from '@/components/home/Features';
import { Categories } from '@/components/home/Categories';
import { CTA } from '@/components/home/CTA';
import { BrandsStrip } from '@/components/home/BrandsStrip';
import { TestimonialStrip } from '@/components/home/TestimonialStrip';

export const revalidate = 60;

export default async function HomePage() {
  const [content, products] = await Promise.all([getContent(), getProducts()]);
  const featured = products.filter((p) => p.featured && p.active && p.stock > 0).slice(0, 8);
  const fallback = featured.length >= 4
    ? featured
    : products.filter((p) => p.active && p.stock > 0).slice(0, 8);

  return (
    <>
      <Hero hero={content.hero} />
      <BrandsStrip />
      <FeaturedProducts products={fallback} />
      <Categories categories={content.categories} />
      <Story story={content.story} />
      <Features features={content.features} />
      <TestimonialStrip />
      <CTA cta={content.cta} />
    </>
  );
}
