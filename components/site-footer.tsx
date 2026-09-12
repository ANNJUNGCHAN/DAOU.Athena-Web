import Image from 'next/image';
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <a href="/" aria-label="ATHENA 홈">
        <Image
          src="/brand/athena.png"
          alt="ATHENA"
          width={138}
          height={41}
          unoptimized
        />
      </a>
      <p>키움증권의 AI 투자 워크스페이스</p>
      <div>
        <a href="/features">기능</a>
        <a href="/tech">Tech</a>
      </div>
    </footer>
  );
}
