import React, { useState, useEffect } from 'react';
import { invoke } from '@forge/bridge';

function OrganizationPage() {
  const [organizationData, setOrganizationData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrganizationData();
  }, []);

  const loadOrganizationData = async () => {
    try {
      setLoading(true);
      const response = await invoke('getOrganizationData');
      setOrganizationData(response.data || []);
    } catch (error) {
      console.error('Error loading organization data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="page-content">
        <div className="loading">조직 데이터를 불러오는 중...</div>
      </section>
    );
  }

  return (
    <section className="page-content">
      <div className="page-header">
        <h2>Organization</h2>
        <p>HMG 조직 구조를 확인하세요.</p>
      </div>
      
      <div className="organization-table">
        <div className="org-table-header">
          <div className="col-category">Category</div>
          <div className="col-chonggwal">총괄</div>
          <div className="col-hyundai">현대</div>
          <div className="col-kia">기아</div>
          <div className="col-group">그룹사</div>
        </div>
        
        {organizationData.map((org, index) => (
          <div key={org.id || index} className="org-table-row">
            <div className="col-category">{org.category}</div>
            <div className="col-chonggwal">
              {org.chonggwal && <a href="#" className="org-link">{org.chonggwal}</a>}
            </div>
            <div className="col-hyundai">
              {org.hyundai && <a href="#" className="org-link">{org.hyundai}</a>}
            </div>
            <div className="col-kia">
              {org.kia && <a href="#" className="org-link">{org.kia}</a>}
            </div>
            <div className="col-group">
              {org.group && <a href="#" className="org-link">{org.group}</a>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default OrganizationPage;