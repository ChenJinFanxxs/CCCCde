import React, { useState } from 'react'
import './ToolCard.css'

function ToolCard({ tool }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`tool-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ '--card-color': tool.color }}
    >
      <div className="retro-label">{tool.label}</div>
      <div className="card-icon" style={{ backgroundColor: tool.color }}>
        <span className="icon-emoji">{tool.icon}</span>
      </div>
      <div className="card-content">
        <span className="card-category">{tool.category}</span>
        <h3 className="card-title">{tool.title}</h3>
        <p className="card-description">{tool.description}</p>
        <button className="card-button">
          {isHovered ? '立即使用 →' : '查看详情'}
        </button>
      </div>
      <div className="card-glow"></div>
    </div>
  )
}

export default ToolCard
