'use client'

import { useState } from 'react'
import TableView from './TableView'
import { downloadCSV } from '@/utils/exportCSV'
import { exportToExcel } from '@/utils/exportExcel'
import { downloadPDF } from '@/utils/exportPDF'
import type { CalculationResult } from '@/types'

interface ResultsPanelProps {
  result: CalculationResult
}

export default function ResultsPanel({ result }: ResultsPanelProps) {
  const [activeTab, setActiveTab] = useState<'summary' | 'table'>('summary')

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Total Tax */}
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm font-medium text-gray-600">Total Tax (2026)</p>
          <p className="text-3xl font-bold text-red-600 mt-2">
            ${result.totalTax.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Federal: ${result.federalTax.toLocaleString()} | Provincial: $
            {result.provincialTax.toLocaleString()}
          </p>
        </div>

        {/* Effective Tax Rate */}
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm font-medium text-gray-600">Effective Tax Rate</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{result.effectiveTaxRate}%</p>
        </div>

        {/* Net Income */}
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm font-medium text-gray-600">Net Income (After Tax)</p>
          <p className="text-3xl font-bold text-green-600 mt-2">
            ${result.netIncome.toLocaleString()}
          </p>
        </div>

        {/* Down Payment */}
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm font-medium text-gray-600">Down Payment Projection (2030)</p>
          <p className="text-3xl font-bold text-indigo-600 mt-2">
            ${result.downPaymentProjection.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-2">After 5 years of growth</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('summary')}
            className={`flex-1 py-4 px-6 text-center font-medium ${
              activeTab === 'summary'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Summary
          </button>
          <button
            onClick={() => setActiveTab('table')}
            className={`flex-1 py-4 px-6 text-center font-medium ${
              activeTab === 'table'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Yearly Breakdown
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'summary' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Federal Tax</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${result.federalTax.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Provincial Tax</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${result.provincialTax.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Contributions</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${result.totalContributions.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Effective Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{result.effectiveTaxRate}%</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'table' && <TableView breakdown={result.yearlyBreakdown} />}
        </div>
      </div>

      {/* Export Buttons */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Export Results</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => downloadCSV(result)}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
          >
            Export CSV
          </button>
          <button
            onClick={() => exportToExcel(result)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
          >
            Export Excel
          </button>
          <button
            onClick={() => downloadPDF(result)}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
          >
            Export PDF
          </button>
        </div>
      </div>
    </div>
  )
}
