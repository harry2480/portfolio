'use client'

import { useEffect, useRef } from 'react'

// Perlin Noise implementation
function createNoise() {
  const p = new Uint8Array(512)
  const permutation = new Uint8Array(256)
  for (let i = 0; i < 256; i++) permutation[i] = i
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [permutation[i], permutation[j]] = [permutation[j], permutation[i]]
  }
  for (let i = 0; i < 512; i++) p[i] = permutation[i & 255]

  function fade(t: number) { return t * t * t * (t * (t * 6 - 15) + 10) }
  function lerp(a: number, b: number, t: number) { return a + t * (b - a) }
  function grad(hash: number, x: number, y: number) {
    const h = hash & 3
    const u = h < 2 ? x : y
    const v = h < 2 ? y : x
    return ((h & 1) ? -u : u) + ((h & 2) ? -v : v)
  }

  return function noise(x: number, y: number): number {
    const X = Math.floor(x) & 255
    const Y = Math.floor(y) & 255
    const xf = x - Math.floor(x)
    const yf = y - Math.floor(y)
    const u = fade(xf)
    const v = fade(yf)
    const aa = p[p[X] + Y]
    const ab = p[p[X] + Y + 1]
    const ba = p[p[X + 1] + Y]
    const bb = p[p[X + 1] + Y + 1]
    return (lerp(
      lerp(grad(aa, xf, yf), grad(ba, xf - 1, yf), u),
      lerp(grad(ab, xf, yf - 1), grad(bb, xf - 1, yf - 1), u),
      v
    ) + 1) / 2
  }
}

export default function CodeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const noise = createNoise()

    let animId: number
    const LINE_NUM = 30
    const SEGMENT_NUM = 100

    function resize() {
      canvas!.width = window.innerWidth
      canvas!.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      const time = Date.now() / 4000

      for (let j = 0; j < LINE_NUM; j++) {
        const coefficient = 70 + j
        const brightness = Math.round((j / LINE_NUM) * 35) + 10
        const alpha = brightness / 100

        ctx!.beginPath()
        ctx!.strokeStyle = `rgba(255, 255, 255, ${alpha})`
        ctx!.lineWidth = 1

        for (let i = 0; i < SEGMENT_NUM; i++) {
          const x = (i / (SEGMENT_NUM - 1)) * canvas!.width
          const px = i / coefficient
          const py = j / LINE_NUM + time
          const noiseVal = noise(px, py)
          const y = noiseVal * canvas!.height + 35

          if (i === 0) ctx!.moveTo(x, y)
          else ctx!.lineTo(x, y)
        }
        ctx!.stroke()
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  )
}
