import type { CalculationResult } from '@/types'

export function exportToCSV(result: CalculationResult): string {
  const lines: string[] = []

  lines.push('Canadian Financial Planning Report')
  lines.push(new Date().toLocaleDateString())
  lines.push('')

  lines.push('TAX SUMMARY')
  lines.push(`Federal Tax,${result.federalTax}`)
  lines.push(`Provincial Tax,${result.provincialTax}`)
  lines.push(`Total Tax,${result.totalTax}`)
  lines.push(`Effective Tax Rate,${result.effectiveTaxRate}%`)
  lines.push(`Net Income,${result.netIncome}`)
  lines.push('')

  lines.push('PROJECTIONS (2026-2030)')
  lines.push(`Down Payment Projection,${result.downPaymentProjection}`)
  lines.push('')

  lines.push('YEARLY BREAKDOWN')
  lines.push('Year,Salary,Tax,RRSP,TFSA,FHSA,Net Worth')
  result.yearlyBreakdown.forEach((year) => {
    lines.push(
      `${year.year},${year.salary},${year.tax},${year.rrsp},${year.tfsa},${year.fhsa},${year.netWorth}`
    )
  })

  return lines.join('\n')
}

export function downloadCSV(result: CalculationResult) {
  const csv = exportToCSV(result)
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `financial-plan-${new Date().toISOString().split('T')[0]}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
