import { notFound } from 'next/navigation';
import { techArticles } from '@/lib/tech-articles';

export function generateStaticParams() {
  return techArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = techArticles.find((item) => item.slug === slug);
  return {
    title: article ? `${article.title} — ATHENA Tech` : '기술문서를 찾을 수 없습니다.',
    description: article?.description,
  };
}

export default async function TechArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const articleIndex = techArticles.findIndex((item) => item.slug === slug);
  if (articleIndex < 0) notFound();

  const article = techArticles[articleIndex];
  const previous = techArticles[articleIndex - 1];
  const next = techArticles[articleIndex + 1];

  return (
    <main id="main" className="tech-document">
      <div
        className="tech-article-content"
        dangerouslySetInnerHTML={{ __html: article.html }}
      />
      <nav className="tech-article-navigation" aria-label="기술문서 이동">
        {previous ? (
          <a href={`/tech/${previous.slug}`}>
            <span>이전 글</span>
            {previous.title}
          </a>
        ) : <span />}
        {next ? (
          <a href={`/tech/${next.slug}`}>
            <span>다음 글</span>
            {next.title}
          </a>
        ) : (
          <a href="/tech">
            <span>Tech</span>
            전체 기술문서 보기
          </a>
        )}
      </nav>
    </main>
  );
}
