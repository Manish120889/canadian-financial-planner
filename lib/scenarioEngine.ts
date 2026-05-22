import { calculateTax } from './taxEngine'
import { calculateAccountGrowth, calculateDownPaymentCapacity } from './growthEngine'
import type { YearlyBreakdown, CalculationResult, FinancialInputs } from '@/types'

const PROJECTION_YEARS = 5
const SALARY_GROWTH_RATE = 0.03 // 3% annual salary growth

export function runScenario(inputs: FinancialInputs): CalculationResult {
  const {
    salary,
    growthRate,
    rrspContribution,
    tfsaContribution,
    fhsaEnabled,
  } = inputs

  // Current year tax calculation
  const fhsaContribution = fhsaEnabled ? 8000 : 0
  const currentTax = calculateTax(salary, rrspContribution)

  // Project wealth over 5 years (2026-2030)
  const yearlyBreakdown: YearlyBreakdown[] = []
  let projectedSalary = salary
  let rrspBalance = 0
  let tfsaBalance = 0
  let fhsaBalance = 0

  for (let year = 1; year <= PROJECTION_YEARS; year++) {
    const yearTax = calculateTax(projectedSalary, rrspContribution)

    rrspBalance = rrspBalance * (1 + growthRate) + rrspContribution
    tfsaBalance = tfsaBalance * (1 + growthRate) + tfsaContribution
    fhsaBalance = fhsaEnabled ? fhsaBalance * (1 + growthRate) + fhsaContribution : 0

    const netWorth = rrspBalance + tfsaBalance + fhsaBalance

    yearlyBreakdown.push({
      year: 2025 + year,
      salary: Math.round(projectedSalary),
      tax: Math.round(yearTax.totalTax),
      rrsp: Math.round(rrspBalance),
      tfsa: Math.round(tfsaBalance),
      fhsa: Math.round(fhsaBalance),
      netWorth: Math.round(netWorth),
    })

    projectedSalary *= 1 + SALARY_GROWTH_RATE
  }

  // Calculate down payment projection
  const finalFhsaBalance = yearlyBreakdown[PROJECTION_YEARS - 1].fhsa
  const finalRrspBalance = yearlyBreakdown[PROJECTION_YEARS - 1].rrsp
  const downPaymentProjection = calculateDownPaymentCapacity(finalRrspBalance, finalFhsaBalance)

  return {
    totalTax: Math.round(currentTax.totalTax),
    federalTax: Math.round(currentTax.federalTax),
    provincialTax: Math.round(currentTax.provincialTax),
    effectiveTaxRate: Math.round(currentTax.effectiveTaxRate * 100) / 100,
    netIncome: Math.round(currentTax.netIncome),
    totalContributions: rrspContribution + tfsaContribution + fhsaContribution,
    yearlyBreakdown,
    downPaymentProjection: Math.round(downPaymentProjection),
  }
}
