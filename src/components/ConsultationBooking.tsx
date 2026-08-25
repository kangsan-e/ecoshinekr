import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  Phone, 
  MapPin, 
  Building, 
  User, 
  CheckCircle2, 
  Lock, 
  AlertCircle, 
  Send
} from 'lucide-react';
import type { 
  ConsultationType, 
  FactoryType, 
  InterestType, 
  BlockedSlot 
} from '../types';
import { createConsultation, getBlockedSlots } from '../lib/firebase';
import { COMPANY_INFO } from '../data/portfolioData';

interface ConsultationBookingProps {
  initialData?: {
    address?: string;
    roofArea?: number;
    monthlyBill?: number;
    factoryType?: FactoryType;
    interest?: InterestType;
    estimatedKw?: number;
    consultationType?: ConsultationType;
  };
  onSuccessBooking?: (bookingId: string) => void;
}

export const ConsultationBooking: React.FC<ConsultationBookingProps> = ({
  initialData,
  onSuccessBooking,
}) => {
  // Booking Form State
  const [consultationType, setConsultationType] = useState<ConsultationType>(
    initialData?.consultationType || 'inspection'
  );
  
  // Date selection (default: tomorrow or upcoming business day)
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    // if Sunday, skip to Monday
    if (d.getDay() === 0) d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });

  const [selectedTime, setSelectedTime] = useState<string>('10:00');
  
  // Customer Info State
  const [name, setName] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [factoryAddress, setFactoryAddress] = useState<string>(initialData?.address || '');
  const [monthlyBill, setMonthlyBill] = useState<number>(initialData?.monthlyBill || 5000000);
  const [roofArea, setRoofArea] = useState<number>(initialData?.roofArea || 990); // ~300 py
  const [factoryType, setFactoryType] = useState<FactoryType>(initialData?.factoryType || 'owned');
  const [interest, setInterest] = useState<InterestType>(initialData?.interest || 'power_business');
  const [notes, setNotes] = useState<string>('');
  const [clientPin, setClientPin] = useState<string>('');
  const [privacyAgreed, setPrivacyAgreed] = useState<boolean>(true);

  // Status & Blocked Slots
  const [blockedSlots, setBlockedSlots] = useState<BlockedSlot[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<{ id: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Synchronize when initialData changes from calculator
  useEffect(() => {
    if (initialData) {
      if (initialData.address) setFactoryAddress(initialData.address);
      if (initialData.roofArea) setRoofArea(initialData.roofArea);
      if (initialData.monthlyBill) setMonthlyBill(initialData.monthlyBill);
      if (initialData.factoryType) setFactoryType(initialData.factoryType);
      if (initialData.interest) setInterest(initialData.interest);
    }
  }, [initialData]);

  // Load blocked slots from Firestore
  useEffect(() => {
    getBlockedSlots().then(setBlockedSlots).catch(console.warn);
  }, []);

  const timeSlots = [
    '09:00',
    '10:00',
    '11:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00'
  ];

  const isSlotBlocked = (date: string, time: string) => {
    return blockedSlots.some((slot) => slot.date === date && slot.time === time);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('고객명(담당자 이름)을 입력해 주세요.');
      return;
    }
    if (!companyName.trim()) {
      setErrorMsg('회사명(공장/법인명)을 입력해 주세요.');
      return;
    }
    if (!phone.trim() || phone.length < 9) {
      setErrorMsg('연락처(휴대전화 번호)를 정확히 입력해 주세요.');
      return;
    }
    if (!factoryAddress.trim()) {
      setErrorMsg('공장 주소를 입력해 주세요.');
      return;
    }
    if (!privacyAgreed) {
      setErrorMsg('개인정보 수집 및 이용에 동의해 주세요.');
      return;
    }
    if (isSlotBlocked(selectedDate, selectedTime)) {
      setErrorMsg('선택하신 시간대는 이미 예약이 마감되었습니다. 다른 시간을 선택해 주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      const pin = clientPin.trim() || phone.slice(-4);
      const bookingId = await createConsultation({
        name,
        companyName,
        phone,
        factoryAddress,
        preferredDate: selectedDate,
        preferredTime: selectedTime,
        consultationType,
        roofArea: Number(roofArea) || undefined,
        monthlyElectricityBill: Number(monthlyBill) || undefined,
        factoryType,
        interest,
        notes: notes.trim() || undefined,
        clientPin: pin,
      });

      setSubmissionSuccess({ id: bookingId });
      if (onSuccessBooking) onSuccessBooking(bookingId);
    } catch (err: any) {
      console.error('Booking submission error:', err);
      setErrorMsg('예약 접수 중 오류가 발생했습니다. 잠시 후 다시 시도하시거나 대표번호(010-7750-5385)로 전화 부탁드립니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="py-20 bg-amber-50/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-black uppercase tracking-widest text-amber-950 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
            ONLINE APPOINTMENT SYSTEM
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            원하시는 날짜와 시간에 상담받으세요
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
            전화상담, 본사 방문, 현장 방문조사 중 편하신 방식을 선택하시면 담당 수석 엔지니어가 1:1 맞춤 배정됩니다.
          </p>
        </div>

        {/* Success Modal / State */}
        {submissionSuccess ? (
          <div className="mt-12 max-w-2xl mx-auto bg-amber-50 border-2 border-amber-400 rounded-3xl p-8 text-center shadow-xl">
            <div className="w-16 h-16 bg-linear-to-r from-amber-500 to-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">
              상담 예약 신청이 성공적으로 접수되었습니다!
            </h3>
            <p className="text-sm text-slate-700 mt-2 font-bold">
              신청해주신 일정에 맞춰 (주)에코샤인 {COMPANY_INFO.salesDirector} 영업이사 및 기술팀이 사전 검토 후 신속히 연락드리겠습니다.
            </p>

            <div className="mt-6 p-5 bg-white rounded-2xl border border-amber-200 text-left text-xs sm:text-sm space-y-2 text-slate-800">
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">예약 번호</span>
                <span className="font-mono font-bold text-amber-900">{submissionSuccess.id}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">회사명 / 고객명</span>
                <span className="font-bold">{companyName} ({name} 님)</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">예약 일시</span>
                <span className="font-bold text-amber-900">{selectedDate} {selectedTime}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">상담 방식</span>
                <span className="font-bold">
                  {consultationType === 'inspection' ? '현장조사 및 지붕실측 (방문)' : consultationType === 'visit' ? '본사 방문상담' : '전화상담'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">조회용 비밀번호(PIN)</span>
                <span className="font-mono font-bold text-slate-900">{clientPin || phone.slice(-4)}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={() => {
                  setSubmissionSuccess(null);
                  setName('');
                  setCompanyName('');
                  setPhone('');
                }}
                className="px-6 py-3 bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs rounded-xl transition-all cursor-pointer shadow-md"
              >
                새로운 상담 추가 예약
              </button>
              <a
                href={`tel:${COMPANY_INFO.mobile}`}
                className="px-6 py-3 bg-white border border-amber-300 hover:bg-amber-50 text-slate-900 font-black text-xs rounded-xl transition-colors inline-flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-amber-600" />
                <span>직통 문의: {COMPANY_INFO.mobile}</span>
              </a>
            </div>
          </div>
        ) : (
          /* Main Booking Form */
          <form onSubmit={handleSubmit} className="mt-12 max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-amber-200 shadow-xl">
            
            {/* Step 1: Consultation Type */}
            <div className="mb-8">
              <label className="block text-xs font-black text-amber-900 uppercase tracking-wider mb-3">
                STEP 1. 상담 방식 선택
              </label>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  {
                    type: 'inspection' as ConsultationType,
                    label: '현장 방문조사 & 실측',
                    badge: '가장 추천 (무료)',
                    desc: '엔지니어가 공장 지붕과 배전반을 직접 방문 실측'
                  },
                  {
                    type: 'call' as ConsultationType,
                    label: '유선 전화상담',
                    badge: '빠른 상담',
                    desc: '전화로 대략적인 가능 여부와 예상 견적 유선 안내'
                  },
                  {
                    type: 'visit' as ConsultationType,
                    label: '에코샤인 본사 방문',
                    badge: '인천 본사',
                    desc: '인천 남동공단 본사 회의실에서 설계도면 대면 상담'
                  },
                ].map((item) => (
                  <div
                    key={item.type}
                    onClick={() => setConsultationType(item.type)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer select-none ${
                      consultationType === item.type
                        ? 'bg-amber-50/50 border-amber-500 shadow-md'
                        : 'bg-slate-50/70 border-slate-200 hover:bg-amber-50/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-black px-2 py-0.5 rounded-md bg-amber-100 text-amber-950 border border-amber-200">
                        {item.badge}
                      </span>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        consultationType === item.type ? 'border-amber-500 bg-amber-500' : 'border-slate-300'
                      }`}>
                        {consultationType === item.type && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                    <h4 className="font-black text-sm text-slate-900 mt-2">{item.label}</h4>
                    <p className="text-[11px] text-slate-600 mt-1 leading-snug font-medium">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: Date & Time Schedule Selection */}
            <div className="mb-8 p-6 bg-amber-50/30 rounded-2xl border border-amber-200/80">
              <label className="block text-xs font-black text-amber-900 uppercase tracking-wider mb-3">
                STEP 2. 희망 날짜 및 시간대 선택
              </label>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Date Input */}
                <div>
                  <span className="text-xs font-bold text-slate-700 block mb-2">
                    상담 희망일
                  </span>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-amber-600" />
                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-amber-200 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1.5">
                    * 평일 및 토요일(09:00~18:00) 예약 가능합니다. (일요일·공휴일 사전협의)
                  </p>
                </div>

                {/* Time Slots Grid */}
                <div>
                  <span className="text-xs font-bold text-slate-700 block mb-2">
                    희망 시간대 (실시간 예약 가능 현황)
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map((time) => {
                      const blocked = isSlotBlocked(selectedDate, time);
                      const isSelected = selectedTime === time && !blocked;
                      return (
                        <button
                          key={time}
                          type="button"
                          disabled={blocked}
                          onClick={() => setSelectedTime(time)}
                          className={`py-2 text-xs font-black rounded-lg border transition-all cursor-pointer ${
                            blocked
                              ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed line-through'
                              : isSelected
                              ? 'bg-linear-to-r from-amber-500 to-orange-500 text-white border-amber-500 shadow-xs'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-amber-400'
                          }`}
                        >
                          {blocked ? '마감' : time}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Customer Information */}
            <div className="mb-8">
              <label className="block text-xs font-black text-amber-900 uppercase tracking-wider mb-3">
                STEP 3. 고객 및 공장 정보 입력
              </label>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    고객명 / 직책 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-amber-600" />
                    <input
                      type="text"
                      required
                      placeholder="예: 홍길동 대표 / 김이사"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    회사명 (공장명/법인명) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-amber-600" />
                    <input
                      type="text"
                      required
                      placeholder="예: (주)한국정밀 / 삼진산업"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    연락처 (휴대전화) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-amber-600" />
                    <input
                      type="tel"
                      required
                      placeholder="예: 010-1234-5678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {/* Factory Address */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    공장 소재지 주소 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-amber-600" />
                    <input
                      type="text"
                      required
                      placeholder="예: 경기도 화성시 팔탄면 123-45"
                      value={factoryAddress}
                      onChange={(e) => setFactoryAddress(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Optional Fields Accordion / Grid */}
              <div className="mt-4 pt-4 border-t border-slate-200 grid sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    지붕 대략 면적 (선택)
                  </label>
                  <input
                    type="number"
                    placeholder="면적(㎡)"
                    value={roofArea || ''}
                    onChange={(e) => setRoofArea(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    월평균 전기요금 (선택)
                  </label>
                  <input
                    type="number"
                    placeholder="금액(원)"
                    value={monthlyBill || ''}
                    onChange={(e) => setMonthlyBill(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    예약조회 비밀번호 PIN (4자리)
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-amber-600" />
                    <input
                      type="password"
                      maxLength={4}
                      placeholder="미입력시 전화번호 뒷4자리"
                      value={clientPin}
                      onChange={(e) => setClientPin(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="mt-4">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  추가 문의사항 또는 지붕 특이사항 (선택)
                </label>
                <textarea
                  rows={2}
                  placeholder="예: 샌드위치 패널 지붕이며, 계통연계 여유 용량 확인이 필요합니다."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Privacy Policy Agreement */}
            <div className="mb-6 p-4 rounded-xl bg-amber-50/40 border border-amber-200">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700 select-none">
                <input
                  type="checkbox"
                  checked={privacyAgreed}
                  onChange={(e) => setPrivacyAgreed(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500"
                />
                <div>
                  <span className="font-bold text-slate-900">[필수] 개인정보 수집 및 이용에 동의합니다.</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    수집 항목: 이름, 회사명, 연락처, 공장 주소 | 목적: 태양광 설치 가능 여부 검토 및 상담 예약 응대 | 보유 기간: 상담 완료 후 1년 또는 요청 시 즉시 파기
                  </p>
                </div>
              </label>
            </div>

            {/* Error Message if any */}
            {errorMsg && (
              <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 active:opacity-90 text-white font-black text-base rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <span>예약 접수 중...</span>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>상담 예약 신청하기 (무료)</span>
                </>
              )}
            </button>

            <p className="text-center text-[11px] text-slate-500 mt-3 font-medium">
              * 접수 즉시 담당 영업이사({COMPANY_INFO.salesDirector} / {COMPANY_INFO.mobile})에게 알림이 전송됩니다.
            </p>
          </form>
        )}

      </div>
    </section>
  );
};
