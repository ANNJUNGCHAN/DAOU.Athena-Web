# DAOU.Athena-Web

ATHENA 웹사이트.

```bash
npm install
npm run dev
```

Node.js 22.13 이상이 필요합니다. 프로덕션 빌드는 `npm run build` 후 `npm start`입니다.

## 의존성 보안 점검

```bash
npm ci
node --experimental-strip-types --test lib/*.test.mjs
npm run lint
npx --no-install tsc --noEmit --incremental false
npm run build
npm audit
```

`package.json`의 override는 `vinext`가 고정한 `image-size`를 `2.0.4`로, `miniflare`가 고정한 `sharp`를 `0.35.5`로 올려 보안 수정 버전을 사용합니다. 상위 패키지가 해당 수정 버전을 포함하면 override를 다시 검토합니다.

2026-10-08 기준 `braces`의 [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm)은 공개된 수정 버전이 없어 `npm audit`에 경고가 남습니다. 현재 확인된 사용 경로는 `vinext`의 빌드·개발 도구 및 `shadcn` CLI이며, 웹 앱은 `shadcn`의 CSS만 가져옵니다. HTTP 요청 처리 경로에서는 사용을 발견하지 못했지만 취약점 해결이나 전체 감사 통과를 의미하지 않습니다.

## 최종 발표 자료

홈의 `15분 프레젠테이션`은 `public/presentation/paper-final.html`을 새 탭에서 엽니다.
발표 시작 버튼으로 발표자 창을 열면 기존 애니메이션과 슬라이드·대본 동기화가 유지됩니다.
같은 위치의 `ATHENA-최종발표.pdf`와 `ATHENA-최종발표.pptx`를 홈에서 다운로드할 수 있습니다.

2026-09-22 발표 프로젝트의 `paper-final` 런타임과 종속 파일을 복사한 배포본입니다.
PDF/PPTX는 `paper-final-20260922` 최종 내보내기 원본이며, 웹 인쇄로 다시 생성하지 않습니다.

`public/presentation`은 원본 발표 프로젝트에서 관리하는 정적 배포 자산이므로 웹 앱 린트 대상에서 제외합니다.

## Cloudflare 배포

```bash
npx wrangler login
npm run build
npm run deploy
```

배포는 빌드 결과의 `dist/server/wrangler.json`을 사용합니다. 기본 Worker 이름은 `athena-homepage`입니다.
다른 기존 Worker를 갱신할 때는 `npx wrangler deploy --config dist/server/wrangler.json --name <worker-name>`으로 확인한 이름을 전달합니다.

현재 배포 주소: https://athena-homepage.athena-jcahn.workers.dev
