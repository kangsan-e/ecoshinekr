import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Droplets, 
  Layers, 
  Sun, 
  Smartphone, 
  Check, 
  X, 
  CheckCircle2
} from 'lucide-react';

export const TechStrengths: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bracket' | 'posmac' | 'module' | 'om'>('bracket');

  return (
    <section id="tech-strengths" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-black uppercase tracking-widest text-amber-950 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
            PATENTED TECHNOLOGY & QUALITY
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            태양광, 누수와 부식 걱정 없이 안심하세요
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
            공장주가 가장 우려하는 <span className="font-black text-amber-800">지붕 누수, 철골 부식, 사후관리</span>를 에코샤인만의 검증된 기술로 완벽하게 해결했습니다.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex p-1.5 bg-amber-50/80 rounded-2xl border border-amber-200 max-w-full overflow-x-auto">
            <button
              onClick={() => setActiveTab('bracket')}
              className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'bracket'
                  ? 'bg-linear-to-r from-amber-400 to-orange-300 text-slate-950 shadow-md font-black'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <Droplets className="w-4 h-4 text-amber-900" />
              <span>01. 특허 누수방지 브라켓</span>
            </button>

            <button
              onClick={() => setActiveTab('posmac')}
              className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'posmac'
                  ? 'bg-linear-to-r from-amber-400 to-orange-300 text-slate-950 shadow-md font-black'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <Layers className="w-4 h-4 text-amber-900" />
              <span>02. 포스코 POS-MAC 구조물</span>
            </button>

            <button
              onClick={() => setActiveTab('module')}
              className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'module'
                  ? 'bg-linear-to-r from-amber-400 to-orange-300 text-slate-950 shadow-md font-black'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <Sun className="w-4 h-4 text-amber-900" />
              <span>03. N-TYPE 고효율 모듈</span>
            </button>

            <button
              onClick={() => setActiveTab('om')}
              className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'om'
                  ? 'bg-linear-to-r from-amber-400 to-orange-300 text-slate-950 shadow-md font-black'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-4 h-4 text-amber-900" />
              <span>04. 스마트 O&M & 드론 점검</span>
            </button>
          </div>
        </div>

        {/* Tab Content 1: 누수 방지 브라켓 */}
        {activeTab === 'bracket' && (
          <div className="mt-10 bg-amber-50/30 rounded-3xl p-6 sm:p-10 border border-amber-200 shadow-xs">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-100 text-amber-950 text-xs font-black mb-4">
                  <span>자체 개발 특허 공법</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
                  지붕 골 타공 NO!<br />
                  <span className="text-amber-700">산(볼록부) 밀착 브라켓</span>으로 누수 원천 차단
                </h3>
                <p className="mt-4 text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
                  지붕에 태양광 설치 시 가장 흔한 문제는 누수입니다. 지붕의 골(홈이 파인 부분)에 피스를 바로 박으면 빗물이 고여 시간이 지나며 누수가 발생합니다.
                </p>
                <p className="mt-3 text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
                  에코샤인은 <strong className="text-slate-900">넓고 길게 자체 제작된 특수 브라켓</strong>을 사용하여 지붕의 산(높이 올라온 볼록부)에 밀착 타공하므로, 빗물이 자연스럽게 골로 흘러내려 누수 위험이 전혀 없습니다.
                </p>

                <div className="mt-6 space-y-2.5">
                  <div className="flex items-center gap-3 text-sm font-bold text-slate-800">
                    <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />
                    <span>빗물이 고이지 않는 상부 산(높은 곳) 타공 및 완전 밀착</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold text-slate-800">
                    <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />
                    <span>특수 EPDM 가스켓 + 2중 방수 실링 처리</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold text-slate-800">
                    <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />
                    <span>강풍과 태풍에도 견디는 고장력 인장 강도 시험 통과</span>
                  </div>
                </div>
              </div>

              {/* Comparison Visual Box */}
              <div className="lg:col-span-6 grid sm:grid-cols-2 gap-4">
                {/* Bad Example */}
                <div className="bg-red-50/70 border border-red-200 rounded-2xl p-5 text-slate-900">
                  <div className="flex items-center justify-between pb-3 border-b border-red-200/80 mb-3">
                    <span className="text-xs font-bold text-red-700">타사 일반 시공 방식</span>
                    <span className="p-1 bg-red-100 text-red-700 rounded-full">
                      <X className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-red-900 mb-2">지붕 골(홈) 부위 직결 타공</h4>
                  <ul className="text-xs text-red-800/90 space-y-1.5">
                    <li>• 비가 오면 골에 빗물이 고임</li>
                    <li>• 피스 결합 틈새로 부식 및 누수 발생</li>
                    <li>• 실리콘 경화 후 2~3년 내 재누수 위험</li>
                  </ul>
                </div>

                {/* Good Example (ECOSHINE) */}
                <div className="bg-amber-50 border-2 border-amber-400 rounded-2xl p-5 text-slate-900 shadow-md">
                  <div className="flex items-center justify-between pb-3 border-b border-amber-200 mb-3">
                    <span className="text-xs font-bold text-amber-900">에코샤인 특허 브라켓</span>
                    <span className="p-1 bg-amber-500 text-white rounded-full">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-amber-950 mb-2">지붕 산(볼록부) 밀착 롱 브라켓</h4>
                  <ul className="text-xs text-amber-950 space-y-1.5 font-semibold">
                    <li>• 빗물이 흐르는 골과 완벽 분리</li>
                    <li>• 물이 고이지 않아 누수 발생률 0%</li>
                    <li>• 지붕 하중 분산으로 패널 찌그러짐 방지</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 2: 포스코 POS-MAC 구조물 */}
        {activeTab === 'posmac' && (
          <div className="mt-10 bg-amber-50/30 rounded-3xl p-6 sm:p-10 border border-amber-200 shadow-xs">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-100 text-amber-950 text-xs font-black mb-4">
                  <span>POSCO 정품 강재 100% 사용</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
                  녹슬지 않는 초고내식성 합금강<br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-600 to-orange-600">포스코 POS-MAC 구조물</span> 시공
                </h3>
                <p className="mt-4 text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
                  포스코의 세계적 특허품인 POS-MAC(포스맥)은 마그네슘(Mg) 함유량이 높은 3원계 고내식 합금도금강판입니다.
                </p>
                <p className="mt-3 text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
                  공기에 노출된 절단면에서도 부식을 억제하는 <strong className="text-slate-900">시몬클라이트(Simonkolleite) 보호막</strong>이 스스로 형성되어 일반 용융아연도금강판 대비 5~10배 이상의 내부식성을 발휘합니다.
                </p>

                <div className="mt-6 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-800 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>해안가 염해 지역 및 화학공장 산성비 환경에서도 25년 이상 수명 보장</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-800 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>절단면 스크래치 발생 시 자가 치유(Self-Healing) 피막 형성</span>
                  </div>
                </div>
              </div>

              {/* PosMAC Corrosion Resistance Spec Table */}
              <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <h4 className="text-sm font-bold text-slate-900 mb-3">평판부 내식성 비교 (염수분무 시험 SST)</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700">
                        <th className="p-2.5 border border-slate-200">구분</th>
                        <th className="p-2.5 border border-slate-200">일반 아연도금(GI)</th>
                        <th className="p-2.5 border border-slate-200">갈바륨</th>
                        <th className="p-2.5 border border-slate-200 bg-amber-100 text-amber-950 font-bold">PosMAC (포스코)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-2.5 border border-slate-200 font-medium">도금량</td>
                        <td className="p-2.5 border border-slate-200">600g/㎡</td>
                        <td className="p-2.5 border border-slate-200">100g/㎡</td>
                        <td className="p-2.5 border border-slate-200 font-bold text-amber-950 bg-amber-50">350g/㎡ (Mg 합금)</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 border border-slate-200 font-medium">480시간 후</td>
                        <td className="p-2.5 border border-slate-200 text-red-600">백청 및 적청 발생</td>
                        <td className="p-2.5 border border-slate-200">부분 적청</td>
                        <td className="p-2.5 border border-slate-200 font-bold text-amber-800 bg-amber-50">녹 발생 없음 (깨끗함)</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 border border-slate-200 font-medium">1,440시간 후</td>
                        <td className="p-2.5 border border-slate-200 text-red-600">심각한 부식 파손</td>
                        <td className="p-2.5 border border-slate-200 text-red-600">전면 적청 발생</td>
                        <td className="p-2.5 border border-slate-200 font-bold text-amber-800 bg-amber-50">시몬클라이트 보호피막 유지</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-[11px] text-slate-700 mt-3 font-medium">
                  * 자료 출처: 포스코 기술연구원 공식 시험성적서 기준
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 3: N-TYPE 고효율 모듈 */}
        {activeTab === 'module' && (
          <div className="mt-10 bg-amber-50/30 rounded-3xl p-6 sm:p-10 border border-amber-200 shadow-xs">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-100 text-amber-950 text-xs font-black mb-4">
                  <span>차세대 N-TYPE TOPCon 기술</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
                  면적당 발전량 극대화<br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-600 to-orange-600">N-TYPE 양면 고출력 모듈</span> 탑재
                </h3>
                <p className="mt-4 text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
                  한화큐셀, 현대에너지솔루션, 신성, 에스에너지, 진코솔라 등 한국에너지공단 KS인증 1등급 N-Type 모듈을 엄선하여 시공합니다.
                </p>
                <p className="mt-3 text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
                  기존 P-TYPE 모듈 대비 <strong className="text-slate-900">낮은 온도계수와 우수한 저조도 발전효율</strong>을 제공하며, 지붕 바닥 반사광을 추가 흡수하는 양면 발전 기술로 발전량이 7~15% 상승합니다.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-amber-200">
                    <span className="text-slate-700 block">모듈 출력 보증</span>
                    <span className="text-base font-bold text-slate-900 mt-0.5 block">25년 84% 이상</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-amber-200">
                    <span className="text-slate-700 block">모듈 제품 보증</span>
                    <span className="text-base font-bold text-amber-800 mt-0.5 block">제조사 12년 무상</span>
                  </div>
                </div>
              </div>

              {/* Module Brand Badges & Efficiency */}
              <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h4 className="text-sm font-bold text-slate-900">국내외 1티어 제조사 협력 체계</h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center font-bold text-slate-800">
                    Q CELLS (한화큐셀)
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center font-bold text-slate-800">
                    HYUNDAI Energy Solutions
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center font-bold text-slate-800">
                    S-Energy (에스에너지)
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center font-bold text-slate-800">
                    JinkoSolar (진코솔라)
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1">
                  <p className="font-bold">✓ 인버터 협력사 완비:</p>
                  <p>현대중공업, 한화, 다쓰테크, 동양E&P, 효성중공업, SMA, 카코 등 98% 이상 최고 변환효율 제품 적용</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 4: 스마트 O&M & 드론 점검 */}
        {activeTab === 'om' && (
          <div className="mt-10 bg-amber-50/30 rounded-3xl p-6 sm:p-10 border border-amber-200 shadow-xs">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-100 text-amber-950 text-xs font-black mb-4">
                  <span>스마트 사후관리 체계</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
                  설치 후 25년까지 안심<br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-600 to-orange-600">드론 열화상 점검 & 실시간 관제</span>
                </h3>
                <p className="mt-4 text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
                  시공 후 방치되는 타사와 달리, 에코샤인은 직영 O&M팀이 실시간 모니터링 시스템과 정밀 열화상 드론을 활용하여 발전소의 최적 효율을 유지합니다.
                </p>

                <div className="mt-6 space-y-3 text-sm">
                  <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-start gap-3">
                    <Smartphone className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900">스마트폰 실시간 모니터링: </span>
                      <span className="text-slate-700 text-xs block mt-0.5">일간·월간·연간 발전량 및 인버터 작동 상태를 모바일 앱으로 24시간 언제 어디서나 확인</span>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900">드론 열화상 항공 점검: </span>
                      <span className="text-slate-700 text-xs block mt-0.5">육안으로 보이지 않는 모듈 핫스팟(과열 현상) 및 다이오드 결함을 드론으로 신속 탐지 및 조치</span>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900">5년 무상 정기점검 서비스: </span>
                      <span className="text-slate-700 text-xs block mt-0.5">구조물 볼팅 체결력, 절연저항, 접지저항, 인버터 효율 연 1회 정기 현장점검</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* O&M Process 4-Cycle Box */}
              <div className="lg:col-span-6 grid grid-cols-2 gap-3.5">
                <div className="p-4 bg-white rounded-xl border border-amber-200 shadow-xs">
                  <span className="text-xs font-bold text-amber-800 block mb-1">01. 정기 점검</span>
                  <p className="text-xs text-slate-700 font-medium">년 1회 정기점검 및 24시간 모니터링 센터 신속대응</p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-amber-200 shadow-xs">
                  <span className="text-xs font-bold text-amber-800 block mb-1">02. 신속 서비스</span>
                  <p className="text-xs text-slate-700 font-medium">열화상 드론 원인 파악 및 전국 서비스망 즉시 출동</p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-amber-200 shadow-xs">
                  <span className="text-xs font-bold text-amber-800 block mb-1">03. 무상 보증 연장</span>
                  <p className="text-xs text-slate-700 font-medium">구조물 5년 무상 보증 + 인버터 5~7년 무상 지원</p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-amber-200 shadow-xs">
                  <span className="text-xs font-bold text-amber-800 block mb-1">04. 직영 엔지니어링</span>
                  <p className="text-xs text-slate-700 font-medium">한국에너지공단 서비스 전담 엔지니어 직접 관리</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
