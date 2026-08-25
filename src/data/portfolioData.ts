import type { PortfolioItem, EquipmentItem } from '../types';

export const COMPANY_INFO = {
  name: '(주)에코샤인',
  nameEn: 'ECOSHINE Co., Ltd.',
  salesDirector: '차태훈',
  address: '인천광역시 남동구 남동서로236번길 30, 202호',
  addressPostal: '21634',
  tel: '010-7750-5385',
  mobile: '010-7750-5385',
  email: 'taehoon.cha@gmail.com',
  businessType: '태양광 발전사업 EPC, 전기공사업, 지붕 태양광 구조물 제조/시공, 스마트 O&M',
  established: '2019',
  totalTrackRecordMw: 58.4,
  leakFreeRecord: '100% 누수 사고 0건 달성',
  patentTech: '자체 개발 누수방지 브라켓 (특허 출원)',
};

export const PORTFOLIO_LIST: PortfolioItem[] = [
  {
    id: 'pf-1',
    title: '124.16 kW',
    capacity: '124.16 kW',
    capacityNum: 124.16,
    category: 'medium',
    location: '경기 화성 팔탄면 공장단지',
    description: '124.16 kW 단독 공장 샌드위치 패널 지붕 시공',
    roofType: '청색 샌드위치 패널 지붕',
    features: ['특허 누수방지 브라켓', 'POS-MAC 고내식 구조물'],
    imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1600&q=85',
    hasBlueprint: true
  },
  {
    id: 'pf-2',
    title: '184.80 kW',
    capacity: '184.80 kW',
    capacityNum: 184.80,
    category: 'medium',
    location: '인천 남동국가산업단지',
    description: '184.80 kW 산단 다동 공장 지붕 항공 직하 시공',
    roofType: '칼라강판 및 복합 판넬 지붕',
    features: ['특허 누수방지 브라켓', 'POS-MAC 고내식 구조물'],
    imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df57046475b?auto=format&fit=crop&w=1600&q=85'
  },
  {
    id: 'pf-3',
    title: '284.75 kW',
    capacity: '284.75 kW',
    capacityNum: 284.75,
    category: 'medium',
    location: '충남 바이오밸리 공장단지',
    description: '284.75 kW A~E 5개동 연동형 지붕 태양광 발전소',
    roofType: '5개동 연동형 박공 판넬',
    features: ['특허 누수방지 브라켓', 'POS-MAC 고내식 구조물'],
    imageUrl: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=1600&q=85'
  }
];

export const EQUIPMENT_LIST: EquipmentItem[] = [
  { name: 'GPS 위성수신기', model: 'GSX2 SE', usage: '지붕 위치 정밀 측량 및 음영 좌표 분석', category: 'measurement' },
  { name: 'GPS 단말기', model: 'ps336', usage: '현장 지형지물 위성 데이터 실시간 수집', category: 'measurement' },
  { name: '레이저 측정기 (데이터 연동)', model: 'DIK22309 / GLM50 Pro', usage: '지붕 경사각 및 3차원 거리 정밀 측정', category: 'measurement' },
  { name: '항공 촬영 드론', model: 'Air 25 / f114K PRO', usage: '열화상 패널 결함 검사 및 현장 항공 실측', category: 'measurement' },
  { name: '디지털 캘리퍼스', model: 'BD500-300', usage: '철골 구조물 및 브라켓 두께 정밀 측정', category: 'measurement' },
  { name: '자동 레벨기', model: 'NA700', usage: '구조물 수평도 및 구배 정밀 측정', category: 'measurement' },
  { name: '솔라 시뮬레이터 (Solar Simulator)', model: '96061A', usage: '태양광 패널 발전 효율 및 I-V 곡선 정밀 측정', category: 'analysis' },
  { name: '태양광 신뢰성 분석 시스템', model: 'K3600 / MH100', usage: '모듈 수명 및 장기 열화 신뢰성 검증', category: 'analysis' },
  { name: '태양광 투과율 측정기 (Spectrum Meter)', model: 'SS2450', usage: '태양광 파장별 스펙트럼 및 투과도 측정', category: 'analysis' },
  { name: '스핀 코터 (Spin Coater)', model: 'ACE-200', usage: '방수 및 오염방지 표면 코팅제 개발 및 테스트', category: 'lab' },
  { name: '태양광 패널 코팅 스프레이 머신', model: 'SRC-3000', usage: '친환경 방오·고효율 코팅 도포 장비', category: 'lab' },
  { name: '디지털 멀티미터 테스터기', model: 'FLUKE-17B+', usage: '전압, 전류, 절연저항, 접지저항 정밀 검측', category: 'measurement' },
  { name: 'CO2 용접기 및 인버터 DC 아크용접기', model: 'CMO-650TX / ASEA-200D', usage: '특수강 철골 프레임 현장 접합 시공', category: 'construction' },
  { name: '전동 임팩 라쳇 / 임팩 드라이버', model: 'M12 FHIR38 / GDX 18V', usage: '토크 규격 일치 볼팅 드라이빙 시공', category: 'construction' },
];

export const FINANCIAL_124KW_MODEL = {
  capacityKw: 124.16,
  dailyPeakSunHours: 3.6,
  annualGenerationKwh: 163146,
  smpPrice: 111.97,
  recPrice: 72.40,
  weight: 1.5,
  unitRevenuePerKwh: 220.57,
  totalInstallationCost: 117000000,
  firstYearGrossRevenue: 37784424,
  twentyYearGrossRevenue: 720847621,
  twentyYearNetProfit: 668390668,
  avgAnnualRoiPercent: 28.56
};

export const SMP_REC_TRENDS = [
  { month: '2023.12', smp: 274.9, rec: 78.0 },
  { month: '2024.01', smp: 225.0, rec: 85.0 },
  { month: '2024.02', smp: 198.6, rec: 79.5 },
  { month: '2024.03', smp: 212.5, rec: 83.2 },
  { month: '2024.04', smp: 201.5, rec: 75.6 },
  { month: '2024.06', smp: 200.9, rec: 74.9 },
  { month: '2024.08', smp: 224.5, rec: 78.8 },
  { month: '2024.10', smp: 194.1, rec: 76.9 },
  { month: '2024.12', smp: 182.8, rec: 67.0 },
  { month: '2025.04', smp: 196.3, rec: 72.4 },
  { month: '2025.08', smp: 196.0, rec: 71.0 },
  { month: '2026.06', smp: 221.2, rec: 70.0 },
  { month: '2026.08', smp: 153.98, rec: 70.75 }
];
