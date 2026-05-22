import type { NextApiRequest, NextApiResponse } from 'next'
import { runScenario } from '@/lib/scenarioEngine'
import type { ApiRequest, ApiResponse, CalculationResult } from '@/types'

export default function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method not allowed' })
    return
  }

  try {
    const { salary, growthRate, rrspContribution, tfsaContribution, fhsaEnabled } =
      req.body as ApiRequest

    // Validation
    if (!salary || !growthRate || rrspContribution === undefined || tfsaContribution === undefined) {
      res.status(400).json({ success: false, error: 'Missing required fields' })
      return
    }

    if (salary < 0 || growthRate < 0 || growthRate > 1) {
      res.status(400).json({ success: false, error: 'Invalid input values' })
      return
    }

    const result = runScenario({
      salary,
      growthRate,
      rrspContribution,
      tfsaContribution,
      fhsaEnabled: fhsaEnabled || false,
    })

    res.status(200).json({ success: true, data: result })
  } catch (error) {
    console.error('Calculation error:', error)
    res.status(500).json({ success: false, error: 'Calculation failed' })
  }
}
