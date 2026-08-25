import React, { useState, useEffect } from 'react';
import { Zap, ArrowRight, CheckCircle2, Maximize2, X, MapPin, Building, ShieldCheck, Upload, Image as ImageIcon } from 'lucide-react';
import { PORTFOLIO_LIST } from '../data/portfolioData';
import type { PortfolioItem } from '../types';

interface PortfolioGalleryProps {
  onOpenBooking: () => void;
}

const CUSTOM_IMAGES_STORAGE_KEY = 'ecoshine_portfolio_custom_images';

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ onOpenBooking }) => {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [customImages, setCustomImages] = useState<Record<string, string>>({});

  // Load custom user-uploaded images from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CUSTOM_IMAGES_STORAGE_KEY);
      if (saved) {
        setCustomImages(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        const updated = { ...customImages, [id]: base64 };
        setCustomImages(updated);
        try {
          localStorage.setItem(CUSTOM_IMAGES_STORAGE_KEY, JSON.stringify(updated));
        } catch {
          // localStorage full or restricted
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const getItemImage = (item: PortfolioItem) => {
    return customImages[item.id] || item.imageUrl;
  };

  return (
    <section id="portfolio" className="py-20 bg-linear-to-b from-amber-50/40 via-white to-orange-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-amber-900 bg-amber-100 px-3.5 py-1.5 rounded-full border border-amber-200 shadow-xs">
            <Zap className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
            <span>실제 시공 실적 (100~300kW)</span>
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            (주)에코샤인 실제 지붕 시공 실적
          </h2>
          <p className="mt-3 text-base text-slate-600">
            실제 현장에 완공된 100~300kW 공장 지붕 태양광 발전소 실적 사진입니다.
          </p>
        </div>

        {/* 3 Portfolio Cards Grid: Photo + kW ONLY as requested */}
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PORTFOLIO_LIST.map((item) => {
            const currentImg = getItemImage(item);
            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="bg-white rounded-2xl overflow-hidden border border-amber-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1 cursor-pointer"
              >
                {/* Real Photo with overlay & prominent kW */}
                <div className="relative aspect-4/3 overflow-hidden bg-slate-900">
                  <img
                    src={currentImg}
                    alt={`${item.capacity} 시공 실적`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Gradient shadow for contrast */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/75 via-transparent to-black/20 pointer-events-none" />
                  
                  {/* Zoom hover indicator */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white px-2.5 py-1.5 rounded-lg backdrop-blur-xs flex items-center gap-1.5 text-[11px] font-bold shadow-md">
                    <Maximize2 className="w-3.5 h-3.5 text-amber-300" />
                    <span>사진 크게보기</span>
                  </div>

                  {/* Large kW overlay badge */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="bg-linear-to-r from-amber-400 to-amber-300 text-slate-950 font-black text-xl sm:text-2xl px-4 py-2 rounded-xl shadow-lg border border-amber-200 flex items-center gap-2">
                      <Zap className="w-5 h-5 fill-slate-950 text-slate-950" />
                      <span>{item.capacity}</span>
                    </div>
                  </div>
                </div>

                {/* Minimal Clean Footer Bar */}
                <div className="p-4 bg-amber-50/50 border-t border-amber-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>{item.roofType}</span>
                  </span>
                  <span className="text-amber-900 font-black bg-white px-2.5 py-1 rounded-md border border-amber-200 shadow-2xs">
                    시공완료
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed High-Res Modal on click */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-amber-200 flex flex-col max-h-[90vh]">
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-amber-50/50">
                <div className="flex items-center gap-2">
                  <span className="p-2 bg-amber-400 text-slate-950 rounded-xl font-black text-sm flex items-center gap-1">
                    <Zap className="w-4 h-4 fill-slate-950" />
                    {selectedItem.capacity}
                  </span>
                  <h3 className="text-lg font-black text-slate-900">
                    실제 현장 항공 시공 전경 사진
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content - High-Res Real Photo */}
              <div className="p-6 overflow-y-auto space-y-6">
                <div className="relative aspect-16/10 rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-slate-950 group">
                  <img
                    src={getItemImage(selectedItem)}
                    alt={selectedItem.capacity}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Photo Replacement Action */}
                  <label className="absolute bottom-3 right-3 bg-black/75 hover:bg-black/90 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer backdrop-blur-xs transition-all border border-white/20">
                    <Upload className="w-3.5 h-3.5 text-amber-300" />
                    <span>내 원본 사진 파일로 교체 ({selectedItem.capacity})</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(selectedItem.id, e)}
                    />
                  </label>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-sm">
                  <div className="flex items-center gap-2.5 text-slate-700">
                    <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                    <span><strong>위치:</strong> {selectedItem.location}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-700">
                    <Building className="w-4 h-4 text-amber-600 shrink-0" />
                    <span><strong>지붕 형태:</strong> {selectedItem.roofType}</span>
                  </div>
                  <div className="sm:col-span-2 flex items-center gap-2 text-emerald-700 font-bold bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>특허 무타공/밀착 누수방지 브라켓 & 포스코 POS-MAC 100% 적용 완료</span>
                  </div>
                </div>
              </div>

              {/* Modal Footer CTA */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                <label className="text-xs text-slate-500 font-bold flex items-center gap-1.5 cursor-pointer hover:text-amber-800">
                  <ImageIcon className="w-4 h-4 text-amber-600" />
                  <span>사진 파일 변경하기</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(selectedItem.id, e)}
                  />
                </label>
                
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedItem(null)}
                    className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-200/80 rounded-xl transition-colors cursor-pointer"
                  >
                    닫기
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedItem(null);
                      onOpenBooking();
                    }}
                    className="px-6 py-2.5 bg-linear-to-r from-amber-400 to-amber-300 text-slate-950 font-black text-sm rounded-xl shadow-md hover:from-amber-300 hover:to-orange-200 transition-all cursor-pointer"
                  >
                    우리 공장 무료 상담 신청하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-linear-to-r from-amber-400 via-amber-300 to-orange-300 hover:from-amber-300 hover:to-orange-200 text-slate-950 font-black text-base rounded-2xl shadow-lg shadow-amber-500/20 transition-all transform hover:scale-[1.02] cursor-pointer"
          >
            <span>우리 공장 지붕 설치 가능 여부 및 도면 무료 신청</span>
            <ArrowRight className="w-5 h-5 text-slate-950" />
          </button>
        </div>

      </div>
    </section>
  );
};

