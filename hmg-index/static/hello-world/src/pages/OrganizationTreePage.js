import React, { useState, useEffect } from 'react';
import { invoke } from '@forge/bridge';

function OrganizationTreePage({ onBack }) {
  const [organizationData, setOrganizationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadOrganizationTreeData();
  }, []);

  const loadOrganizationTreeData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // 외부 API에서 조직도 데이터 가져오기
      const response = await invoke('getExternalOrganizationData');
      
      if (response.success) {
        setOrganizationData(response.data || []);
      } else {
        setError(response.message || '조직도 데이터를 불러오는데 실패했습니다.');
      }
    } catch (error) {
      console.error('Error loading organization tree data:', error);
      setError('조직도 데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const renderTreeNode = (node, level = 0) => {
    const indentStyle = {
      marginLeft: `${level * 20}px`,
      padding: '8px 0',
      borderLeft: level > 0 ? '2px solid #e0e0e0' : 'none',
      paddingLeft: level > 0 ? '15px' : '0'
    };

    return (
      <div key={node.id} className="tree-node" style={indentStyle}>
        <div className="node-content">
          <span className="node-icon">🏢</span>
          <span className="node-title">{node.chonggwal}</span>
          <div className="node-details">
            <div className="detail-item">
              <strong>현대:</strong> {node.hyundai}
            </div>
            <div className="detail-item">
              <strong>기아:</strong> {node.kia}
            </div>
            <div className="detail-item">
              <strong>그룹사:</strong> {node.group}
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <section className="page-content">
        <div className="page-header">
          <button className="back-btn" onClick={onBack}>
            ← 뒤로 가기
          </button>
          <h2>나의 조직도</h2>
          <p>외부 API에서 가져온 조직도 정보입니다.</p>
        </div>
        <div className="loading">조직도 데이터를 불러오는 중...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="page-content">
        <div className="page-header">
          <button className="back-btn" onClick={onBack}>
            ← 뒤로 가기
          </button>
          <h2>나의 조직도</h2>
          <p>외부 API에서 가져온 조직도 정보입니다.</p>
        </div>
        <div className="error-message">
          <p>❌ {error}</p>
          <button onClick={loadOrganizationTreeData} className="retry-btn">
            다시 시도
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="page-content">
      <div className="page-header">
        <button className="back-btn" onClick={onBack}>
          ← 뒤로 가기
        </button>
        <h2>나의 조직도</h2>
        <p>외부 API에서 가져온 조직도 정보입니다.</p>
      </div>
      
      <div className="organization-tree">
        <div className="tree-header">
          <h3>조직 구조도</h3>
          <span className="tree-count">총 {organizationData.length}개 조직</span>
        </div>
        
        <div className="tree-container">
          {organizationData.map((org) => renderTreeNode(org))}
        </div>
      </div>
    </section>
  );
}

export default OrganizationTreePage; 