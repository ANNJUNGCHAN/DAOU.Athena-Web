export type PresentationTechStep = {
  label: string;
  title: string;
  description: string;
};

export type PresentationTechDetail = {
  term: string;
  description: string;
};

export type PresentationTechFigure = {
  src: string;
  reducedMotionSrc?: string;
  alt: string;
  label: string;
  caption?: string;
  links?: { label: string; href: string }[];
  paper?: boolean;
};

export type PresentationTechPage = {
  eyebrow: string;
  title: string;
  lead: string;
  figures: PresentationTechFigure[];
  steps: PresentationTechStep[];
  distinction: { label: string; text: string };
  details: PresentationTechDetail[];
};

export type PresentationTechArticle = {
  slug: string;
  articleTitle: string;
  modes: string[];
  pages: [PresentationTechPage, PresentationTechPage];
};

export const presentationTechArticles: PresentationTechArticle[] = [
  {
    slug: '01-tool-selection',
    articleTitle: 'ATHENA Tool Use',
    modes: ['Agora · 대화', 'Ergane · 플러그인'],
    pages: [
      {
        eyebrow: '01 · TOOL USE · 1/2',
        title: '도구가 많아져도, 먼저 좁혀서 읽습니다',
        lead: '“삼성전자 차트 보여줘”라는 문장을 해석해 필요한 API 후보만 남깁니다. 명확한 요청은 규칙으로 처리하고, 후보가 모호할 때만 LLM이 도구와 인자를 분류합니다.',
        figures: [
          {
            src: '/tech/assets/beginner-01.svg',
            reducedMotionSrc: '/tech/assets/beginner-01-static.svg',
            alt: '사용자 질문이 요청 해석, 도구 확인, 데이터 조회, 차트 표시로 이어지는 흐름',
            label: '질문에서 차트까지',
          },
          {
            src: '/tech/assets/toolrerank-figure-2-original.png',
            alt: 'Dual Encoder 검색부터 Adaptive Truncation, Cross Encoder와 계층 기반 재정렬로 이어지는 ToolRerank Figure 2 원본',
            label: '연구 참고 구조',
            caption:
              'Zheng et al., 2024, ToolRerank, Figure 2, p. 16265(PDF 3쪽) 원본 크롭 · © 2024 ELRA Language Resource Association · CC BY-NC 4.0',
            links: [
              {
                label: '라이선스',
                href: 'https://creativecommons.org/licenses/by-nc/4.0/',
              },
              {
                label: '논문 원문',
                href: 'https://aclanthology.org/2024.lrec-main.1413/',
              },
            ],
            paper: true,
          },
        ],
        steps: [
          {
            label: 'INTERPRET',
            title: '요청을 해석합니다',
            description: '질문에서 작업 유형과 필요한 입력을 읽습니다.',
          },
          {
            label: 'RETRIEVE',
            title: '후보를 좁힙니다',
            description: '어휘 기반 검색으로 관련 API 설명만 남깁니다.',
          },
          {
            label: 'CHECK',
            title: '실행 조건을 봅니다',
            description: '요청 유형과 필수 입력이 맞는 후보만 통과시킵니다.',
          },
        ],
        distinction: {
          label: '논문과 실제 구현',
          text: 'ToolRerank의 검색·재정렬 구조를 참고했지만, ATHENA는 학습된 재정렬 모델 대신 어휘 검색 · 요청 유형 검사 · Schema Validation · 제한된 LLM 분류를 사용합니다.',
        },
        details: [
          {
            term: 'ToolRerank',
            description:
              '논문은 Dual Encoder로 후보를 찾고 Cross Encoder와 계층 기반 재정렬로 상위 k개를 LLM에 전달합니다.',
          },
          {
            term: 'ATHENA Routing',
            description:
              'API 호출 조건이 부족한 후보는 실행 대상으로 인정하지 않으며, 명확한 요청에는 LLM 분류를 사용하지 않습니다.',
          },
        ],
      },
      {
        eyebrow: '01 · TOOL USE · 2/2',
        title: '검증된 첫 결과만, API는 한 번',
        lead: '후보를 하나로 좁히기 어려우면 두 분류기를 제한적으로 병렬 실행합니다. 먼저 도착한 답이 아니라 서버 검사를 먼저 통과한 결과 하나만 채택합니다.',
        figures: [
          {
            src: '/tech/assets/beginner-02.svg',
            reducedMotionSrc: '/tech/assets/beginner-02-static.svg',
            alt: '단어 점수로 후보를 찾고 입력 조건을 검사하는 ATHENA의 과정',
            label: 'ATHENA 후보 검색과 조건 검사',
          },
          {
            src: '/tech/assets/beginner-03.svg',
            reducedMotionSrc: '/tech/assets/beginner-03-static.svg',
            alt: '두 분류기의 결과를 검증한 뒤 서버가 차트를 만드는 과정',
            label: 'First-valid Hedging',
          },
        ],
        steps: [
          {
            label: 'CLASSIFY',
            title: '최대 3개 안에서 고릅니다',
            description: '두 분류기가 같은 후보에서 도구와 인자를 선택합니다.',
          },
          {
            label: 'VALIDATE',
            title: '서버가 검사합니다',
            description: '후보·인자·스키마를 통과한 첫 결과를 채택합니다.',
          },
          {
            label: 'EXECUTE',
            title: '한 번만 실행합니다',
            description:
              '실제 제공자 API 호출은 하나의 검증된 결과로 보냅니다.',
          },
        ],
        distinction: {
          label: 'First-valid Hedging',
          text: '다수결이나 단순 선착순이 아닙니다. 한 번의 선택에는 분류기 2개를 쓰고, 전체 동시 분류 작업은 최대 4개로 제한합니다.',
        },
        details: [
          {
            term: 'Bounded Parallelism',
            description:
              '동시 분류 수에 상한을 둬 요청이 겹쳐도 병렬 작업이 계속 늘어나지 않게 합니다.',
          },
          {
            term: 'Decision Cache',
            description:
              '정규화한 질문의 선택 판단을 짧게 재사용하고 TTL과 저장 한도로 만료 범위를 관리합니다.',
          },
        ],
      },
    ],
  },
  {
    slug: '02-investment-memory',
    articleTitle: 'Agentic Memory for ATHENA',
    modes: ['Agora · 대화', 'Metis · 지식 그래프', 'Aegis · 맞춤 감시'],
    pages: [
      {
        eyebrow: '02 · AGENTIC MEMORY · 1/2',
        title: '관심과 투자 사실은 다른 입력입니다',
        lead: '“배당주가 궁금해요”는 관심 표현이고 “삼성전자 10주를 보유하고 있다”는 투자 사실입니다. ATHENA는 대화와 계좌 데이터를 처음부터 다른 경로로 기억합니다.',
        figures: [
          {
            src: '/tech/assets/beginner-05.svg',
            reducedMotionSrc: '/tech/assets/beginner-05-static.svg',
            alt: '관심 표현과 투자 사실을 구분하는 예시',
            label: '관심 표현과 투자 사실',
          },
          {
            src: '/tech/assets/beginner-06.svg',
            reducedMotionSrc: '/tech/assets/beginner-06-static.svg',
            alt: '대화와 거래 데이터가 서로 다른 경로로 저장되는 과정',
            label: '출처별 입력 경로',
          },
        ],
        steps: [
          {
            label: 'CONVERSATION',
            title: '대화는 구조화해 추출합니다',
            description: '개체·관계·명시성·근거를 정해진 JSON으로 받습니다.',
          },
          {
            label: 'ACCOUNT',
            title: '거래는 규칙으로 옮깁니다',
            description: '체결·보유 정보에는 LLM의 해석을 넣지 않습니다.',
          },
          {
            label: 'PROVENANCE',
            title: '근거를 같이 남깁니다',
            description: '출처·원문·시점과 명시성 상태를 각각 기록합니다.',
          },
        ],
        distinction: {
          label: '핵심 원칙',
          text: 'EXTRACTED · INFERRED · AMBIGUOUS는 원문에 얼마나 분명히 드러났는지를 나타냅니다. 명시성과 출처를 한 점수로 합치지 않습니다.',
        },
        details: [
          {
            term: 'Structured Extraction',
            description:
              '요청 ID와 원문 지문이 다르거나 JSON 형식 검사를 통과하지 못한 결과는 그래프에 저장하지 않습니다.',
          },
          {
            term: '우선순위',
            description:
              '사용자 수정과 체결·보유에서 확인한 사실을 대화 추론보다 먼저 적용합니다.',
          },
        ],
      },
      {
        eyebrow: '02 · AGENTIC MEMORY · 2/2',
        title: '같은 의미는 묶고, 위험한 병합은 막습니다',
        lead: '“반도체 산업”, “반도체 업종”, “반도체”처럼 표현이 달라도 같은 관심사를 가리킬 수 있습니다. 별칭과 이름, 연결 관계를 차례로 비교해 대표 노드로 정리합니다.',
        figures: [
          {
            src: '/tech/assets/beginner-07.svg',
            reducedMotionSrc: '/tech/assets/beginner-07-static.svg',
            alt: '여러 이름을 하나의 대상으로 정리하는 과정',
            label: 'Entity Resolution',
          },
        ],
        steps: [
          {
            label: 'ALIAS',
            title: '정확한 별칭을 먼저 봅니다',
            description: '고정된 별칭이 맞으면 같은 후보로 연결합니다.',
          },
          {
            label: 'SIMILARITY',
            title: '유사도를 제한해 비교합니다',
            description: '이름 0.6, 이웃 관계 0.8 이상에서만 연결합니다.',
          },
          {
            label: 'UNION-FIND',
            title: '대표 노드를 고릅니다',
            description: '관계 수·별칭 수·생성 순서로 한 묶음을 정리합니다.',
          },
        ],
        distinction: {
          label: '병합 보호',
          text: '종목은 이름이 비슷하다는 이유로 합치지 않고 종목코드로 구분합니다. 투자자 프로필도 자동 병합에서 제외합니다.',
        },
        details: [
          {
            term: '이웃 비교 조건',
            description:
              '이웃 관계 유사도는 두 대상 모두 연결된 이웃이 2개 이상일 때만 비교합니다.',
          },
          {
            term: '사용 위치',
            description:
              '정리된 그래프는 메티스의 근거 확인, 아고라의 다음 대화, 아이기스의 맞춤 감시에 다시 사용됩니다.',
          },
        ],
      },
    ],
  },
  {
    slug: '03-graph-retrieval',
    articleTitle: 'RAG for ATHENA',
    modes: ['Metis · 그래프'],
    pages: [
      {
        eyebrow: '03 · GROUNDED RAG · 1/2',
        title: '대상을 확정한 뒤, 근거 원문까지 찾습니다',
        lead: '“삼성”처럼 여러 기업을 가리킬 수 있는 이름은 먼저 그래프의 한 점과 연결합니다. 대상이 정해진 뒤 관계와 판단 이유, 출처 원문을 함께 가져옵니다.',
        figures: [
          {
            src: '/tech/assets/beginner-09.svg',
            reducedMotionSrc: '/tech/assets/beginner-09-static.svg',
            alt: '질문에서 그래프의 대상을 찾는 과정',
            label: 'Entity Retrieval',
          },
          {
            src: '/tech/assets/beginner-10.svg',
            reducedMotionSrc: '/tech/assets/beginner-10-static.svg',
            alt: '관계와 근거 원문을 함께 되돌려주는 흐름',
            label: 'Evidence Grounding',
          },
        ],
        steps: [
          {
            label: 'IDENTIFY',
            title: 'ID를 먼저 확인합니다',
            description: '화면이 넘긴 ID가 있으면 그 대상을 직접 찾습니다.',
          },
          {
            label: 'SEARCH',
            title: '후보를 최대 5개만 찾습니다',
            description: 'ID가 없을 때 FTS5/BM25로 이름과 별칭을 검색합니다.',
          },
          {
            label: 'GROUND',
            title: '관계와 원문을 묶습니다',
            description: '방향·시점·rationale·provenance·발췌문을 반환합니다.',
          },
        ],
        distinction: {
          label: '제한된 RAG',
          text: '정확히 일치하는 이름이 하나이거나 후보가 하나일 때만 확정합니다. 여러 후보가 남으면 추측하지 않고 사용자가 고를 목록을 보여줍니다.',
        },
        details: [
          {
            term: 'FTS5 / BM25',
            description:
              'SQLite 전문 검색과 순위 계산으로 이름·별칭 후보를 제한하고 정확한 일치 여부를 다시 검사합니다.',
          },
          {
            term: 'Evidence Grounding',
            description:
              '관계의 한 줄 판단 이유와 원문 발췌, 출처 ID를 함께 조회해 그래프의 선을 원래 기록까지 되짚게 합니다.',
          },
        ],
      },
      {
        eyebrow: '03 · GROUNDED RAG · 2/2',
        title: '복잡한 그래프를 일관된 군집으로 정리합니다',
        lead: '점과 선이 많아지면 관계를 하나씩 읽는 것만으로 전체 맥락을 보기 어렵습니다. 촘촘하게 연결된 점을 클러스터로 묶고 탐색에 쓸 짧은 이름을 붙입니다.',
        figures: [
          {
            src: '/tech/assets/beginner-11.svg',
            reducedMotionSrc: '/tech/assets/beginner-11-static.svg',
            alt: '점과 선을 클러스터로 묶고 이름표를 만드는 과정',
            label: 'Community Detection',
          },
        ],
        steps: [
          {
            label: 'CLUSTER',
            title: '연결이 촘촘한 점을 묶습니다',
            description: 'Greedy Modularity로 클러스터를 계산합니다.',
          },
          {
            label: 'STABILIZE',
            title: '표시 순서를 고정합니다',
            description: '크기와 노드 ID로 번호를 정해 흔들림을 줄입니다.',
          },
          {
            label: 'LABEL',
            title: '탐색 이름을 재사용합니다',
            description: '대표 점 최대 12개로 짧은 이름을 만들고 캐시합니다.',
          },
        ],
        distinction: {
          label: '결정적인 구조',
          text: '같은 그래프는 같은 기준으로 시작합니다. 연결이 없는 점은 억지로 클러스터에 넣지 않고 미분류로 둡니다.',
        },
        details: [
          {
            term: 'Greedy Modularity',
            description:
              '클러스터 안의 연결은 많고 클러스터 사이의 연결은 적도록 노드를 차례로 묶습니다.',
          },
          {
            term: 'Label Cache',
            description:
              '클러스터 구성과 라벨링 프롬프트가 같으면 저장해 둔 이름을 다시 사용합니다.',
          },
        ],
      },
    ],
  },
];

export const presentationTechPageCountBySlug = Object.fromEntries(
  presentationTechArticles.map((article) => [
    article.slug,
    article.pages.length,
  ]),
);

export function getPresentationTechPage(slug: string, pageIndex: number) {
  const article = presentationTechArticles.find((item) => item.slug === slug);
  const page = article?.pages[pageIndex];
  return article && page ? { article, page } : undefined;
}
