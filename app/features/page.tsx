import { ArrowUpRight, MessageSquare, Network, Blocks } from 'lucide-react';
import { features } from '@/lib/content';
import { Reveal } from '@/components/reveal';
import { DownloadButton } from '@/components/download-button';
import { FeatureMotion } from '@/components/cinematic-motion';
import { StartupWalkthrough } from '@/components/startup-walkthrough';
import { BrandReveal } from '@/components/brand-reveal';
export const metadata = { title: '기능 — ATHENA' };
export default function Features() {
  return (
    <main id="main" className="wrap index-page feature-overview-page">
      <section className="feature-identity" aria-labelledby="feature-identity-title">
        <div className="feature-identity-hero">
          <div className="feature-identity-copy">
            <p className="section-label">ATHENA</p>
            <h1 id="feature-identity-title">당신의 생각이<br />투자의 방식이 되는 곳.</h1>
            <DownloadButton />
          </div>
          <BrandReveal />
        </div>
        <div className="feature-principles">
          <Reveal>
            <MessageSquare size={36} strokeWidth={1.5} aria-hidden="true" />
            <h2>생각을 이해하는 인터페이스.</h2>
            <p>투자자가 도구를 배우기보다, 도구가 투자자의 의도를 이해해야 합니다. 화면 번호나 조건식, 코드를 익히지 않아도 생각을 표현하면 필요한 화면과 도구, 전략으로 이어집니다.</p>
          </Reveal>
          <Reveal>
            <Network size={36} strokeWidth={1.5} aria-hidden="true" />
            <h2>경험이 쌓이는 지능.</h2>
            <p>한번 찾아본 정보와 나눈 대화, 검토한 생각은 다음 판단의 자산이 되어야 합니다. 흩어진 경험을 나만의 지식으로 연결해, 사용할수록 나를 이해하고 함께 쌓아가는 투자 공간을 만듭니다.</p>
          </Reveal>
          <Reveal>
            <Blocks size={36} strokeWidth={1.5} aria-hidden="true" />
            <h2>내가 만드는 투자 환경.</h2>
            <p>필요한 정보와 도구, 전략은 투자자마다 다릅니다. 원하는 연결을 더하고 나의 방식에 맞게 구성하세요. AI가 준비와 실행을 돕는 동안에도, 투자 환경의 주도권은 나에게 있습니다.</p>
          </Reveal>
        </div>
      </section>
      <div className="feature-grid feature-overview-grid">
        {features.map((f) => (
          <Reveal key={f.slug} className={f.slug === 'agora' || f.slug === 'glaux' ? 'feature-overview-wide' : ''}>
            <article className="feature-overview-card">
              <FeatureMotion feature={f} />
              <h2>ATHENA {f.name}</h2>
              <p>{f.description}</p>
              <a href={`/features/${f.slug}`} className="text-link">
                기능 살펴보기 <ArrowUpRight size={17} />
              </a>
            </article>
          </Reveal>
        ))}
      </div>
      <section className="feature-start" aria-labelledby="feature-start-title">
        <Reveal>
          <h2 id="feature-start-title" className="statement">ATHENA 시작하기.</h2>
        </Reveal>
        <div className="feature-start-layout">
          <Reveal>
            <StartupWalkthrough />
          </Reveal>
          <div className="feature-start-steps">
            <Reveal>
              <h3><span className="feature-step-number">01</span>앱 설치 후 실행</h3>
              <p>Windows용 ATHENA를 다운로드하고, 설치 절차에 따라 설치를 마친 후 앱을 실행해주세요.</p>
            </Reveal>
            <Reveal>
              <h3><span className="feature-step-number">02</span>CLI 등록</h3>
              <p>Claude, Codex, Grok 중 사용하는 서비스의 CLI를 등록해주세요. 설치된 CLI는 자동으로 인식합니다. 인식된 CLI의 계정에 로그인해 사용할 서비스를 활성화해주세요.</p>
            </Reveal>
            <Reveal>
              <h3><span className="feature-step-number">03</span>키움증권 계좌 등록</h3>
              <p><a href="https://openapi.kiwoom.com" target="_blank" rel="noopener noreferrer">키움 REST API 홈페이지</a>에서 API 사용 신청을 마친 후, 발급받은 앱키와 시크릿 키를 입력해 키움증권 계좌를 등록해주세요.</p>
              <small className="feature-start-note">현재는 모의계좌만 지원합니다. 추후 실거래 계좌로 확대할 예정입니다.</small>
            </Reveal>
            <Reveal>
              <h3><span className="feature-step-number">04</span>시작하기</h3>
              <p>궁금한 종목부터 살펴보고 싶은 정보, 떠오른 투자 아이디어까지. 하고 싶은 일을 채팅창에 적어 보내보세요. ATHENA가 필요한 화면과 도구를 연결하며 다음 단계를 함께합니다.</p>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="feature-download" aria-labelledby="feature-download-title">
        <BrandReveal dark />
        <h2 id="feature-download-title">ATHENA와 투자의<br />다음 장을 열어보세요.</h2>
        <DownloadButton />
      </section>
    </main>
  );
}
