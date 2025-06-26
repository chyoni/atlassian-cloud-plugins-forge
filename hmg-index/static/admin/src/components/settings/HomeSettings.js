import React from 'react';

function HomeSettings({ settings, onUpdate }) {
  const handleChange = (key, value) => {
    onUpdate({ [key]: value });
  };

  return (
    <div className="settings-section">
      <h2>홈 페이지 설정</h2>
      
      <div className="setting-item">
        <label htmlFor="appName">앱 이름</label>
        <input
          type="text"
          id="appName"
          value={settings.appName}
          onChange={(e) => handleChange('appName', e.target.value)}
          placeholder="앱 이름을 입력하세요"
        />
        <small>Confluence에서 표시될 앱의 이름입니다.</small>
      </div>

      <div className="setting-item">
        <label htmlFor="welcomeMessage">환영 메시지</label>
        <input
          type="text"
          id="welcomeMessage"
          value={settings.welcomeMessage}
          onChange={(e) => handleChange('welcomeMessage', e.target.value)}
          placeholder="환영 메시지를 입력하세요"
        />
        <small>홈 페이지에 표시될 환영 메시지입니다.</small>
      </div>

      <div className="setting-item">
        <label htmlFor="maxNotices">최대 공지사항 수</label>
        <input
          type="number"
          id="maxNotices"
          value={settings.maxNotices}
          onChange={(e) => handleChange('maxNotices', parseInt(e.target.value))}
          min="1"
          max="20"
        />
        <small>홈 화면에 표시될 최대 공지사항 개수입니다.</small>
      </div>

      <div className="setting-item">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={settings.enableWelcome}
            onChange={(e) => handleChange('enableWelcome', e.target.checked)}
          />
          <span>환영 섹션 표시</span>
        </label>
        <small>홈 페이지에 환영 섹션을 표시합니다.</small>
      </div>

      <div className="setting-item">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={settings.showActionButtons}
            onChange={(e) => handleChange('showActionButtons', e.target.checked)}
          />
          <span>액션 버튼 표시</span>
        </label>
        <small>홈 페이지에 액션 버튼들을 표시합니다.</small>
      </div>
    </div>
  );
}

export default HomeSettings;