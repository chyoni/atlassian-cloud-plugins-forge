import React from 'react';

function ProjectsSettings({ settings, onUpdate }) {
  const handleChange = (key, value) => {
    onUpdate({ [key]: value });
  };

  return (
    <div className="settings-section">
      <h2>프로젝트 페이지 설정</h2>
      
      <div className="setting-item">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={settings.enableProjects}
            onChange={(e) => handleChange('enableProjects', e.target.checked)}
          />
          <span>프로젝트 페이지 활성화</span>
        </label>
        <small>프로젝트 페이지를 활성화하여 사용자가 접근할 수 있도록 합니다.</small>
      </div>

      <div className="setting-item">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={settings.showInProgress}
            onChange={(e) => handleChange('showInProgress', e.target.checked)}
          />
          <span>진행 중인 프로젝트 표시</span>
        </label>
        <small>진행 중인 프로젝트를 표시합니다.</small>
      </div>

      <div className="setting-item">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={settings.showCompleted}
            onChange={(e) => handleChange('showCompleted', e.target.checked)}
          />
          <span>완료된 프로젝트 표시</span>
        </label>
        <small>완료된 프로젝트를 표시합니다.</small>
      </div>
    </div>
  );
}

export default ProjectsSettings;