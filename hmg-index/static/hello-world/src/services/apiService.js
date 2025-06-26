/**
 * API 서비스 모듈
 * 
 * Forge Bridge를 통한 API 호출을 관리하는 서비스 레이어입니다.
 * 모든 백엔드 API 호출을 중앙화하여 관리합니다.
 * 
 * @module ApiService
 */

import { invoke } from '@forge/bridge';

/**
 * API 호출 시 공통으로 사용되는 설정
 */
const API_CONFIG = {
  /** 기본 타임아웃 (밀리초) */
  DEFAULT_TIMEOUT: 30000,
  /** 재시도 횟수 */
  RETRY_COUNT: 3,
  /** 재시도 간격 (밀리초) */
  RETRY_DELAY: 1000
};

/**
 * API 호출 결과를 표준화하는 래퍼 함수
 * 
 * @param {Function} apiCall - 실행할 API 호출 함수
 * @param {string} operationName - 작업명 (로깅용)
 * @param {Object} [options={}] - 추가 옵션
 * @returns {Promise<Object>} 표준화된 API 응답
 */
async function withErrorHandling(apiCall, operationName, options = {}) {
  const startTime = Date.now();
  
  try {
    console.log(`🚀 API 호출 시작: ${operationName}`);
    
    const result = await apiCall();
    const duration = Date.now() - startTime;
    
    console.log(`✅ API 호출 성공: ${operationName} (${duration}ms)`);
    
    return {
      success: true,
      data: result,
      duration,
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    const duration = Date.now() - startTime;
    
    console.error(`❌ API 호출 실패: ${operationName} (${duration}ms)`, error);
    
    return {
      success: false,
      error: error.message,
      errorType: error.name,
      duration,
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * 조직 관련 API 서비스
 */
export const organizationService = {
  
  /**
   * 조직 데이터 전체 조회
   * 
   * @returns {Promise<Object>} 조직 데이터 배열
   */
  async getAll() {
    return withErrorHandling(
      () => invoke('getOrganizationData'),
      'getOrganizationData'
    );
  },
  
  /**
   * 조직 데이터 저장
   * 
   * @param {Array} data - 저장할 조직 데이터 배열
   * @returns {Promise<Object>} 저장 결과
   */
  async save(data) {
    return withErrorHandling(
      () => invoke('saveOrganizationData', { data }),
      'saveOrganizationData'
    );
  },
  
  /**
   * 조직 항목 수정
   * 
   * @param {number} id - 수정할 항목 ID
   * @param {Object} updatedItem - 수정할 데이터
   * @returns {Promise<Object>} 수정 결과
   */
  async update(id, updatedItem) {
    return withErrorHandling(
      () => invoke('updateOrganizationItem', { id, updatedItem }),
      `updateOrganizationItem(${id})`
    );
  },
  
  /**
   * 새 조직 항목 추가
   * 
   * @param {Object} newItem - 추가할 조직 데이터
   * @returns {Promise<Object>} 추가 결과
   */
  async add(newItem) {
    return withErrorHandling(
      () => invoke('addOrganizationItem', { newItem }),
      'addOrganizationItem'
    );
  },
  
  /**
   * 조직 항목 삭제
   * 
   * @param {number} id - 삭제할 항목 ID
   * @returns {Promise<Object>} 삭제 결과
   */
  async delete(id) {
    return withErrorHandling(
      () => invoke('deleteOrganizationItem', { id }),
      `deleteOrganizationItem(${id})`
    );
  },
  
  /**
   * 외부 API에서 조직 데이터 가져오기
   * 
   * @returns {Promise<Object>} 외부 조직 데이터
   */
  async getExternal() {
    return withErrorHandling(
      () => invoke('getExternalOrganizationData'),
      'getExternalOrganizationData'
    );
  }
};

/**
 * 스페이스 검색 관련 API 서비스
 */
export const spaceService = {
  
  /**
   * 스페이스 검색
   * 
   * @param {string} [query=''] - 검색어
   * @returns {Promise<Object>} 검색 결과
   */
  async search(query = '') {
    return withErrorHandling(
      () => invoke('searchSpaces', { query }),
      `searchSpaces("${query}")`
    );
  }
};

/**
 * 서비스 요청 관련 API 서비스
 */
export const serviceRequestService = {
  
  /**
   * 새 서비스 요청 생성
   * 
   * @param {string} title - 요청 제목
   * @param {string} content - 요청 내용
   * @param {string} [accountId] - 요청자 계정 ID
   * @returns {Promise<Object>} 생성 결과
   */
  async create(title, content, accountId) {
    return withErrorHandling(
      () => invoke('createServiceDeskRequest', { title, content, accountId }),
      'createServiceDeskRequest'
    );
  }
};

/**
 * 공지사항 관련 API 서비스
 */
export const noticeService = {
  
  /**
   * 공지사항 목록 조회
   * 
   * @param {Object} [options={}] - 조회 옵션
   * @param {number} [options.limit] - 최대 조회 개수
   * @param {string} [options.category] - 카테고리 필터
   * @param {string} [options.priority] - 우선순위 필터
   * @returns {Promise<Object>} 공지사항 목록
   */
  async getList(options = {}) {
    return withErrorHandling(
      () => invoke('getNotices', options),
      'getNotices'
    );
  },
  
  /**
   * 공지사항 상세 조회
   * 
   * @param {number} id - 공지사항 ID
   * @returns {Promise<Object>} 공지사항 상세 정보
   */
  async getDetail(id) {
    return withErrorHandling(
      () => invoke('getNoticeDetail', { id }),
      `getNoticeDetail(${id})`
    );
  }
};

/**
 * 외부 API 관련 서비스
 */
export const externalApiService = {
  
  /**
   * 공공데이터 기업정보 조회
   * 
   * @param {string} companyName - 기업명
   * @param {string} [corpCode] - 기업 코드
   * @returns {Promise<Object>} 기업 정보
   */
  async getCompanyData(companyName, corpCode) {
    return withErrorHandling(
      () => invoke('getPublicCompanyData', { companyName, corpCode }),
      `getPublicCompanyData("${companyName}")`
    );
  },
  
  /**
   * 날씨 정보 조회
   * 
   * @param {string} [city='서울'] - 도시명
   * @returns {Promise<Object>} 날씨 정보
   */
  async getWeatherData(city = '서울') {
    return withErrorHandling(
      () => invoke('getWeatherData', { city }),
      `getWeatherData("${city}")`
    );
  }
};

/**
 * 기본 앱 초기화 서비스
 */
export const appService = {
  
  /**
   * 앱 초기화 데이터 로드
   * 
   * @returns {Promise<Object>} 초기화 결과
   */
  async initialize() {
    return withErrorHandling(
      () => invoke('getText', { example: 'my-invoke-variable' }),
      'getText (initialize)'
    );
  },
  
  /**
   * 글로벌 설정 조회
   * 
   * @returns {Promise<Object>} 글로벌 설정
   */
  async getGlobalSettings() {
    return withErrorHandling(
      () => invoke('globalSettingsResolver'),
      'globalSettingsResolver'
    );
  }
};