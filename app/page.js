'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import JsonTree from '@/components/JsonTree'

const SAMPLE_JSON = `{
  "researcher": "Avinash",
  "project": "MineSafe AI",
  "tech": ["ROS", "YOLO", "D3"],
  "location": {
    "city": "Bangalore",
    "state": "Karnataka"
  },
  "stats": {
    "accuracy": 94.5,
    "sensors": 3
  }
}`

export default function Home() {
  const [input, setInput] = useState(SAMPLE_JSON)
  const [json, setJson] = useState(JSON.parse(SAMPLE_JSON))
  const [error, setError] = useState('')

  function handleVisualize() {
    try {
      const parsed = JSON.parse(input)
      setJson(parsed)
      setError('')
    } catch (e) {
      setError('Invalid JSON! Please check your input.')
    }
  }

  return (
    <main className="min-h-screen bg-white">

      {/* Top navbar */}
      <nav className="border-b border-slate-100 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
            <span className="text-white text-sm font-bold">J</span>
          </div>
          <span className="font-semibold text-slate-800 text-lg">JSONViz</span>
          <Badge className="bg-violet-50 text-violet-700 border-violet-200 text-xs">
            Beta
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
          Ready
        </div>
      </nav>

      {/* Hero */}
      <div className="text-center py-12 px-4">
        <h1 className="text-5xl font-bold text-slate-900 mb-4 tracking-tight">
          See your JSON,{' '}
          <span className="text-violet-600">visually</span>
        </h1>
        <p className="text-slate-500 text-xl max-w-xl mx-auto">
          Paste any JSON and instantly get a beautiful interactive diagram.
          Perfect for APIs, datasets, and debugging.
        </p>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Left panel */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
              JSON Input
            </h2>
            <span className="text-xs text-slate-400">Ctrl+Enter to visualize</span>
          </div>
          <div className="relative">
            <Textarea
              className="font-mono text-sm h-80 resize-none bg-slate-50 border-slate-200 rounded-xl focus:ring-violet-500 focus:border-violet-400 p-4"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.ctrlKey && e.key === 'Enter') handleVisualize()
              }}
              placeholder="Paste your JSON here..."
            />
          </div>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2 rounded-lg">
              {error}
            </div>
          )}
          <Button
            onClick={handleVisualize}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white rounded-xl py-5 text-sm font-semibold"
          >
            Visualize JSON →
          </Button>

          {/* Legend */}
          <div className="flex flex-wrap gap-2 mt-2">
            {[
              { label: 'object', color: 'bg-violet-100 text-violet-700' },
              { label: 'array', color: 'bg-cyan-100 text-cyan-700' },
              { label: 'string', color: 'bg-emerald-100 text-emerald-700' },
              { label: 'number', color: 'bg-amber-100 text-amber-700' },
              { label: 'boolean', color: 'bg-rose-100 text-rose-700' },
            ].map(({ label, color }) => (
              <span key={label} className={`text-xs px-3 py-1 rounded-full font-medium ${color}`}>
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
              Visual Diagram
            </h2>
            <span className="text-xs text-slate-400">Scroll to zoom · Drag to pan</span>
          </div>
          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm" style={{ height: '420px' }}>
            {json && <JsonTree data={json} />}
          </div>
        </div>

      </div>
    </main>
  )
}