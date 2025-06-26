import React from 'react';

function HelpCenterSettings({ settings, onUpdate }) {
  const handleChange = (key, value) => {
    onUpdate({ [key]: value });
  };

  return (
    <div className="settings-section">
      <h2>도움말 센터 페이지 설정</h2>
      
      <div className="setting-item">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={settings.enableHelpCenter}
            onChange={(e) => handleChange('enableHelpCenter', e.target.checked)}
          />
          <span>도움말 센터 페이지 활성화</span>
        </label>
        <small>도움말 센터 페이지를 활성화하여 사용자가 접근할 수 있도록 합니다.</small>
      </div>

      <div className="setting-item">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={settings.showFAQ}
            onChange={(e) => handleChange('showFAQ', e.target.checked)}
          />
          <span>FAQ 섹션 표시</span>
        </label>
        <small>자주 묻는 질문 섹션을 표시합니다.</small>
      </div>

      <div className="setting-item">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={settings.showContact}
            onChange={(e) => handleChange('showContact', e.target.checked)}
          />
          <span>연락처 정보 표시</span>
        </label>
        <small>연락처 정보 섹션을 표시합니다.</small>
      </div>
    </div>
  );
}

export default HelpCenterSettings;