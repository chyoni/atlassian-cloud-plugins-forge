import React, { useState, useEffect } from 'react';
import { invoke } from '@forge/bridge';

function SpaceSearchPage({ onBack }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    // 최초 진입 시 모든 스페이스 불러오기
    fetchSpaces('');
  }, []);

  const fetchSpaces = async (query) => {
    setLoading(true);
    setMessage('');
    try {
      const response = await invoke('searchSpaces', { query });
      if (response.success) {
        setSpaces(response.spaces || []);
        if ((response.spaces || []).length === 0) {
          setMessage('검색 결과가 없습니다.');
        }
      } else {
        setMessage(response.message || '스페이스 검색 중 오류가 발생했습니다.');
        setSpaces([]);
      }
    } catch (error) {
      setMessage('스페이스 검색 중 오류가 발생했습니다.');
      setSpaces([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setHasSearched(true);
    fetchSpaces(searchQuery);
  };

  const handleSpaceClick = (space) => {
    if (space._links && space._links.webui) {
      // Confluence 스페이스 링크로 이동
      window.open(space._links.webui, '_blank');
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleReset = () => {
    setSearchQuery('');
    setHasSearched(false);
    fetchSpaces('');
  };

  return (
    <section className="page-content">
      <div className="page-header">
        <div className="page-header-with-actions">
          <div>
            <h2>스페이스 검색</h2>
            <p>Confluence 스페이스를 검색하고 탐색할 수 있습니다.</p>
          </div>
          <button className="back-btn" onClick={onBack}>
            <span className="icon">←</span>
            돌아가기
          </button>
        </div>
      </div>

      <div className="space-search-container">
        <div className="search-form-container">
          <form onSubmit={handleSearch} className="space-search-form">
            <div className="search-input-group" style={{ position: 'relative' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder="스페이스 이름이나 키워드를 입력하세요..."
                className="search-input"
                disabled={loading}
                autoComplete="off"
              />
              <div className="search-actions">
                <button 
                  type="submit" 
                  className="search-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="loading-spinner"></span>
                      검색 중...
                    </>
                  ) : (
                    <>
                      <span className="icon">🔍</span>
                      검색
                    </>
                  )}
                </button>
                <button 
                  type="button" 
                  className="reset-btn"
                  onClick={handleReset}
                  disabled={loading}
                >
                  <span className="icon">🔄</span>
                  초기화
                </button>
              </div>
            </div>
          </form>

          {message && (
            <div className="message-alert">
              {message}
            </div>
          )}
        </div>

        <div className="search-results">
          {!hasSearched && !loading && (
            <div className="search-placeholder">
              <div className="placeholder-icon">🔍</div>
              <h3>스페이스를 검색해보세요</h3>
              <p>검색창에 스페이스 이름이나 키워드를 입력하여 원하는 스페이스를 찾을 수 있습니다.</p>
            </div>
          )}

          {spaces.length > 0 && (
            <>
              <div className="results-header">
                <h3>검색 결과 ({spaces.length}개)</h3>
              </div>
              
              <div className="spaces-grid">
                {spaces.map((space) => (
                  <div 
                    key={space.id} 
                    className="space-card"
                    onClick={() => handleSpaceClick(space)}
                  >
                    <div className="space-card-header">
                      <div className="space-icon">🏠</div>
                      <div className="space-info">
                        <h4 className="space-name">{space.name}</h4>
                        <span className="space-key">{space.key}</span>
                      </div>
                      <div className="space-status">
                        <span className={`status-badge ${space.status?.toLowerCase()}`}>
                          {space.status || 'CURRENT'}
                        </span>
                      </div>
                    </div>
                    
                    {space.description && (
                      <div className="space-description">
                        <p>{space.description}</p>
                      </div>
                    )}
                    
                    <div className="space-card-footer">
                      <span className="space-type">
                        {space.type === 'global' ? '전역 스페이스' : '일반 스페이스'}
                      </span>
                      <span className="space-link-icon">→</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default SpaceSearchPage;