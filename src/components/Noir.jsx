import React, { useState, useEffect, useRef, useCallback } from 'react'
import QRCodeGenerator from './QRCodeGenerator'
import './Noir.css'

function Noir() {
  const [currentPage, setCurrentPage] = useState('home')
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })
  const [mouseData, setMouseData] = useState({ x: 0, y: 0, velocity: 0 })
  const [isFocused, setIsFocused] = useState(false)
  const animationFrameRef = useRef(null)

  const drawBackground = useCallback((ctx, canvas) => {
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    const backgroundGradient = ctx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      Math.max(canvas.width, canvas.height) * 0.8
    )

    backgroundGradient.addColorStop(0, '#080a12')
    backgroundGradient.addColorStop(0.6, '#05060a')
    backgroundGradient.addColorStop(1, '#020205')

    ctx.fillStyle = backgroundGradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [])

  const drawMouseLight = useCallback((ctx, canvas, time) => {
    const x = mouseRef.current.x
    const y = mouseRef.current.y

    const lightGradient = ctx.createRadialGradient(x, y, 0, x, y, 300)
    lightGradient.addColorStop(0, 'rgba(224, 224, 224, 0.08)')
    lightGradient.addColorStop(0.3, 'rgba(200, 210, 230, 0.04)')
    lightGradient.addColorStop(0.6, 'rgba(180, 190, 210, 0.02)')
    lightGradient.addColorStop(1, 'rgba(160, 170, 190, 0)')

    ctx.fillStyle = lightGradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const grainIntensity = 0.03 + Math.sin(time * 0.002) * 0.01
    for (let i = 0; i < 500; i++) {
      const gx = x + (Math.random() - 0.5) * 600
      const gy = y + (Math.random() - 0.5) * 600
      const gsize = Math.random() * 1.5 + 0.5
      const gopacity = Math.random() * grainIntensity

      ctx.beginPath()
      ctx.arc(gx, gy, gsize, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 255, 255, ${gopacity})`
      ctx.fill()
    }
  }, [])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const time = Date.now()

    drawBackground(ctx, canvas)
    drawMouseLight(ctx, canvas, time)

    const velocity = Math.sqrt(
      Math.pow(mouseRef.current.x - mouseRef.current.targetX, 2) +
      Math.pow(mouseRef.current.y - mouseRef.current.targetY, 2)
    )

    setMouseData({
      x: Math.round(mouseRef.current.targetX),
      y: Math.round(mouseRef.current.targetY),
      velocity: Math.round(velocity * 10) / 10
    })

    mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08
    mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08

    animationFrameRef.current = requestAnimationFrame(animate)
  }, [drawBackground, drawMouseLight])

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }, [])

  const handleMouseMove = useCallback((e) => {
    mouseRef.current.targetX = e.clientX
    mouseRef.current.targetY = e.clientY
  }, [])

  useEffect(() => {
    setIsFocused(true)

    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    animate()

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [animate, handleResize, handleMouseMove])

  return (
    <div className="noir-container">
      <canvas ref={canvasRef} className="noir-canvas" />

      <nav className="noir-nav">
        <div className="nav-brand">J. CHEN</div>
        <div className="nav-links">
          <button 
            onClick={() => setCurrentPage('home')}
            className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
          >
            Home
          </button>
          <button 
            onClick={() => setCurrentPage('qrcode')}
            className={`nav-link ${currentPage === 'qrcode' ? 'active' : ''}`}
          >
            QR Code
          </button>
          <a href="#about" className="nav-link">About</a>
        </div>
      </nav>

      {currentPage === 'home' ? (
        <main className="noir-hero">
          <h1 className={`hero-title ${isFocused ? 'focused' : ''}`}>
            JASPER CHEN <span className="title-divider">//</span> 重塑边界
          </h1>
          <p className={`hero-subtitle ${isFocused ? 'focused' : ''}`}>
            探索人工智能与人类审美的碰撞
          </p>
        </main>
      ) : (
        <QRCodeGenerator />
      )}

      <div className="noir-footer">
        <div className="footer-data">
          <div className="data-item">
            <span className="data-label">X</span>
            <span className="data-value">{mouseData.x}</span>
          </div>
          <div className="data-item">
            <span className="data-label">Y</span>
            <span className="data-value">{mouseData.y}</span>
          </div>
          <div className="data-item">
            <span className="data-label">V</span>
            <span className="data-value">{mouseData.velocity}</span>
          </div>
        </div>
        <div className="footer-progress">
          <div className="progress-bar" />
        </div>
      </div>
    </div>
  )
}

export default Noir
