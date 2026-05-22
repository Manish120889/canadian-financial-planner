import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Canadian Financial Planner',
  description: 'Plan your Canadian finances: tax, RRSP, TFSA, FHSA projections',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  )
}
