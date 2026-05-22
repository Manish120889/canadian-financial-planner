'use client'

import { useState } from 'react'
import InputPanel from '@/components/InputPanel'
import ResultsPanel from '@/components/ResultsPanel'
import type { CalculationResult } from '@/types'

export default function Home() {
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [loading, setLoading] = useState(false)

  const handleCalculate = async (formData: {
    salary: number
    growthRate: number
    rrspContribution: number
    tfsaContribution: number
    fhsaEnabled: boolean
  }) => {
    setLoading(true)
    try {
      const response = await fetch('/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      if (data.success) {
        setResult(data.data)
      } else {
        alert('Calculation failed: ' + data.error)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred during calculation')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Canadian Financial Planner</h1>
          <p className="text-gray-600 mt-2">
            Plan your taxes, savings, and home down payment for 2026-2030
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <InputPanel onCalculate={handleCalculate} isLoading={loading} />
          {result && <ResultsPanel result={result} />}
        </div>

        {!result && (
          <div className="mt-8 p-6 bg-white rounded-lg shadow text-center">
            <p className="text-gray-600">
              Enter your financial details and click "Calculate" to see your projections.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
