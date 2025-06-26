import React from 'react';

function AdminTabs({ activeTab, onTabChange }) {
  const tabs = [
    'Home',
    'Organization', 
    'Projects',
    'Notice',
    'Service Request',
    'Help Center'
  ];

  return (
    <div className="admin-tabs">
      <div className="tab-list">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AdminTabs;