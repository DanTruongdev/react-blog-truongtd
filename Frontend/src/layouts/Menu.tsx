import React from 'react'

const Menu: React.FC = () => {
  return (
    <ul
      className="navbar-nav bg-dark sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      {/* Divider */}
      <hr className="sidebar-divider my-0" />
      {/* Nav Item - Dashboard */}
      <li className="nav-item active">
        <a className="nav-link" href="index.html">
          <i className="fas fa-fw fa-tachometer-alt" />
          <h3>Menu</h3>
        </a>
      </li>
      {/* Divider */}
      <hr className="sidebar-divider" />
      {/* Nav Item - Pages Collapse Menu */}
      <li className="nav-item">
        <a className="nav-link collapsed" href="/" aria-expanded="true">
          <i className="bi bi-list" />
          <span>List</span>
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link collapsed" href="/new" aria-expanded="true">
          <i className="bi bi-plus-circle-fill" />
          <span>New</span>
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link collapsed" href="/search" aria-expanded="true">
          <i className="bi bi-search" />
          <span>Search</span>
        </a>
      </li>
    </ul>
  )
}
export default Menu
