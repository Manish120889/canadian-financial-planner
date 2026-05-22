import type { CalculationResult } from '@/types'

export function generatePDFContent(result: CalculationResult): string {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { color: #333; }
        .section { margin: 20px 0; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .summary { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .value { font-weight: bold; color: #2c3e50; }
      </style>
    </head>
    <body>
      <h1>Canadian Financial Planning Report</h1>
      <p>Generated: ${new Date().toLocaleDateString()}</p>

      <div class="section">
        <h2>Tax Summary</h2>
        <div class="summary">
          <div><strong>Federal Tax:</strong> <span class="value">$${result.federalTax.toLocaleString()}</span></div>
          <div><strong>Provincial Tax:</strong> <span class="value">$${result.provincialTax.toLocaleString()}</span></div>
          <div><strong>Total Tax:</strong> <span class="value">$${result.totalTax.toLocaleString()}</span></div>
          <div><strong>Effective Rate:</strong> <span class="value">${result.effectiveTaxRate}%</span></div>
          <div><strong>Net Income:</strong> <span class="value">$${result.netIncome.toLocaleString()}</span></div>
          <div><strong>Down Payment Projection:</strong> <span class="value">$${result.downPaymentProjection.toLocaleString()}</span></div>
        </div>
      </div>

      <div class="section">
        <h2>5-Year Projections (2026-2030)</h2>
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Salary</th>
              <th>Tax</th>
              <th>RRSP</th>
              <th>TFSA</th>
              <th>FHSA</th>
              <th>Net Worth</th>
            </tr>
          </thead>
          <tbody>
            ${result.yearlyBreakdown
              .map(
                (year) => `
            <tr>
              <td>${year.year}</td>
              <td>$${year.salary.toLocaleString()}</td>
              <td>$${year.tax.toLocaleString()}</td>
              <td>$${year.rrsp.toLocaleString()}</td>
              <td>$${year.tfsa.toLocaleString()}</td>
              <td>$${year.fhsa.toLocaleString()}</td>
              <td>$${year.netWorth.toLocaleString()}</td>
            </tr>
            `
              )
              .join('')}
          </tbody>
        </table>
      </div>
    </body>
    </html>
  `
  return html
}

export async function downloadPDF(result: CalculationResult) {
  // Puppeteer integration would go here for production
  // For now, generate HTML and let browser handle PDF
  const html = generatePDFContent(result)
  const blob = new Blob([html], { type: 'text/html' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.target = '_blank'
  link.click()
}
