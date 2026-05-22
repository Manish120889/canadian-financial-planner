export interface FinancialInputs {
  salary: number
  growthRate: number
  rrspContribution: number
  tfsaContribution: number
  fhsaEnabled: boolean
}

export interface YearlyBreakdown {
  year: number
  salary: number
  tax: number
  rrsp: number
  tfsa: number
  fhsa: number
  netWorth: number
}

export interface CalculationResult {
  totalTax: number
  federalTax: number
  provincialTax: number
  effectiveTaxRate: number
  netIncome: number
  totalContributions: number
  yearlyBreakdown: YearlyBreakdown[]
  downPaymentProjection: number
}

export interface ApiRequest {
  salary: number
  growthRate: number
  rrspContribution: number
  tfsaContribution: number
  fhsaEnabled: boolean
}

export interface ApiResponse {
  success: boolean
  data?: CalculationResult
  error?: string
}
