import React from 'react'
import ToolCard from './ToolCard'
import './ToolsGrid.css'

const tools = [
  {
    id: 1,
    title: '文本处理工具',
    description: '快速处理文本，支持格式转换、编码解码等功能',
    icon: '📝',
    category: '文本',
    color: '#667eea',
    label: 'Text Tools'
  },
  {
    id: 2,
    title: '图片编辑器',
    description: '在线图片编辑，支持裁剪、滤镜、水印等功能',
    icon: '🖼️',
    category: '图片',
    color: '#f093fb',
    label: 'Image Tools'
  },
  {
    id: 3,
    title: 'JSON 格式化',
    description: '美化 JSON 数据，支持语法高亮和错误检测',
    icon: '🔧',
    category: '开发',
    color: '#4facfe',
    label: 'Dev Tools'
  },
  {
    id: 4,
    title: '颜色转换器',
    description: '支持 HEX、RGB、HSL 等多种颜色格式转换',
    icon: '🎨',
    category: '设计',
    color: '#43e97b',
    label: 'Design Tools'
  },
  {
    id: 5,
    title: '二维码生成器',
    description: '快速生成二维码，支持自定义颜色和大小',
    icon: '📱',
    category: '工具',
    color: '#fa709a',
    label: 'Utility Tools'
  },
  {
    id: 6,
    title: '正则表达式测试',
    description: '在线测试正则表达式，实时匹配结果',
    icon: '🔍',
    category: '开发',
    color: '#f6d365',
    label: 'Dev Tools'
  }
]

function ToolsGrid() {
  return (
    <section className="tools-grid-section">
      <div className="tools-grid-container">
        <h2 className="section-title">我的工具</h2>
        <div className="tools-grid">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ToolsGrid
