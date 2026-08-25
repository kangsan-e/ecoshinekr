import type { CalculationResult } from '../types';

export function calculateSolarPotential(
  areaM2: number,
  monthlyBill: number = 0,
  calculationMode: 'business' | 'self_consumption' = 'business'
): CalculationResult {
  const roofAreaM2 = Math.max(0, areaM2);
  const roofAreaPy = Math.round(roofAreaM2 / 3.305785);
  
  // Approximately 7.5m2 per 1 kW (or 2.3 pyeong per 1 kW) for modern N-Type 600W+ panels
  const estimatedCapacityKw = Math.round((roofAreaM2 / 7.5) * 10) / 10;
  
  // Standard solar generation: 3.6 peak sun hours per day * 365 days * 0.95 efficiency factor
  const annualGenerationKwh = Math.round(estimatedCapacityKw * 3.6 * 365);
  
  // Average blended revenue per kWh (SMP 130 + REC 70*1.5 weight = ~220 KRW/kWh)
  // For self-consumption, industrial electricity is ~160~180 KRW/kWh
  const unitRate = calculationMode === 'business' ? 220 : 175;
  const estimatedAnnualRevenue = Math.round(annualGenerationKwh * unitRate);
  
  // 20-year revenue considering slight 0.5% degradation per year
  let twentyYearRevenue = 0;
  for (let year = 1; year <= 20; year++) {
    const degradation = Math.pow(1 - 0.005, year - 1);
    twentyYearRevenue += Math.round(annualGenerationKwh * degradation * unitRate);
  }
  
  const monthlySavings = Math.round(estimatedAnnualRevenue / 12);
  
  // 1 kWh solar generation saves approx 0.457 kg CO2
  const co2ReductionTons = Math.round((annualGenerationKwh * 0.457) / 1000 * 10) / 10;
  
  // 1 ton CO2 = approx 150 pine trees
  const treeEquivalent = Math.round(co2ReductionTons * 150);

  return {
    roofAreaM2,
    roofAreaPy,
    estimatedCapacityKw,
    annualGenerationKwh,
    estimatedAnnualRevenue,
    twentyYearRevenue,
    monthlySavings,
    co2ReductionTons,
    treeEquivalent
  };
}

export function formatKoreanWon(amount: number): string {
  if (amount >= 100000000) {
    const eok = Math.floor(amount / 100000000);
    const man = Math.floor((amount % 100000000) / 10000);
    if (man > 0) {
      return `${eok}억 ${man.toLocaleString()}만원`;
    }
    return `${eok}억원`;
  }
  if (amount >= 10000) {
    const man = Math.floor(amount / 10000);
    return `${man.toLocaleString()}만원`;
  }
  return `${amount.toLocaleString()}원`;
}
