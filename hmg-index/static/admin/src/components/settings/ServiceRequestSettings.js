import React from 'react';

function ServiceRequestSettings({ settings, onUpdate }) {
  const handleChange = (key, value) => {
    onUpdate({ [key]: value });
  };

  return (
    <div className="settings-section">
      <h2>서비스 요청 페이지 설정</h2>
      
      <div className="setting-item">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={settings.enableServiceRequest}
            onChange={(e) => handleChange('enableServiceRequest', e.target.checked)}
          />
          <span>서비스 요청 페이지 활성화</span>
        </label>
        <small>서비스 요청 페이지를 활성화하여 사용자가 접근할 수 있도록 합니다.</small>
      </div>

      <div className="setting-item">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={settings.showPriority}
            onChange={(e) => handleChange('showPriority', e.target.checked)}
          />
          <span>우선순위 표시</span>
        </label>
        <small>서비스 요청의 우선순위를 표시합니다.</small>
      </div>

      <div className="setting-item">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={settings.showStatus}
            onChange={(e) => handleChange('showStatus', e.target.checked)}
          />
          <span>상태 표시</span>
        </label>
        <small>서비스 요청의 상태를 표시합니다.</small>
      </div>
    </div>
  );
}

export default ServiceRequestSettings;