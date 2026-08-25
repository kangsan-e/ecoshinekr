import React, { useState } from 'react';
import { Phone, Calendar, User, Shield, Menu, X, Sun, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO } from '../data/portfolioData';

interface HeaderProps {
  onOpenBooking: () => void;
  onOpenMyPage: () => void;
  onOpenAdmin: () => void;
  onOpenCalculator: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenBooking,
  onOpenMyPage,
  onOpenAdmin,
  onOpenCalculator,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs">
      {/* Top emergency/direct contact bar */}
      <div className="bg-linear-to-r from-amber-500 via-amber-400 to-orange-300 text-slate-950 py-1.5 px-4 text-xs font-bold shadow-xs">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1.5 font-black text-slate-950">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-900" />
              특허 누수방지 브라켓 · 포스코 POS-MAC 정품 · 전국 공장 지붕 태양광 시공
            </span>
            <span className="sm:hidden font-black text-slate-950">
              전국 공장 지붕 태양광 무료 현장실측
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-950">
            <a 
              href={`tel:${COMPANY_INFO.mobile}`} 
              className="flex items-center gap-1.5 hover:text-amber-900 transition-colors font-black text-slate-950"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>직통상담: {COMPANY_INFO.mobile}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
              className="flex items-center gap-3 text-left group cursor-pointer"
            >
              {/* Ecoshine Solar Graphic Icon */}
              <div className="w-11 h-11 rounded-xl bg-linear-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-md shadow-amber-500/20 border border-amber-300 group-hover:scale-105 transition-transform">
                <div className="relative">
                  <Sun className="w-6 h-6 text-slate-950 animate-pulse" />
                </div>
              </div>
              <div>
                <div className="flex items-baseline gap-1.5 whitespace-nowrap">
                  <span className="text-2xl font-black tracking-wider text-slate-900 whitespace-nowrap">
                    ECOSHINE
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 font-bold hidden sm:block whitespace-nowrap">
                  공장 지붕 태양광 EPC & 스마트 O&M
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-bold text-slate-700">
            <button 
              onClick={() => scrollToSection('why-solar')}
              className="hover:text-amber-600 transition-colors cursor-pointer"
            >
              왜 태양광인가?
            </button>
            <button 
              onClick={() => scrollToSection('tech-strengths')}
              className="hover:text-amber-600 transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>누수방지 기술</span>
              <span className="px-1.5 py-0.5 text-[10px] font-black bg-amber-100 text-amber-900 rounded-full border border-amber-200">특허</span>
            </button>
            <button 
              onClick={() => scrollToSection('epc-process')}
              className="hover:text-amber-600 transition-colors cursor-pointer"
            >
              원스톱 시공절차
            </button>
            <button 
              onClick={() => scrollToSection('calculator')}
              className="hover:text-amber-700 transition-colors cursor-pointer text-amber-800 font-black flex items-center gap-1"
            >
              <span>3분 수익계산기</span>
            </button>
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="hover:text-amber-600 transition-colors cursor-pointer"
            >
              실제 시공실적
            </button>
            <button 
              onClick={() => scrollToSection('company')}
              className="hover:text-amber-600 transition-colors cursor-pointer"
            >
              회사소개/장비
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={onOpenMyPage}
              className="px-3.5 py-2 text-xs font-bold text-slate-700 bg-amber-50/80 hover:bg-amber-100 border border-amber-200 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-amber-700" />
              <span>예약조회</span>
            </button>

            <button
              onClick={onOpenBooking}
              className="px-5 py-2.5 text-xs font-black text-slate-950 bg-linear-to-r from-amber-400 via-amber-300 to-orange-300 hover:from-amber-300 hover:to-orange-200 active:from-amber-500 rounded-xl shadow-md transition-all flex items-center gap-1.5 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-slate-950" />
              <span>무료 현장상담 예약</span>
            </button>

            <button
              onClick={onOpenAdmin}
              title="관리자 시스템"
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              <Shield className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenBooking}
              className="px-3 py-1.5 text-xs font-black text-slate-950 bg-linear-to-r from-amber-400 to-orange-300 rounded-lg cursor-pointer"
            >
              상담예약
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg cursor-pointer"
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-amber-200 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 text-sm font-bold text-slate-700">
            <button 
              onClick={() => scrollToSection('why-solar')}
              className="p-2.5 text-left rounded-xl bg-amber-50/50 hover:bg-amber-50"
            >
              왜 태양광인가?
            </button>
            <button 
              onClick={() => scrollToSection('tech-strengths')}
              className="p-2.5 text-left rounded-xl bg-amber-50/50 hover:bg-amber-50 text-amber-800 font-bold"
            >
              특허 누수방지 기술
            </button>
            <button 
              onClick={() => scrollToSection('epc-process')}
              className="p-2.5 text-left rounded-xl bg-amber-50/50 hover:bg-amber-50"
            >
              원스톱 시공절차
            </button>
            <button 
              onClick={() => scrollToSection('calculator')}
              className="p-2.5 text-left rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-900 font-bold"
            >
              3분 수익계산기
            </button>
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="p-2.5 text-left rounded-xl bg-amber-50/50 hover:bg-amber-50"
            >
              실제 시공실적
            </button>
            <button 
              onClick={() => scrollToSection('company')}
              className="p-2.5 text-left rounded-xl bg-amber-50/50 hover:bg-amber-50"
            >
              회사소개 및 장비
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenBooking(); }}
              className="w-full py-3 text-center text-sm font-black text-slate-900 bg-linear-to-r from-amber-400 to-orange-400 rounded-xl shadow-sm"
            >
              무료 현장상담 예약 신청
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenMyPage(); }}
                className="flex-1 py-2 text-center text-xs font-bold text-slate-700 bg-slate-100 rounded-xl"
              >
                예약 내역 조회
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }}
                className="py-2 px-4 text-center text-xs font-bold text-slate-700 bg-slate-100 rounded-xl"
              >
                관리자
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
