'use client'

import type { YearlyBreakdown } from '@/types'

interface TableViewProps {
  breakdown: YearlyBreakdown[]
}

export default function TableView({ breakdown }: TableViewProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-200">
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Year</th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Salary</th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Tax</th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">RRSP</th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">TFSA</th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">FHSA</th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Net Worth</th>
          </tr>
        </thead>
        <tbody>
          {breakdown.map((row, index) => (
            <tr
              key={index}
              className={`border-b border-gray-200 ${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              } hover:bg-gray-100 transition`}
            >
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.year}</td>
              <td className="px-6 py-4 text-sm text-right text-gray-900">
                ${row.salary.toLocaleString()}
              </td>
              <td className="px-6 py-4 text-sm text-right text-red-600">
                ${row.tax.toLocaleString()}
              </td>
              <td className="px-6 py-4 text-sm text-right text-blue-600">
                ${row.rrsp.toLocaleString()}
              </td>
              <td className="px-6 py-4 text-sm text-right text-green-600">
                ${row.tfsa.toLocaleString()}
              </td>
              <td className="px-6 py-4 text-sm text-right text-purple-600">
                ${row.fhsa.toLocaleString()}
              </td>
              <td className="px-6 py-4 text-sm text-right font-semibold text-gray-900">
                ${row.netWorth.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
