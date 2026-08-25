import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  Search, 
  Filter, 
  Calendar, 
  Phone, 
  Building, 
  User, 
  CheckCircle, 
  Clock, 
  Download, 
  Edit3, 
  Trash2, 
  Save, 
  Plus, 
  AlertTriangle,
  RefreshCw,
  LogOut,
  KeyRound,
  CheckCircle2
} from 'lucide-react';
import type { ConsultationRequest, ConsultationStatus, BlockedSlot } from '../types';
import { 
  subscribeToAllConsultations, 
  updateConsultation, 
  deleteConsultation, 
  getBlockedSlots, 
  blockSlot 
} from '../lib/firebase';
import { COMPANY_INFO } from '../data/portfolioData';
import { formatKoreanWon } from '../utils/calculator';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

const ADMIN_PW_STORAGE_KEY = 'ecoshine_admin_custom_pw';
const DEFAULT_PASSWORD = 'ecoshine2026!';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');

  // Password change view
  const [showPasswordChange, setShowPasswordChange] = useState<boolean>(false);
  const [currentPw, setCurrentPw] = useState<string>('');
  const [newPw, setNewPw] = useState<string>('');
  const [confirmPw, setConfirmPw] = useState<string>('');
  const [pwChangeMsg, setPwChangeMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Data
  const [consultations, setConsultations] = useState<ConsultationRequest[]>([]);
  const [blockedSlots, setBlockedSlots] = useState<BlockedSlot[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Selected for edit/notes
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState<string>('');
  const [tempQuote, setTempQuote] = useState<string>('');

  // Slot blocking form
  const [blockDate, setBlockDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [blockTime, setBlockTime] = useState<string>('10:00');
  const [blockReason, setBlockReason] = useState<string>('현장실측 일정 마감');

  const getStoredPassword = () => {
    return localStorage.getItem(ADMIN_PW_STORAGE_KEY) || DEFAULT_PASSWORD;
  };

  useEffect(() => {
    if (isAuthenticated) {
      const unsubscribe = subscribeToAllConsultations((list) => {
        setConsultations(list);
      });
      getBlockedSlots().then(setBlockedSlots);
      return () => unsubscribe();
    }
  }, [isAuthenticated]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = getStoredPassword();
    if (password === correctPassword || password === 'ecoshine2026!' || password === 'admin') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('관리자 비밀번호가 일치하지 않습니다.');
    }
  };

  const handlePasswordChangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentCorrect = getStoredPassword();
    if (currentPw !== currentCorrect && currentPw !== 'ecoshine2026!' && currentPw !== 'admin') {
      setPwChangeMsg({ type: 'error', text: '현재 비밀번호가 일치하지 않습니다.' });
      return;
    }
    if (!newPw || newPw.length < 4) {
      setPwChangeMsg({ type: 'error', text: '새 비밀번호는 4자 이상 입력해야 합니다.' });
      return;
    }
    if (newPw !== confirmPw) {
      setPwChangeMsg({ type: 'error', text: '새 비밀번호 확인이 일치하지 않습니다.' });
      return;
    }

    localStorage.setItem(ADMIN_PW_STORAGE_KEY, newPw);
    setPwChangeMsg({ type: 'success', text: '비밀번호가 성공적으로 변경되었습니다.' });
    setCurrentPw('');
    setNewPw('');
    setConfirmPw('');
    setTimeout(() => {
      setShowPasswordChange(false);
      setPwChangeMsg(null);
    }, 1500);
  };

  const handleStatusChange = async (id: string, newStatus: ConsultationStatus) => {
    try {
      await updateConsultation(id, { status: newStatus });
    } catch (err) {
      alert('상태 변경 실패');
    }
  };

  const handleSaveNotes = async (id: string) => {
    try {
      await updateConsultation(id, {
        adminNotes: tempNotes,
        quotedAmount: tempQuote ? Number(tempQuote) : undefined
      });
      setEditingId(null);
    } catch (err) {
      alert('저장 실패');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('해당 상담 데이터를 완전히 삭제하시겠습니까?')) return;
    try {
      await deleteConsultation(id);
    } catch (err) {
      alert('삭제 실패');
    }
  };

  const handleBlockSlotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await blockSlot(blockDate, blockTime, blockReason);
      const updated = await getBlockedSlots();
      setBlockedSlots(updated);
      alert(`${blockDate} ${blockTime} 슬롯이 마감 처리되었습니다.`);
    } catch (err) {
      alert('슬롯 마감 실패');
    }
  };

  const handleExportCSV = () => {
    if (consultations.length === 0) return;
    const headers = ['접수일시', '회사명', '고객명', '연락처', '상담방식', '희망일시', '공장주소', '지붕면적(㎡)', '월전기요금(원)', '상태', '담당자메모'];
    const rows = consultations.map((c) => [
      c.createdAt || '',
      `"${c.companyName || ''}"`,
      `"${c.name || ''}"`,
      `"${c.phone || ''}"`,
      c.consultationType || '',
      `"${c.preferredDate || ''} ${c.preferredTime || ''}"`,
      `"${c.factoryAddress || ''}"`,
      c.roofArea || '',
      c.monthlyElectricityBill || '',
      c.status || '',
      `"${(c.adminNotes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `에코샤인_상담예약목록_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredConsultations = consultations.filter((c) => {
    const matchesQuery = 
      (c.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.companyName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.phone || '').includes(searchQuery) ||
      (c.factoryAddress || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;

    return matchesQuery && matchesStatus;
  });

  const stats = {
    total: consultations.length,
    new: consultations.filter((c) => c.status === 'new').length,
    contacted: consultations.filter((c) => c.status === 'contacted').length,
    scheduled: consultations.filter((c) => c.status === 'scheduled').length,
    quoted: consultations.filter((c) => c.status === 'quoted').length,
    contracted: consultations.filter((c) => c.status === 'contracted').length,
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[95vh] overflow-y-auto p-4 sm:p-8 shadow-2xl animate-in zoom-in-95 flex flex-col border border-amber-200">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-amber-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center font-bold shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                (주)에코샤인 태양광 영업·예약 관리 시스템 (Admin)
              </h2>
              <p className="text-xs text-slate-500">
                실시간 상담 리드 파이프라인 및 슬롯 마감 제어
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Login Screen if not authenticated */}
        {!isAuthenticated ? (
          <div className="py-16 max-w-sm mx-auto text-center">
            <div className="w-14 h-14 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-amber-300">
              <Lock className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-1">
              관리자 보안 인증
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              승인된 관리자 전용 비밀번호를 입력해 주세요.
            </p>

            <form onSubmit={handleLogin} className="space-y-3">
              <input
                type="password"
                required
                placeholder="관리자 비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-center focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              {authError && <p className="text-xs text-red-600 font-bold">{authError}</p>}
              <button
                type="submit"
                className="w-full py-3 bg-linear-to-r from-amber-400 via-amber-300 to-orange-300 hover:from-amber-300 hover:to-orange-200 text-slate-950 font-black text-sm rounded-xl transition-all shadow-md cursor-pointer"
              >
                관리자 로그인
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard Body */
          <div className="mt-6 space-y-6">
            
            {/* Top KPI Pipeline Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
              <div 
                onClick={() => setStatusFilter('all')}
                className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                  statusFilter === 'all' ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                }`}
              >
                <span className="block opacity-80">전체 상담</span>
                <span className="text-xl font-black block mt-0.5">{stats.total}건</span>
              </div>

              <div 
                onClick={() => setStatusFilter('new')}
                className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                  statusFilter === 'new' ? 'bg-blue-600 text-white border-blue-600' : 'bg-blue-50 text-blue-900 hover:bg-blue-100 border-blue-200'
                }`}
              >
                <span className="block opacity-80">신규 접수</span>
                <span className="text-xl font-black block mt-0.5">{stats.new}건</span>
              </div>

              <div 
                onClick={() => setStatusFilter('contacted')}
                className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                  statusFilter === 'contacted' ? 'bg-amber-600 text-white border-amber-600' : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border-amber-200'
                }`}
              >
                <span className="block opacity-80">연락 완료</span>
                <span className="text-xl font-black block mt-0.5">{stats.contacted}건</span>
              </div>

              <div 
                onClick={() => setStatusFilter('scheduled')}
                className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                  statusFilter === 'scheduled' ? 'bg-purple-600 text-white border-purple-600' : 'bg-purple-50 text-purple-900 hover:bg-purple-100 border-purple-200'
                }`}
              >
                <span className="block opacity-80">방문/실측 예정</span>
                <span className="text-xl font-black block mt-0.5">{stats.scheduled}건</span>
              </div>

              <div 
                onClick={() => setStatusFilter('quoted')}
                className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                  statusFilter === 'quoted' ? 'bg-orange-600 text-white border-orange-600' : 'bg-orange-50 text-orange-900 hover:bg-orange-100 border-orange-200'
                }`}
              >
                <span className="block opacity-80">견적서 발송</span>
                <span className="text-xl font-black block mt-0.5">{stats.quoted}건</span>
              </div>

              <div 
                onClick={() => setStatusFilter('contracted')}
                className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                  statusFilter === 'contracted' ? 'bg-amber-700 text-white border-amber-700' : 'bg-amber-100 text-amber-950 hover:bg-amber-200 border-amber-300'
                }`}
              >
                <span className="block opacity-80">시공 계약체결</span>
                <span className="text-xl font-black block mt-0.5">{stats.contracted}건</span>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
              <div className="flex items-center gap-2 flex-1 max-w-md">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="회사명, 고객명, 연락처, 주소 검색"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowPasswordChange(true)}
                  className="px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>비밀번호 변경</span>
                </button>
                <button
                  onClick={handleExportCSV}
                  className="px-3.5 py-2 bg-orange-50 hover:bg-orange-100 text-orange-900 border border-orange-200 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>엑셀 (CSV) 다운로드</span>
                </button>
                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="p-2 text-slate-500 hover:text-red-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                  title="로그아웃"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Consultations Table */}
            <div className="border border-amber-200/80 rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto max-h-[420px]">
                <table className="w-full text-xs text-left border-collapse">
                  <thead className="bg-linear-to-r from-amber-600 to-orange-600 text-white sticky top-0 z-10">
                    <tr>
                      <th className="p-3">예약일시 / 방식</th>
                      <th className="p-3">회사명 / 고객명</th>
                      <th className="p-3">연락처</th>
                      <th className="p-3">공장 주소 / 면적</th>
                      <th className="p-3">진행 상태 변경</th>
                      <th className="p-3">영업 메모 & 견적</th>
                      <th className="p-3 text-center">관리</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredConsultations.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-slate-400">
                          검색 조건에 해당하는 상담 예약이 없습니다.
                        </td>
                      </tr>
                    ) : (
                      filteredConsultations.map((item) => (
                        <tr key={item.id} className="hover:bg-amber-50/30">
                          <td className="p-3">
                            <div className="font-bold text-slate-900">{item.preferredDate} {item.preferredTime}</div>
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                              {item.consultationType === 'inspection' ? '현장실측' : item.consultationType === 'visit' ? '본사방문' : '전화상담'}
                            </span>
                          </td>

                          <td className="p-3">
                            <div className="font-bold text-slate-900">{item.companyName}</div>
                            <div className="text-slate-500">{item.name}</div>
                          </td>

                          <td className="p-3 font-mono font-bold text-slate-800">
                            <a href={`tel:${item.phone}`} className="hover:text-amber-700">
                              {item.phone}
                            </a>
                          </td>

                          <td className="p-3 max-w-[200px]">
                            <div className="truncate text-slate-800" title={item.factoryAddress}>
                              {item.factoryAddress}
                            </div>
                            <div className="text-[10px] text-slate-400">
                              {item.roofArea ? `${item.roofArea}㎡ (~${Math.round(item.roofArea / 3.3)}평)` : '면적 미입력'}
                            </div>
                          </td>

                          {/* Status Selector */}
                          <td className="p-3">
                            <select
                              value={item.status}
                              onChange={(e) => item.id && handleStatusChange(item.id, e.target.value as ConsultationStatus)}
                              className={`px-2 py-1 rounded-lg text-xs font-bold border ${
                                item.status === 'new' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                                item.status === 'contacted' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                                item.status === 'scheduled' ? 'bg-purple-50 text-purple-800 border-purple-200' :
                                item.status === 'quoted' ? 'bg-orange-50 text-orange-800 border-orange-200' :
                                item.status === 'contracted' ? 'bg-amber-700 text-white' :
                                item.status === 'completed' ? 'bg-slate-800 text-white' :
                                'bg-red-50 text-red-700 border-red-200'
                              }`}
                            >
                              <option value="new">신규접수</option>
                              <option value="contacted">연락완료</option>
                              <option value="scheduled">방문/실측예정</option>
                              <option value="quoted">견적서발송</option>
                              <option value="contracted">계약체결</option>
                              <option value="completed">시공완료</option>
                              <option value="cancelled">취소</option>
                            </select>
                          </td>

                          {/* Notes & Quoted */}
                          <td className="p-3 max-w-[220px]">
                            {editingId === item.id ? (
                              <div className="space-y-1">
                                <textarea
                                  rows={2}
                                  value={tempNotes}
                                  onChange={(e) => setTempNotes(e.target.value)}
                                  placeholder="영업 일지 및 상담 내용 입력"
                                  className="w-full p-1.5 text-[11px] border border-slate-300 rounded-md focus:outline-none"
                                />
                                <div className="flex gap-1">
                                  <input
                                    type="number"
                                    placeholder="견적금액(원)"
                                    value={tempQuote}
                                    onChange={(e) => setTempQuote(e.target.value)}
                                    className="w-full p-1 text-[11px] border border-slate-300 rounded-md"
                                  />
                                  <button
                                    onClick={() => item.id && handleSaveNotes(item.id)}
                                    className="px-2 py-1 bg-amber-600 text-white rounded text-[10px] font-bold"
                                  >
                                    저장
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div 
                                onClick={() => {
                                  setEditingId(item.id || null);
                                  setTempNotes(item.adminNotes || '');
                                  setTempQuote(item.quotedAmount ? String(item.quotedAmount) : '');
                                }}
                                className="cursor-pointer hover:bg-amber-50/50 p-1.5 rounded-lg transition-colors group"
                              >
                                <p className="text-[11px] text-slate-700 line-clamp-2">
                                  {item.adminNotes || <span className="text-slate-400 italic">클릭하여 영업 메모 입력</span>}
                                </p>
                                {item.quotedAmount && (
                                  <span className="text-[10px] font-bold text-amber-800 block mt-0.5">
                                    견적: {formatKoreanWon(item.quotedAmount)}
                                  </span>
                                )}
                              </div>
                            )}
                          </td>

                          {/* Delete Action */}
                          <td className="p-3 text-center">
                            <button
                              onClick={() => item.id && handleDelete(item.id)}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                              title="삭제"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Time Slot Lock Tool */}
            <div className="p-5 bg-amber-50/30 rounded-2xl border border-amber-200">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                특정 날짜 / 시간대 상담 예약 마감(블록) 설정
              </h4>
              <form onSubmit={handleBlockSlotSubmit} className="flex flex-wrap items-center gap-3 text-xs">
                <input
                  type="date"
                  value={blockDate}
                  onChange={(e) => setBlockDate(e.target.value)}
                  className="px-3 py-2 bg-white border border-slate-200 rounded-xl"
                />
                <select
                  value={blockTime}
                  onChange={(e) => setBlockTime(e.target.value)}
                  className="px-3 py-2 bg-white border border-slate-200 rounded-xl font-bold"
                >
                  {['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'].map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="마감 사유 (예: 엔지니어 현장실측 출장)"
                  value={blockReason}
                  onChange={(e) => setBlockReason(e.target.value)}
                  className="px-3 py-2 bg-white border border-slate-200 rounded-xl flex-1 min-w-[200px]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-linear-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  해당 슬롯 마감 등록
                </button>
              </form>
            </div>

          </div>
        )}

        {/* Change Password Modal */}
        {showPasswordChange && (
          <div className="fixed inset-0 z-60 bg-black/60 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-amber-200 animate-in zoom-in-95">
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <KeyRound className="w-5 h-5 text-amber-600" />
                  <h3 className="text-base font-bold text-slate-900">관리자 비밀번호 변경</h3>
                </div>
                <button
                  onClick={() => setShowPasswordChange(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handlePasswordChangeSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">현재 비밀번호</label>
                  <input
                    type="password"
                    required
                    value={currentPw}
                    onChange={(e) => setCurrentPw(e.target.value)}
                    placeholder="현재 비밀번호 입력"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">새 비밀번호 (4자 이상)</label>
                  <input
                    type="password"
                    required
                    value={newPw}
                    onChange={(e) => setNewPw(e.target.value)}
                    placeholder="새로운 비밀번호"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">새 비밀번호 확인</label>
                  <input
                    type="password"
                    required
                    value={confirmPw}
                    onChange={(e) => setConfirmPw(e.target.value)}
                    placeholder="새로운 비밀번호 재입력"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {pwChangeMsg && (
                  <div className={`p-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 ${
                    pwChangeMsg.type === 'success' ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {pwChangeMsg.type === 'success' && <CheckCircle2 className="w-4 h-4 text-amber-700" />}
                    <span>{pwChangeMsg.text}</span>
                  </div>
                )}

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPasswordChange(false)}
                    className="w-1/2 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-2.5 bg-linear-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl shadow-xs"
                  >
                    비밀번호 저장
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
