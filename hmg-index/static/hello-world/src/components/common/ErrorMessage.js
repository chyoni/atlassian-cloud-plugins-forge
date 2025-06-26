/**
 * 에러 메시지 공통 컴포넌트
 * 
 * 에러 상황에서 사용자에게 표시되는 에러 메시지 컴포넌트입니다.
 * 다양한 에러 타입과 재시도 기능을 지원합니다.
 * 
 * @component
 */

import React from 'react';

/**
 * ErrorMessage 컴포넌트
 * 
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.message - 에러 메시지
 * @param {string} [props.type='error'] - 에러 타입 ('error', 'warning', 'info')
 * @param {Function} [props.onRetry] - 재시도 버튼 클릭 핸들러
 * @param {string} [props.retryText='다시 시도'] - 재시도 버튼 텍스트
 * @param {boolean} [props.showIcon=true] - 아이콘 표시 여부
 * @param {string} [props.className] - 추가 CSS 클래스
 * @returns {JSX.Element} 에러 메시지 컴포넌트
 */
function ErrorMessage({ 
  message, 
  type = 'error', 
  onRetry, 
  retryText = '다시 시도',
  showIcon = true,
  className = '' 
}) {
  
  // 타입별 아이콘 정의
  const typeIcons = {
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };
  
  // 타입별 CSS 클래스 정의
  const typeClasses = {
    error: 'error-message-error',
    warning: 'error-message-warning',
    info: 'error-message-info'
  };
  
  return (
    <div className={`error-message ${typeClasses[type]} ${className}`}>
      <div className="error-content">
        {showIcon && (
          <span className="error-icon" role="img" aria-label={type}>
            {typeIcons[type]}
          </span>
        )}
        <p className="error-text">{message}</p>
      </div>
      
      {onRetry && (
        <div className="error-actions">
          <button 
            onClick={onRetry}
            className="retry-btn"
            type="button"
            aria-label={retryText}
          >
            <span className="retry-icon">🔄</span>
            {retryText}
          </button>
        </div>
      )}
    </div>
  );
}

export default ErrorMessage;