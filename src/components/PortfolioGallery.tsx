import React, { useState, useEffect } from 'react';
import { Zap, ArrowRight, CheckCircle2, Maximize2, X, MapPin, Building, ShieldCheck, Upload, Image as ImageIcon, Sparkles } from 'lucide-react';
import { PORTFOLIO_LIST } from '../data/portfolioData';
import { subscribeToPortfolioItems, savePortfolioItem } from '../lib/firebase';
import { optimizeImageFile, FALLBACK_SOLAR_IMAGE } from '../utils/imageOptimizer';
import type { PortfolioItem } from '../types';

interface PortfolioGalleryProps {
  onOpenBooking: () => void;
}

const CUSTOM_IMAGES_STORAGE_KEY = 'ecoshine_portfolio_custom_images';

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ onOpenBooking }) => {
  const [items, setItems] = useState<PortfolioItem[]>(PORTFOLIO_LIST);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [customImages, setCustomImages] = useState<Record<string, string>>({});
  const [isProcessingImage, setIsProcessingImage] = useState<boolean>(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('ecoshine_admin_logged_in') === 'true';
    } catch {
      return false;
    }
  });

  // Subscribe to dynamic portfolio items
  useEffect(() => {
    const unsubscribe = subscribeToPortfolioItems((list) => {
      if (list && list.length > 0) {
        setItems(list.slice(0, 6)); // ensure max 6 items
      }
    });

    const handlePortfolioEvent = () => {
      try {
        const saved = localStorage.getItem('ecoshine_portfolio_custom_items');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setItems(parsed.slice(0, 6));
          }
        }
      } catch {
        // ignore
      }
    };

    window.addEventListener('ecoshine_portfolio_changed', handlePortfolioEvent);

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
      window.removeEventListener('ecoshine_portfolio_changed', handlePortfolioEvent);
    };
  }, []);

  // Check admin login state reactively
  useEffect(() => {
    const checkAdmin = () => {
      try {
        setIsAdminLoggedIn(sessionStorage.getItem('ecoshine_admin_logged_in') === 'true');
      } catch {
        setIsAdminLoggedIn(false);
      }
    };

    window.addEventListener('ecoshine_admin_auth_changed', checkAdmin);
    window.addEventListener('storage', checkAdmin);

    return () => {
      window.removeEventListener('ecoshine_admin_auth_changed', checkAdmin);
      window.removeEventListener('storage', checkAdmin);
    };
  }, []);

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

  const [dragOverId, setDragOverId] = useState<string | null>(null);

  const processFile = async (id: string, file: File) => {
    if (!file.type.startsWith('image/')) return;
    setIsProcessingImage(true);
    try {
      // Automatically compress and resize to optimized high-res JPEG under 200KB
      const optimizedBase64 = await optimizeImageFile(file, 1600, 1200, 0.85);
      if (optimizedBase64) {
        const updated = { ...customImages, [id]: optimizedBase64 };
        setCustomImages(updated);
        try {
          localStorage.setItem(CUSTOM_IMAGES_STORAGE_KEY, JSON.stringify(updated));
        } catch {
          // ignore
        }

        // Also sync to portfolio item object directly
        const targetItem = items.find((it) => it.id === id);
        if (targetItem) {
          await savePortfolioItem({ ...targetItem, imageUrl: optimizedBase64 });
        }
      }
    } catch (err) {
      console.warn('Image optimization failed:', err);
    } finally {
      setIsProcessingImage(false);
    }
  };

  const handleImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(id, file);
  };

  const handleCardDrop = (id: string, e: React.DragEvent) => {
    e.preventDefault();
    setDragOverId(null);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(id, file);
    }
  };

  const getItemImage = (item: PortfolioItem) => {
    if (item.imageUrl && item.imageUrl.trim().length > 10) {
      return item.imageUrl;
    }
    if (customImages[item.id] && customImages[item.id].trim().length > 10) {
      return customImages[item.id];
    }
    return FALLBACK_SOLAR_IMAGE;
  };

  return (
    <section id="portfolio" className="py-20 bg-linear-to-b from-amber-50/40 via-white to-orange-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-amber-900 bg-amber-100 px-3.5 py-1.5 rounded-full border border-amber-200 shadow-xs">
            <Zap className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
            <span>실제 시공 실적 (100~300kW+)</span>
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            (주)에코샤인 실제 지붕 시공 실적
          </h2>
          <p className="mt-3 text-base text-slate-600">
            실제 현장에 완공된 100~300kW 공장 지붕 태양광 발전소 실적 사진입니다.
          </p>
        </div>

        {/* Portfolio Cards Grid: 1 to 6 items */}
        <div className={`mt-12 grid gap-6 sm:gap-8 ${
          items.length <= 2 
            ? 'sm:grid-cols-2 max-w-4xl mx-auto' 
            : items.length === 4 
              ? 'sm:grid-cols-2 lg:grid-cols-2 max-w-5xl mx-auto' 
              : 'sm:grid-cols-2 lg:grid-cols-3'
        }`}>
          {items.map((item) => {
            const currentImg = getItemImage(item);
            const isDraggingThis = dragOverId === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOverId(item.id);
                }}
                onDragLeave={() => setDragOverId(null)}
                onDrop={(e) => handleCardDrop(item.id, e)}
                className={`bg-white rounded-2xl overflow-hidden border shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1 cursor-pointer ${
                  isDraggingThis ? 'ring-4 ring-amber-400 border-amber-500 scale-[1.02]' : 'border-amber-200/80'
                }`}
              >
                {/* Real Photo with overlay & prominent kW */}
                <div className="relative aspect-4/3 overflow-hidden bg-slate-800">
                  <img
                    src={currentImg}
                    alt={`${item.capacity} 시공 실적`}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    onError={(e) => {
                      const imgEl = e.currentTarget;
                      if (imgEl.src !== FALLBACK_SOLAR_IMAGE) {
                        imgEl.src = FALLBACK_SOLAR_IMAGE;
                      }
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Drag overlay indicator */}
                  {isDraggingThis && (
                    <div className="absolute inset-0 bg-amber-500/80 flex flex-col items-center justify-center text-slate-950 font-black text-sm z-20 gap-2 backdrop-blur-xs">
                      <Upload className="w-8 h-8 animate-bounce" />
                      <span>여기에 사진 파일을 놓으세요</span>
                    </div>
                  )}

                  {isProcessingImage && (
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-amber-300 font-bold text-xs z-30 gap-2 backdrop-blur-xs">
                      <Sparkles className="w-6 h-6 animate-spin text-amber-400" />
                      <span>사진 최적화 처리 중...</span>
                    </div>
                  )}

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
                  <span className="font-bold text-slate-700 flex items-center gap-1.5 truncate max-w-[200px]" title={item.roofType}>
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="truncate">{item.roofType || '공장 지붕 시공'}</span>
                  </span>
                  <span className="text-amber-900 font-black bg-white px-2.5 py-1 rounded-md border border-amber-200 shadow-2xs shrink-0">
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
                <div 
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOverId(`modal-${selectedItem.id}`);
                  }}
                  onDragLeave={() => setDragOverId(null)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOverId(null);
                    const file = e.dataTransfer.files?.[0];
                    if (file) processFile(selectedItem.id, file);
                  }}
                  className={`relative aspect-16/10 rounded-2xl overflow-hidden shadow-md border bg-slate-950 group ${
                    dragOverId === `modal-${selectedItem.id}` ? 'ring-4 ring-amber-400 border-amber-500' : 'border-slate-200'
                  }`}
                >
                  <img
                    src={getItemImage(selectedItem)}
                    alt={selectedItem.capacity}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const imgEl = e.currentTarget;
                      if (imgEl.src !== FALLBACK_SOLAR_IMAGE) {
                        imgEl.src = FALLBACK_SOLAR_IMAGE;
                      }
                    }}
                    className="w-full h-full object-cover"
                  />
                  
                  {dragOverId === `modal-${selectedItem.id}` && (
                    <div className="absolute inset-0 bg-amber-500/80 flex flex-col items-center justify-center text-slate-950 font-black text-base z-20 gap-2 backdrop-blur-xs">
                      <Upload className="w-10 h-10 animate-bounce" />
                      <span>여기에 새 사진 파일을 놓아 즉시 교체하세요</span>
                    </div>
                  )}

                  {/* Photo Replacement Action (Only visible when Admin is logged in) */}
                  {isAdminLoggedIn && (
                    <label className="absolute bottom-3 right-3 bg-black/80 hover:bg-black/95 text-amber-300 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer backdrop-blur-xs transition-all border border-amber-400/40 shadow-lg animate-in fade-in">
                      <Upload className="w-4 h-4 text-amber-300" />
                      <span>[관리자] 사진 올리기·교체 ({selectedItem.capacity})</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(selectedItem.id, e)}
                      />
                    </label>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-sm">
                  <div className="flex items-center gap-2.5 text-slate-700">
                    <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                    <span><strong>위치:</strong> {selectedItem.location || '국내 산업단지 공장'}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-700">
                    <Building className="w-4 h-4 text-amber-600 shrink-0" />
                    <span><strong>지붕 형태:</strong> {selectedItem.roofType || '공장 지붕'}</span>
                  </div>
                  {selectedItem.description && (
                    <div className="sm:col-span-2 text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200">
                      <strong>현장 개요:</strong> {selectedItem.description}
                    </div>
                  )}
                  <div className="sm:col-span-2 flex items-center gap-2 text-emerald-700 font-bold bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>특허 무타공/밀착 누수방지 브라켓 & 포스코 POS-MAC 100% 적용 완료</span>
                  </div>
                </div>
              </div>

              {/* Modal Footer CTA */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                {isAdminLoggedIn ? (
                  <label className="text-xs text-amber-900 bg-amber-100/90 hover:bg-amber-200 px-3.5 py-2 rounded-xl border border-amber-300 font-black flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs">
                    <ImageIcon className="w-4 h-4 text-amber-700" />
                    <span>[관리자] 사진 변경하기</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(selectedItem.id, e)}
                    />
                  </label>
                ) : (
                  <div className="text-xs text-slate-500 font-medium">
                    ※ (주)에코샤인 실제 준공 포트폴리오
                  </div>
                )}
                
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


