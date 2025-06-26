import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import OrganizationPage from './pages/OrganizationPage';
import OrganizationTreePage from './pages/OrganizationTreePage';
import ProjectsPage from './pages/ProjectsPage';
import NoticePage from './pages/NoticePage';
import ServiceRequestPage from './pages/ServiceRequestPage';
import HelpCenterPage from './pages/HelpCenterPage';
import SpaceSearchPage from './pages/SpaceSearchPage';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [activeMenu, setActiveMenu] = useState('Home');

  useEffect(() => {
    invoke('getText', { example: 'my-invoke-variable' }).then(setData);
  }, []);

  const handleMenuClick = (menuItem) => {
    setActiveMenu(menuItem);
  };

  const handleSpaceSearchClick = () => {
    setActiveMenu('SpaceSearch');
  };

  const handleOrganizationTreeClick = () => {
    setActiveMenu('OrganizationTree');
  };

  const handleBackToHome = () => {
    setActiveMenu('Home');
  };

  const renderContent = () => {
    switch(activeMenu) {
      case 'Home':
        return <HomePage onSpaceSearchClick={handleSpaceSearchClick} onOrganizationTreeClick={handleOrganizationTreeClick} />;
      case 'Organization':
        return <OrganizationPage />;
      case 'OrganizationTree':
        return <OrganizationTreePage onBack={handleBackToHome} />;
      case 'Projects':
        return <ProjectsPage />;
      case 'Notice':
        return <NoticePage />;
      case 'Service Request':
        return <ServiceRequestPage />;
      case 'Help Center':
        return <HelpCenterPage />;
      case 'SpaceSearch':
        return <SpaceSearchPage onBack={handleBackToHome} />;
      default:
        return <HomePage onSpaceSearchClick={handleSpaceSearchClick} onOrganizationTreeClick={handleOrganizationTreeClick} />;
    }
  };

  return (
    <div className="hmg-index">
      <Header />
      <Navigation 
        activeMenu={activeMenu} 
        onMenuClick={handleMenuClick} 
      />
      
      <main className="main-content">
        {renderContent()}
      </main>

      <Footer />
    </div>
  );
}

export default App;