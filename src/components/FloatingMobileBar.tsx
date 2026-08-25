import React from 'react';
import { Phone, Calendar } from 'lucide-react';
import { COMPANY_INFO } from '../data/portfolioData';

interface FloatingMobileBarProps {
  onOpenBooking: () => void;
}

export const FloatingMobileBar: React.FC<FloatingMobileBarProps> = ({ onOpenBooking }) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-amber-200/80 p-3 shadow-2xl safe-area-bottom">
      <div className="grid grid-cols-2 gap-2.5 max-w-md mx-auto">
        <a
          href={`tel:${COMPANY_INFO.mobile}`}
          className="py-3 px-3 rounded-xl bg-slate-900 active:bg-slate-800 text-white font-black text-xs flex items-center justify-center gap-2 shadow-sm"
        >
          <Phone className="w-4 h-4 text-amber-400" />
          <span>전화 상담</span>
        </a>

        <button
          onClick={onOpenBooking}
          className="py-3 px-3 rounded-xl bg-linear-to-r from-amber-400 via-amber-300 to-orange-300 active:from-amber-400 active:to-orange-200 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-slate-950" />
          <span>3분 무료 예약</span>
        </button>
      </div>
    </div>
  );
};
