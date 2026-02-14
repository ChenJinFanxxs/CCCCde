import React from 'react'
import './Header.css'

function Header({ darkMode, setDarkMode }) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">我的工具集</span>
        </div>
        <nav className="nav">
          <button
            className={`theme-toggle ${darkMode ? 'dark' : ''}`}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header
