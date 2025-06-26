/**
 * API 호출을 위한 커스텀 훅
 * 
 * API 호출 상태 관리와 에러 핸들링을 제공하는 React 훅입니다.
 * 
 * @module useApi
 */

import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * API 호출 상태를 관리하는 커스텀 훅
 * 
 * @param {Function} apiFunction - 호출할 API 함수
 * @param {Object} [options={}] - 훅 옵션
 * @param {boolean} [options.immediate=false] - 즉시 호출 여부
 * @param {Function} [options.onSuccess] - 성공 콜백
 * @param {Function} [options.onError] - 에러 콜백
 * @returns {Object} API 상태와 제어 함수들
 */
export function useApi(apiFunction, options = {}) {
  const {
    immediate = false,
    onSuccess,
    onError
  } = options;
  
  // API 호출 상태 관리
  const [state, setState] = useState({
    data: null,
    loading: immediate,
    error: null,
    success: false
  });
  
  // 컴포넌트 언마운트 여부 추적
  const isMountedRef = useRef(true);
  
  // 컴포넌트 언마운트 시 상태 업데이트 방지
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  
  /**
   * 안전한 상태 업데이트 함수
   * 컴포넌트가 언마운트된 경우 상태 업데이트를 하지 않음
   */
  const safeSetState = useCallback((newState) => {
    if (isMountedRef.current) {
      setState(prevState => ({ ...prevState, ...newState }));
    }
  }, []);
  
  /**
   * API 호출 실행 함수
   * 
   * @param {...any} args - API 함수에 전달할 인자들
   * @returns {Promise} API 호출 결과
   */
  const execute = useCallback(async (...args) => {
    try {
      console.log('🚀 API 호출 시작:', apiFunction.name);
      
      // 로딩 상태 설정
      safeSetState({
        loading: true,
        error: null,
        success: false
      });
      
      // API 함수 호출
      const result = await apiFunction(...args);
      
      console.log('✅ API 호출 성공:', apiFunction.name, result);
      
      // 성공 상태 설정
      safeSetState({
        data: result,
        loading: false,
        error: null,
        success: true
      });
      
      // 성공 콜백 실행
      if (onSuccess) {
        onSuccess(result);
      }
      
      return result;
      
    } catch (error) {
      console.error('❌ API 호출 실패:', apiFunction.name, error);
      
      // 에러 상태 설정
      safeSetState({
        data: null,
        loading: false,
        error: error.message || '알 수 없는 오류가 발생했습니다',
        success: false
      });
      
      // 에러 콜백 실행
      if (onError) {
        onError(error);
      }
      
      throw error;
    }
  }, [apiFunction, onSuccess, onError, safeSetState]);
  
  /**
   * 상태 초기화 함수
   */
  const reset = useCallback(() => {
    safeSetState({
      data: null,
      loading: false,
      error: null,
      success: false
    });
  }, [safeSetState]);
  
  // 즉시 호출 옵션이 설정된 경우 마운트 시 실행
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate]); // execute는 의존성에서 제외 (무한 루프 방지)
  
  return {
    ...state,
    execute,
    reset,
    // 편의 속성들
    isLoading: state.loading,
    isSuccess: state.success,
    isError: !!state.error,
    hasData: !!state.data
  };
}

/**
 * 페이지네이션을 지원하는 API 호출 훅
 * 
 * @param {Function} apiFunction - 호출할 API 함수 (page, limit 파라미터 필요)
 * @param {Object} [options={}] - 훅 옵션
 * @param {number} [options.initialPage=1] - 초기 페이지
 * @param {number} [options.limit=10] - 페이지당 아이템 수
 * @returns {Object} 페이지네이션 상태와 제어 함수들
 */
export function usePaginatedApi(apiFunction, options = {}) {
  const {
    initialPage = 1,
    limit = 10
  } = options;
  
  const [page, setPage] = useState(initialPage);
  const [allData, setAllData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  
  // 기본 API 훅 사용
  const api = useApi(
    useCallback(
      async (currentPage = page) => {
        const result = await apiFunction(currentPage, limit);
        return result;
      },
      [apiFunction, page, limit]
    )
  );
  
  /**
   * 다음 페이지 로드
   */
  const loadMore = useCallback(async () => {
    if (!hasMore || api.isLoading) return;
    
    try {
      const result = await api.execute(page + 1);
      
      if (result && result.data) {
        const newItems = Array.isArray(result.data) ? result.data : [];
        
        setAllData(prev => [...prev, ...newItems]);
        setPage(prev => prev + 1);
        
        // 더 이상 데이터가 없으면 hasMore를 false로 설정
        if (newItems.length < limit) {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error('페이지네이션 로드 오류:', error);
    }
  }, [api, page, limit, hasMore]);
  
  /**
   * 첫 페이지로 리셋
   */
  const reset = useCallback(() => {
    setPage(initialPage);
    setAllData([]);
    setHasMore(true);
    api.reset();
  }, [api, initialPage]);
  
  /**
   * 초기 데이터 로드
   */
  const loadInitial = useCallback(async () => {
    try {
      const result = await api.execute(initialPage);
      
      if (result && result.data) {
        const items = Array.isArray(result.data) ? result.data : [];
        setAllData(items);
        setHasMore(items.length >= limit);
      }
    } catch (error) {
      console.error('초기 데이터 로드 오류:', error);
    }
  }, [api, initialPage, limit]);
  
  return {
    ...api,
    data: allData,
    currentPage: page,
    hasMore,
    loadMore,
    loadInitial,
    reset
  };
}

/**
 * 검색 기능을 제공하는 API 호출 훅
 * 
 * @param {Function} searchFunction - 검색 API 함수
 * @param {Object} [options={}] - 훅 옵션
 * @param {number} [options.debounceMs=300] - 디바운스 시간
 * @returns {Object} 검색 상태와 제어 함수들
 */
export function useSearchApi(searchFunction, options = {}) {
  const {
    debounceMs = 300
  } = options;
  
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const debounceRef = useRef(null);
  
  // 기본 API 훅 사용
  const api = useApi(searchFunction);
  
  /**
   * 디바운스된 검색 실행
   */
  const debouncedSearch = useCallback((searchQuery) => {
    // 이전 타이머 취소
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    // 새 타이머 설정
    debounceRef.current = setTimeout(async () => {
      if (searchQuery.trim()) {
        try {
          const result = await api.execute(searchQuery);
          if (result && result.data) {
            setResults(Array.isArray(result.data) ? result.data : []);
          }
        } catch (error) {
          setResults([]);
        }
      } else {
        setResults([]);
      }
    }, debounceMs);
  }, [api, debounceMs]);
  
  /**
   * 검색어 변경 처리
   */
  const handleSearch = useCallback((newQuery) => {
    setQuery(newQuery);
    debouncedSearch(newQuery);
  }, [debouncedSearch]);
  
  /**
   * 검색 결과 초기화
   */
  const clearSearch = useCallback(() => {
    setQuery('');
    setResults([]);
    api.reset();
    
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
  }, [api]);
  
  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);
  
  return {
    ...api,
    query,
    results,
    search: handleSearch,
    clear: clearSearch,
    hasResults: results.length > 0,
    isEmpty: query.trim() !== '' && results.length === 0 && !api.isLoading
  };
}