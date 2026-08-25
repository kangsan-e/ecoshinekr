import React from 'react';
import { DollarSign, Zap, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';

interface ValuePropositionProps {
  onOpenBooking: () => void;
  onScrollToCalculator: () => void;
}

export const ValueProposition: React.FC<ValuePropositionProps> = ({
  onOpenBooking,
  onScrollToCalculator,
}) => {
  return (
    <section id="why-solar" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-black uppercase tracking-widest text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
            WHY SOLAR ROOFTOP
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            공장 지붕은 이미 가지고 계신 자산입니다.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
            비워두면 아무것도 나오지 않는 지붕 공간이, 매월 확실한 수익과 전기요금 절감을 만드는 발전소가 됩니다.
          </p>
        </div>

        {/* 3 Core Value Cards */}
        <div className="mt-14 grid md:grid-cols-3 gap-8">
          {/* Card 1: Additional Revenue */}
          <div className="relative bg-amber-50/30 rounded-2xl p-8 border border-amber-200 hover:border-amber-400 hover:shadow-xl transition-all group">
            <div className="w-14 h-14 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <DollarSign className="w-7 h-7 text-amber-700" />
            </div>
            <div className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">
              REVENUE STREAM
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-3">
              ① 지붕을 활용한 추가 수익
            </h3>
            <p className="text-slate-700 text-sm leading-relaxed mb-6">
              사용하지 않는 공장 지붕을 활용해 한국전력 및 발전자회사와의 20년 장기 고정계약(RPS)을 통해 매월 안정적인 발전 매출을 창출할 수 있습니다.
            </p>
            <div className="pt-4 border-t border-amber-100 text-xs text-slate-700 space-y-1.5 font-medium">
              <div className="flex justify-between">
                <span>한전 계통연계</span>
                <span className="font-bold text-slate-900">SMP + REC 복합수익</span>
              </div>
              <div className="flex justify-between">
                <span>건물 가중치 우대</span>
                <span className="font-bold text-amber-700">1.5 가중치 적용</span>
              </div>
            </div>
          </div>

          {/* Card 2: Electricity Cost Reduction */}
          <div className="relative bg-amber-50/30 rounded-2xl p-8 border border-amber-200 hover:border-amber-400 hover:shadow-xl transition-all group">
            <div className="w-14 h-14 rounded-xl bg-orange-100 text-orange-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-7 h-7 text-orange-600" />
            </div>
            <div className="text-xs font-bold text-orange-700 uppercase tracking-wider mb-2">
              COST SAVING
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-3">
              ② 전기요금의 획기적 절감
            </h3>
            <p className="text-slate-700 text-sm leading-relaxed mb-6">
              지붕에서 생산한 청정 전력을 공장에서 직접 소비(자가소비형)하여 매년 가파르게 인상되는 산업용 전기요금을 최대 30~50%까지 절감할 수 있습니다.
            </p>
            <div className="pt-4 border-t border-amber-100 text-xs text-slate-700 space-y-1.5 font-medium">
              <div className="flex justify-between">
                <span>피크 전력 억제</span>
                <span className="font-bold text-slate-900">기본요금 인하 효과</span>
              </div>
              <div className="flex justify-between">
                <span>RE100 대응</span>
                <span className="font-bold text-amber-700">글로벌 수출경쟁력 확보</span>
              </div>
            </div>
          </div>

          {/* Card 3: Long-term Asset */}
          <div className="relative bg-amber-50/30 rounded-2xl p-8 border border-amber-200 hover:border-amber-400 hover:shadow-xl transition-all group">
            <div className="w-14 h-14 rounded-xl bg-yellow-100 text-yellow-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-7 h-7 text-yellow-700" />
            </div>
            <div className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-2">
              LONG-TERM ASSET
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-3">
              ③ 25년 이상 유지되는 자산
            </h3>
            <p className="text-slate-700 text-sm leading-relaxed mb-6">
              포스코 정품 POS-MAC 구조물과 N-TYPE 고효율 모듈을 사용하여 25년 이상 지붕 손상 없이 안정적으로 운영할 수 있는 기업의 장기 에너지 자산이 됩니다.
            </p>
            <div className="pt-4 border-t border-amber-100 text-xs text-slate-700 space-y-1.5 font-medium">
              <div className="flex justify-between">
                <span>모듈 출력 보증</span>
                <span className="font-bold text-slate-900">25년 84% 이상</span>
              </div>
              <div className="flex justify-between">
                <span>지붕 단열 효과</span>
                <span className="font-bold text-amber-700">공장 내부 2~3℃ 냉각</span>
              </div>
            </div>
          </div>
        </div>

        {/* Honest note banner */}
        <div className="mt-10 p-4 sm:p-5 rounded-2xl bg-amber-50/60 border border-amber-200 flex items-start sm:items-center gap-3.5 text-xs sm:text-sm text-slate-700">
          <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5 sm:mt-0" />
          <div className="flex-1">
            <span className="font-bold text-slate-900">에코샤인의 정직한 약속: </span>
            과장된 수익률로 현혹하지 않습니다. 현장 지붕 방위각, 경사도, 한전 변전소 계통연계 가능 여부, 전력사용 패턴을 정밀 실측하여 실제 실현 가능한 사업성 분석표를 제공합니다.
          </div>
          <button
            onClick={onScrollToCalculator}
            className="shrink-0 font-black text-amber-800 hover:text-orange-700 inline-flex items-center gap-1 cursor-pointer"
          >
            <span>진단하기</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
