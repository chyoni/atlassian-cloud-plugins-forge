import React, { useState, useEffect } from 'react';
import { invoke } from '@forge/bridge';

function OrganizationSettings({ settings, onUpdate }) {
  const [organizationData, setOrganizationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    category: '조직',
    chonggwal: '',
    hyundai: '',
    kia: '',
    group: ''
  });

  useEffect(() => {
    loadOrganizationData();
  }, []);

  const loadOrganizationData = async () => {
    try {
      setLoading(true);
      const response = await invoke('getOrganizationData');
      console.log('Loaded organization data:', response);
      setOrganizationData(response.data || []);
    } catch (error) {
      console.error('Error loading organization data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSettingChange = (key, value) => {
    onUpdate({ [key]: value });
  };

  const handleEdit = (item) => {
    setEditingItem({ ...item });
  };

  const handleSaveEdit = async () => {
    try {
      const response = await invoke('updateOrganizationItem', {
        id: editingItem.id,
        updatedItem: editingItem
      });
      
      if (response.success) {
        setOrganizationData(response.data);
        setEditingItem(null);
        console.log('Item updated successfully');
      }
    } catch (error) {
      console.error('Error updating organization item:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  const handleAdd = async () => {
    try {
      const response = await invoke('addOrganizationItem', {
        newItem: newItem
      });
      
      if (response.success) {
        setOrganizationData(response.data);
        setNewItem({
          category: '조직',
          chonggwal: '',
          hyundai: '',
          kia: '',
          group: ''
        });
        setShowAddForm(false);
        console.log('Item added successfully');
      }
    } catch (error) {
      console.error('Error adding organization item:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      try {
        const response = await invoke('deleteOrganizationItem', { id });
        
        if (response.success) {
          setOrganizationData(response.data);
          console.log('Item deleted successfully');
        }
      } catch (error) {
        console.error('Error deleting organization item:', error);
      }
    }
  };

  const renderEditForm = (item) => (
    <div className="org-edit-row">
      <input
        type="text"
        value={item.category}
        onChange={(e) => setEditingItem({ ...item, category: e.target.value })}
        placeholder="Category"
      />
      <input
        type="text"
        value={item.chonggwal || ''}
        onChange={(e) => setEditingItem({ ...item, chonggwal: e.target.value })}
        placeholder="총괄"
      />
      <input
        type="text"
        value={item.hyundai || ''}
        onChange={(e) => setEditingItem({ ...item, hyundai: e.target.value })}
        placeholder="현대"
      />
      <input
        type="text"
        value={item.kia || ''}
        onChange={(e) => setEditingItem({ ...item, kia: e.target.value })}
        placeholder="기아"
      />
      <input
        type="text"
        value={item.group || ''}
        onChange={(e) => setEditingItem({ ...item, group: e.target.value })}
        placeholder="그룹사"
      />
      <div className="edit-actions">
        <button className="save-edit-btn" onClick={handleSaveEdit}>저장</button>
        <button className="cancel-edit-btn" onClick={handleCancelEdit}>취소</button>
      </div>
    </div>
  );

  const renderAddForm = () => (
    <div className="org-edit-row">
      <input
        type="text"
        value={newItem.category}
        onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
        placeholder="Category"
      />
      <input
        type="text"
        value={newItem.chonggwal}
        onChange={(e) => setNewItem({ ...newItem, chonggwal: e.target.value })}
        placeholder="총괄"
      />
      <input
        type="text"
        value={newItem.hyundai}
        onChange={(e) => setNewItem({ ...newItem, hyundai: e.target.value })}
        placeholder="현대"
      />
      <input
        type="text"
        value={newItem.kia}
        onChange={(e) => setNewItem({ ...newItem, kia: e.target.value })}
        placeholder="기아"
      />
      <input
        type="text"
        value={newItem.group}
        onChange={(e) => setNewItem({ ...newItem, group: e.target.value })}
        placeholder="그룹사"
      />
      <div className="edit-actions">
        <button className="save-edit-btn" onClick={handleAdd}>추가</button>
        <button className="cancel-edit-btn" onClick={() => setShowAddForm(false)}>취소</button>
      </div>
    </div>
  );

  if (loading) {
    return <div className="loading">조직 데이터를 불러오는 중...</div>;
  }

  return (
    <div className="settings-section">
      <h2>조직 페이지 설정</h2>
      
      <div className="setting-item">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={settings.enableOrganization}
            onChange={(e) => handleSettingChange('enableOrganization', e.target.checked)}
          />
          <span>조직 페이지 활성화</span>
        </label>
        <small>조직 페이지를 활성화하여 사용자가 접근할 수 있도록 합니다.</small>
      </div>

      <div className="setting-item">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={settings.showCategory}
            onChange={(e) => handleSettingChange('showCategory', e.target.checked)}
          />
          <span>카테고리 컬럼 표시</span>
        </label>
        <small>조직 테이블에 카테고리 컬럼을 표시합니다.</small>
      </div>

      <div className="setting-item">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={settings.enableLinks}
            onChange={(e) => handleSettingChange('enableLinks', e.target.checked)}
          />
          <span>조직 링크 활성화</span>
        </label>
        <small>조직명을 클릭할 수 있는 링크로 표시합니다.</small>
      </div>

      <div className="organization-data-section">
        <h3>조직 데이터 관리</h3>
        <p>현재 매크로에서 표시되는 조직 정보를 관리할 수 있습니다.</p>
        
        <div className="data-actions">
          <button 
            className="add-btn"
            onClick={() => setShowAddForm(true)}
            disabled={showAddForm}
          >
            + 새 조직 추가
          </button>
        </div>

        <div className="organization-admin-table">
          <div className="org-admin-header">
            <div>Category</div>
            <div>총괄</div>
            <div>현대</div>
            <div>기아</div>
            <div>그룹사</div>
            <div>Actions</div>
          </div>
          
          {showAddForm && renderAddForm()}
          
          {organizationData.length === 0 ? (
            <div className="org-admin-row">
              <div colSpan="6" style={{textAlign: 'center', padding: '20px', color: '#6b7280'}}>
                조직 데이터가 없습니다.
              </div>
            </div>
          ) : (
            organizationData.map((org) => (
              <div key={org.id}>
                {editingItem && editingItem.id === org.id ? (
                  renderEditForm(editingItem)
                ) : (
                  <div className="org-admin-row">
                    <div>{org.category}</div>
                    <div>{org.chonggwal || '-'}</div>
                    <div>{org.hyundai || '-'}</div>
                    <div>{org.kia || '-'}</div>
                    <div>{org.group || '-'}</div>
                    <div className="row-actions">
                      <button 
                        className="edit-btn"
                        onClick={() => handleEdit(org)}
                      >
                        편집
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDelete(org.id)}
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default OrganizationSettings;