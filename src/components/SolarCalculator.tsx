import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  ArrowRight, 
  Leaf, 
  Calendar
} from 'lucide-react';
import { calculateSolarPotential, formatKoreanWon } from '../utils/calculator';
import type { FactoryType, InterestType } from '../types';

interface SolarCalculatorProps {
  onApplyToBooking: (params: {
    address: string;
    roofArea: number;
    monthlyBill: number;
    factoryType: FactoryType;
    interest: InterestType;
    estimatedKw: number;
  }) => void;
}

export const SolarCalculator: React.FC<SolarCalculatorProps> = ({ onApplyToBooking }) => {
  const [areaUnit, setAreaUnit] = useState<'py' | 'm2'>('py');
  const [areaValue, setAreaValue] = useState<number>(300); // 300 pyeong default
  const [monthlyBillManwon, setMonthlyBillManwon] = useState<number>(500); // 500만원
  const [factoryType, setFactoryType] = useState<FactoryType>('owned');
  const [interest, setInterest] = useState<InterestType>('power_business');
  const [address, setAddress] = useState<string>('인천광역시 남동구 남동인더스파크');
  const [calcMode, setCalcMode] = useState<'business' | 'self_consumption'>('business');

  // Convert to m2 for calculation
  const areaM2 = useMemo(() => {
    return areaUnit === 'py' ? areaValue * 3.305785 : areaValue;
  }, [areaUnit, areaValue]);

  const result = useMemo(() => {
    return calculateSolarPotential(areaM2, monthlyBillManwon * 10000, calcMode);
  }, [areaM2, monthlyBillManwon, calcMode]);

  const handleBookWithResult = () => {
    onApplyToBooking({
      address,
      roofArea: Math.round(areaM2),
      monthlyBill: monthlyBillManwon * 10000,
      factoryType,
      interest,
      estimatedKw: result.estimatedCapacityKw,
    });
  };

  return (
    <section id="calculator" className="py-20 bg-linear-to-b from-white via-amber-50/30 to-amber-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-black uppercase tracking-widest text-amber-950 bg-amber-100 px-3.5 py-1 rounded-full border border-amber-300">
            3-MINUTE SOLAR SIMULATOR
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            내 공장 태양광 3분 간편 계산기
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
            지붕 면적과 월 전기요금을 입력하시면 <span className="font-black text-amber-800">예상 설치용량과 20년 수익</span>을 즉시 시뮬레이션해 드립니다.
          </p>
        </div>

        {/* Simulator Main Body */}
        <div className="mt-12 grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Inputs (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-md space-y-6">
            
            {/* Input 1: Address */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                1. 공장 소재지 (주소)
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-amber-500" />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="예: 경기도 화성시 팔탄면 공장단지"
                  className="w-full pl-10 pr-4 py-3 bg-amber-50/40 border border-amber-200 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                * 지역별 일조량 및 한전 변전소 계통연계 가용성을 분석하는 기초 자료가 됩니다.
              </p>
            </div>

            {/* Input 2: Roof Area with Unit Toggle */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  2. 대략적인 지붕 면적
                </label>
                <div className="inline-flex p-0.5 bg-amber-100/70 rounded-lg text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => {
                      if (areaUnit === 'm2') {
                        setAreaValue(Math.round(areaValue / 3.305785));
                        setAreaUnit('py');
                      }
                    }}
                    className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                      areaUnit === 'py' ? 'bg-amber-600 text-white shadow-xs font-black' : 'text-slate-700 hover:text-slate-900'
                    }`}
                  >
                    평 (py)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (areaUnit === 'py') {
                        setAreaValue(Math.round(areaValue * 3.305785));
                        setAreaUnit('m2');
                      }
                    }}
                    className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                      areaUnit === 'm2' ? 'bg-amber-600 text-white shadow-xs font-black' : 'text-slate-700 hover:text-slate-900'
                    }`}
                  >
                    ㎡ (제곱미터)
                  </button>
                </div>
              </div>

              {/* Slider & Number Input */}
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={areaUnit === 'py' ? 50 : 160}
                  max={areaUnit === 'py' ? 2000 : 6600}
                  step={areaUnit === 'py' ? 10 : 33}
                  value={areaValue}
                  onChange={(e) => setAreaValue(Number(e.target.value))}
                  className="flex-1 accent-amber-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
                <div className="w-32 flex items-center bg-amber-50/40 border border-amber-200 rounded-xl px-3 py-2">
                  <input
                    type="number"
                    min={10}
                    max={50000}
                    value={areaValue}
                    onChange={(e) => setAreaValue(Number(e.target.value))}
                    className="w-full text-right font-black text-slate-900 bg-transparent focus:outline-none text-sm"
                  />
                  <span className="ml-1.5 text-xs font-bold text-slate-600">
                    {areaUnit === 'py' ? '평' : '㎡'}
                  </span>
                </div>
              </div>

              <div className="flex justify-between text-[11px] text-slate-400 mt-1.5 font-medium">
                <span>소형 (100평 / 330㎡)</span>
                <span>표준 (300평 / 990㎡)</span>
                <span>대형 (1,000평 / 3,300㎡)</span>
                <span>초대형 (2,000평+)</span>
              </div>
            </div>

            {/* Input 3: Monthly Electricity Cost */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  3. 현재 월평균 전기요금
                </label>
                <span className="text-xs font-black text-amber-700">
                  월 {monthlyBillManwon.toLocaleString()} 만원
                </span>
              </div>

              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={50}
                  max={5000}
                  step={50}
                  value={monthlyBillManwon}
                  onChange={(e) => setMonthlyBillManwon(Number(e.target.value))}
                  className="flex-1 accent-amber-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
                <div className="w-32 flex items-center bg-amber-50/40 border border-amber-200 rounded-xl px-3 py-2">
                  <input
                    type="number"
                    min={10}
                    max={100000}
                    value={monthlyBillManwon}
                    onChange={(e) => setMonthlyBillManwon(Number(e.target.value))}
                    className="w-full text-right font-black text-slate-900 bg-transparent focus:outline-none text-sm"
                  />
                  <span className="ml-1 text-xs font-bold text-slate-600">만원</span>
                </div>
              </div>

              {/* Quick buttons */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {[100, 300, 500, 1000, 2000, 3000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setMonthlyBillManwon(amt)}
                    className={`px-2.5 py-1 text-xs rounded-lg border transition-colors cursor-pointer ${
                      monthlyBillManwon === amt
                        ? 'bg-amber-100 border-amber-500 text-amber-950 font-black'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-amber-50'
                    }`}
                  >
                    {amt >= 1000 ? `${amt / 1000}천만원` : `${amt}만원`}
                  </button>
                ))}
              </div>
            </div>

            {/* Input 4: Factory Ownership & Mode */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  4. 공장 소유 형태
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                  {(['owned', 'rented', 'etc'] as FactoryType[]).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFactoryType(type)}
                      className={`py-2.5 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                        factoryType === type
                          ? 'bg-linear-to-r from-amber-500 to-orange-500 text-white border-amber-500 font-black shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-amber-50'
                      }`}
                    >
                      {type === 'owned' ? '자가공장' : type === 'rented' ? '임대공장' : '신축/기타'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  5. 우선 검토 목적
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => {
                      setInterest('power_business');
                      setCalcMode('business');
                    }}
                    className={`py-2.5 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                      calcMode === 'business'
                        ? 'bg-linear-to-r from-amber-500 to-orange-500 text-white border-amber-500 font-black shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-amber-50'
                    }`}
                  >
                    발전수익 (전력판매)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setInterest('cost_reduction');
                      setCalcMode('self_consumption');
                    }}
                    className={`py-2.5 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                      calcMode === 'self_consumption'
                        ? 'bg-linear-to-r from-amber-500 to-orange-500 text-white border-amber-500 font-black shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-amber-50'
                    }`}
                  >
                    전기요금 직접 절감
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Right Output: Realtime Financial Analytics Card (5 Cols) */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800 sticky top-24">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-[11px] text-amber-400 font-black uppercase tracking-wider block">
                  ESTIMATED SIMULATION
                </span>
                <h3 className="text-xl font-black text-white">
                  진단 결과 보고서
                </h3>
              </div>
              <div className="px-3 py-1 rounded-full bg-linear-to-r from-amber-400 to-orange-400 text-slate-950 text-xs font-black">
                가중치 1.5 적용
              </div>
            </div>

            {/* Metric 1: Capacity */}
            <div className="mt-6 p-4 rounded-2xl bg-slate-800/80 border border-amber-500/30">
              <span className="text-xs text-slate-300 font-medium block">
                지붕 {result.roofAreaPy}평({Math.round(result.roofAreaM2)}㎡) 기준 예상 설치용량
              </span>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="text-3xl sm:text-4xl font-black text-white">
                  {result.estimatedCapacityKw.toLocaleString()}{' '}
                  <span className="text-lg font-bold text-amber-400">kW</span>
                </span>
                <span className="text-xs text-amber-300 font-bold">
                  N-TYPE 640W 기준
                </span>
              </div>
            </div>

            {/* Metric 2: Annual & 20-Year Revenue */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/50">
                <span className="text-[11px] text-slate-300 font-medium block">
                  {calcMode === 'business' ? '연간 예상 발전매출' : '연간 전기요금 절감액'}
                </span>
                <p className="text-lg sm:text-xl font-black text-amber-400 mt-1">
                  {formatKoreanWon(result.estimatedAnnualRevenue)}
                </p>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  월 약 {formatKoreanWon(result.monthlySavings)}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/50">
                <span className="text-[11px] text-slate-300 font-medium block">
                  20년 누적 예상 효과
                </span>
                <p className="text-lg sm:text-xl font-black text-white mt-1">
                  {formatKoreanWon(result.twentyYearRevenue)}
                </p>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  열화율 0.5%/년 반영
                </span>
              </div>
            </div>

            {/* Environmental & Carbon Metric */}
            <div className="mt-4 p-3.5 bg-slate-800/60 rounded-xl border border-slate-700/40 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Leaf className="w-4 h-4 text-amber-400" />
                <span>연간 탄소 저감</span>
              </div>
              <div className="font-bold text-white">
                {result.co2ReductionTons}톤 CO₂{' '}
                <span className="text-amber-300 text-[11px]">
                  (소나무 {result.treeEquivalent.toLocaleString()}그루 효과)
                </span>
              </div>
            </div>

            {/* CTA to Booking Form with auto-fill */}
            <div className="mt-6 pt-4 border-t border-slate-800 space-y-3">
              <button
                type="button"
                onClick={handleBookWithResult}
                className="w-full py-4 px-4 bg-linear-to-r from-amber-400 via-amber-300 to-orange-300 hover:from-amber-300 hover:to-orange-200 active:opacity-90 text-slate-950 font-black text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-slate-950" />
                <span>이 계산 결과로 무료 현장상담 예약하기</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <p className="text-center text-[11px] text-slate-400">
                ✓ 복잡한 가입 없이 예약 시 담당 엔지니어가 무료 현장 실측을 진행합니다.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
