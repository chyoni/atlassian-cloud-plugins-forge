/**
 * 빈 상태 공통 컴포넌트
 * 
 * 데이터가 없거나 검색 결과가 없을 때 표시되는 컴포넌트입니다.
 * 다양한 상황에 맞는 아이콘과 메시지를 지원합니다.
 * 
 * @component
 */

import React from 'react';

/**
 * EmptyState 컴포넌트
 * 
 * @param {Object} props - 컴포넌트 props
 * @param {string} [props.icon='📭'] - 표시할 아이콘
 * @param {string} props.title - 메인 제목
 * @param {string} [props.description] - 부가 설명
 * @param {Function} [props.onAction] - 액션 버튼 클릭 핸들러
 * @param {string} [props.actionText] - 액션 버튼 텍스트
 * @param {string} [props.className] - 추가 CSS 클래스
 * @returns {JSX.Element} 빈 상태 컴포넌트
 */
function EmptyState({ 
  icon = '📭', 
  title, 
  description, 
  onAction, 
  actionText = '새로고침',
  className = '' 
}) {
  
  return (
    <div className={`empty-content ${className}`}>
      <div className="empty-icon" role="img" aria-label="빈 상태">
        {icon}
      </div>
      
      <h3 className="empty-title">{title}</h3>
      
      {description && (
        <p className="empty-description">{description}</p>
      )}
      
      {onAction && (
        <div className="empty-actions">
          <button 
            onClick={onAction}
            className="empty-action-btn"
            type="button"
          >
            {actionText}
          </button>
        </div>
      )}
    </div>
  );
}

export default EmptyState;