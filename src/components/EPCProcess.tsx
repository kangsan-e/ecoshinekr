import React from 'react';
import { 
  ClipboardCheck, 
  Search, 
  BarChart3, 
  Compass, 
  Wrench, 
  Zap, 
  ArrowRight
} from 'lucide-react';

interface EPCProcessProps {
  onOpenBooking: () => void;
}

export const EPCProcess: React.FC<EPCProcessProps> = ({ onOpenBooking }) => {
  const steps = [
    {
      num: '01',
      title: '현장상담',
      subtitle: '공장 위치 및 지붕 조건 확인',
      desc: '담당 전문 엔지니어가 공장을 직접 방문하거나 비대면으로 지붕 구조, 변전실 용량, 전력 계통 상태를 사전 점검합니다.',
      icon: ClipboardCheck,
      badge: '방문 무료'
    },
    {
      num: '02',
      title: '설치 가능성 검토',
      subtitle: '지붕구조·음영·계통 분석',
      desc: 'GPS 위성측량과 드론 항공 촬영을 활용해 지붕 면적, 방위각, 경사도 및 한전 선로용량(변전소 여유용량)을 정밀 검토합니다.',
      icon: Search,
      badge: '정밀 측량'
    },
    {
      num: '03',
      title: '발전량·경제성 분석',
      subtitle: '예상 수익 및 맞춤 수지분석표',
      desc: '20개년 시뮬레이션을 통해 월별 예상 발전량, SMP+REC 매출액, 전기요금 절감액 및 투자비 회수기간을 수치로 제시합니다.',
      icon: BarChart3,
      badge: '수익 검증'
    },
    {
      num: '04',
      title: '맞춤형 정밀 설계',
      subtitle: '구조안전진단 및 도면 작성',
      desc: '자체 설계팀이 풍하중·적설하중을 견디는 최적의 모듈 배치도, POS-MAC 프레임 도면, 인버터 및 전기 단선도를 완성합니다.',
      icon: Compass,
      badge: '특허 브라켓'
    },
    {
      num: '05',
      title: '책임 시공 (EPC)',
      subtitle: '지붕 훼손 없는 완벽 시공',
      desc: '자체 누수방지 브라켓과 포스코 정품 POS-MAC 자재, 한화/현대 고효율 N-Type 모듈로 숙련된 직영팀이 안전 시공합니다.',
      icon: Wrench,
      badge: '누수 0% 보증'
    },
    {
      num: '06',
      title: '계통연계 및 O&M',
      subtitle: '사용전검사 통과 & 실시간 관제',
      desc: '전기안전공사 사용전검사 통과, 한전 계통 연계 완료 후 스마트폰 실시간 모니터링 앱 및 5년 무상 정기점검을 지원합니다.',
      icon: Zap,
      badge: '5년 무상관리'
    }
  ];

  return (
    <section id="epc-process" className="py-20 bg-amber-50/20 border-y border-amber-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-black uppercase tracking-widest text-amber-950 bg-amber-100 px-3 py-1 rounded-full border border-amber-300 shadow-xs">
            ONE-STOP EPC PROCESS
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            처음부터 끝까지 ECOSHINE
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
            복잡한 인허가, 지붕 안전진단, 한전 계통연계 신청까지 공장주가 신경 쓸 일 없이 에코샤인이 원스톱으로 책임집니다.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <div 
                key={idx}
                className="relative bg-white rounded-2xl p-7 border border-amber-200/80 shadow-xs hover:shadow-lg hover:border-amber-400 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-black text-amber-600 tracking-tighter">
                        {step.num}
                      </span>
                      <span className="h-4 w-px bg-slate-200" />
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-950 border border-amber-300">
                        {step.badge}
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:bg-linear-to-r group-hover:from-amber-500 group-hover:to-orange-500 group-hover:text-white transition-all">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 group-hover:text-amber-700 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs font-bold text-amber-800 mt-0.5 mb-3">
                    {step.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-700 font-bold">
                  <span>단계 완료율: {Math.round(((idx + 1) / 6) * 100)}%</span>
                  <span className="text-amber-700">Step {idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 p-6 sm:p-8 bg-white rounded-2xl border border-amber-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-black text-slate-900">
                “복잡한 행정 서류와 한전 승인, 내가 직접 알아봐야 하나요?”
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 mt-1 font-medium">
                아닙니다! 발전사업허가, 개발행위허가, 한전 PPA 계약, 사용전검사까지 에코샤인 전문 행정팀이 100% 대행합니다.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenBooking}
            className="shrink-0 w-full md:w-auto px-6 py-3.5 bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
          >
            <span>현장상담 신청하기</span>
            <ArrowRight className="w-4 h-4 text-amber-100" />
          </button>
        </div>

      </div>
    </section>
  );
};
