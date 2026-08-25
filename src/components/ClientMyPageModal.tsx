import React, { useState } from 'react';
import { 
  X, 
  Search, 
  User, 
  Phone, 
  Lock, 
  Calendar, 
  MapPin, 
  AlertCircle, 
  Trash2,
  LogIn
} from 'lucide-react';
import type { ConsultationRequest } from '../types';
import { findConsultationsByPhoneAndPin, updateConsultation, loginWithGoogle, logoutUser, auth } from '../lib/firebase';
import { COMPANY_INFO } from '../data/portfolioData';
import { formatKoreanWon } from '../utils/calculator';

interface ClientMyPageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClientMyPageModal: React.FC<ClientMyPageModalProps> = ({ isOpen, onClose }) => {
  const [phone, setPhone] = useState<string>('');
  const [pin, setPin] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<ConsultationRequest[] | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [user, setUser] = useState(auth.currentUser);

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!phone.trim()) {
      setErrorMsg('예약 시 입력하신 연락처를 입력해 주세요.');
      return;
    }

    setIsLoading(true);
    try {
      const list = await findConsultationsByPhoneAndPin(phone, pin);
      if (list.length === 0) {
        setErrorMsg('일치하는 상담 예약 내역을 찾을 수 없습니다. 연락처와 4자리 비밀번호를 다시 확인해 주세요.');
      }
      setResults(list);
    } catch (err) {
      console.error(err);
      setErrorMsg('조회 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const u = await loginWithGoogle();
      setUser(u);
      if (u) {
        // Search by phone or email if any
        if (u.phoneNumber) {
          const list = await findConsultationsByPhoneAndPin(u.phoneNumber, '');
          setResults(list);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelBooking = async (id: string) => {
    if (!window.confirm('정말 이 상담 예약을 취소하시겠습니까?')) return;
    try {
      await updateConsultation(id, { status: 'cancelled' });
      setResults((prev) =>
        prev ? prev.map((item) => (item.id === id ? { ...item, status: 'cancelled' } : item)) : null
      );
      alert('예약이 취소 처리되었습니다.');
    } catch (err) {
      alert('취소 처리 중 오류가 발생했습니다.');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-800">신규 접수됨 (검토중)</span>;
      case 'contacted':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-amber-100 text-amber-900">담당자 배정 (연락완료)</span>;
      case 'scheduled':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-purple-100 text-purple-800">현장방문 실측예정</span>;
      case 'quoted':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-amber-100 text-amber-950 font-black border border-amber-300">맞춤 견적서 발송완료</span>;
      case 'contracted':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-linear-to-r from-amber-500 to-orange-500 text-white font-black">시공 계약체결</span>;
      case 'completed':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-slate-800 text-white">완료</span>;
      case 'cancelled':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-red-100 text-red-700">취소됨</span>;
      default:
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-slate-100 text-slate-700">{status}</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-amber-200 shadow-2xl animate-in zoom-in-95">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-amber-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">
                내 상담 예약 조회 및 관리
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                비회원 간편조회 또는 Google 계정 연동
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Google Auth Quick Header */}
        <div className="mt-4 p-3 bg-amber-50/40 rounded-xl border border-amber-200 flex items-center justify-between">
          {user ? (
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-slate-800">{user.displayName || user.email}</span>
              <span className="text-slate-400">로그인됨</span>
            </div>
          ) : (
            <span className="text-xs text-slate-600 font-medium">Google 계정으로 빠른 연동이 가능합니다.</span>
          )}
          {user ? (
            <button
              onClick={() => { logoutUser(); setUser(null); }}
              className="text-xs font-semibold text-slate-600 hover:text-red-600 cursor-pointer"
            >
              로그아웃
            </button>
          ) : (
            <button
              onClick={handleGoogleLogin}
              className="px-3 py-1.5 bg-white border border-amber-300 hover:bg-amber-50 text-xs font-bold text-slate-800 rounded-lg flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5 text-amber-600" />
              <span>Google 로그인</span>
            </button>
          )}
        </div>

        {/* Non-Member Search Form */}
        <form onSubmit={handleSearch} className="mt-5 p-5 bg-amber-50/20 rounded-2xl border border-amber-200 space-y-3">
          <h4 className="text-xs font-black text-amber-900 uppercase tracking-wider">
            비회원 간편 예약 조회
          </h4>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                예약 시 연락처 (휴대전화)
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-amber-600" />
                <input
                  type="tel"
                  placeholder="예: 01012345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                4자리 PIN 비밀번호 (선택)
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-amber-600" />
                <input
                  type="password"
                  maxLength={4}
                  placeholder="미설정시 뒷4자리 또는 빈칸"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                />
              </div>
            </div>
          </div>

          {errorMsg && (
            <div className="p-2.5 rounded-lg bg-red-50 text-red-700 text-xs flex items-center gap-1.5 font-bold">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Search className="w-3.5 h-3.5" />
            <span>{isLoading ? '조회 중...' : '예약 내역 조회하기'}</span>
          </button>
        </form>

        {/* Search Results List */}
        {results !== null && (
          <div className="mt-6 space-y-4">
            <h4 className="text-xs font-black text-slate-800">
              조회 결과 ({results.length}건)
            </h4>

            {results.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center">
                조회된 상담 예약 내역이 없습니다.
              </p>
            ) : (
              results.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-white border border-amber-200 shadow-xs space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-slate-900 text-sm">{item.companyName}</span>
                      <span className="text-xs text-slate-500">({item.name} 님)</span>
                    </div>
                    {getStatusBadge(item.status)}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-600" />
                      <span>예약일시: <strong className="text-slate-900">{item.preferredDate} {item.preferredTime}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-amber-600" />
                      <span>상담방식: <strong className="text-slate-900">
                        {item.consultationType === 'inspection' ? '현장조사 및 지붕실측' : item.consultationType === 'visit' ? '본사 방문' : '전화상담'}
                      </strong></span>
                    </div>
                    <div className="flex items-center gap-1.5 col-span-2">
                      <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>공장주소: {item.factoryAddress}</span>
                    </div>
                  </div>

                  {item.adminNotes && (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950">
                      <strong className="block font-black mb-0.5">에코샤인 담당자 피드백:</strong>
                      {item.adminNotes}
                    </div>
                  )}

                  {item.quotedAmount && (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 font-black flex justify-between items-center">
                      <span>예상 견적 금액</span>
                      <span className="text-base text-amber-900">{formatKoreanWon(item.quotedAmount)}</span>
                    </div>
                  )}

                  {item.status !== 'cancelled' && item.status !== 'completed' && (
                    <div className="pt-2 flex justify-end">
                      <button
                        type="button"
                        onClick={() => item.id && handleCancelBooking(item.id)}
                        className="text-xs text-red-600 hover:text-red-800 font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>예약 취소하기</span>
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>직통 문의: {COMPANY_INFO.mobile}</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl cursor-pointer"
          >
            닫기
          </button>
        </div>

      </div>
    </div>
  );
};
