import React from 'react';

function Navigation({ activeMenu, onMenuClick }) {
  const menuItems = ['Home', 'Organization', 'Projects', 'Notice', 'Service Request', 'Help Center'];

  return (
    <nav className="navigation">
      <ul className="nav-list">
        {menuItems.map((item) => (
          <li 
            key={item}
            className={`nav-item ${activeMenu === item ? 'active' : ''}`}
            onClick={() => onMenuClick(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;