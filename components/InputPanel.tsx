'use client'

import { useState } from 'react'

interface InputPanelProps {
  onCalculate: (data: {
    salary: number
    growthRate: number
    rrspContribution: number
    tfsaContribution: number
    fhsaEnabled: boolean
  }) => void
  isLoading: boolean
}

export default function InputPanel({ onCalculate, isLoading }: InputPanelProps) {
  const [salary, setSalary] = useState(75000)
  const [growthRate, setGrowthRate] = useState(5)
  const [rrspContribution, setRrspContribution] = useState(9000)
  const [tfsaContribution, setTfsaContribution] = useState(5000)
  const [fhsaEnabled, setFhsaEnabled] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCalculate({
      salary,
      growthRate: growthRate / 100,
      rrspContribution,
      tfsaContribution,
      fhsaEnabled,
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Financial Details</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Salary */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Annual Salary
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-500">$</span>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(Number(e.target.value))}
              className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              min="0"
              step="1000"
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">Your current gross income</p>
        </div>

        {/* Growth Rate */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Annual Investment Growth Rate (%)
          </label>
          <div className="relative">
            <input
              type="number"
              value={growthRate}
              onChange={(e) => setGrowthRate(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              min="0"
              max="20"
              step="0.5"
            />
            <span className="absolute right-3 top-3 text-gray-500">%</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Expected annual return on investments</p>
        </div>

        {/* RRSP Contribution */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Annual RRSP Contribution
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-500">$</span>
            <input
              type="number"
              value={rrspContribution}
              onChange={(e) => setRrspContribution(Number(e.target.value))}
              className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              min="0"
              step="500"
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">Registered Retirement Savings Plan</p>
        </div>

        {/* TFSA Contribution */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Annual TFSA Contribution
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-500">$</span>
            <input
              type="number"
              value={tfsaContribution}
              onChange={(e) => setTfsaContribution(Number(e.target.value))}
              className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              min="0"
              step="500"
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">Tax-Free Savings Account</p>
        </div>

        {/* FHSA Toggle */}
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={fhsaEnabled}
              onChange={(e) => setFhsaEnabled(e.target.checked)}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <span className="ml-3 text-sm font-medium text-gray-700">
              Enable FHSA Contributions ($8,000/year)
            </span>
          </label>
          <p className="text-sm text-gray-500 mt-2">First Home Savings Account</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
        >
          {isLoading ? 'Calculating...' : 'Calculate'}
        </button>
      </form>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-700">
          <strong>Note:</strong> Calculations use 2026 Canadian federal and BC provincial tax brackets.
        </p>
      </div>
    </div>
  )
}
