/**
 * 유틸리티 헬퍼 함수들
 * 
 * 앱 전반에서 사용되는 공통 유틸리티 함수들을 제공합니다.
 * 
 * @module Helpers
 */

import { DATE_FORMATS } from './constants.js';

/**
 * 날짜 포맷팅 유틸리티
 */
export const dateUtils = {
  
  /**
   * 날짜를 지정된 형식으로 포맷팅
   * 
   * @param {Date|string} date - 포맷팅할 날짜
   * @param {string} [format=DATE_FORMATS.DEFAULT] - 날짜 형식
   * @returns {string} 포맷팅된 날짜 문자열
   */
  format(date, format = DATE_FORMATS.DEFAULT) {
    if (!date) return '';
    
    const dateObj = new Date(date);
    
    if (isNaN(dateObj.getTime())) {
      console.warn('잘못된 날짜 형식:', date);
      return '';
    }
    
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const seconds = String(dateObj.getSeconds()).padStart(2, '0');
    
    switch (format) {
      case DATE_FORMATS.DEFAULT:
        return `${year}-${month}-${day}`;
      case DATE_FORMATS.WITH_TIME:
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      case DATE_FORMATS.KOREAN:
        return `${year}년 ${month}월 ${day}일`;
      case DATE_FORMATS.RELATIVE:
        return this.getRelativeTime(dateObj);
      default:
        return dateObj.toLocaleDateString();
    }
  },
  
  /**
   * 상대적 시간 계산 (예: "2시간 전", "3일 전")
   * 
   * @param {Date} date - 기준 날짜
   * @returns {string} 상대적 시간 문자열
   */
  getRelativeTime(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    
    if (diffSec < 60) return '방금 전';
    if (diffMin < 60) return `${diffMin}분 전`;
    if (diffHour < 24) return `${diffHour}시간 전`;
    if (diffDay < 7) return `${diffDay}일 전`;
    if (diffDay < 30) return `${Math.floor(diffDay / 7)}주 전`;
    if (diffDay < 365) return `${Math.floor(diffDay / 30)}개월 전`;
    return `${Math.floor(diffDay / 365)}년 전`;
  }
};

/**
 * 문자열 처리 유틸리티
 */
export const stringUtils = {
  
  /**
   * 문자열 자르기 (말줄임표 추가)
   * 
   * @param {string} str - 원본 문자열
   * @param {number} maxLength - 최대 길이
   * @param {string} [suffix='...'] - 말줄임표
   * @returns {string} 잘린 문자열
   */
  truncate(str, maxLength, suffix = '...') {
    if (!str || str.length <= maxLength) return str || '';
    return str.substring(0, maxLength - suffix.length) + suffix;
  },
  
  /**
   * 한글/영문 구분하여 바이트 길이 계산
   * 
   * @param {string} str - 대상 문자열
   * @returns {number} 바이트 길이
   */
  getByteLength(str) {
    if (!str) return 0;
    let length = 0;
    for (let i = 0; i < str.length; i++) {
      // 한글, 한자 등은 3바이트로 계산
      if (str.charCodeAt(i) > 127) {
        length += 3;
      } else {
        length += 1;
      }
    }
    return length;
  },
  
  /**
   * 검색어 하이라이팅
   * 
   * @param {string} text - 원본 텍스트
   * @param {string} query - 검색어
   * @returns {string} 하이라이팅된 HTML 문자열
   */
  highlight(text, query) {
    if (!text || !query) return text || '';
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  },
  
  /**
   * 이메일 주소 마스킹
   * 
   * @param {string} email - 이메일 주소
   * @returns {string} 마스킹된 이메일
   */
  maskEmail(email) {
    if (!email || !email.includes('@')) return email || '';
    const [local, domain] = email.split('@');
    if (local.length <= 2) return email;
    return local.substring(0, 2) + '*'.repeat(local.length - 2) + '@' + domain;
  }
};

/**
 * 배열 처리 유틸리티
 */
export const arrayUtils = {
  
  /**
   * 배열을 특정 크기로 청크 분할
   * 
   * @param {Array} array - 원본 배열
   * @param {number} size - 청크 크기
   * @returns {Array} 청크 배열들의 배열
   */
  chunk(array, size) {
    if (!Array.isArray(array) || size <= 0) return [];
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  },
  
  /**
   * 배열에서 중복 제거
   * 
   * @param {Array} array - 원본 배열
   * @param {string} [key] - 객체 배열의 경우 비교할 키
   * @returns {Array} 중복 제거된 배열
   */
  unique(array, key) {
    if (!Array.isArray(array)) return [];
    
    if (key) {
      const seen = new Set();
      return array.filter(item => {
        const value = item[key];
        if (seen.has(value)) return false;
        seen.add(value);
        return true;
      });
    }
    
    return [...new Set(array)];
  },
  
  /**
   * 배열 정렬 (다중 조건 지원)
   * 
   * @param {Array} array - 정렬할 배열
   * @param {Array} sortKeys - 정렬 조건 배열 [{key: 'name', order: 'asc'}]
   * @returns {Array} 정렬된 배열
   */
  sortBy(array, sortKeys) {
    if (!Array.isArray(array) || !Array.isArray(sortKeys)) return array;
    
    return [...array].sort((a, b) => {
      for (const { key, order = 'asc' } of sortKeys) {
        const aVal = a[key];
        const bVal = b[key];
        
        if (aVal < bVal) return order === 'asc' ? -1 : 1;
        if (aVal > bVal) return order === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
};

/**
 * 객체 처리 유틸리티
 */
export const objectUtils = {
  
  /**
   * 깊은 복사
   * 
   * @param {Object} obj - 복사할 객체
   * @returns {Object} 복사된 객체
   */
  deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => this.deepClone(item));
    if (typeof obj === 'object') {
      const copy = {};
      Object.keys(obj).forEach(key => {
        copy[key] = this.deepClone(obj[key]);
      });
      return copy;
    }
  },
  
  /**
   * 중첩된 객체에서 값 가져오기
   * 
   * @param {Object} obj - 대상 객체
   * @param {string} path - 경로 (예: 'user.profile.name')
   * @param {*} defaultValue - 기본값
   * @returns {*} 찾은 값 또는 기본값
   */
  get(obj, path, defaultValue = undefined) {
    if (!obj || !path) return defaultValue;
    
    const keys = path.split('.');
    let result = obj;
    
    for (const key of keys) {
      if (result === null || result === undefined || !(key in result)) {
        return defaultValue;
      }
      result = result[key];
    }
    
    return result;
  }
};

/**
 * 파일 처리 유틸리티
 */
export const fileUtils = {
  
  /**
   * 파일 크기를 읽기 쉬운 형태로 변환
   * 
   * @param {number} bytes - 바이트 크기
   * @param {number} [decimals=2] - 소수점 자릿수
   * @returns {string} 읽기 쉬운 파일 크기
   */
  formatFileSize(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  },
  
  /**
   * 파일 확장자 추출
   * 
   * @param {string} filename - 파일명
   * @returns {string} 확장자 (소문자)
   */
  getExtension(filename) {
    if (!filename || typeof filename !== 'string') return '';
    const lastDot = filename.lastIndexOf('.');
    return lastDot > 0 ? filename.substring(lastDot + 1).toLowerCase() : '';
  }
};

/**
 * URL 처리 유틸리티
 */
export const urlUtils = {
  
  /**
   * URL에서 쿼리 파라미터 추출
   * 
   * @param {string} url - URL 문자열
   * @returns {Object} 쿼리 파라미터 객체
   */
  getQueryParams(url = window.location.search) {
    const params = {};
    const searchParams = new URLSearchParams(url);
    
    for (const [key, value] of searchParams) {
      params[key] = value;
    }
    
    return params;
  },
  
  /**
   * 쿼리 파라미터를 URL 문자열로 변환
   * 
   * @param {Object} params - 파라미터 객체
   * @returns {string} 쿼리 문자열
   */
  buildQueryString(params) {
    if (!params || typeof params !== 'object') return '';
    
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        searchParams.append(key, value);
      }
    });
    
    return searchParams.toString();
  }
};

/**
 * 디바운스 함수
 * 
 * @param {Function} func - 디바운스할 함수
 * @param {number} wait - 대기 시간 (밀리초)
 * @param {boolean} [immediate=false] - 즉시 실행 여부
 * @returns {Function} 디바운스된 함수
 */
export function debounce(func, wait, immediate = false) {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(this, args);
    };
    
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    
    if (callNow) func.apply(this, args);
  };
}

/**
 * 스로틀 함수
 * 
 * @param {Function} func - 스로틀할 함수
 * @param {number} limit - 제한 시간 (밀리초)
 * @returns {Function} 스로틀된 함수
 */
export function throttle(func, limit) {
  let inThrottle;
  
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}