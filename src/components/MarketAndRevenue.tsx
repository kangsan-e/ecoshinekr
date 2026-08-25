import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { 
  TrendingUp, 
  FileSpreadsheet, 
  CheckCircle2
} from 'lucide-react';
import { SMP_REC_TRENDS } from '../data/portfolioData';

interface MarketAndRevenueProps {
  onOpenBooking: () => void;
}

export const MarketAndRevenue: React.FC<MarketAndRevenueProps> = ({ onOpenBooking }) => {
  const [viewTab, setViewTab] = useState<'trends' | 'table'>('trends');

  // 20-year sample rows from PDF page 21
  const financialRows = [
    { year: '1년차', genKwh: '163,146', monthlyRev: '3,148,702', annualRev: '37,784,424', cost: '2,555,688', netProfit: '35,228,736', cumProfit: '35,228,736', roi: '30.11%' },
    { year: '2년차', genKwh: '162,331', monthlyRev: '3,132,959', annualRev: '37,595,502', cost: '2,551,910', netProfit: '35,043,592', cumProfit: '70,272,328', roi: '29.95%' },
    { year: '3년차', genKwh: '161,519', monthlyRev: '3,117,294', annualRev: '37,407,525', cost: '2,548,150', netProfit: '34,859,374', cumProfit: '105,131,703', roi: '29.79%' },
    { year: '5년차', genKwh: '159,908', monthlyRev: '3,086,199', annualRev: '37,034,385', cost: '2,660,688', netProfit: '34,373,697', cumProfit: '174,061,477', roi: '29.38%' },
    { year: '10년차', genKwh: '155,950', monthlyRev: '3,009,811', annualRev: '36,117,738', cost: '2,642,355', netProfit: '33,475,383', cumProfit: '343,226,014', roi: '28.61%' },
    { year: '15년차', genKwh: '152,090', monthlyRev: '2,935,315', annualRev: '35,223,779', cost: '2,624,476', netProfit: '32,599,303', cumProfit: '507,965,906', roi: '27.86%' },
    { year: '20년차', genKwh: '148,325', monthlyRev: '2,862,662', annualRev: '34,351,946', cost: '2,607,039', netProfit: '31,744,907', cumProfit: '668,390,668', roi: '27.13%' },
  ];

  return (
    <section className="py-20 bg-white border-t border-amber-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-black uppercase tracking-widest text-amber-950 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
            MARKET PRICE & 20-YEAR FINANCIAL MODEL
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            수익 구조와 20년 실증 수지분석표
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
            태양광 발전 수익은 <span className="font-black text-amber-900">SMP(전력판매금) + REC(공급인증서 × 1.5 건물 가중치)</span>로 구성됩니다.
          </p>
        </div>

        {/* Current August 2026 Reference Snapshot */}
        <div className="mt-12 grid sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-amber-50/40 border border-amber-200">
            <span className="text-xs font-bold text-slate-500 uppercase">SMP 기준 단가 (2026.08)</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-amber-900">153.98</span>
              <span className="text-xs font-bold text-slate-600">원 / kWh</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">한전 계통한계가격 (전력판매대금)</p>
          </div>

          <div className="p-5 rounded-2xl bg-orange-50/40 border border-orange-200">
            <span className="text-xs font-bold text-slate-500 uppercase">REC 현물 정산가 (2026.08)</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-orange-800">70.75</span>
              <span className="text-xs font-bold text-slate-600">원 / kWh (70,758원/REC)</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">신재생에너지 공급인증서 가중치 1.5 적용 대상</p>
          </div>

          <div className="p-5 rounded-2xl bg-linear-to-r from-amber-600 to-orange-600 text-white shadow-lg">
            <span className="text-xs font-bold text-amber-100 uppercase">공장 지붕 통합 단가 (가중치 1.5)</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-3xl font-black text-amber-200">220.57</span>
              <span className="text-xs font-bold text-amber-100">원 / kWh</span>
            </div>
            <p className="text-[11px] text-amber-100/90 mt-1 font-medium">건물 활용 시 지상형 대비 약 30% 높은 수익 단가</p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex p-1 bg-amber-50 rounded-xl border border-amber-200">
            <button
              onClick={() => setViewTab('trends')}
              className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-black transition-all flex items-center gap-2 cursor-pointer ${
                viewTab === 'trends'
                  ? 'bg-linear-to-r from-amber-500 to-orange-500 text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>SMP & REC 가격 흐름 분석 차트</span>
            </button>
            <button
              onClick={() => setViewTab('table')}
              className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-black transition-all flex items-center gap-2 cursor-pointer ${
                viewTab === 'table'
                  ? 'bg-linear-to-r from-amber-500 to-orange-500 text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>124kW 표준공장 20개년 수지분석표</span>
            </button>
          </div>
        </div>

        {/* Content View 1: Chart */}
        {viewTab === 'trends' && (
          <div className="mt-8 bg-amber-50/20 rounded-3xl p-6 sm:p-8 border border-amber-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  2024년 ~ 2026년 SMP & REC 가격 동향
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">
                  전력거래소 및 한국에너지공단 공식 공시 단가 기준 (단위: 원/kWh)
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs font-bold">
                <span className="flex items-center gap-1.5 text-blue-600">
                  <span className="w-3 h-3 rounded-full bg-blue-600 inline-block" />
                  SMP (한전 전력판매가)
                </span>
                <span className="flex items-center gap-1.5 text-amber-600">
                  <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                  REC (공급인증서)
                </span>
              </div>
            </div>

            <div className="h-72 sm:h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={SMP_REC_TRENDS} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis domain={[50, 300]} tick={{ fontSize: 11, fill: '#64748b' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#78350f', color: '#fff', borderRadius: '12px', border: 'none', fontSize: '12px' }}
                    labelStyle={{ color: '#fde68a', fontWeight: 'bold' }}
                  />
                  <Line type="monotone" dataKey="smp" name="SMP" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="rec" name="REC" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 pt-4 border-t border-amber-200 grid sm:grid-cols-2 gap-3 text-xs text-slate-700 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>SMP 평균 131원 + REC 평균 74.9원으로 안정적인 고수익 구간 유지 중</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>RPS 의무공급비율 상승(2026년 15% → 2030년 25%)에 따른 REC 수요 견고</span>
              </div>
            </div>
          </div>
        )}

        {/* Content View 2: Financial Schedule Table (PDF page 21) */}
        {viewTab === 'table' && (
          <div className="mt-8 bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-sm overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  건물 124.16kW급 태양광 발전소 (예상)수익 분석표
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">
                  총사업비: 1억 1,700만원 | 일조시간: 3.6시간/일 | 20년 누적 순수익: 6억 6,839만원
                </p>
              </div>
              <span className="px-3 py-1 bg-amber-100 text-amber-950 text-xs font-black rounded-md border border-amber-200">
                연평균 수익률: 28.56%
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-amber-900 text-white">
                    <th className="p-3 border border-amber-950">연차</th>
                    <th className="p-3 border border-amber-950">발전량 (kWh)</th>
                    <th className="p-3 border border-amber-950">월 매출액 (원)</th>
                    <th className="p-3 border border-amber-950">연간 매출액 (원)</th>
                    <th className="p-3 border border-amber-950">연간 지출액 (원)</th>
                    <th className="p-3 border border-amber-950 bg-amber-800 font-bold">연간 순이익 (원)</th>
                    <th className="p-3 border border-amber-950 font-bold text-amber-300">누적 순수익 (원)</th>
                    <th className="p-3 border border-amber-950 text-center">수익률 (%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-100">
                  {financialRows.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-amber-50/30' : 'bg-white'}>
                      <td className="p-3 border border-slate-200 font-bold text-slate-900">{row.year}</td>
                      <td className="p-3 border border-slate-200">{row.genKwh}</td>
                      <td className="p-3 border border-slate-200">{Number(row.monthlyRev.replace(/,/g, '')).toLocaleString()}원</td>
                      <td className="p-3 border border-slate-200 font-semibold">{Number(row.annualRev.replace(/,/g, '')).toLocaleString()}원</td>
                      <td className="p-3 border border-slate-200 text-slate-500">{Number(row.cost.replace(/,/g, '')).toLocaleString()}원</td>
                      <td className="p-3 border border-slate-200 font-bold text-amber-900 bg-amber-50/50">
                        {Number(row.netProfit.replace(/,/g, '')).toLocaleString()}원
                      </td>
                      <td className="p-3 border border-slate-200 font-black text-amber-950">
                        {Number(row.cumProfit.replace(/,/g, '')).toLocaleString()}원
                      </td>
                      <td className="p-3 border border-slate-200 text-center font-bold text-amber-700">{row.roi}</td>
                    </tr>
                  ))}
                  <tr className="bg-amber-900 text-white font-bold">
                    <td className="p-3 border border-amber-950">20년 합계</td>
                    <td className="p-3 border border-amber-950">3,112,488 kWh</td>
                    <td className="p-3 border border-amber-950">-</td>
                    <td className="p-3 border border-amber-950">720,847,621원</td>
                    <td className="p-3 border border-amber-950">52,456,952원</td>
                    <td className="p-3 border border-amber-950 text-amber-300">668,390,668원</td>
                    <td className="p-3 border border-amber-950 text-amber-300">668,390,668원</td>
                    <td className="p-3 border border-amber-950 text-center text-amber-300">28.56%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-slate-400 mt-4">
              * 당사가 위 수익금을 100% 확정 보장하는 것은 아니며, 실제 SMP/REC 거래가격 변동 및 일사량 조건에 따라 차이가 있을 수 있으므로 현장 정밀실측 후 확정 견적서를 발행해 드립니다.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};
