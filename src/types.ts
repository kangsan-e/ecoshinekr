export type ConsultationType = 'call' | 'visit' | 'inspection';

export type FactoryType = 'owned' | 'rented' | 'etc';

export type InterestType = 'cost_reduction' | 'power_business' | 're100' | 'roof_lease' | 'etc';

export type ConsultationStatus = 
  | 'new'          // 신규접수
  | 'contacted'    // 연락완료
  | 'scheduled'    // 방문/상담예정
  | 'quoted'       // 견적발송
  | 'contracted'   // 계약완료
  | 'completed'    // 완료
  | 'cancelled';   // 취소

export interface ConsultationRequest {
  id?: string;
  name: string;
  companyName: string;
  phone: string;
  factoryAddress: string;
  preferredDate: string; // YYYY-MM-DD
  preferredTime: string; // HH:MM
  consultationType: ConsultationType;
  roofArea?: number; // m2
  monthlyElectricityBill?: number; // KRW
  factoryType?: FactoryType;
  interest?: InterestType;
  notes?: string;
  clientPin?: string; // 4-digit PIN for non-member lookup
  status: ConsultationStatus;
  adminNotes?: string;
  quotedAmount?: number;
  userId?: string;
  userEmail?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface BlockedSlot {
  id?: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  reason?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  capacity: string;
  capacityNum: number;
  category: 'mega' | 'large' | 'medium' | 'small' | 'ground';
  location: string;
  description: string;
  roofType: string;
  features: string[];
  imageUrl: string;
  hasBlueprint?: boolean;
}

export interface EquipmentItem {
  name: string;
  model: string;
  usage: string;
  category: 'measurement' | 'construction' | 'analysis' | 'lab';
}

export interface CalculationResult {
  roofAreaM2: number;
  roofAreaPy: number;
  estimatedCapacityKw: number;
  annualGenerationKwh: number;
  estimatedAnnualRevenue: number;
  twentyYearRevenue: number;
  monthlySavings: number;
  co2ReductionTons: number;
  treeEquivalent: number;
}
