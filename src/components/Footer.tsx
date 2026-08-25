import React from 'react';
import { Phone, Calendar, Mail, MessageSquare, ShieldCheck, Sun, ArrowUp } from 'lucide-react';
import { COMPANY_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenBooking: () => void;
  onScrollToCalculator: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onScrollToCalculator }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-200 pt-16 pb-24 lg:pb-16 border-t border-amber-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Powerful Final CTA Banner in Warm Soft Amber Solar Gradient */}
        <div className="bg-linear-to-r from-amber-400 via-amber-300 to-orange-300 rounded-3xl p-8 sm:p-12 border border-amber-300/80 text-center shadow-2xl relative overflow-hidden mb-16 text-slate-950">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl pointer-events-none" />
          
          <span className="text-xs font-black uppercase tracking-widest text-amber-950 block mb-2 bg-white/40 max-w-max mx-auto px-3 py-1 rounded-full">
            FREE ENGINEERING CONSULTATION
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
            공장 지붕을 그냥 두지 마세요.
          </h2>
          <p className="mt-3 text-slate-900 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-medium">
            내 공장에 태양광을 설치할 수 있는지, 지붕 누수 위험은 없는지, <strong className="text-slate-950 font-black">ECOSHINE이 현장에서 먼저 무료로 확인해드립니다.</strong>
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`tel:${COMPANY_INFO.mobile}`}
              className="w-full sm:w-auto px-7 py-4 bg-slate-950 hover:bg-slate-900 text-white font-black text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <Phone className="w-4 h-4 text-amber-300" />
              <span>📞 직통 전화상담 ({COMPANY_INFO.mobile})</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-amber-50 text-slate-950 font-black text-sm rounded-xl shadow-lg border border-amber-300 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-slate-950" />
              <span>📅 무료 현장상담 예약 신청</span>
            </button>
          </div>
        </div>

        {/* Footer Main Information */}
        <div className="grid md:grid-cols-12 gap-8 pb-12 border-b border-slate-800 text-xs text-slate-400">
          
          {/* Logo & Motto */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center font-black shadow-md">
                <Sun className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-black text-white block whitespace-nowrap">
                  (주)에코샤인
                </span>
                <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">
                  ECOSHINE SOLAR EPC & SMART O&M
                </span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-slate-400 max-w-lg">
              <span className="whitespace-nowrap font-bold text-slate-200">(주)에코샤인</span>은 공장 지붕 태양광 맞춤 설계, 포스코 POS-MAC 고내식 구조물 시공, 특허 누수방지 브라켓 적용, 한전 계통연계 및 드론 O&M까지 원스톱으로 제공하는 프리미엄 태양광 EPC 전문기업입니다.
            </p>
            <div className="flex items-center gap-2 text-amber-300 font-semibold">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>특허 누수방지 브라켓 · 58.4MW+ 실적 · 누수 사고 0건</span>
            </div>
          </div>

          {/* Business Details (No CEO, No landline, No fax as requested) */}
          <div className="md:col-span-6 space-y-2">
            <h4 className="text-sm font-bold text-white mb-3">기업 정보</h4>
            <p className="text-slate-300"><strong className="text-white">상호명:</strong> {COMPANY_INFO.name} ({COMPANY_INFO.nameEn})</p>
            <p className="text-slate-300"><strong className="text-white">영업총괄:</strong> {COMPANY_INFO.salesDirector} 영업이사</p>
            <p className="text-slate-300"><strong className="text-white">본사 주소:</strong> {COMPANY_INFO.address} (우: {COMPANY_INFO.addressPostal})</p>
            <p className="text-slate-300"><strong className="text-white">직통 상담전화:</strong> <a href={`tel:${COMPANY_INFO.mobile}`} className="text-amber-400 font-bold hover:underline">{COMPANY_INFO.mobile}</a></p>
            <p className="text-slate-300"><strong className="text-white">접수 이메일:</strong> <a href={`mailto:${COMPANY_INFO.email}`} className="text-amber-400 hover:underline">{COMPANY_INFO.email}</a></p>
          </div>
        </div>

        {/* Copyright & Scroll Top */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>개인정보처리방침</span>
            <span>이용약관</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 transition-colors flex items-center gap-1 cursor-pointer"
              title="맨 위로"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>TOP</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
