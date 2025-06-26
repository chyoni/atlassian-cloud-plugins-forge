import React, { useState, useEffect } from 'react';
import { invoke } from '@forge/bridge';
import AdminHeader from './components/AdminHeader';
import AdminTabs from './components/AdminTabs';
import HomeSettings from './components/settings/HomeSettings';
import OrganizationSettings from './components/settings/OrganizationSettings';
import ProjectsSettings from './components/settings/ProjectsSettings';
import NoticeSettings from './components/settings/NoticeSettings';
import ServiceRequestSettings from './components/settings/ServiceRequestSettings';
import HelpCenterSettings from './components/settings/HelpCenterSettings';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [settings, setSettings] = useState({
    home: {
      appName: 'HMG Index',
      welcomeMessage: '현대자동차그룹의 혁신을 이끄는 통합정보 인덱스페이지 입니다.',
      enableWelcome: true,
      showActionButtons: true,
      maxNotices: 5
    },
    organization: {
      enableOrganization: true,
      showCategory: true,
      enableLinks: true
    },
    projects: {
      enableProjects: true,
      showInProgress: true,
      showCompleted: false
    },
    notice: {
      enableNotice: true,
      showDate: true,
      showCreator: true,
      maxItems: 10
    },
    serviceRequest: {
      enableServiceRequest: true,
      showPriority: true,
      showStatus: true
    },
    helpCenter: {
      enableHelpCenter: true,
      showFAQ: true,
      showContact: true
    }
  });
  
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      console.log('Loading settings...');
      setMessage('설정을 불러왔습니다.');
    } catch (error) {
      setMessage('설정 로드 중 오류가 발생했습니다.');
    }
  };

  const updateSettings = (tabName, newSettings) => {
    setSettings(prev => ({
      ...prev,
      [tabName]: { ...prev[tabName], ...newSettings }
    }));
  };

  const saveSettings = async () => {
    try {
      console.log('Saving settings:', settings);
      setMessage('설정이 저장되었습니다.');
    } catch (error) {
      setMessage('설정 저장 중 오류가 발생했습니다.');
    }
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'Home':
        return <HomeSettings settings={settings.home} onUpdate={(newSettings) => updateSettings('home', newSettings)} />;
      case 'Organization':
        return <OrganizationSettings settings={settings.organization} onUpdate={(newSettings) => updateSettings('organization', newSettings)} />;
      case 'Projects':
        return <ProjectsSettings settings={settings.projects} onUpdate={(newSettings) => updateSettings('projects', newSettings)} />;
      case 'Notice':
        return <NoticeSettings settings={settings.notice} onUpdate={(newSettings) => updateSettings('notice', newSettings)} />;
      case 'Service Request':
        return <ServiceRequestSettings settings={settings.serviceRequest} onUpdate={(newSettings) => updateSettings('serviceRequest', newSettings)} />;
      case 'Help Center':
        return <HelpCenterSettings settings={settings.helpCenter} onUpdate={(newSettings) => updateSettings('helpCenter', newSettings)} />;
      default:
        return <HomeSettings settings={settings.home} onUpdate={(newSettings) => updateSettings('home', newSettings)} />;
    }
  };

  return (
    <div className="admin-app">
      <div className="admin-container">
        <AdminHeader />
        
        <main className="admin-content">
          {message && (
            <div className="message-box">
              {message}
            </div>
          )}

          <AdminTabs 
            activeTab={activeTab} 
            onTabChange={setActiveTab}
          />

          <div className="tab-content">
            {renderTabContent()}
          </div>

          <div className="admin-actions">
            <button className="save-btn" onClick={saveSettings}>
              💾 설정 저장
            </button>
            <button className="reset-btn" onClick={loadSettings}>
              🔄 설정 초기화
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;