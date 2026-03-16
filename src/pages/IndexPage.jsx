import { Link } from 'react-router-dom'

const demos = [
  {
    slug: 'samsung-hospital',
    title: '삼성서울병원',
    subtitle: 'Marketing Intelligence Dashboard',
    industry: '의료',
    apis: ['GEOcare API', 'Naver Ads API', 'Naver Search API', 'Naver DataLab'],
    status: 'live',
    updated: '2026-03-16',
    description: 'AI 검색 시장 점유율, E-E-A-T 분석, 키워드 갭 발견, AI 캠페인 플랜까지 — 5개 채널 종합 분석',
  },
  {
    slug: 'uniqlo',
    title: '유니클로',
    subtitle: 'GEO Performance Dashboard',
    industry: '패션/리테일',
    apis: ['GEOcare API', 'Naver Ads API'],
    status: 'coming',
    updated: null,
    description: 'GEO 점유율 정기 모니터링 + 경쟁사 비교 + 콘텐츠 최적화 추적',
  },
  {
    slug: null,
    title: '키워드 실시간 조회',
    subtitle: 'Naver Ads API Live Demo',
    industry: '도구',
    apis: ['Naver Ads API', 'n8n Workflow'],
    status: 'coming',
    updated: null,
    description: '브랜드명 입력 → 실시간 검색량/경쟁강도 조회 → 키워드 갭 자동 분석',
  },
]

const statusMap = {
  live: { label: 'Live', color: 'bg-emerald-500' },
  coming: { label: 'Coming Soon', color: 'bg-slate-400' },
}

export default function IndexPage() {
  return (
    <div className="min-h-screen bg-slate-50" style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🚀</span>
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">demo.bmp.ai</h1>
              </div>
              <p className="text-sm text-slate-500">
                API로 데이터를 모으고, AI로 전략을 만든다 — GEOcare.AI 시연 허브
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-400 uppercase tracking-widest">Powered by</p>
              <p className="text-sm font-bold text-blue-600">GEOcare.AI</p>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Cards */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {demos.map((demo, i) => {
            const st = statusMap[demo.status]
            const isLive = demo.status === 'live' && demo.slug
            const Wrapper = isLive ? Link : 'div'
            const wrapperProps = isLive ? { to: `/${demo.slug}` } : {}

            return (
              <Wrapper
                key={i}
                {...wrapperProps}
                className={`bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-all ${
                  isLive ? 'hover:shadow-lg hover:border-blue-300 hover:-translate-y-0.5 cursor-pointer' : 'opacity-75'
                }`}
              >
                {/* Status Bar */}
                <div className="px-5 pt-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
                    <span className={`w-2 h-2 rounded-full ${st.color}`} />
                    {st.label}
                  </span>
                  <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                    {demo.industry}
                  </span>
                </div>

                {/* Content */}
                <div className="px-5 pt-3 pb-4">
                  <h2 className="text-lg font-bold text-slate-900">{demo.title}</h2>
                  <p className="text-xs text-slate-500 mt-0.5">{demo.subtitle}</p>
                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">{demo.description}</p>

                  {/* API Badges */}
                  <div className="flex flex-wrap gap-1 mt-3">
                    {demo.apis.map((api, j) => (
                      <span key={j} className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100">
                        {api}
                      </span>
                    ))}
                  </div>

                  {demo.updated && (
                    <p className="text-[10px] text-slate-400 mt-3">Updated {demo.updated}</p>
                  )}
                </div>

                {/* CTA */}
                {isLive && (
                  <div className="px-5 py-3 bg-slate-50 border-t border-slate-100">
                    <span className="text-xs font-semibold text-blue-600">대시보드 보기 →</span>
                  </div>
                )}
              </Wrapper>
            )
          })}
        </div>

        {/* Info */}
        <div className="mt-10 text-center">
          <p className="text-xs text-slate-400">
            ※ 시연 목적으로 제작된 대시보드입니다. 실제 기관/브랜드의 의뢰로 제작된 것이 아닙니다.
          </p>
          <p className="text-xs text-slate-400 mt-1">
            © 2026 BizSpring Inc. · GEOcare.AI
          </p>
        </div>
      </div>
    </div>
  )
}
