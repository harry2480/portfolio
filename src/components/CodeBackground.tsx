'use client'

import React from 'react'

const sampleLines = [
  "const server = createServer();",
  "await connectDatabase(process.env.DB_URL);",
  "function render(page) { return renderToString(page); }",
  "export default async function handler(req, res) {",
  "  const data = await fetch('/api/data');",
  "  res.json({ ok: true, data });",
  "}",
  "for (let i = 0; i < items.length; i++) {",
  "  process(items[i]);",
  "}",
  "const routes = ['/','/about','/contact'];",
  "<Router>{routes.map(r => <Route path={r} />)}</Router>",
  "const resp = await fetch('/api/status');",
  "if (resp.ok) console.log('healthy');",
  "log('render completed');",
  "useEffect(() => { init(); }, [])",
  "const config = { env: 'production', region: 'ap-northeast-1' }",
]

export default function CodeBackground() {
  return (
    <div className="code-bg fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      <div className="code-bg-inner absolute inset-0 overflow-hidden">
        <div className="code-columns absolute inset-0 grid grid-cols-2 gap-8 p-10">
          {Array.from({ length: 3 }).map((_, col) => (
            <div key={col} className="code-column w-full h-full overflow-hidden">
              <pre className="code-block animate-codeScroll whitespace-pre-wrap">
                {Array.from({ length: 40 }).map((__, i) => (
                  <div key={i} className="code-line">{sampleLines[(i + col) % sampleLines.length]}</div>
                ))}
              </pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}