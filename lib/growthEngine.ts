export interface AccountGrowth {
  year: number
  rrspBalance: number
  tfsaBalance: number
  fhsaBalance: number
  totalBalance: number
}

export function calculateCompoundGrowth(
  initialAmount: number,
  annualContribution: number,
  rate: number,
  years: number
): number[] {
  const balances: number[] = []
  let balance = initialAmount

  for (let i = 0; i < years; i++) {
    balance = balance * (1 + rate) + annualContribution
    balances.push(balance)
  }

  return balances
}

export function calculateAccountGrowth(
  rrspInitial: number,
  tfsaInitial: number,
  fhsaInitial: number,
  rrspAnnual: number,
  tfsaAnnual: number,
  fhsaAnnual: number,
  growthRate: number,
  years: number
): AccountGrowth[] {
  const rrspBalances = calculateCompoundGrowth(rrspInitial, rrspAnnual, growthRate, years)
  const tfsaBalances = calculateCompoundGrowth(tfsaInitial, tfsaAnnual, growthRate, years)
  const fhsaBalances = calculateCompoundGrowth(fhsaInitial, fhsaAnnual, growthRate, years)

  const results: AccountGrowth[] = []
  for (let i = 0; i < years; i++) {
    results.push({
      year: i + 1,
      rrspBalance: Math.round(rrspBalances[i] * 100) / 100,
      tfsaBalance: Math.round(tfsaBalances[i] * 100) / 100,
      fhsaBalance: Math.round(fhsaBalances[i] * 100) / 100,
      totalBalance: Math.round((rrspBalances[i] + tfsaBalances[i] + fhsaBalances[i]) * 100) / 100,
    })
  }

  return results
}

export function calculateDownPaymentCapacity(
  rrspBalance: number,
  fhsaBalance: number,
  liquidAssets: number = 0
): number {
  // Can withdraw from RRSP Home Buyers Plan and FHSA for down payment
  // Simplified: assume FHSA + 25% of RRSP available
  return liquidAssets + fhsaBalance + rrspBalance * 0.25
}
