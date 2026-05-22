// 2026 Canadian Federal Tax Brackets
const FEDERAL_BRACKETS = [
  { min: 0, max: 55867, rate: 0.15 },
  { min: 55867, max: 111733, rate: 0.205 },
  { min: 111733, max: 173205, rate: 0.26 },
  { min: 173205, max: 246752, rate: 0.29 },
  { min: 246752, max: Infinity, rate: 0.33 },
]

// 2026 BC Provincial Tax Brackets
const BC_BRACKETS = [
  { min: 0, max: 47937, rate: 0.0506 },
  { min: 47937, max: 95875, rate: 0.0770 },
  { min: 95875, max: 110076, rate: 0.1050 },
  { min: 110076, max: 133664, rate: 0.1229 },
  { min: 133664, max: 181232, rate: 0.1453 },
  { min: 181232, max: 252752, rate: 0.1653 },
  { min: 252752, max: Infinity, rate: 0.205 },
]

function calculateTaxOnBrackets(income: number, brackets: typeof FEDERAL_BRACKETS): number {
  let tax = 0
  let previousMax = 0

  for (const bracket of brackets) {
    if (income <= bracket.min) break

    const taxableInThisBracket = Math.min(income, bracket.max) - bracket.min
    tax += taxableInThisBracket * bracket.rate
  }

  return tax
}

export function calculateTax(grossIncome: number, rrspContribution: number = 0): {
  federalTax: number
  provincialTax: number
  totalTax: number
  effectiveTaxRate: number
  netIncome: number
} {
  // RRSP is tax-deductible
  const taxableIncome = Math.max(0, grossIncome - rrspContribution)

  const federalTax = calculateTaxOnBrackets(taxableIncome, FEDERAL_BRACKETS)
  const provincialTax = calculateTaxOnBrackets(taxableIncome, BC_BRACKETS)
  const totalTax = federalTax + provincialTax

  const netIncome = grossIncome - totalTax - rrspContribution
  const effectiveTaxRate = grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0

  return {
    federalTax,
    provincialTax,
    totalTax,
    effectiveTaxRate,
    netIncome,
  }
}

export function calculateAnnualTax(
  grossIncome: number,
  rrspContribution: number,
  tfsaContribution: number,
  fhsaContribution: number = 0
): {
  tax: number
  netIncome: number
  afterTaxIncome: number
} {
  const { totalTax, netIncome } = calculateTax(grossIncome, rrspContribution)

  // TFSA and FHSA are post-tax contributions
  const totalContributions = rrspContribution + tfsaContribution + fhsaContribution
  const afterTaxIncome = netIncome - tfsaContribution - fhsaContribution

  return {
    tax: totalTax,
    netIncome: afterTaxIncome,
    afterTaxIncome,
  }
}
