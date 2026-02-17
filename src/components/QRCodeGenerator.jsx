import React, { useState, useRef, useEffect } from 'react'
import QRCode from 'qrcode'
import './QRCodeGenerator.css'

function QRCodeGenerator() {
  const [inputText, setInputText] = useState('')
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [error, setError] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const canvasRef = useRef(null)

  const generateQRCode = async () => {
    if (!inputText.trim()) {
      setError('请输入内容')
      return
    }

    setError('')
    setIsGenerating(true)

    // 处理URL格式，确保包含协议前缀
    let processedText = inputText.trim()
    if (/^https?:\/\//i.test(processedText)) {
      // 已经包含协议前缀
    } else if (/^[a-zA-Z0-9][a-zA-Z0-9.-]*\.[a-zA-Z]{2,}(\/.*)?$/i.test(processedText)) {
      // 看起来像网址但缺少协议，自动添加https
      processedText = 'https://' + processedText
    }

    try {
      const url = await QRCode.toDataURL(processedText, {
        width: 300,
        margin: 2,
        color: {
          dark: '#ffffff',
          light: '#020205'
        },
        errorCorrectionLevel: 'H'
      })
      setQrCodeUrl(url)
    } catch (err) {
      setError('生成二维码失败，请重试')
      console.error(err)
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadQRCode = () => {
    if (!qrCodeUrl) return

    const link = document.createElement('a')
    link.href = qrCodeUrl
    link.download = `qrcode-${Date.now()}.png`
    link.click()
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      generateQRCode()
    }
  }

  return (
    <div className="qrcode-generator">
      <div className="qrcode-container">
        <div className="qrcode-input-section">
          <h2 className="qrcode-title">QR CODE GENERATOR</h2>
          <p className="qrcode-subtitle">生成专属二维码</p>
          
          <div className="input-wrapper">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="输入网址或文本..."
              className="qrcode-input"
              maxLength={500}
            />
            <button
              onClick={generateQRCode}
              disabled={isGenerating}
              className="generate-button"
            >
              {isGenerating ? '生成中...' : '生成'}
            </button>
          </div>

          {error && <p className="error-message">{error}</p>}
        </div>

        <div className="qrcode-display-section">
          {qrCodeUrl ? (
            <div className="qrcode-result">
              <div className="qrcode-image-wrapper">
                <img
                  src={qrCodeUrl}
                  alt="QR Code"
                  className="qrcode-image"
                />
                <div className="qrcode-overlay" />
              </div>
              <button
                onClick={downloadQRCode}
                className="download-button"
              >
                下载二维码
              </button>
            </div>
          ) : (
            <div className="qrcode-placeholder">
              <div className="placeholder-content">
                <div className="placeholder-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <path d="M3 14h7v7H3z" />
                    <path d="M10 10h1v1h-1z" />
                    <path d="M13 10h1v1h-1z" />
                    <path d="M10 13h1v1h-1z" />
                  </svg>
                </div>
                <p className="placeholder-text">输入内容生成二维码</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default QRCodeGenerator
