/**
 * Confluence 스페이스 검색 관련 Resolver 함수들
 * 
 * 이 파일은 Confluence REST API v2를 사용하여 스페이스 검색 기능을 제공합니다.
 * 페이지네이션을 지원하며 검색어로 필터링 기능을 제공합니다.
 * 
 * @module SpaceSearchResolvers
 * @see https://developer.atlassian.com/cloud/confluence/rest/v2/api-group-space/
 */

import api, { route } from '@forge/api';

/**
 * 스페이스 검색 설정 상수
 */
const SEARCH_CONFIG = {
  /** 페이지당 최대 결과 수 */
  MAX_RESULTS_PER_PAGE: 100,
  /** 최대 반복 횟수 (무한 루프 방지) */
  MAX_ITERATIONS: 10,
  /** 요청 타임아웃 (밀리초) */
  REQUEST_TIMEOUT: 30000
};

/**
 * 스페이스 검색 관련 resolver 함수들을 등록하는 함수
 * 
 * @param {Resolver} resolver - Forge Resolver 인스턴스
 */
export function spaceSearchResolvers(resolver) {
  
  /**
   * Confluence 스페이스 검색
   * 
   * 모든 스페이스를 조회한 후 클라이언트 사이드에서 필터링을 수행합니다.
   * 페이지네이션을 사용하여 모든 스페이스를 조회합니다.
   * 
   * @param {Object} req - 요청 객체
   * @param {string} [req.payload.query] - 검색어 (스페이스 이름 또는 키)
   * @returns {Object} 검색 결과 응답 객체
   */
  resolver.define('searchSpaces', async (req) => {
    try {
      console.log('🔍 스페이스 검색 시작');
      
      const { query } = req.payload;
      console.log('🔍 검색어:', query || '(전체 조회)');
      
      // 스페이스 데이터 수집을 위한 변수들
      let allSpaces = [];
      let cursor = null;
      let hasMore = true;
      let iterationCount = 0;
      const seenCursors = new Set(); // 중복 cursor 방지용
      
      // 페이지네이션을 통한 전체 스페이스 조회
      while (hasMore && iterationCount < SEARCH_CONFIG.MAX_ITERATIONS) {
        iterationCount++;
        console.log(`🔍 페이지 ${iterationCount}/${SEARCH_CONFIG.MAX_ITERATIONS} 조회 중`);
        
        // API 요청 옵션 구성
        const requestOptions = {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          query: {
            limit: SEARCH_CONFIG.MAX_RESULTS_PER_PAGE
          }
        };
        
        // cursor가 있으면 다음 페이지 조회
        if (cursor) {
          requestOptions.query.cursor = cursor;
        }
        
        console.log('🔍 API 요청 옵션:', JSON.stringify(requestOptions, null, 2));
        
        // Confluence API 호출
        const response = await api.asUser().requestConfluence(
          route`/wiki/api/v2/spaces`,
          requestOptions
        );
        
        console.log('🔍 Confluence API 응답 상태:', response.status);
        
        // 오류 응답 처리
        if (response.status !== 200) {
          const errorData = await response.text();
          console.error('❌ Confluence API 오류:', {
            status: response.status,
            statusText: response.statusText,
            body: errorData
          });
          
          return {
            success: false,
            message: `스페이스 검색 실패: ${response.status} ${response.statusText}`,
            details: errorData,
            httpStatus: response.status
          };
        }
        
        // 응답 데이터 처리
        const responseData = await response.json();
        console.log('🔍 응답 데이터 정보:', {
          resultsCount: responseData.results ? responseData.results.length : 0,
          hasNext: !!(responseData._links && responseData._links.next),
          nextLink: responseData._links ? responseData._links.next : null
        });
        
        // 결과를 전체 배열에 추가
        if (responseData.results && Array.isArray(responseData.results)) {
          allSpaces = allSpaces.concat(responseData.results);
        }
        
        // 다음 페이지 존재 여부 확인
        if (responseData._links && responseData._links.next) {
          // next URL에서 cursor 파라미터 추출
          const nextUrl = new URL(responseData._links.next, 'https://example.com');
          const newCursor = nextUrl.searchParams.get('cursor');
          
          // 중복 cursor 체크 (무한 루프 방지)
          if (newCursor && !seenCursors.has(newCursor)) {
            cursor = newCursor;
            seenCursors.add(newCursor);
            hasMore = true;
            console.log('🔍 다음 cursor:', cursor);
          } else {
            console.log('🔍 중복 cursor 또는 cursor 없음, 페이지네이션 종료');
            hasMore = false;
          }
        } else {
          hasMore = false;
        }
      }
      
      // 최대 반복 횟수 도달 시 경고
      if (iterationCount >= SEARCH_CONFIG.MAX_ITERATIONS) {
        console.log('⚠️ 최대 반복 횟수 도달, 페이지네이션 종료');
      }
      
      console.log(`🔍 총 수집된 스페이스 수: ${allSpaces.length}`);
      
      // 검색어가 있으면 클라이언트 사이드 필터링 수행
      let filteredSpaces = allSpaces;
      if (query && query.trim()) {
        const searchTerm = query.trim().toLowerCase();
        filteredSpaces = allSpaces.filter(space =>
          (space.name && space.name.toLowerCase().includes(searchTerm)) ||
          (space.key && space.key.toLowerCase().includes(searchTerm))
        );
        console.log(`🔍 필터링 후 스페이스 수: ${filteredSpaces.length}`);
      }
      
      // 응답 데이터 정리 (필요한 필드만 추출)
      const cleanedSpaces = filteredSpaces.map(space => ({
        id: space.id,
        key: space.key,
        name: space.name,
        description: space.description,
        type: space.type,
        status: space.status,
        _links: space._links
      }));
      
      return {
        success: true,
        spaces: cleanedSpaces,
        totalCount: filteredSpaces.length,
        originalCount: allSpaces.length,
        hasFiltered: !!query,
        searchTerm: query || null
      };
      
    } catch (error) {
      console.error('❌ 스페이스 검색 오류:', error);
      return {
        success: false,
        message: '스페이스 검색 중 오류가 발생했습니다: ' + error.message,
        error: error.name,
        spaces: []
      };
    }
  });
}