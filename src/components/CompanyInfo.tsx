import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  Wrench, 
  Award, 
  MapPin, 
  Phone, 
  Mail, 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { COMPANY_INFO, EQUIPMENT_LIST } from '../data/portfolioData';

export const CompanyInfo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'intro' | 'org' | 'equipment' | 'esg'>('intro');

  return (
    <section id="company" className="py-20 bg-white border-t border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-black uppercase tracking-widest text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
            ABOUT ECOSHINE
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            신뢰할 수 있는 태양광 파트너, <span className="whitespace-nowrap">(주)에코샤인</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            인천 남동국가산단에 본사를 두고 정밀 계측 장비와 직영 엔지니어링 조직을 바탕으로 고품질 태양광 EPC 서비스를 제공합니다.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex p-1.5 bg-amber-50/70 rounded-2xl border border-amber-200 overflow-x-auto max-w-full">
            {[
              { id: 'intro', label: '회사 개요 & 연락처' },
              { id: 'org', label: '전문 조직도' },
              { id: 'equipment', label: '보유 시험·측정장비 (16종)' },
              { id: 'esg', label: 'ESG 경영 & ISO 인증' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-linear-to-r from-amber-400 to-orange-300 text-slate-950 font-black shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: Intro & Contact */}
        {activeTab === 'intro' && (
          <div className="mt-10 grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Company Summary */}
            <div className="lg:col-span-7 bg-linear-to-br from-amber-50/40 via-amber-50/20 to-white rounded-3xl p-6 sm:p-8 border border-amber-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center font-black text-lg shadow-md border border-amber-300">
                    ECO
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">
                      {COMPANY_INFO.name} ({COMPANY_INFO.nameEn})
                    </h3>
                    <p className="text-xs text-amber-800 font-bold mt-0.5">
                      공사지명원 등록 및 산업통상자원부 / 한국에너지공단 참여기업
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-white rounded-xl border border-amber-200/80 shadow-2xs">
                    <span className="text-slate-400 block font-medium">영업 총괄</span>
                    <span className="text-sm font-bold text-amber-900 block mt-1">
                      {COMPANY_INFO.salesDirector} 영업이사
                    </span>
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-amber-200/80 shadow-2xs">
                    <span className="text-slate-400 block font-medium">직통 문의 전화</span>
                    <span className="text-sm font-bold text-amber-900 block mt-1">
                      {COMPANY_INFO.mobile}
                    </span>
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-amber-200/80 shadow-2xs sm:col-span-2">
                    <span className="text-slate-400 block font-medium">접수 이메일</span>
                    <span className="text-sm font-bold text-slate-900 block mt-1">{COMPANY_INFO.email}</span>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-white rounded-xl border border-amber-200/80 shadow-2xs text-xs">
                  <span className="text-slate-400 block font-medium">본사 소재지</span>
                  <p className="text-sm font-bold text-slate-900 mt-1">
                    {COMPANY_INFO.address} (우: {COMPANY_INFO.addressPostal})
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-amber-200/60 flex flex-wrap gap-2 text-[11px] font-semibold text-slate-600">
                <span className="px-2.5 py-1 bg-amber-100 text-amber-900 rounded-md border border-amber-200">태양광 발전사업 EPC</span>
                <span className="px-2.5 py-1 bg-amber-100 text-amber-900 rounded-md border border-amber-200">전기공사업 면허</span>
                <span className="px-2.5 py-1 bg-amber-100 text-amber-900 rounded-md border border-amber-200">특허 누수방지 구조물</span>
                <span className="px-2.5 py-1 bg-amber-100 text-amber-900 rounded-md border border-amber-200">스마트 O&M</span>
              </div>
            </div>

            {/* Direct Contact Card */}
            <div className="lg:col-span-5 bg-linear-to-br from-amber-500 via-amber-400 to-orange-300 text-slate-950 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl border border-amber-300">
              <div>
                <span className="text-xs text-amber-950 font-black tracking-wider uppercase bg-white/40 px-2.5 py-0.5 rounded-full">
                  DIRECT CONTACT
                </span>
                <h3 className="text-2xl font-black text-slate-950 mt-2">
                  공장 태양광 직통 상담 센터
                </h3>
                <p className="mt-3 text-slate-900 text-xs sm:text-sm leading-relaxed font-medium">
                  지붕 도면이나 주소만 알려주시면 당일 1차 설치 가용성 및 예상 견적을 신속하게 피드백해 드립니다.
                </p>

                <div className="mt-6 space-y-3 text-xs">
                  <a
                    href={`tel:${COMPANY_INFO.mobile}`}
                    className="p-4 rounded-xl bg-white/80 hover:bg-white transition-colors flex items-center gap-3 border border-amber-300/60 block shadow-xs"
                  >
                    <Phone className="w-5 h-5 text-amber-700 shrink-0" />
                    <div>
                      <span className="text-amber-800 text-[10px] block font-bold">담당 임원 직통 (차태훈 영업이사)</span>
                      <span className="text-lg font-black text-slate-950">{COMPANY_INFO.mobile}</span>
                    </div>
                  </a>

                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="p-4 rounded-xl bg-white/80 hover:bg-white transition-colors flex items-center gap-3 border border-amber-300/60 block shadow-xs"
                  >
                    <Mail className="w-5 h-5 text-amber-700 shrink-0" />
                    <div>
                      <span className="text-amber-800 text-[10px] block font-bold">도면 및 견적 접수 이메일</span>
                      <span className="text-sm font-bold text-slate-950">{COMPANY_INFO.email}</span>
                    </div>
                  </a>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-amber-900/15 text-[11px] text-amber-950 font-bold text-center">
                연중무휴 상담 지원 / 평일 08:30 ~ 18:30
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Organization Chart */}
        {activeTab === 'org' && (
          <div className="mt-10 bg-amber-50/40 rounded-3xl p-6 sm:p-10 border border-amber-200">
            <h3 className="text-xl font-bold text-slate-900 text-center mb-8">
              <span className="whitespace-nowrap font-black">(주)에코샤인</span> 전문 엔지니어링 조직 구성
            </h3>

            {/* Teams Grid */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {/* Construction Team */}
              <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-xs text-center">
                <div className="p-2.5 rounded-xl bg-amber-100 text-amber-950 font-black text-sm mb-4">
                  건설팀
                </div>
                <div className="space-y-2 text-xs font-semibold text-slate-700">
                  <div className="p-2 bg-amber-50/50 rounded-lg">구조물 엔지니어링</div>
                  <div className="p-2 bg-amber-50/50 rounded-lg">토목 공학</div>
                  <div className="p-2 bg-amber-50/50 rounded-lg">전기 공사 및 수배전반</div>
                </div>
              </div>

              {/* Design Team */}
              <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-xs text-center">
                <div className="p-2.5 rounded-xl bg-amber-100 text-amber-950 font-black text-sm mb-4">
                  설계팀
                </div>
                <div className="space-y-2 text-xs font-semibold text-slate-700">
                  <div className="p-2 bg-amber-50/50 rounded-lg">설계 팀장 (구조설계/CAD)</div>
                  <div className="p-2 bg-amber-50/50 rounded-lg">설계 연구원 (음영/발전량 해석)</div>
                </div>
              </div>

              {/* Management Team */}
              <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-xs text-center">
                <div className="p-2.5 rounded-xl bg-amber-100 text-amber-950 font-black text-sm mb-4">
                  관리 및 영업지원팀
                </div>
                <div className="space-y-2 text-xs font-semibold text-slate-700">
                  <div className="p-2 bg-amber-50/50 rounded-lg">영업총괄 (차태훈 영업이사)</div>
                  <div className="p-2 bg-amber-50/50 rounded-lg">설계지원 및 한전 인허가 행정</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Equipment List (16 items from PDF) */}
        {activeTab === 'equipment' && (
          <div className="mt-10 bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-xs">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  정밀 현장실측 및 시험분석 보유 장비 현황
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  에코샤인은 공인된 전문 장비를 활용하여 오차 없는 시공과 철저한 품질 검증을 수행합니다.
                </p>
              </div>
              <span className="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded-md border border-amber-300">
                16종 전문 계측장비 완비
              </span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {EQUIPMENT_LIST.map((eq, idx) => (
                <div key={idx} className="p-4 bg-amber-50/30 rounded-xl border border-amber-100 text-xs">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-slate-900 text-sm">{eq.name}</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-white text-amber-800 border border-amber-200">
                      {eq.category}
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-orange-700 font-semibold mt-1">
                    모델: {eq.model}
                  </p>
                  <p className="text-slate-600 mt-1 leading-snug">
                    용도: {eq.usage}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: ESG Management & ISO Certifications */}
        {activeTab === 'esg' && (
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-amber-50/30 border border-amber-200">
              <span className="text-xs font-black text-amber-700 uppercase block mb-1">
                ENVIRONMENTAL
              </span>
              <h4 className="text-lg font-bold text-slate-900 mb-3">친환경 경영</h4>
              <ul className="text-xs text-slate-700 space-y-2">
                <li>• 원재료부터 친환경 고내식 소재 적용</li>
                <li>• 자체 태양광 발전소 운용 및 청정에너지 확산</li>
                <li>• 수율 고도화 및 공정 폐기물 배출량 감축</li>
                <li>• <strong className="text-slate-900">ISO 14001</strong> 환경경영인증 운영</li>
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-amber-50/30 border border-amber-200">
              <span className="text-xs font-black text-orange-700 uppercase block mb-1">
                SOCIAL
              </span>
              <h4 className="text-lg font-bold text-slate-900 mb-3">사회적 책임 경영</h4>
              <ul className="text-xs text-slate-700 space-y-2">
                <li>• 자재 재활용 복원 시스템 구축을 통한 환경보전</li>
                <li>• <strong className="text-slate-900">ISO 45001 / ISO 9001</strong> 안전보건·품질경영</li>
                <li>• 청년 인재 육성 및 엔지니어 역량 강화</li>
                <li>• 지역 사회 공헌 및 신재생에너지 기부</li>
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-amber-50/30 border border-amber-200">
              <span className="text-xs font-black text-amber-800 uppercase block mb-1">
                GOVERNANCE
              </span>
              <h4 className="text-lg font-bold text-slate-900 mb-3">투명 경영</h4>
              <ul className="text-xs text-slate-700 space-y-2">
                <li>• 자율적 제도 개선 및 안전 준수 문화 정착</li>
                <li>• 사내 복지 제도 및 안전 장비 무상 지원</li>
                <li>• <strong className="text-slate-900">ISO 37001</strong> 부패방지 경영 도입</li>
                <li>• 100% 정품 포스코/1티어 모듈 거래 투명성 보장</li>
              </ul>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
