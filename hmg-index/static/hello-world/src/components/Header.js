import React from 'react';

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="main-title">HMG Index</h1>
          <p className="sub-title">HYUNDAI MOTOR GROUP</p>
        </div>
        <div className="header-right">
          <span className="language-selector">
            <span className="active">KR</span> | <span>EN</span>
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;