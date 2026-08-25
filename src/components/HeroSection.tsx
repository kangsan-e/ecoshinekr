import React from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  FileCheck, 
  Calculator, 
  PhoneCall, 
  Building2, 
  Zap,
  CheckCircle,
  Clock,
  Calendar
} from 'lucide-react';
import { COMPANY_INFO } from '../data/portfolioData';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onScrollToCalculator: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBooking,
  onScrollToCalculator,
}) => {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-12 pb-20 lg:pt-16 lg:pb-28">
      {/* Background Solar Grid Pattern & Ambient Glow */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FBBF24_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-orange-300/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Announcement Chip */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-300/30 text-amber-200 text-xs font-bold backdrop-blur-xs">
            <span className="flex h-2 w-2 rounded-full bg-amber-300 animate-ping" />
            <span>2026 공장 지붕 태양광 맞춤 EPC 프로모션 진행 중</span>
          </div>
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
            <span>누수 사고 0건 달성 · 특허 누수방지 브라켓 적용</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Main Hero Copy (Left 7 Cols) */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.2] text-white">
              <span className="block text-slate-200 font-bold text-2xl sm:text-3xl md:text-4xl mb-2">
                공장 지붕, 그냥 두고 계신가요?
              </span>
              <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-200 via-amber-300 to-orange-300 drop-shadow-xs">
                놀고 있는 지붕을 수익을 만드는
              </span>
              <br />
              <span className="text-white">
                태양광 발전소로.
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-200 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              <span className="whitespace-nowrap font-black text-amber-300">(주)에코샤인</span>이 공장 현장조사부터 구조안전성 검토, 설계, 포스코 POS-MAC 시공, 한전 계통연계까지 처음부터 끝까지 책임집니다.
            </p>

            {/* Core Action CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-8 py-4 text-base font-black text-slate-950 bg-linear-to-r from-amber-400 via-amber-300 to-orange-300 hover:from-amber-300 hover:to-orange-200 rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2.5 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Calendar className="w-5 h-5 text-slate-950" />
                <span>내 공장 태양광 무료상담</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <button
                onClick={onScrollToCalculator}
                className="w-full sm:w-auto px-7 py-4 text-base font-bold text-white bg-slate-800/80 hover:bg-slate-700/80 border border-amber-300/30 rounded-xl transition-all flex items-center justify-center gap-2 backdrop-blur-xs cursor-pointer"
              >
                <Calculator className="w-5 h-5 text-amber-300" />
                <span>설치 가능 여부 확인하기 (3분)</span>
              </button>
            </div>

            {/* Trust Points Under Hero */}
            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-200 font-bold">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-amber-300" />
                무료 현장실측 및 방문상담
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-amber-300" />
                구조안전 및 계통연계 검토
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-amber-300" />
                20년 수지분석 맞춤 견적서
              </span>
            </div>
          </div>

          {/* Quick 3-Minute Estimation Card (Right 5 Cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-7 shadow-2xl border border-amber-200/80 text-slate-900">
              <div className="flex items-center justify-between pb-4 border-b border-amber-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
                    <Sparkles className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900 leading-tight">
                      3분 공장 태양광 빠른 진단
                    </h2>
                    <p className="text-xs text-slate-600 font-semibold">
                      지붕 면적만 알면 즉시 예상 수익 산출
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 text-[11px] font-bold bg-amber-100 text-amber-900 rounded-md border border-amber-200">
                  무료 분석
                </span>
              </div>

              {/* Sample standard factory metrics snapshot from PDF 124kW model */}
              <div className="mt-5 space-y-3.5">
                <div className="p-3.5 bg-amber-50/60 border border-amber-200/70 rounded-xl">
                  <div className="flex justify-between items-center text-xs text-slate-700 font-semibold mb-1">
                    <span>표준 중소공장 (약 280평 / 930㎡ 지붕 기준)</span>
                    <span className="font-black text-amber-900">예상 124.16 kW</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-bold text-slate-800">연간 예상 발전수익</span>
                    <span className="text-lg font-black text-amber-800">
                      약 3,778만원 <span className="text-xs font-normal text-slate-700">/ 년</span>
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="text-slate-600 block font-medium">연평균 예상 수익률</span>
                    <span className="text-base font-black text-amber-800 mt-0.5 block">
                      28.56%
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="text-slate-600 block font-medium">20년 누적 순수익</span>
                    <span className="text-base font-black text-slate-900 mt-0.5 block">
                      약 6억 6,839만원
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-2 text-xs text-slate-700 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>자체 특허 브라켓으로 지붕 훼손 및 누수 100% 차단</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>초기비용 부담 없는 금융 솔루션 및 정부정책 안내</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-2">
                <button
                  onClick={onScrollToCalculator}
                  className="w-full py-3.5 px-4 rounded-xl bg-linear-to-r from-amber-400 via-amber-400 to-orange-300 hover:from-amber-300 hover:to-orange-200 text-slate-950 font-black text-sm text-center transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <Calculator className="w-4 h-4 text-slate-950" />
                  <span>내 공장 조건으로 바로 계산해보기</span>
                </button>
                <button
                  onClick={onOpenBooking}
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-50/80 hover:bg-amber-100 text-amber-950 font-bold text-xs text-center border border-amber-200 transition-colors cursor-pointer"
                >
                  엔지니어 방문 실측 예약하기 (무료)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights Bar at Bottom of Hero */}
      <div className="mt-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 sm:p-6 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-amber-400/20">
          <div className="text-center md:text-left md:border-r border-slate-800 md:pr-4">
            <p className="text-xs text-amber-200 font-bold">총 누적 시공 실적</p>
            <p className="text-2xl sm:text-3xl font-black text-white mt-1">58.4 <span className="text-base font-bold text-amber-400">MW+</span></p>
            <p className="text-[11px] text-amber-200/70 mt-0.5">대용량 3MW부터 소형 30kW까지</p>
          </div>
          <div className="text-center md:text-left md:border-r border-slate-800 md:pr-4">
            <p className="text-xs text-amber-200 font-bold">지붕 누수 하자 발생률</p>
            <p className="text-2xl sm:text-3xl font-black text-amber-400 mt-1">0.0 <span className="text-base font-bold text-white">%</span></p>
            <p className="text-[11px] text-amber-200/70 mt-0.5">특허 산밀착 누수방지 브라켓</p>
          </div>
          <div className="text-center md:text-left md:border-r border-slate-800 md:pr-4">
            <p className="text-xs text-amber-200 font-bold">포스코 POS-MAC 구조물</p>
            <p className="text-2xl sm:text-3xl font-black text-white mt-1">25 <span className="text-base font-bold text-amber-400">년+</span></p>
            <p className="text-[11px] text-amber-200/70 mt-0.5">고내식성 합금강 정품 적용</p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-xs text-amber-200 font-bold">직영 O&M 스마트 사후관리</p>
            <p className="text-2xl sm:text-3xl font-black text-amber-400 mt-1">5 <span className="text-base font-bold text-white">년 무상</span></p>
            <p className="text-[11px] text-amber-200/70 mt-0.5">드론 열화상 점검 & 실시간 관제</p>
          </div>
        </div>
      </div>
    </section>
  );
};
