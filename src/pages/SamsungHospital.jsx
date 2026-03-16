import { Link } from "react-router-dom";
import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend, AreaChart, Area
} from "recharts";

const Badge = ({ children, color = "blue" }) => {
  const styles = {
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    green: "bg-emerald-50 text-emerald-700 border-emerald-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    red: "bg-red-50 text-red-700 border-red-200",
    slate: "bg-slate-50 text-slate-600 border-slate-200",
    gold: "bg-yellow-50 text-yellow-800 border-yellow-300",
    purple: "bg-purple-50 text-purple-700 border-purple-200",
  };
  return <span className={`inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded border ${styles[color]}`}>{children}</span>;
};
const Card = ({ children, className = "" }) => <div className={`bg-white rounded-xl border border-slate-200 shadow-sm ${className}`}>{children}</div>;
const MetricCard = ({ label, value, sub, trend }) => (
  <Card className="p-5">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</p>
        <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
        {sub && <p className="mt-0.5 text-xs text-slate-500">{sub}</p>}
      </div>
      {trend !== undefined && (
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${trend > 0 ? "bg-emerald-50 text-emerald-600" : trend < 0 ? "bg-red-50 text-red-600" : "bg-slate-50 text-slate-500"}`}>
          {trend > 0 ? "▲" : trend < 0 ? "▼" : "—"} {Math.abs(trend)}%
        </span>
      )}
    </div>
  </Card>
);
const TabButton = ({ active, children, onClick }) => (
  <button onClick={onClick} className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${active ? "bg-slate-900 text-white shadow-md" : "text-slate-600 hover:bg-slate-100"}`}>{children}</button>
);

// ══════════ DATA ══════════
const somTrend = [{ date: "2/11", value: 53.6 }, { date: "2/12", value: 51.0 }, { date: "2/13", value: 49.0 }];
const llmData = [
  { name: "Perplexity", value: 54.2, fill: "#6366f1" },
  { name: "OpenAI", value: 52.1, fill: "#2563eb" },
  { name: "Claude", value: 45.8, fill: "#06b6d4" },
  { name: "Gemini", value: 43.8, fill: "#059669" },
];
const competitorData = [
  { name: "삼성서울병원", value: 49.0, fill: "#2563eb" },
  { name: "아산병원", value: 25.7, fill: "#64748b" },
  { name: "서울대병원", value: 24.9, fill: "#94a3b8" },
  { name: "세브란스", value: 22.2, fill: "#cbd5e1" },
];
const eeatDist = [
  { range: "0점", count: 1, fill: "#dc2626" },
  { range: "~20점", count: 18, fill: "#f97316" },
  { range: "25-30점", count: 7, fill: "#eab308" },
  { range: "45-50점", count: 3, fill: "#22c55e" },
  { range: "70점", count: 1, fill: "#2563eb" },
];
const citationData = [
  { source: "자사", count: 7, fill: "#2563eb" },
  { source: "경쟁사", count: 8, fill: "#ef4444" },
  { source: "의료매체", count: 3, fill: "#8b5cf6" },
  { source: "연구기관", count: 3, fill: "#06b6d4" },
  { source: "커뮤니티", count: 2, fill: "#f59e0b" },
];
const eeatTop = [{ dept: "심장내과", score: 70, max: 70 }, { dept: "혈관센터", score: 50, max: 70 }, { dept: "뇌졸중센터", score: 45, max: 70 }];
const eeatBottom = [{ dept: "뇌종양센터", score: 0, max: 70 }, { dept: "암센터", score: 20, max: 70 }, { dept: "간센터", score: 20, max: 70 }];
const kwData = [
  { kw: "삼성병원", type: "브랜드", pc: 33500, mo: 82000, total: 115500, comp: "낮음" },
  { kw: "삼성서울병원", type: "브랜드", pc: 28300, mo: 82900, total: 111200, comp: "중간" },
  { kw: "건강검진 비용", type: "일반", pc: 18200, mo: 52000, total: 70200, comp: "높음" },
  { kw: "종합건강검진", type: "일반", pc: 12400, mo: 38600, total: 51000, comp: "높음" },
  { kw: "삼성의료원", type: "브랜드", pc: 8100, mo: 18500, total: 26600, comp: "낮음" },
  { kw: "대학병원 예약", type: "일반", pc: 4500, mo: 15800, total: 20300, comp: "중간" },
  { kw: "암검진 병원", type: "일반", pc: 5800, mo: 14200, total: 20000, comp: "높음" },
  { kw: "심장내과 잘하는 병원", type: "일반", pc: 3200, mo: 9400, total: 12600, comp: "중간" },
];
const kwChart = kwData.map(d => ({ name: d.kw.length > 8 ? d.kw.slice(0, 8) + "…" : d.kw, PC: d.pc, MO: d.mo }));
const ytVideos = [
  { title: "심장수술 후 회복 과정", views: "240만", cat: "환자사례" },
  { title: "건강검진 브이로그", views: "180만", cat: "건강검진" },
  { title: "CAR-T 세포치료 신기술", views: "120만", cat: "의료정보" },
];
const contentMix = [
  { name: "의료정보", value: 35, fill: "#2563eb" },
  { name: "의료진 소개", value: 20, fill: "#6366f1" },
  { name: "환자사례", value: 15, fill: "#06b6d4" },
  { name: "건강검진", value: 15, fill: "#059669" },
  { name: "병원소식", value: 15, fill: "#f59e0b" },
];
const newsTrend = [
  { date: "3/9(일)", count: 0 }, { date: "3/10(월)", count: 0 }, { date: "3/11(화)", count: 0 },
  { date: "3/12(수)", count: 50 }, { date: "3/13(목)", count: 40 }, { date: "3/14(금)", count: 2 }, { date: "3/15(토)", count: 8 },
];
const sentiment = [
  { name: "긍정", value: 62, fill: "#059669" },
  { name: "중립", value: 28, fill: "#94a3b8" },
  { name: "부정", value: 10, fill: "#ef4444" },
];
const headlines = [
  { title: "수술로봇 1위 인튜이티브…韓 의료진 민감정보 유출", source: "서울경제" },
  { title: "스트레스 40대 가장 높아…주원인 男 직장, 女 가족", source: "중앙일보" },
  { title: "전문약사 영양지원·이식·중환자 임상 참여율 높아", source: "데일리메디" },
];
const dataLabTrend = [
  { month: "10월", 삼성: 72, 아산: 65, 서울대: 58, 세브란스: 52 },
  { month: "11월", 삼성: 74, 아산: 66, 서울대: 58, 세브란스: 53 },
  { month: "12월", 삼성: 76, 아산: 67, 서울대: 59, 세브란스: 53 },
  { month: "1월", 삼성: 78, 아산: 68, 서울대: 59, 세브란스: 54 },
  { month: "2월", 삼성: 80, 아산: 69, 서울대: 60, 세브란스: 54 },
  { month: "3월", 삼성: 82, 아산: 70, 서울대: 60, 세브란스: 55 },
];

// Campaign Plan
const channelMix = [
  { name: "GEO 최적화", value: 35, fill: "#2563eb" },
  { name: "SEO·콘텐츠", value: 30, fill: "#6366f1" },
  { name: "소셜·바이럴", value: 20, fill: "#06b6d4" },
  { name: "퍼포먼스 마케팅", value: 15, fill: "#f59e0b" },
];

// ══════════ TABS ══════════

function OverviewTab() {
  return (
    <div className="space-y-6">
      <Card className="p-0 overflow-hidden">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 p-5">
          <p className="text-xs font-semibold text-blue-300 uppercase tracking-widest mb-3">Data Collection Pipeline</p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {[
              { step: "①", label: "API 데이터 수집", desc: "Naver Ads · News · YouTube" },
              { step: "②", label: "LLM 채널 분석", desc: "GPT · Claude · Gemini · Perplexity" },
              { step: "③", label: "캠페인 플랜 생성", desc: "AI 전략 자동 수립" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-blue-600/30 border border-blue-400/40">
                  <span className="text-lg font-bold text-blue-300">{s.step}</span>
                  <div>
                    <p className="text-sm font-semibold text-white">{s.label}</p>
                    <p className="text-[10px] text-slate-400">{s.desc}</p>
                  </div>
                  <span className="text-emerald-400 text-sm ml-1">✓</span>
                </div>
                {i < 2 && <span className="text-slate-600 text-lg">→</span>}
              </div>
            ))}
          </div>
        </div>
      </Card>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard label="AI Search SoM" value="49.0%" sub="4개 LLM 평균" trend={-4.6} />
        <MetricCard label="EEAT 평균" value="26.2/70" sub="30페이지 분석" />
        <MetricCard label="월간 검색량" value="111.2K" sub="삼성서울병원 (PC+MO)" />
        <MetricCard label="AI 인용" value="23건" sub="자사7 / 경쟁사8 / 기타8" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4"><h3 className="text-sm font-bold text-slate-900">SoM 3일 추이</h3><Badge color="blue">GEOcare API</Badge></div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={somTrend}>
              <defs><linearGradient id="somGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#2563eb" stopOpacity={0.15}/><stop offset="95%" stopColor="#2563eb" stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0"/><XAxis dataKey="date" tick={{fontSize:12}}/><YAxis domain={[40,60]} tick={{fontSize:12}} tickFormatter={v=>`${v}%`}/>
              <Tooltip formatter={v=>`${v}%`}/><Area type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2.5} fill="url(#somGrad)" dot={{r:5,fill:"#2563eb"}}/>
            </AreaChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4"><h3 className="text-sm font-bold text-slate-900">경쟁사 SoM 비교</h3><Badge color="blue">GEOcare API</Badge></div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={competitorData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0"/><XAxis type="number" domain={[0,60]} tick={{fontSize:11}} tickFormatter={v=>`${v}%`}/>
              <YAxis dataKey="name" type="category" width={90} tick={{fontSize:11}}/><Tooltip formatter={v=>`${v}%`}/>
              <Bar dataKey="value" radius={[0,6,6,0]} barSize={24}>{competitorData.map((d,i)=><Cell key={i} fill={d.fill}/>)}</Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
      <Card className="p-5">
        <div className="flex items-center justify-between mb-2"><h3 className="text-sm font-bold text-slate-900">브랜드 키워드 검색량</h3><Badge color="green">Naver Ads API</Badge></div>
        <div className="flex items-baseline gap-6 mt-2">
          <div><span className="text-3xl font-extrabold text-slate-900">111,200</span><span className="text-xs text-slate-500 ml-1">건/월</span></div>
          <div className="flex gap-4 text-sm text-slate-600">
            <span>PC <strong className="text-slate-900">28,300</strong></span>
            <span>MO <strong className="text-slate-900">82,900</strong></span>
            <span>경쟁강도 <Badge color="amber">중간</Badge></span>
          </div>
        </div>
      </Card>
    </div>
  );
}

function AIIntelligenceTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4"><h3 className="text-sm font-bold text-slate-900">LLM별 브랜드 인지율</h3><Badge color="blue">GEOcare API</Badge></div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={llmData}><CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0"/><XAxis dataKey="name" tick={{fontSize:11}}/><YAxis domain={[0,70]} tick={{fontSize:11}} tickFormatter={v=>`${v}%`}/><Tooltip formatter={v=>`${v}%`}/><Bar dataKey="value" radius={[6,6,0,0]} barSize={40}>{llmData.map((d,i)=><Cell key={i} fill={d.fill}/>)}</Bar></BarChart>
          </ResponsiveContainer>
          <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg"><p className="text-xs text-amber-800">⚡ <strong>전략 포인트:</strong> Perplexity(54.2%)와 Gemini(43.8%) 사이 <strong>10.4%p 편차</strong> — Gemini 최적화가 가장 시급</p></div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4"><h3 className="text-sm font-bold text-slate-900">AI 인용 출처 분석</h3><Badge color="blue">GEOcare API</Badge></div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart><Pie data={citationData} dataKey="count" nameKey="source" cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={3} label={({source,count})=>`${source} ${count}건`}>{citationData.map((d,i)=><Cell key={i} fill={d.fill}/>)}</Pie><Tooltip/></PieChart>
          </ResponsiveContainer>
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg"><p className="text-xs text-red-800">⚠️ <strong>경고:</strong> 경쟁사 인용(8건)이 자사(7건)보다 많음 — 자사 인용 소스 확보 필요</p></div>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4"><h3 className="text-sm font-bold text-slate-900">E-E-A-T 점수 분포 (30페이지)</h3><Badge color="blue">GEOcare API</Badge></div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={eeatDist}><CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0"/><XAxis dataKey="range" tick={{fontSize:11}}/><YAxis tick={{fontSize:11}}/><Tooltip/><Bar dataKey="count" radius={[6,6,0,0]} barSize={36}>{eeatDist.map((d,i)=><Cell key={i} fill={d.fill}/>)}</Bar></BarChart>
          </ResponsiveContainer>
          <p className="mt-2 text-xs text-slate-500 text-center">평균 26.2/70 — 30페이지 중 18페이지가 20점 이하</p>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4"><h3 className="text-sm font-bold text-slate-900">진료과별 E-E-A-T</h3><Badge color="blue">GEOcare API</Badge></div>
          <div className="space-y-2">
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">🏆 상위</p>
            {eeatTop.map((d,i)=>(<div key={i} className="flex items-center gap-3"><span className="text-xs text-slate-600 w-20 truncate">{d.dept}</span><div className="flex-1 h-5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600" style={{width:`${(d.score/d.max)*100}%`}}/></div><span className="text-xs font-bold text-slate-900 w-10 text-right">{d.score}</span></div>))}
            <div className="border-t border-slate-200 my-2"/>
            <p className="text-xs font-semibold text-red-500 uppercase tracking-wider">⚠️ 하위</p>
            {eeatBottom.map((d,i)=>(<div key={i} className="flex items-center gap-3"><span className="text-xs text-slate-600 w-20 truncate">{d.dept}</span><div className="flex-1 h-5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-red-400 to-red-500" style={{width:`${Math.max((d.score/d.max)*100,2)}%`}}/></div><span className="text-xs font-bold text-slate-900 w-10 text-right">{d.score}</span></div>))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function PaidTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard label="브랜드 검색합산" value="253.3K" sub="3개 브랜드KW 합계"/>
        <MetricCard label="일반 검색합산" value="174.1K" sub="5개 일반KW 합계"/>
        <MetricCard label="미집행 기회" value="70.2K" sub="건강검진 비용 (경쟁3사 집행중)"/>
        <MetricCard label="고경쟁 키워드" value="4개" sub="경쟁강도 '높음'"/>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4"><h3 className="text-sm font-bold text-slate-900">키워드별 검색량 (PC vs MO)</h3><Badge color="green">Naver Ads API</Badge></div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={kwChart} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0"/><XAxis type="number" tick={{fontSize:10}} tickFormatter={v=>v>=1000?`${(v/1000).toFixed(0)}K`:v}/><YAxis dataKey="name" type="category" width={95} tick={{fontSize:10}}/><Tooltip formatter={v=>v.toLocaleString()}/><Legend wrapperStyle={{fontSize:11}}/><Bar dataKey="PC" stackId="a" fill="#2563eb" barSize={18}/><Bar dataKey="MO" stackId="a" fill="#93c5fd" radius={[0,4,4,0]} barSize={18}/></BarChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-5 overflow-auto">
          <div className="flex items-center justify-between mb-4"><h3 className="text-sm font-bold text-slate-900">키워드 상세</h3><Badge color="green">Naver Ads API</Badge></div>
          <table className="w-full text-xs"><thead><tr className="border-b border-slate-200"><th className="text-left py-2 text-slate-500 font-medium">키워드</th><th className="text-center py-2 text-slate-500 font-medium">유형</th><th className="text-right py-2 text-slate-500 font-medium">PC</th><th className="text-right py-2 text-slate-500 font-medium">MO</th><th className="text-right py-2 text-slate-500 font-medium">합산</th><th className="text-center py-2 text-slate-500 font-medium">경쟁</th></tr></thead>
          <tbody>{kwData.map((d,i)=>(<tr key={i} className={`border-b border-slate-100 ${d.kw==="건강검진 비용"?"bg-amber-50":""}`}><td className="py-2 font-medium text-slate-800">{d.kw}</td><td className="py-2 text-center"><Badge color={d.type==="브랜드"?"blue":"slate"}>{d.type}</Badge></td><td className="py-2 text-right text-slate-600">{d.pc.toLocaleString()}</td><td className="py-2 text-right text-slate-600">{d.mo.toLocaleString()}</td><td className="py-2 text-right font-bold text-slate-900">{d.total.toLocaleString()}</td><td className="py-2 text-center"><Badge color={d.comp==="높음"?"red":d.comp==="중간"?"amber":"green"}>{d.comp}</Badge></td></tr>))}</tbody></table>
        </Card>
      </div>
      <Card className="p-0 overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-3"><p className="text-sm font-bold text-white">🔍 경쟁사 키워드 갭 발견</p></div>
        <div className="p-5"><div className="flex items-start gap-4 flex-wrap"><div className="flex-1 min-w-0"><p className="text-sm font-semibold text-slate-900">"건강검진 비용" — 월 70,200건</p><p className="text-xs text-slate-600 mt-1">삼성서울병원 <strong className="text-red-600">미집행</strong> · 아산·서울대·세브란스 <strong className="text-emerald-600">집행 중</strong></p><p className="text-xs text-slate-500 mt-2">경쟁강도 '높음'이지만 검색량 대비 브랜드 미노출 — 즉각적 퍼포먼스 개선 기회</p></div><div className="flex gap-1 flex-wrap">{["아산","서울대","세브란스"].map((c,i)=>(<span key={i} className="px-2 py-1 text-[10px] font-medium bg-emerald-50 text-emerald-700 rounded border border-emerald-200">✓ {c}</span>))}<span className="px-2 py-1 text-[10px] font-medium bg-red-50 text-red-700 rounded border border-red-200">✗ 삼성</span></div></div></div>
      </Card>
    </div>
  );
}

function OwnedTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5"><div className="flex items-center gap-2 mb-3"><span className="text-xl">▶️</span><div><p className="text-sm font-bold text-slate-900">YouTube</p><p className="text-[10px] text-slate-500">2011~ · 1,200+개 영상</p></div></div><p className="text-3xl font-extrabold text-slate-900">14만<span className="text-base font-medium text-slate-500">+</span></p><p className="text-xs text-slate-500 mt-0.5">구독자 · 대형병원 4번째 실버버튼</p><div className="mt-2"><Badge color="slate">공개 데이터</Badge></div></Card>
        <Card className="p-5"><div className="flex items-center gap-2 mb-3"><span className="text-xl">📝</span><div><p className="text-sm font-bold text-slate-900">Naver 블로그</p><div className="mt-0.5"><Badge color="green">Naver Search API</Badge></div></div></div><p className="text-3xl font-extrabold text-slate-900">189,839<span className="text-base font-medium text-slate-500">건</span></p><p className="text-xs text-slate-500 mt-0.5">누적 포스트</p></Card>
        <Card className="p-5"><div className="flex items-center gap-2 mb-3"><span className="text-xl">💬</span><div><p className="text-sm font-bold text-slate-900">Naver 카페</p><div className="mt-0.5"><Badge color="green">Naver Search API</Badge></div></div></div><p className="text-3xl font-extrabold text-slate-900">99,057<span className="text-base font-medium text-slate-500">건</span></p><p className="text-xs text-slate-500 mt-0.5">누적 게시글</p></Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4"><h3 className="text-sm font-bold text-slate-900">인기 콘텐츠 TOP 3</h3><Badge color="slate">공개 데이터</Badge></div>
          <div className="space-y-3">{ytVideos.map((v,i)=>(<div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"><div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">{i+1}</div><div className="flex-1 min-w-0"><p className="text-sm font-semibold text-slate-900 truncate">{v.title}</p><div className="flex items-center gap-2 mt-0.5"><span className="text-xs text-slate-500">{v.views} 조회</span><Badge color="slate">{v.cat}</Badge></div></div></div>))}</div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4"><h3 className="text-sm font-bold text-slate-900">콘텐츠 유형 비중</h3><Badge color="slate">공개 데이터</Badge></div>
          <ResponsiveContainer width="100%" height={230}><PieChart><Pie data={contentMix} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={85} paddingAngle={2} label={({name,value})=>`${name} ${value}%`}>{contentMix.map((d,i)=><Cell key={i} fill={d.fill}/>)}</Pie><Tooltip formatter={v=>`${v}%`}/></PieChart></ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}

function EarnedTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard label="7일 뉴스 합계" value="100건" sub="3/9 ~ 3/15"/>
        <MetricCard label="감성 긍정률" value="62%" sub="긍정62 중립28 부정10"/>
        <MetricCard label="네이버 관심도" value="82/100" sub="6개월 데이터랩" trend={13.9}/>
        <MetricCard label="주중 일평균" value="30건" sub="주말 5건 (6:1 비율)"/>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4"><h3 className="text-sm font-bold text-slate-900">최근 7일 뉴스 트렌드</h3><Badge color="green">Naver Search API</Badge></div>
          <ResponsiveContainer width="100%" height={220}><BarChart data={newsTrend}><CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0"/><XAxis dataKey="date" tick={{fontSize:10}}/><YAxis tick={{fontSize:11}}/><Tooltip/><Bar dataKey="count" radius={[6,6,0,0]} barSize={28} fill="#6366f1"/></BarChart></ResponsiveContainer>
          <div className="mt-3 p-3 bg-indigo-50 border border-indigo-200 rounded-lg"><p className="text-xs text-indigo-800">📊 <strong>패턴:</strong> 주중 집중 보도(50건), 주말 급감(2건) — 보도자료 배포 타이밍 최적화 필요</p></div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4"><h3 className="text-sm font-bold text-slate-900">뉴스 감성 분석</h3><Badge color="green">Naver Search API</Badge></div>
          <ResponsiveContainer width="100%" height={220}><PieChart><Pie data={sentiment} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} label={({name,value})=>`${name} ${value}%`}>{sentiment.map((d,i)=><Cell key={i} fill={d.fill}/>)}</Pie><Tooltip formatter={v=>`${v}%`}/></PieChart></ResponsiveContainer>
          <p className="mt-2 text-xs text-slate-500 text-center">부정률 10% — 업계 평균(15%) 대비 양호</p>
        </Card>
      </div>
      <Card className="p-5">
        <div className="flex items-center justify-between mb-4"><h3 className="text-sm font-bold text-slate-900">최신 뉴스 헤드라인</h3><Badge color="green">Naver Search API</Badge></div>
        <div className="space-y-2">{headlines.map((h,i)=>(<div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"><span className="text-xs font-medium text-slate-400 w-5">{i+1}</span><p className="text-sm text-slate-800 flex-1">{h.title}</p><Badge color="slate">{h.source}</Badge></div>))}</div>
      </Card>
      <Card className="p-5">
        <div className="flex items-center justify-between mb-4"><h3 className="text-sm font-bold text-slate-900">네이버 데이터랩 6개월 트렌드</h3><Badge color="green">Naver DataLab</Badge></div>
        <ResponsiveContainer width="100%" height={220}><LineChart data={dataLabTrend}><CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0"/><XAxis dataKey="month" tick={{fontSize:11}}/><YAxis domain={[40,100]} tick={{fontSize:11}}/><Tooltip/><Legend wrapperStyle={{fontSize:11}}/><Line type="monotone" dataKey="삼성" stroke="#2563eb" strokeWidth={2.5} dot={{r:4}}/><Line type="monotone" dataKey="아산" stroke="#64748b" strokeWidth={1.5} dot={{r:3}}/><Line type="monotone" dataKey="서울대" stroke="#94a3b8" strokeWidth={1.5} dot={{r:3}}/><Line type="monotone" dataKey="세브란스" stroke="#cbd5e1" strokeWidth={1.5} dot={{r:3}}/></LineChart></ResponsiveContainer>
        <p className="mt-2 text-xs text-slate-500 text-center">삼성서울병원 72→82 (+13.9%) 꾸준한 상승세 · 경쟁사 대비 격차 확대 추세</p>
      </Card>
    </div>
  );
}

// ══════════ AI CAMPAIGN PLAN ══════════

function CampaignPlanSection() {
  const roadmap = [
    {
      month: "1개월",
      color: "from-blue-500 to-blue-600",
      label: "Quick Win",
      items: [
        { task: '"건강검진 비용" 키워드 광고 집행 개시', impact: "월 70.2K 노출 확보", tag: "Paid" },
        { task: "EEAT 하위 5페이지 Schema.org 마크업 추가", impact: "뇌종양·암·간센터 0→20점", tag: "Owned" },
        { task: "의료진 인터뷰 콘텐츠 3편 발행 (브런치+블로그)", impact: "AI 인용 자사 소스 +3건", tag: "Earned" },
      ],
    },
    {
      month: "2개월",
      color: "from-indigo-500 to-indigo-600",
      label: "중기 개선",
      items: [
        { task: "Gemini 최적화 — 구조화 데이터 + FAQ 스키마 전 페이지 적용", impact: "Gemini SoM 43.8%→50%+", tag: "GEO" },
        { task: "YouTube Shorts 건강정보 시리즈 (주2회)", impact: "구독자 14만→16만 목표", tag: "Owned" },
        { task: '네이버 데이터랩 "건강검진" 연관 키워드 콘텐츠 10편', impact: "롱테일 트래픽 +25%", tag: "SEO" },
      ],
    },
    {
      month: "3개월",
      color: "from-emerald-500 to-emerald-600",
      label: "목표 KPI",
      items: [
        { task: "AI Search SoM 49% → 55% 달성", impact: "전 LLM 평균 상승", tag: "KPI" },
        { task: "EEAT 평균 26.2 → 35.0+ 달성", impact: "20점 이하 18페이지→10페이지", tag: "KPI" },
        { task: "자사 인용 7건 → 15건+ / 경쟁사 인용 역전", impact: "Citation Moat 구축", tag: "KPI" },
      ],
    },
  ];

  const tagColors = { Paid: "amber", Owned: "blue", Earned: "purple", GEO: "green", SEO: "slate", KPI: "red" };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <Card className="p-0 overflow-hidden">
        <div className="bg-gradient-to-r from-slate-900 via-indigo-900 to-blue-900 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🚀</span>
            <div>
              <h2 className="text-lg font-extrabold text-white">AI 캠페인 플랜</h2>
              <p className="text-xs text-blue-300 mt-0.5">전체 데이터를 종합하여 AI가 자동 생성한 전략 제안</p>
            </div>
            <div className="ml-auto"><Badge color="purple">AI Generated</Badge></div>
          </div>
        </div>
      </Card>

      {/* Row 1: Diagnosis + Channel Mix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 1. 현황 진단 */}
        <Card className="p-5">
          <h3 className="text-sm font-bold text-slate-900 mb-4">📋 현황 진단</h3>
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs font-semibold text-blue-800 mb-1">AI 검색 시장 내 위치</p>
              <p className="text-xs text-blue-700">SoM 49%로 <strong>국내 의료기관 1위</strong>이나, 3일간 -4.6%p 하락 추세. Perplexity(54.2%)에서 강세, Gemini(43.8%)에서 약세.</p>
            </div>
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <p className="text-xs font-semibold text-emerald-800 mb-1">경쟁사 대비 강점/약점</p>
              <p className="text-xs text-emerald-700"><strong>강점:</strong> 압도적 SoM 격차(2위 아산 대비 +23.3%p), 월 11만건 브랜드 검색량, 데이터랩 관심도 상승세.<br/><strong>약점:</strong> EEAT 30페이지 중 60%가 20점 이하, 자사 인용(7건) {'<'} 경쟁사 인용(8건)</p>
            </div>
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-xs font-semibold text-red-800 mb-1">가장 시급한 개선 포인트</p>
              <p className="text-xs text-red-700">① "건강검진 비용" 키워드 미집행(월 7만건 기회손실)<br/>② EEAT 하위 페이지 대량 개선(18페이지 → 구조화 데이터 없음)<br/>③ Gemini SoM 10.4%p 갭 해소</p>
            </div>
          </div>
        </Card>

        {/* 2. 채널 믹스 */}
        <Card className="p-5">
          <h3 className="text-sm font-bold text-slate-900 mb-4">📊 채널 믹스 추천</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={channelMix} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={80} paddingAngle={3} label={({ name, value }) => `${name} ${value}%`}>
                {channelMix.map((d, i) => <Cell key={i} fill={d.fill} />)}
              </Pie>
              <Tooltip formatter={v => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-3 space-y-2">
            {channelMix.map((c, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: c.fill }} />
                <span className="text-xs font-medium text-slate-700 flex-1">{c.name}</span>
                <span className="text-xs font-bold text-slate-900">{c.value}%</span>
                <span className="text-[10px] text-slate-500">
                  {i === 0 && "AI 인용률·SoM 직접 개선"}
                  {i === 1 && "EEAT 개선 + 롱테일 트래픽"}
                  {i === 2 && "브런치·YouTube·커뮤니티"}
                  {i === 3 && "건강검진 키워드 즉시 집행"}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Row 2: Content Strategy */}
      <Card className="p-5">
        <h3 className="text-sm font-bold text-slate-900 mb-4">✏️ 콘텐츠 전략</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-xs font-bold text-slate-900 mb-2">EEAT 개선 우선순위 TOP 5</p>
            <div className="space-y-1.5">
              {["뇌종양센터 (0점→30점)", "암센터 (20점→40점)", "간센터 (20점→40점)", "소화기내과 (추정 ~20점)", "정형외과 (추정 ~20점)"].map((t, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-[10px] text-white font-bold">{i + 1}</span>
                  <span className="text-xs text-slate-700">{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-xs font-bold text-slate-900 mb-2">경쟁사 대비 부족 키워드</p>
            <div className="space-y-1.5">
              {[
                { kw: "건강검진 비용", vol: "70.2K", gap: true },
                { kw: "종합건강검진", vol: "51.0K", gap: false },
                { kw: "암검진 병원", vol: "20.0K", gap: true },
                { kw: "대학병원 예약", vol: "20.3K", gap: false },
              ].map((k, i) => (
                <div key={i} className="flex items-center gap-2">
                  {k.gap ? <span className="text-[10px] text-red-600 font-bold">GAP</span> : <span className="text-[10px] text-slate-400">—</span>}
                  <span className="text-xs text-slate-700 flex-1">{k.kw}</span>
                  <span className="text-[10px] text-slate-500">{k.vol}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-xs font-bold text-slate-900 mb-2">AI 인용률 높이는 가이드</p>
            <div className="space-y-2 text-xs text-slate-700">
              <p>🔬 <strong>전문가 인터뷰</strong> — 의료진 실명 + 직함 + 전문 분야 명시 → Claude·Perplexity 인용 확률 3배</p>
              <p>📐 <strong>구조화 데이터</strong> — MedicalWebPage + FAQPage Schema → Gemini 인용 확률 2배</p>
              <p>📊 <strong>데이터 기반 콘텐츠</strong> — 수술 건수, 생존율 등 정량 데이터 포함 → OpenAI 인용 선호</p>
              <p>🔗 <strong>상호 인용 네트워크</strong> — 자사 페이지 간 내부 링크 강화 → Citation Moat 효과</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Row 3: 3-Month Roadmap */}
      <Card className="p-5">
        <h3 className="text-sm font-bold text-slate-900 mb-5">🗓️ 3개월 로드맵</h3>
        <div className="space-y-6">
          {roadmap.map((phase, pi) => (
            <div key={pi}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`px-3 py-1.5 rounded-lg bg-gradient-to-r ${phase.color} text-white text-xs font-bold shadow-sm`}>
                  {phase.month}
                </div>
                <span className="text-sm font-semibold text-slate-700">{phase.label}</span>
                {pi === 0 && <Badge color="red">NOW</Badge>}
              </div>
              <div className="ml-6 border-l-2 border-slate-200 pl-5 space-y-3">
                {phase.items.map((item, ii) => (
                  <div key={ii} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-1.5 -ml-[1.3rem]" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm text-slate-800 font-medium">{item.task}</p>
                        <Badge color={tagColors[item.tag] || "slate"}>{item.tag}</Badge>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">→ {item.impact}</p>
                    </div>
                  </div>
                ))}
              </div>
              {pi < roadmap.length - 1 && <div className="border-b border-dashed border-slate-200 mt-4" />}
            </div>
          ))}
        </div>
      </Card>

      {/* Summary Banner */}
      <Card className="p-0 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="text-sm font-bold text-white">3개월 목표 요약</p>
              <p className="text-xs text-emerald-100 mt-1">모든 전략은 수집된 실데이터 기반 — 실행 즉시 측정 가능</p>
            </div>
            <div className="flex gap-4">
              <div className="text-center">
                <p className="text-xl font-extrabold text-white">55%</p>
                <p className="text-[10px] text-emerald-200">SoM 목표</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-extrabold text-white">35+</p>
                <p className="text-[10px] text-emerald-200">EEAT 평균</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-extrabold text-white">15건+</p>
                <p className="text-[10px] text-emerald-200">자사 인용</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ══════════ MAIN ══════════
export default function Dashboard() {
  const [tab, setTab] = useState("overview");
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "ai", label: "AI Intelligence" },
    { id: "paid", label: "Paid" },
    { id: "owned", label: "Owned" },
    { id: "earned", label: "Earned" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#f8fafc", fontFamily: "'Pretendard','Inter',system-ui,-apple-system,sans-serif" }}>
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <div className="flex items-center gap-3"><Link to="/" className="text-xs text-slate-400 hover:text-blue-600 mr-1">← Hub</Link><h1 className="text-xl font-extrabold text-slate-900 tracking-tight">삼성서울병원</h1><Badge color="gold">World #26</Badge><Badge color="blue">Korea #1</Badge></div>
              <p className="text-xs text-slate-500 mt-1">Marketing Intelligence Dashboard · 뉴스위크 2026 세계 26위 / 국내 1위 (4년 연속 상승)</p>
            </div>
            <div className="text-right"><p className="text-[10px] text-slate-400 uppercase tracking-widest">Powered by</p><p className="text-sm font-bold text-blue-600">GEOcare.AI</p></div>
          </div>
        </div>
      </div>
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-2 flex gap-1 overflow-x-auto">
          {tabs.map(t => <TabButton key={t.id} active={tab === t.id} onClick={() => setTab(t.id)}>{t.label}</TabButton>)}
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-6">
        {tab === "overview" && <OverviewTab />}
        {tab === "ai" && <AIIntelligenceTab />}
        {tab === "paid" && <PaidTab />}
        {tab === "owned" && <OwnedTab />}
        {tab === "earned" && <EarnedTab />}
      </div>

      {/* ══════ AI Campaign Plan (always visible at bottom) ══════ */}
      <div className="max-w-6xl mx-auto px-6 pb-6">
        <CampaignPlanSection />
      </div>

      <div className="border-t border-slate-200 mt-4">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between flex-wrap gap-2">
          <p className="text-[10px] text-slate-400">※ 분석 예시 목적으로 제작된 대시보드입니다. 실제 기관의 의뢰로 제작된 것이 아닙니다.</p>
          <p className="text-[10px] text-slate-400">Data: GEOcare API · Naver Ads API · Naver Search API · Naver DataLab · AI Campaign Engine</p>
        </div>
      </div>
    </div>
  );
}
