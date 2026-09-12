import { notFound } from 'next/navigation';
import { features } from '@/lib/content';
import { DownloadButton } from '@/components/download-button';
import { Reveal } from '@/components/reveal';
import { ProductFeatureGallery } from '@/components/product-feature-gallery';
import { FeatureVideo } from '@/components/feature-video';

export function generateStaticParams() {
  return features.map((f) => ({ slug: f.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const feature = features.find((f) => f.slug === slug);
  return {
    title: feature
      ? `ATHENA ${feature.name} — ${feature.ko}`
      : '기능을 찾을 수 없습니다.',
  };
}
export default async function FeaturePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const f = features.find((item) => item.slug === slug);
  if (!f) notFound();
  return (
    <main id="main">
      <section className="detail-hero wrap">
        <p className="section-label">ATHENA {f.name}</p>
        <h1>{f.tagline}</h1>
        <p>{f.description}</p>
        <DownloadButton />
      </section>
      <div className="wide-wrap">
        <Reveal>
          <FeatureVideo slug={f.slug} />
        </Reveal>
      </div>
      <section className="feature-points wrap">
        {f.points.map(([title, copy], i) => (
          <Reveal key={title}>
            <span>0{i + 1}</span>
            <h2>{title}</h2>
            <p>{copy}</p>
          </Reveal>
        ))}
      </section>
      <ProductFeatureGallery slug={f.slug} />
      <div className="detail-end wrap">
        <a href="/tech" className="button light">
          Explore Tech ↗
        </a>
        {f.slug === 'pallas' && (
          <p>과거 데이터의 결과는 미래 수익을 보장하지 않습니다.</p>
        )}
      </div>
    </main>
  );
}
