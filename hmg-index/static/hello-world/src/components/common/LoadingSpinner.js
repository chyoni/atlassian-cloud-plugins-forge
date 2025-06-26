/**
 * 로딩 스피너 공통 컴포넌트
 * 
 * 데이터 로딩 중에 표시되는 스피너 컴포넌트입니다.
 * 다양한 크기와 스타일을 지원합니다.
 * 
 * @component
 */

import React from 'react';

/**
 * LoadingSpinner 컴포넌트
 * 
 * @param {Object} props - 컴포넌트 props
 * @param {string} [props.size='medium'] - 스피너 크기 ('small', 'medium', 'large')
 * @param {string} [props.color='primary'] - 스피너 색상 ('primary', 'white', 'gray')
 * @param {string} [props.message] - 로딩 메시지
 * @param {string} [props.className] - 추가 CSS 클래스
 * @returns {JSX.Element} 로딩 스피너 컴포넌트
 */
function LoadingSpinner({ 
  size = 'medium', 
  color = 'primary', 
  message = '로딩 중...', 
  className = '' 
}) {
  
  // 크기별 스타일 정의
  const sizeStyles = {
    small: {
      width: '16px',
      height: '16px',
      borderWidth: '2px'
    },
    medium: {
      width: '24px',
      height: '24px',
      borderWidth: '3px'
    },
    large: {
      width: '40px',
      height: '40px',
      borderWidth: '4px'
    }
  };
  
  // 색상별 스타일 정의
  const colorStyles = {
    primary: {
      borderColor: '#4f46e5',
      borderTopColor: 'transparent'
    },
    white: {
      borderColor: '#ffffff',
      borderTopColor: 'transparent'
    },
    gray: {
      borderColor: '#6b7280',
      borderTopColor: 'transparent'
    }
  };
  
  const spinnerStyle = {
    ...sizeStyles[size],
    ...colorStyles[color],
    borderStyle: 'solid',
    borderRadius: '50%',
    display: 'inline-block',
    animation: 'spin 1s linear infinite'
  };
  
  return (
    <div className={`loading-spinner-container ${className}`}>
      <div 
        className="loading-spinner" 
        style={spinnerStyle}
        role="status"
        aria-label={message}
      />
      {message && <span className="loading-message">{message}</span>}
      }
    </div>
  );
}

export default LoadingSpinner;