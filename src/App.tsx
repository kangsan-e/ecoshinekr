import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ValueProposition } from './components/ValueProposition';
import { TargetChecklist } from './components/TargetChecklist';
import { TechStrengths } from './components/TechStrengths';
import { EPCProcess } from './components/EPCProcess';
import { InstallationTypes } from './components/InstallationTypes';
import { SolarCalculator } from './components/SolarCalculator';
import { MarketAndRevenue } from './components/MarketAndRevenue';
import { PortfolioGallery } from './components/PortfolioGallery';
import { CompanyInfo } from './components/CompanyInfo';
import { ConsultationBooking } from './components/ConsultationBooking';
import { ClientMyPageModal } from './components/ClientMyPageModal';
import { AdminDashboard } from './components/AdminDashboard';
import { FloatingMobileBar } from './components/FloatingMobileBar';
import { Footer } from './components/Footer';
import type { FactoryType, InterestType, ConsultationType } from './types';

export default function App() {
  const [myPageOpen, setMyPageOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  // State to pass calculated values into the booking form
  const [bookingPrefill, setBookingPrefill] = useState<{
    address?: string;
    roofArea?: number;
    monthlyBill?: number;
    factoryType?: FactoryType;
    interest?: InterestType;
    estimatedKw?: number;
    consultationType?: ConsultationType;
  }>({});

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBooking = (specificType?: string) => {
    if (specificType) {
      setBookingPrefill((prev) => ({
        ...prev,
        interest: specificType.includes('자가소비') ? 'cost_reduction' : 'power_business'
      }));
    }
    scrollToSection('booking');
  };

  const handleApplyCalculatorToBooking = (params: {
    address: string;
    roofArea: number;
    monthlyBill: number;
    factoryType: FactoryType;
    interest: InterestType;
    estimatedKw: number;
  }) => {
    setBookingPrefill(params);
    scrollToSection('booking');
  };

  return (
    <div className="min-h-screen bg-amber-50/20 text-slate-900 flex flex-col font-sans selection:bg-amber-400 selection:text-amber-950">
      {/* Header */}
      <Header
        onOpenBooking={() => handleOpenBooking()}
        onOpenMyPage={() => setMyPageOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
        onOpenCalculator={() => scrollToSection('calculator')}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <HeroSection
          onOpenBooking={() => handleOpenBooking()}
          onScrollToCalculator={() => scrollToSection('calculator')}
        />

        {/* 2. Value Proposition (Why Solar Now?) */}
        <ValueProposition
          onOpenBooking={() => handleOpenBooking()}
          onScrollToCalculator={() => scrollToSection('calculator')}
        />

        {/* 3. Factory Checklist */}
        <TargetChecklist
          onOpenBooking={() => handleOpenBooking()}
          onScrollToCalculator={() => scrollToSection('calculator')}
        />

        {/* 4. One-Stop EPC Process */}
        <EPCProcess onOpenBooking={() => handleOpenBooking()} />

        {/* 5. Patented Leak-Free Tech & Strengths */}
        <TechStrengths />

        {/* 6. 3 Installation Types */}
        <InstallationTypes
          onOpenBooking={(type) => handleOpenBooking(type)}
          onScrollToCalculator={() => scrollToSection('calculator')}
        />

        {/* 7. 3-Minute Solar Calculator & Simulator */}
        <SolarCalculator onApplyToBooking={handleApplyCalculatorToBooking} />

        {/* 8. Market SMP/REC Price Trends & 20-Year Financial Schedule */}
        <MarketAndRevenue onOpenBooking={() => handleOpenBooking()} />

        {/* 9. Real Portfolio Gallery */}
        <PortfolioGallery onOpenBooking={() => handleOpenBooking()} />

        {/* 10. Consultation Booking Calendar & Form */}
        <ConsultationBooking initialData={bookingPrefill} />

        {/* 11. Company Info, Organization Chart, 16 Instruments & ESG */}
        <CompanyInfo />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onScrollToCalculator={() => scrollToSection('calculator')}
      />

      {/* Mobile Floating Action Bar */}
      <FloatingMobileBar onOpenBooking={() => handleOpenBooking()} />

      {/* My Page (Reservation Lookup) Modal */}
      <ClientMyPageModal
        isOpen={myPageOpen}
        onClose={() => setMyPageOpen(false)}
      />

      {/* Admin Management Dashboard Modal */}
      <AdminDashboard
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
      />
    </div>
  );
}
