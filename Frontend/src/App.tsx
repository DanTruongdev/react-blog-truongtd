import React, { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import NewPage from './pages/NewPage'
import SearchPage from './pages/SearchPage'
import UpdatePage from './pages/UpdatePage'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/new" element={<NewPage />} />
          <Route path="/update" element={<UpdatePage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
