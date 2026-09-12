import { ArrowUpRight } from 'lucide-react';
import { DownloadButton } from '@/components/download-button';
import { ParticleField } from '@/components/particle-field';
import { Reveal } from '@/components/reveal';
import { features } from '@/lib/content';
import { GITHUB_REPO_URL } from '@/lib/github-link';
import { techArticles } from '@/lib/tech-articles';
import { AthenaIntro } from '@/components/athena-intro';
import { FeatureMotion } from '@/components/cinematic-motion';
import { PresentationLauncher } from '@/components/presentation-mode';

export default function Home() {
  return (
    <main id="main">
      <section className="hero">
        <ParticleField />
        <div className="hero-content">
          <AthenaIntro />
          <h1>
            <span>투자의 시야를 가리던</span>
            <br />
            <span>안개를 걷어내다.</span>
          </h1>
          <p className="hero-mist-subtitle">정보 너머의 맥락이 보이도록.</p>
          <div className="hero-actions">
            <DownloadButton />
            <a
              className="button light"
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub 바로가기 (새 탭에서 열림)"
            >
              GitHub 바로가기
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a className="button light" href="/tech">
              Explore Tech
            </a>
            <PresentationLauncher />
          </div>
        </div>
      </section>
      <section className="home-features wrap">
        <Reveal>
          <p className="home-intro-label">
            키움증권이 만드는 AI 투자 워크스페이스
          </p>
          <h2 className="statement">
            투자의 다음 장을,
            <br />
            한 문장으로 열다.
          </h2>
          <p className="home-intro-description">
            궁금한 것을 묻고, 떠오른 생각을 적어보세요.
            <br />
            ATHENA와 함께 분석하고 검증하는 새로운 투자 방식.
          </p>
        </Reveal>
        {features.map((f) => (
          <section key={f.slug} className="home-feature">
            <div className="home-feature-copy">
              <Reveal>
                <h2>ATHENA {f.name}</h2>
                <p className="feature-name-meaning">
                  {f.ko} · {f.meaning}
                </p>
                <p className="feature-short-description">{f.tagline}</p>
                <p>{f.description}</p>
                <a className="text-link" href={`/features/${f.slug}`}>
                  기능 살펴보기 <ArrowUpRight size={17} />
                </a>
              </Reveal>
            </div>
            <Reveal>
              <FeatureMotion feature={f} />
            </Reveal>
          </section>
        ))}
      </section>
      <section className="home-cases wrap">
        <Reveal>
          <h2 className="statement">ATHENA를 만드는 기술.</h2>
        </Reveal>
        <div className="case-grid">
          {techArticles.map((article, index) => (
            <a
              key={article.slug}
              href={`/tech/${article.slug}`}
              className="case-link"
            >
              <span>{String(index + 1).padStart(2, '0')} · {article.title}</span>
              <ArrowUpRight />
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
