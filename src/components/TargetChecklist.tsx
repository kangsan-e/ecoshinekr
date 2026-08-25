import React, { useState } from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';

interface TargetChecklistProps {
  onOpenBooking: () => void;
  onScrollToCalculator: () => void;
}

export const TargetChecklist: React.FC<TargetChecklistProps> = ({
  onOpenBooking,
  onScrollToCalculator,
}) => {
  const [checkedItems, setCheckedItems] = useState<number[]>([0, 1, 2]);

  const items = [
    { title: '공장 지붕 면적이 150평(500㎡) 이상이다', desc: '지붕 면적이 넓을수록 규모의 경제로 시공단가는 낮아지고 수익률은 극대화됩니다.' },
    { title: '낮 시간대(09:00~17:00) 공장 가동 전력 사용량이 많다', desc: '태양광 발전 피크 시간과 공장 전력 소비 시간이 일치하여 전기요금 절감 효과가 큽니다.' },
    { title: '매달 청구되는 산업용 전기요금이 부담된다', desc: '한국전력 요금 인상 추세에 대비하여 장기적 고정 에너지 비용 헤징이 가능합니다.' },
    { title: '사용하지 않고 비어있는 지붕을 수익화하고 싶다', desc: '공장 지붕 공간은 임대 또는 자가발전으로 20년간 고정적인 부가수익을 창출합니다.' },
    { title: '태양광을 검토했으나 지붕 누수와 복잡한 행정절차가 걱정된다', desc: '에코샤인의 특허 누수방지 브라켓과 인허가·계통연계 원스톱 대행으로 해결됩니다.' },
    { title: '자가공장 또는 장기 임대한 공장/창고를 운영 중이다', desc: '소유 형태 및 임대차 조건에 맞춘 최적의 맞춤형 사업 방식을 제안해 드립니다.' },
    { title: '대기업 납품을 위한 RE100 및 ESG 탄소배출 감축이 필요하다', desc: 'K-RE100 등록 지원 및 온실가스 감축 인증 실적으로 대외 경쟁력을 높입니다.' },
  ];

  const toggleCheck = (index: number) => {
    if (checkedItems.includes(index)) {
      setCheckedItems(checkedItems.filter((i) => i !== index));
    } else {
      setCheckedItems([...checkedItems, index]);
    }
  };

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & Strong CTA */}
          <div className="lg:col-span-5 text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4 border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FACTORY OWNER CHECKLIST</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight text-white">
              이런 공장이라면,<br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-300 to-orange-400">지금 바로 상담해보세요.</span>
            </h2>
            <p className="mt-4 text-amber-100/90 text-base leading-relaxed font-medium">
              위 항목 중 <span className="font-bold text-amber-300">1개 이상</span> 해당된다면, 공장 지붕 태양광을 통해 확실한 경제적 효과를 누리실 수 있습니다.
            </p>

            <div className="mt-8 p-6 bg-slate-800/80 backdrop-blur-md rounded-2xl border border-amber-400/20">
              <p className="text-xs text-amber-300 uppercase tracking-wider font-bold mb-1">
                자가 진단 결과
              </p>
              <p className="text-xl font-bold text-white">
                선택 항목: <span className="text-amber-400 text-2xl font-black">{checkedItems.length}</span> / {items.length}개
              </p>
              <p className="text-xs text-amber-100/80 mt-2 font-medium">
                {checkedItems.length >= 2 
                  ? '🎯 태양광 설치 시 즉각적인 수익 창출 및 전기료 절감 효과가 매우 높은 공장입니다!'
                  : '💡 지붕 조건에 따라 맞춤형 설치 가능 여부를 무료로 검토해드립니다.'}
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-7 py-4 text-sm sm:text-base font-black text-slate-950 bg-linear-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>무료 설치 가능성 검토 →</span>
              </button>
              <button
                onClick={onScrollToCalculator}
                className="w-full sm:w-auto px-6 py-4 text-sm sm:text-base font-bold text-white bg-slate-800 hover:bg-slate-700 border border-amber-400/30 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>3분 수익 간편계산</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Checkbox List */}
          <div className="lg:col-span-7 space-y-3">
            {items.map((item, idx) => {
              const isChecked = checkedItems.includes(idx);
              return (
                <div
                  key={idx}
                  onClick={() => toggleCheck(idx)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer select-none flex items-start gap-4 ${
                    isChecked
                      ? 'bg-white text-slate-900 border-amber-300 shadow-md'
                      : 'bg-slate-800/60 text-white/90 border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    isChecked ? 'bg-linear-to-br from-amber-500 to-orange-500 text-white' : 'border-2 border-slate-600 text-transparent'
                  }`}>
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className={`text-base font-bold leading-snug ${
                      isChecked ? 'text-slate-900' : 'text-white'
                    }`}>
                      {item.title}
                    </h3>
                    <p className={`mt-1 text-xs leading-relaxed ${
                      isChecked ? 'text-slate-700 font-medium' : 'text-slate-300'
                    }`}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
