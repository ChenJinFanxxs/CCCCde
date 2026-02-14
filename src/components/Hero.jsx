import React from 'react'
import './Hero.css'

function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        <h1 className="hero-title">
          欢迎来到我的工具集
        </h1>
        <p className="hero-subtitle">
          这里展示了我开发的各类实用工具，让工作更高效
        </p>
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">12</span>
            <span className="stat-label">工具</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">5</span>
            <span className="stat-label">分类</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">免费</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
