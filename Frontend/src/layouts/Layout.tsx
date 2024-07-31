import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Menu from './Menu'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div id="wrapper">
      <Menu />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Header />
          {children}
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Layout
