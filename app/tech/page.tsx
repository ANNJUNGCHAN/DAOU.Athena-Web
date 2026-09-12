import { ArrowUpRight } from 'lucide-react';
import { techArticles } from '@/lib/tech-articles';

export const metadata = {
  title: 'Tech — ATHENA',
  description: 'ATHENA의 Tool Use, Agentic Memory, RAG 설계를 소개합니다.',
};

export default function TechPage() {
  return (
    <main id="main" className="wrap tech-index">
      <header className="tech-index-heading">
        <p>Tech</p>
        <h1>ATHENA를 만드는<br />세 가지 AI 기술.</h1>
      </header>
      <div className="tech-index-list">
        {techArticles.map((article, index) => (
          <a
            key={article.slug}
            href={`/tech/${article.slug}`}
            className="tech-index-item"
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div>
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <div className="tech-index-modes" aria-label="사용 모드">
                {article.modes.map((mode) => <span key={mode}>{mode}</span>)}
              </div>
            </div>
            <ArrowUpRight aria-hidden="true" />
          </a>
        ))}
      </div>
    </main>
  );
}
