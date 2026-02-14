import React, { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import ToolsGrid from './components/ToolsGrid'
import Footer from './components/Footer'
import RetroBackground from './components/RetroBackground'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <RetroBackground />
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <Hero />
      <ToolsGrid />
      <Footer />
    </div>
  )
}

export default App
