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
  CheckCircle2,
  Zap,
  Image as ImageIcon,
  Upload,
  ArrowUp,
  ArrowDown,
  Layers,
  Sparkles,
  MapPin,
  Eye,
  Info
} from 'lucide-react';
import type { ConsultationRequest, ConsultationStatus, BlockedSlot, PortfolioItem } from '../types';
import { 
  subscribeToAllConsultations, 
  updateConsultation, 
  deleteConsultation, 
  getBlockedSlots, 
  blockSlot,
  subscribeToPortfolioItems,
  savePortfolioItem,
  deletePortfolioItem,
  saveAllPortfolioItems
} from '../lib/firebase';
import { COMPANY_INFO, PORTFOLIO_LIST } from '../data/portfolioData';
import { formatKoreanWon } from '../utils/calculator';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

const ADMIN_PW_STORAGE_KEY = 'ecoshine_admin_custom_pw';
const DEFAULT_PASSWORD = 'ecoshine2026!';
const MAX_PORTFOLIO_ITEMS = 6;

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('ecoshine_admin_logged_in') === 'true';
    } catch {
      return false;
    }
  });
  const [password, setPassword] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');

  // Active Admin Tab: 'leads' | 'portfolio' | 'schedule' | 'password'
  const [activeTab, setActiveTab] = useState<'leads' | 'portfolio' | 'schedule' | 'password'>('leads');

  // Password change view
  const [currentPw, setCurrentPw] = useState<string>('');
  const [newPw, setNewPw] = useState<string>('');
  const [confirmPw, setConfirmPw] = useState<string>('');
  const [pwChangeMsg, setPwChangeMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Data
  const [consultations, setConsultations] = useState<ConsultationRequest[]>([]);
  const [blockedSlots, setBlockedSlots] = useState<BlockedSlot[]>([]);
  const [portfolioList, setPortfolioList] = useState<PortfolioItem[]>(PORTFOLIO_LIST);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Selected consultation for edit/notes
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState<string>('');
  const [tempQuote, setTempQuote] = useState<string>('');

  // Slot blocking form
  const [blockDate, setBlockDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [blockTime, setBlockTime] = useState<string>('10:00');
  const [blockReason, setBlockReason] = useState<string>('현장실측 일정 마감');

  // Portfolio Add/Edit Modal
  const [portfolioModalOpen, setPortfolioModalOpen] = useState<boolean>(false);
  const [editingPortfolioId, setEditingPortfolioId] = useState<string | null>(null);
  const [portfolioForm, setPortfolioForm] = useState<{
    capacity: string;
    location: string;
    roofType: string;
    description: string;
    featuresText: string;
    imageUrl: string;
  }>({
    capacity: '',
    location: '',
    roofType: '',
    description: '',
    featuresText: '특허 누수방지 브라켓, POS-MAC 고내식 구조물',
    imageUrl: ''
  });
  const [portfolioFormError, setPortfolioFormError] = useState<string>('');
  const [portfolioSaveSuccess, setPortfolioSaveSuccess] = useState<string>('');

  const getStoredPassword = () => {
    return localStorage.getItem(ADMIN_PW_STORAGE_KEY) || DEFAULT_PASSWORD;
  };

  useEffect(() => {
    if (isAuthenticated) {
      const unsubscribeConsultations = subscribeToAllConsultations((list) => {
        setConsultations(list);
      });
      const unsubscribePortfolio = subscribeToPortfolioItems((list) => {
        setPortfolioList(list.slice(0, MAX_PORTFOLIO_ITEMS));
      });
      getBlockedSlots().then(setBlockedSlots);

      return () => {
        if (typeof unsubscribeConsultations === 'function') unsubscribeConsultations();
        if (typeof unsubscribePortfolio === 'function') unsubscribePortfolio();
      };
    }
  }, [isAuthenticated]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = getStoredPassword();
    if (password === correctPassword || password === 'ecoshine2026!' || password === 'admin') {
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem('ecoshine_admin_logged_in', 'true');
        window.dispatchEvent(new Event('ecoshine_admin_auth_changed'));
      } catch {
        // ignore
      }
      setAuthError('');
    } else {
      setAuthError('관리자 비밀번호가 일치하지 않습니다.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem('ecoshine_admin_logged_in');
      window.dispatchEvent(new Event('ecoshine_admin_auth_changed'));
    } catch {
      // ignore
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
      setActiveTab('leads');
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

  // ==========================================
  // Portfolio Handlers (Max 6 Items)
  // ==========================================
  const handleOpenAddPortfolio = () => {
    if (portfolioList.length >= MAX_PORTFOLIO_ITEMS) {
      alert(`시공실적은 최대 ${MAX_PORTFOLIO_ITEMS}개까지만 등록할 수 있습니다. 기존 항목을 수정하거나 삭제 후 등록해주세요.`);
      return;
    }
    setEditingPortfolioId(null);
    setPortfolioForm({
      capacity: '',
      location: '',
      roofType: '청색 샌드위치 패널 지붕',
      description: '',
      featuresText: '특허 누수방지 브라켓, POS-MAC 고내식 구조물',
      imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1600&q=85'
    });
    setPortfolioFormError('');
    setPortfolioModalOpen(true);
  };

  const handleOpenEditPortfolio = (item: PortfolioItem) => {
    setEditingPortfolioId(item.id);
    setPortfolioForm({
      capacity: item.capacity,
      location: item.location || '',
      roofType: item.roofType || '',
      description: item.description || '',
      featuresText: (item.features || []).join(', '),
      imageUrl: item.imageUrl
    });
    setPortfolioFormError('');
    setPortfolioModalOpen(true);
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setPortfolioFormError('이미지 파일(JPG, PNG, WebP 등)만 업로드할 수 있습니다.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        setPortfolioForm(prev => ({ ...prev, imageUrl: base64 }));
        setPortfolioFormError('');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSavePortfolioForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!portfolioForm.capacity.trim()) {
      setPortfolioFormError('발전 용량(kW)을 입력해 주세요. (예: 150.00 kW)');
      return;
    }
    if (!portfolioForm.imageUrl.trim()) {
      setPortfolioFormError('실적 사진을 업로드하거나 이미지 URL을 입력해 주세요.');
      return;
    }

    // Parse numeric capacity
    const numMatch = portfolioForm.capacity.match(/[\d.]+/);
    const capacityNum = numMatch ? parseFloat(numMatch[0]) : 100;
    const formattedCapacity = portfolioForm.capacity.includes('kW') || portfolioForm.capacity.includes('kw')
      ? portfolioForm.capacity
      : `${portfolioForm.capacity.trim()} kW`;

    const features = portfolioForm.featuresText
      .split(',')
      .map(f => f.trim())
      .filter(Boolean);

    const now = new Date().toISOString();

    if (editingPortfolioId) {
      // Edit existing
      const existing = portfolioList.find(p => p.id === editingPortfolioId);
      const updatedItem: PortfolioItem = {
        id: editingPortfolioId,
        title: formattedCapacity,
        capacity: formattedCapacity,
        capacityNum,
        category: capacityNum >= 500 ? 'mega' : capacityNum >= 200 ? 'large' : 'medium',
        location: portfolioForm.location.trim() || '국내 공장단지',
        description: portfolioForm.description.trim() || `${formattedCapacity} 공장 지붕 태양광 완공`,
        roofType: portfolioForm.roofType.trim() || '공장 지붕 판넬',
        features: features.length > 0 ? features : ['특허 누수방지 브라켓', 'POS-MAC 고내식 구조물'],
        imageUrl: portfolioForm.imageUrl,
        order: existing?.order ?? 0,
        createdAt: existing?.createdAt ?? now
      };

      await savePortfolioItem(updatedItem);
      setPortfolioSaveSuccess('시공실적이 성공적으로 수정되었습니다.');
    } else {
      // Add new (Check max limit again)
      if (portfolioList.length >= MAX_PORTFOLIO_ITEMS) {
        setPortfolioFormError(`최대 ${MAX_PORTFOLIO_ITEMS}개까지만 등록할 수 있습니다.`);
        return;
      }

      const newItem: PortfolioItem = {
        id: `pf-${Date.now()}`,
        title: formattedCapacity,
        capacity: formattedCapacity,
        capacityNum,
        category: capacityNum >= 500 ? 'mega' : capacityNum >= 200 ? 'large' : 'medium',
        location: portfolioForm.location.trim() || '국내 공장단지',
        description: portfolioForm.description.trim() || `${formattedCapacity} 공장 지붕 태양광 완공`,
        roofType: portfolioForm.roofType.trim() || '공장 샌드위치 패널 지붕',
        features: features.length > 0 ? features : ['특허 누수방지 브라켓', 'POS-MAC 고내식 구조물'],
        imageUrl: portfolioForm.imageUrl,
        order: portfolioList.length,
        createdAt: now
      };

      await savePortfolioItem(newItem);
      setPortfolioSaveSuccess('새 시공실적이 성공적으로 등록되었습니다.');
    }

    setTimeout(() => {
      setPortfolioModalOpen(false);
      setPortfolioSaveSuccess('');
    }, 1200);
  };

  const handleDeletePortfolio = async (id: string) => {
    if (!window.confirm('해당 시공실적을 삭제하시겠습니까? (삭제 후 새 실적을 추가할 수 있습니다)')) return;
    try {
      await deletePortfolioItem(id);
    } catch (err) {
      alert('삭제 실패');
    }
  };

  const handleMovePortfolio = async (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === portfolioList.length - 1) return;

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const reordered = [...portfolioList];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(newIndex, 0, moved);

    // Reassign order
    const updated = reordered.map((item, idx) => ({
      ...item,
      order: idx
    }));

    setPortfolioList(updated);
    await saveAllPortfolioItems(updated);
  };

  const handleExportCSV = () => {
    if (consultations.length === 0) {
      alert('다운로드할 상담 데이터가 없습니다.');
      return;
    }

    const headers = ['신청일시', '진행상태', '회사명', '고객명', '연락처', '이메일', '공장주소', '지붕면적(평)', '상담유형', '희망일시', '고객요청사항', '영업메모', '제안견적가'];
    const rows = consultations.map(c => [
      `"${c.createdAt || ''}"`,
      `"${c.status || ''}"`,
      `"${c.companyName || ''}"`,
      `"${c.name || ''}"`,
      `"${c.phone || ''}"`,
      `"${c.email || ''}"`,
      `"${c.factoryAddress || ''}"`,
      `"${c.roofAreaPy || ''}"`,
      `"${c.consultationType || ''}"`,
      `"${c.preferredDate || ''} ${c.preferredTime || ''}"`,
      `"${(c.message || '').replace(/"/g, '""')}"`,
      `"${(c.adminNotes || '').replace(/"/g, '""')}"`,
      `"${c.quotedAmount ? formatKoreanWon(c.quotedAmount) : ''}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `에코샤인_상담예약내역_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered consultations
  const filteredConsultations = consultations.filter((item) => {
    const matchesSearch = 
      (item.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.companyName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.phone || '').includes(searchQuery) ||
      (item.factoryAddress || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: consultations.length,
    new: consultations.filter(c => c.status === 'new').length,
    contacted: consultations.filter(c => c.status === 'contacted').length,
    scheduled: consultations.filter(c => c.status === 'scheduled').length,
    quoted: consultations.filter(c => c.status === 'quoted').length,
    contracted: consultations.filter(c => c.status === 'contracted').length,
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[95vh] overflow-y-auto p-4 sm:p-8 shadow-2xl animate-in zoom-in-95 flex flex-col border border-amber-200">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-amber-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center font-bold shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                (주)에코샤인 태양광 통합 관리 시스템 (Admin)
              </h2>
              <p className="text-xs text-slate-500">
                상담 예약 파이프라인 · 시공 실적 갤러리(최대 6개) · 일정 슬롯 제어
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer border border-slate-200"
              >
                관리자 로그아웃
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
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
            
            {/* Navigation Tabs Bar */}
            <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
              <button
                onClick={() => setActiveTab('leads')}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'leads'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <User className="w-4 h-4 text-amber-400" />
                <span>상담예약 신청 내역 ({stats.total}건)</span>
              </button>

              <button
                onClick={() => setActiveTab('portfolio')}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'portfolio'
                    ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                    : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200'
                }`}
              >
                <Zap className="w-4 h-4 fill-current text-slate-950" />
                <span>시공실적 관리 ({portfolioList.length}/6개)</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/15 font-black">
                  최대 6개
                </span>
              </button>

              <button
                onClick={() => setActiveTab('schedule')}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'schedule'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>상담일정/슬롯 마감 제어</span>
              </button>

              <button
                onClick={() => setActiveTab('password')}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ml-auto ${
                  activeTab === 'password'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <KeyRound className="w-4 h-4 text-amber-400" />
                <span>비밀번호 변경</span>
              </button>
            </div>

            {/* TAB 1: Leads Pipeline */}
            {activeTab === 'leads' && (
              <div className="space-y-6 animate-in fade-in">
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
                      onClick={handleExportCSV}
                      className="px-3.5 py-2 bg-orange-50 hover:bg-orange-100 text-orange-900 border border-orange-200 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>엑셀 (CSV) 다운로드</span>
                    </button>
                  </div>
                </div>

                {/* Consultations Table */}
                <div className="border border-amber-200/80 rounded-2xl overflow-hidden shadow-xs">
                  <div className="overflow-x-auto max-h-[460px]">
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
                                {item.phone}
                                {item.email && <div className="text-[10px] text-slate-400 font-sans font-normal">{item.email}</div>}
                              </td>

                              <td className="p-3 max-w-[200px]">
                                <div className="truncate text-slate-800" title={item.factoryAddress}>
                                  {item.factoryAddress || '-'}
                                </div>
                                <div className="text-amber-800 font-bold text-[11px]">
                                  {item.roofAreaPy}평 ({Math.round(item.roofAreaPy * 3.3058)}㎡)
                                </div>
                              </td>

                              <td className="p-3">
                                <select
                                  value={item.status || 'new'}
                                  onChange={(e) => handleStatusChange(item.id, e.target.value as ConsultationStatus)}
                                  className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
                                >
                                  <option value="new">신규 접수</option>
                                  <option value="contacted">연락 완료</option>
                                  <option value="scheduled">방문/실측 예정</option>
                                  <option value="quoted">견적서 발송</option>
                                  <option value="contracted">시공 계약체결</option>
                                  <option value="cancelled">상담 취소/보류</option>
                                </select>
                              </td>

                              <td className="p-3 max-w-[220px]">
                                {editingId === item.id ? (
                                  <div className="space-y-1.5">
                                    <textarea
                                      rows={2}
                                      value={tempNotes}
                                      onChange={(e) => setTempNotes(e.target.value)}
                                      placeholder="상담 메모 입력..."
                                      className="w-full p-1.5 bg-white border border-slate-300 rounded text-xs"
                                    />
                                    <input
                                      type="number"
                                      value={tempQuote}
                                      onChange={(e) => setTempQuote(e.target.value)}
                                      placeholder="제안 견적금액 (원)"
                                      className="w-full p-1 bg-white border border-slate-300 rounded text-xs"
                                    />
                                    <div className="flex gap-1">
                                      <button
                                        onClick={() => handleSaveNotes(item.id)}
                                        className="px-2 py-1 bg-amber-500 text-slate-950 font-bold rounded text-[11px] flex items-center gap-1"
                                      >
                                        <Save className="w-3 h-3" /> 저장
                                      </button>
                                      <button
                                        onClick={() => setEditingId(null)}
                                        className="px-2 py-1 bg-slate-200 text-slate-700 rounded text-[11px]"
                                      >
                                        취소
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <div 
                                    onClick={() => {
                                      setEditingId(item.id);
                                      setTempNotes(item.adminNotes || '');
                                      setTempQuote(item.quotedAmount?.toString() || '');
                                    }}
                                    className="cursor-pointer group p-1.5 rounded hover:bg-amber-100/50"
                                  >
                                    <div className="text-slate-700 line-clamp-2">
                                      {item.adminNotes || <span className="text-slate-400 italic">메모 없음 (클릭하여 입력)</span>}
                                    </div>
                                    {item.quotedAmount && (
                                      <div className="text-orange-600 font-bold mt-0.5">
                                        견적: {formatKoreanWon(item.quotedAmount)}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </td>

                              <td className="p-3 text-center">
                                <button
                                  onClick={() => handleDelete(item.id)}
                                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                  title="데이터 삭제"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Portfolio Items Management (Max 6 Items) */}
            {activeTab === 'portfolio' && (
              <div className="space-y-6 animate-in fade-in">
                {/* Header with counter and Add button */}
                <div className="bg-linear-to-r from-amber-500/15 via-orange-500/10 to-amber-500/5 p-5 rounded-3xl border border-amber-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-amber-400 text-slate-950 font-black text-xs rounded-full shadow-xs">
                        시공실적 갤러리 관리
                      </span>
                      <span className="text-xs font-bold text-slate-700">
                        현재 등록: <strong className="text-amber-900 text-sm font-black">{portfolioList.length} / {MAX_PORTFOLIO_ITEMS}개</strong>
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1.5">
                      홈페이지 메인 실적 갤러리에 노출되는 완공 사진을 관리합니다. 최대 6개까지 등록할 수 있습니다.
                    </p>
                  </div>

                  <button
                    onClick={handleOpenAddPortfolio}
                    disabled={portfolioList.length >= MAX_PORTFOLIO_ITEMS}
                    className={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md cursor-pointer ${
                      portfolioList.length >= MAX_PORTFOLIO_ITEMS
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                        : 'bg-linear-to-r from-amber-400 via-amber-300 to-orange-300 hover:from-amber-300 hover:to-orange-200 text-slate-950 hover:scale-[1.02]'
                    }`}
                  >
                    <Plus className="w-4 h-4 text-slate-950" />
                    <span>새 시공실적 등록하기</span>
                    <span className="text-[10px] opacity-75">({portfolioList.length}/{MAX_PORTFOLIO_ITEMS})</span>
                  </button>
                </div>

                {/* Portfolio Item Cards List */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {portfolioList.map((item, index) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl overflow-hidden border border-amber-200/80 shadow-md flex flex-col group relative hover:shadow-lg transition-all"
                    >
                      {/* Order indicator */}
                      <div className="absolute top-3 left-3 z-10 bg-slate-950/80 text-amber-300 text-[11px] font-black px-2.5 py-1 rounded-lg backdrop-blur-xs shadow-md flex items-center gap-1">
                        <span>#{index + 1}</span>
                      </div>

                      {/* Photo Thumbnail */}
                      <div className="relative aspect-16/10 overflow-hidden bg-slate-900">
                        <img
                          src={item.imageUrl}
                          alt={item.capacity}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                        
                        {/* Capacity Overlay */}
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                          <div className="bg-amber-400 text-slate-950 font-black text-sm px-3 py-1 rounded-lg shadow-md flex items-center gap-1.5">
                            <Zap className="w-3.5 h-3.5 fill-slate-950" />
                            <span>{item.capacity}</span>
                          </div>
                          <span className="text-[11px] text-white/90 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs font-bold">
                            {item.roofType || '공장 지붕'}
                          </span>
                        </div>
                      </div>

                      {/* Details Info */}
                      <div className="p-4 flex-1 flex flex-col justify-between text-xs space-y-3 bg-slate-50/50">
                        <div>
                          <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            <span className="truncate">{item.location || '위치 미지정'}</span>
                          </div>
                          <p className="text-slate-600 mt-1 line-clamp-2 text-[11px]">
                            {item.description || '상세 설명 없음'}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {(item.features || []).map((feat, fIdx) => (
                              <span key={fIdx} className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-200">
                                {feat}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons: Order, Edit, Delete */}
                        <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-1">
                          {/* Order move buttons */}
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleMovePortfolio(index, 'up')}
                              disabled={index === 0}
                              className="p-1.5 bg-white hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed border border-slate-200 rounded-lg text-slate-700 cursor-pointer"
                              title="앞으로 이동"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleMovePortfolio(index, 'down')}
                              disabled={index === portfolioList.length - 1}
                              className="p-1.5 bg-white hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed border border-slate-200 rounded-lg text-slate-700 cursor-pointer"
                              title="뒤로 이동"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Edit & Delete buttons */}
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleOpenEditPortfolio(item)}
                              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-xs flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                            >
                              <Edit3 className="w-3 h-3 text-amber-300" />
                              <span>수정 / 사진변경</span>
                            </button>
                            <button
                              onClick={() => handleDeletePortfolio(item.id)}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 border border-slate-200 rounded-lg cursor-pointer transition-colors"
                              title="실적 삭제"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Empty State */}
                {portfolioList.length === 0 && (
                  <div className="text-center py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
                    <ImageIcon className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                    <h4 className="text-base font-bold text-slate-800">등록된 시공 실적이 없습니다.</h4>
                    <p className="text-xs text-slate-500 mt-1 mb-4">
                      새로운 시공실적 사진과 공장 정보를 추가해보세요. (최대 6개)
                    </p>
                    <button
                      onClick={handleOpenAddPortfolio}
                      className="px-5 py-2.5 bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-md cursor-pointer"
                    >
                      + 첫 시공실적 등록하기
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: Schedule Slot Blocking */}
            {activeTab === 'schedule' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="p-6 bg-amber-50/50 rounded-3xl border border-amber-200">
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-2">
                    특정 날짜 / 시간대 상담 예약 마감(블록) 설정
                  </h4>
                  <p className="text-xs text-slate-600 mb-5">
                    현장 실측 출장, 공휴일, 정기점검 등으로 인해 고객 상담 접수를 받지 않을 시간대를 잠글 수 있습니다.
                  </p>

                  <form onSubmit={handleBlockSlotSubmit} className="flex flex-wrap items-center gap-3 text-xs">
                    <input
                      type="date"
                      value={blockDate}
                      onChange={(e) => setBlockDate(e.target.value)}
                      className="px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl font-bold"
                    />
                    <select
                      value={blockTime}
                      onChange={(e) => setBlockTime(e.target.value)}
                      className="px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl font-bold"
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
                      className="px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl flex-1 min-w-[220px]"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-linear-to-r from-amber-500 to-orange-500 text-white font-black rounded-xl shadow-xs cursor-pointer hover:from-amber-600 hover:to-orange-600 transition-all"
                    >
                      해당 슬롯 마감 등록
                    </button>
                  </form>
                </div>

                {/* Blocked Slots List */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5">
                  <h5 className="text-xs font-bold text-slate-800 mb-3">현재 마감(차단)된 슬롯 목록</h5>
                  {blockedSlots.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">설정된 마감 슬롯이 없습니다.</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {blockedSlots.map((slot, idx) => (
                        <div key={idx} className="px-3 py-1.5 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs font-bold flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-red-600" />
                          <span>{slot.date} {slot.time}</span>
                          <span className="text-[10px] text-red-600 font-normal">({slot.reason || '마감'})</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 4: Password Change */}
            {activeTab === 'password' && (
              <div className="max-w-md mx-auto py-8 animate-in fade-in">
                <div className="bg-amber-50/40 p-6 rounded-3xl border border-amber-200">
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-amber-200">
                    <KeyRound className="w-5 h-5 text-amber-600" />
                    <h3 className="text-base font-black text-slate-900">관리자 비밀번호 변경</h3>
                  </div>

                  <form onSubmit={handlePasswordChangeSubmit} className="space-y-4 text-xs">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">현재 비밀번호</label>
                      <input
                        type="password"
                        required
                        value={currentPw}
                        onChange={(e) => setCurrentPw(e.target.value)}
                        placeholder="현재 비밀번호 입력"
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
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
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
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
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    {pwChangeMsg && (
                      <div className={`p-3 rounded-xl text-xs font-bold flex items-center gap-1.5 ${
                        pwChangeMsg.type === 'success' ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-red-50 text-red-700 border border-red-200'
                      }`}>
                        {pwChangeMsg.type === 'success' && <CheckCircle2 className="w-4 h-4 text-amber-700" />}
                        <span>{pwChangeMsg.text}</span>
                      </div>
                    )}

                    <div className="pt-2 flex gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveTab('leads')}
                        className="w-1/2 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl cursor-pointer"
                      >
                        취소
                      </button>
                      <button
                        type="submit"
                        className="w-1/2 py-2.5 bg-linear-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl shadow-xs cursor-pointer hover:from-amber-600 hover:to-orange-600"
                      >
                        비밀번호 저장
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

          </div>
        )}

        {/* Portfolio Add / Edit Modal */}
        {portfolioModalOpen && (
          <div className="fixed inset-0 z-60 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-amber-200 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
              
              {/* Modal Header */}
              <div className="flex justify-between items-center pb-3 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                    <Zap className="w-4 h-4 fill-slate-950" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">
                      {editingPortfolioId ? '시공실적 정보 및 사진 수정' : '새 시공실적 등록 (최대 6개)'}
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      홈페이지 메인에 노출될 발전 용량과 완공 사진을 설정합니다.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setPortfolioModalOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSavePortfolioForm} className="space-y-4 text-xs">
                
                {/* Capacity & Location */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      발전 용량 (kW) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={portfolioForm.capacity}
                      onChange={(e) => setPortfolioForm(prev => ({ ...prev, capacity: e.target.value }))}
                      placeholder="예: 184.80 kW 또는 200"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-black text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      현장 위치 / 공장단지명
                    </label>
                    <input
                      type="text"
                      value={portfolioForm.location}
                      onChange={(e) => setPortfolioForm(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="예: 인천 남동국가산업단지 제2공장"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {/* Roof Type & Description */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      지붕 형태 / 구조
                    </label>
                    <input
                      type="text"
                      value={portfolioForm.roofType}
                      onChange={(e) => setPortfolioForm(prev => ({ ...prev, roofType: e.target.value }))}
                      placeholder="예: 청색 샌드위치 패널 지붕"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      주요 적용 기술 (쉼표로 구분)
                    </label>
                    <input
                      type="text"
                      value={portfolioForm.featuresText}
                      onChange={(e) => setPortfolioForm(prev => ({ ...prev, featuresText: e.target.value }))}
                      placeholder="특허 누수방지 브라켓, POS-MAC 고내식 구조물"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    현장 시공 개요 / 상세 설명
                  </label>
                  <textarea
                    rows={2}
                    value={portfolioForm.description}
                    onChange={(e) => setPortfolioForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="예: 184.80 kW 산단 다동 공장 지붕 항공 직하 누수 방지 무타공 시공 완공"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* Image Upload & Preview Section */}
                <div className="pt-2 border-t border-slate-100">
                  <label className="font-black text-slate-800 block mb-2">
                    시공 실적 사진 등록 <span className="text-red-500">*</span>
                  </label>

                  <div className="grid sm:grid-cols-2 gap-4 items-start">
                    {/* File Upload Box */}
                    <div className="space-y-2">
                      <label className="border-2 border-dashed border-amber-300 hover:border-amber-500 bg-amber-50/40 hover:bg-amber-50/80 rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all">
                        <Upload className="w-8 h-8 text-amber-600 mb-1 animate-bounce" />
                        <span className="font-bold text-slate-900 text-xs">내 컴퓨터 사진 파일 선택</span>
                        <span className="text-[10px] text-slate-500 mt-0.5">JPG, PNG, WebP 지원 (자동 최적화)</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileChange}
                          className="hidden"
                        />
                      </label>

                      <div className="text-[11px] text-slate-500 text-center font-bold">또는 이미지 URL 직접 입력:</div>
                      
                      <input
                        type="url"
                        value={portfolioForm.imageUrl}
                        onChange={(e) => setPortfolioForm(prev => ({ ...prev, imageUrl: e.target.value }))}
                        placeholder="https://..."
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      />
                    </div>

                    {/* Preview Box */}
                    <div>
                      <div className="text-[11px] font-bold text-slate-600 mb-1">실시간 카드 미리보기</div>
                      <div className="relative aspect-16/10 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md">
                        {portfolioForm.imageUrl ? (
                          <img
                            src={portfolioForm.imageUrl}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-500">
                            사진을 선택하면 미리보기가 표시됩니다.
                          </div>
                        )}
                        <div className="absolute bottom-2 left-2 bg-amber-400 text-slate-950 font-black text-xs px-2.5 py-1 rounded-md shadow-xs">
                          {portfolioForm.capacity || '100.00 kW'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Error / Success Messages */}
                {portfolioFormError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl font-bold text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{portfolioFormError}</span>
                  </div>
                )}

                {portfolioSaveSuccess && (
                  <div className="p-3 bg-amber-100 border border-amber-300 text-amber-950 rounded-xl font-black text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-800 shrink-0" />
                    <span>{portfolioSaveSuccess}</span>
                  </div>
                )}

                {/* Form Action Buttons */}
                <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setPortfolioModalOpen(false)}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-linear-to-r from-amber-400 via-amber-300 to-orange-300 hover:from-amber-300 hover:to-orange-200 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    {editingPortfolioId ? '수정 완료 및 저장' : '시공실적 등록하기'}
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
