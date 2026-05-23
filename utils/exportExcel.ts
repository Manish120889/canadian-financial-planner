import * as XLSX from 'xlsx'
import type { CalculationResult } from '@/types'

export function exportToExcel(result: CalculationResult) {
  const workbook = XLSX.utils.book_new()

  // Summary sheet
  const summaryData = [
    ['Canadian Financial Planning Report'],
    [new Date().toLocaleDateString()],
    [],
    ['TAX SUMMARY'],
    ['Federal Tax', result.federalTax],
    ['Provincial Tax', result.provincialTax],
    ['Total Tax', result.totalTax],
    ['Effective Tax Rate (%)', result.effectiveTaxRate],
    ['Net Income', result.netIncome],
    [],
    ['PROJECTIONS'],
    ['Down Payment Projection (2030)', result.downPaymentProjection],
  ]

  const summarySheet = XLSX.utils.aoa_to_sheet(summaryData)
  XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary')

  // Detailed sheet
  const detailData = [
    ['YEARLY BREAKDOWN'],
    ['Year', 'Salary', 'Tax', 'RRSP', 'TFSA', 'FHSA', 'Net Worth'],
  ]

  result.yearlyBreakdown.forEach((year) => {
    detailData.push([year.year.toString(), year.salary, year.tax, year.rrsp, year.tfsa, year.fhsa, year.netWorth])
  })

  const detailSheet = XLSX.utils.aoa_to_sheet(detailData)
  XLSX.utils.book_append_sheet(workbook, detailSheet, 'Projections')

  // Save
  const fileName = `financial-plan-${new Date().toISOString().split('T')[0]}.xlsx`
  XLSX.writeFile(workbook, fileName)
}
