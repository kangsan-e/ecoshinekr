import React from 'react';
import { Factory, Zap, SunMedium, ArrowRight, Check } from 'lucide-react';

interface InstallationTypesProps {
  onOpenBooking: (type?: string) => void;
  onScrollToCalculator: () => void;
}

export const InstallationTypes: React.FC<InstallationTypesProps> = ({
  onOpenBooking,
  onScrollToCalculator,
}) => {
  return (
    <section className="py-20 bg-white border-t border-amber-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-black uppercase tracking-widest text-amber-950 bg-amber-100 px-3 py-1 rounded-full border border-amber-300 shadow-xs">
            SOLAR INSTALLATION TYPES
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            공장 조건에 딱 맞는 3가지 설치 유형
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
            자가 공장인지, 임대 공장인지, 전력 사용량이 많은지에 따라 가장 유리한 사업 방식을 선택하실 수 있습니다.
          </p>
        </div>

        {/* 3 Types Cards */}
        <div className="mt-14 grid md:grid-cols-3 gap-8">
          
          {/* Type 1: 공장 지붕형 (메인 상품) */}
          <div className="relative bg-white rounded-3xl p-8 border-2 border-amber-400 shadow-xl flex flex-col justify-between">
            <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-linear-to-r from-amber-500 to-orange-500 text-white text-xs font-black rounded-full tracking-wider shadow-sm uppercase">
              ★ 가장 추천하는 메인 상품
            </div>
            
            <div>
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-6">
                <Factory className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">
                🏭 공장 지붕형
              </h3>
              <p className="text-xs font-bold text-amber-800 mb-4">
                공장 · 창고 · 물류센터 유휴지붕 100% 활용
              </p>
              <p className="text-slate-700 text-sm leading-relaxed mb-6 font-medium">
                사용하지 않고 방치된 공장 및 물류센터의 넓은 지붕을 활용하여 발전 설비를 설치하는 가장 표준적이고 수익성이 높은 방식입니다.
              </p>

              <div className="space-y-2.5 pt-4 border-t border-amber-100 text-xs text-slate-700 font-medium">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>지붕 손상 없는 특허 브라켓 시공</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>지상형 대비 신재생에너지 가중치 우대 (1.5)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>자가설치 수익형 또는 지붕 임대형 선택 가능</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={() => onOpenBooking('공장 지붕형')}
                className="w-full py-3.5 px-4 rounded-xl bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-sm transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <span>공장 지붕형 상담예약</span>
                <ArrowRight className="w-4 h-4 text-amber-100" />
              </button>
            </div>
          </div>

          {/* Type 2: 자가소비형 */}
          <div className="relative bg-white rounded-3xl p-8 border border-amber-200/80 shadow-md hover:shadow-xl transition-all flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center mb-6">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">
                ⚡ 자가소비형
              </h3>
              <p className="text-xs font-bold text-orange-800 mb-4">
                생산 전력 공장 직접 사용 · 전기요금 절감 중심
              </p>
              <p className="text-slate-700 text-sm leading-relaxed mb-6 font-medium">
                생산한 청정에너지를 공장 내 제조설비 가동에 직접 투입하여 값비싼 한전 수전 전력을 대체하고 전기요금을 직접 감면받는 방식입니다.
              </p>

              <div className="space-y-2.5 pt-4 border-t border-amber-100 text-xs text-slate-700 font-medium">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>낮 시간대 피크 전력 차단으로 기본요금 인하</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>K-RE100 인증 및 탄소배출권(ESG) 확보</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>한전 계통 선로 용량 부족 지역도 설치 가능</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={() => onOpenBooking('자가소비형')}
                className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>자가소비형 절감상담</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>
            </div>
          </div>

          {/* Type 3: 발전사업형 (RPS) */}
          <div className="relative bg-white rounded-3xl p-8 border border-amber-200/80 shadow-md hover:shadow-xl transition-all flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-6">
                <SunMedium className="w-7 h-7 text-amber-700" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">
                ☀️ 발전사업형 (RPS)
              </h3>
              <p className="text-xs font-bold text-amber-800 mb-4">
                생산 전력 한전 판매 · 20년 고정 매출 중심
              </p>
              <p className="text-slate-700 text-sm leading-relaxed mb-6 font-medium">
                발전사업자 등록 후 생산된 전력을 한전(SMP) 및 발전공기업(REC)에 20년간 전량 판매하여 매월 고정적인 현금흐름을 얻는 사업 방식입니다.
              </p>

              <div className="space-y-2.5 pt-4 border-t border-amber-100 text-xs text-slate-700 font-medium">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>20년 장기 고정가격계약으로 원금 안정성 확보</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>시설자금 저금리 금융 대출(80~90%) 연계</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>에코샤인이 발전사업허가부터 전력거래소 등록 대행</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={() => onOpenBooking('발전사업형 (RPS)')}
                className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>발전사업 수익성 상담</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
