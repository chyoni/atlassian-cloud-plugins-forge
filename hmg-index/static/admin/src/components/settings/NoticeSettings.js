import React from 'react';

function NoticeSettings({ settings, onUpdate }) {
  const handleChange = (key, value) => {
    onUpdate({ [key]: value });
  };

  return (
    <div className="settings-section">
      <h2>공지사항 페이지 설정</h2>
      
      <div className="setting-item">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={settings.enableNotice}
            onChange={(e) => handleChange('enableNotice', e.target.checked)}
          />
          <span>공지사항 페이지 활성화</span>
        </label>
        <small>공지사항 페이지를 활성화하여 사용자가 접근할 수 있도록 합니다.</small>
      </div>

      <div className="setting-item">
        <label htmlFor="maxItems">최대 공지사항 수</label>
        <input
          type="number"
          id="maxItems"
          value={settings.maxItems}
          onChange={(e) => handleChange('maxItems', parseInt(e.target.value))}
          min="1"
          max="50"
        />
        <small>공지사항 페이지에 표시될 최대 항목 수입니다.</small>
      </div>

      <div className="setting-item">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={settings.showDate}
            onChange={(e) => handleChange('showDate', e.target.checked)}
          />
          <span>날짜 표시</span>
        </label>
        <small>공지사항의 날짜 정보를 표시합니다.</small>
      </div>

      <div className="setting-item">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={settings.showCreator}
            onChange={(e) => handleChange('showCreator', e.target.checked)}
          />
          <span>작성자 표시</span>
        </label>
        <small>공지사항의 작성자 정보를 표시합니다.</small>
      </div>
    </div>
  );
}

export default NoticeSettings;