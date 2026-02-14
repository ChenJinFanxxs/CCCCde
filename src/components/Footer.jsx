import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">关于</h3>
            <p className="footer-text">
              这是我的个人工具集网站，展示了我开发的各类实用工具
            </p>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">联系方式</h3>
            <div className="footer-links">
              <a href="#" className="footer-link">GitHub</a>
              <a href="#" className="footer-link">Email</a>
              <a href="#" className="footer-link">Twitter</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 我的工作集. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
