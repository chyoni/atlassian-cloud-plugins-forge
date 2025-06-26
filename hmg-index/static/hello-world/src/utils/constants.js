/**
 * 애플리케이션 상수 정의
 * 
 * 앱 전반에서 사용되는 상수값들을 중앙 관리합니다.
 * 
 * @module Constants
 */

/**
 * 앱 기본 정보
 */
export const APP_INFO = {
  /** 앱 이름 */
  NAME: 'HMG Index',
  /** 앱 버전 */
  VERSION: '1.1.10',
  /** 앱 설명 */
  DESCRIPTION: '현대자동차그룹의 혁신을 이끄는 통합정보 인덱스페이지',
  /** 개발팀 */
  TEAM: 'HMG Development Team'
};

/**
 * 메뉴 아이템 정의
 */
export const MENU_ITEMS = [
  {
    id: 'home',
    name: 'Home',
    displayName: '홈',
    icon: '🏠',
    description: '메인 대시보드'
  },
  {
    id: 'organization',
    name: 'Organization',
    displayName: '조직',
    icon: '🏢',
    description: '조직도 및 부서 정보'
  },
  {
    id: 'projects',
    name: 'Projects',
    displayName: '프로젝트',
    icon: '📋',
    description: '프로젝트 관리'
  },
  {
    id: 'notice',
    name: 'Notice',
    displayName: '공지사항',
    icon: '📢',
    description: '공지사항 및 안내'
  },
  {
    id: 'service-request',
    name: 'Service Request',
    displayName: '서비스 요청',
    icon: '🎫',
    description: '서비스 데스크 요청'
  },
  {
    id: 'help-center',
    name: 'Help Center',
    displayName: '도움말',
    icon: '❓',
    description: '도움말 및 FAQ'
  }
];

/**
 * 액션 버튼 정의
 */
export const ACTION_BUTTONS = [
  {
    id: 'space-search',
    icon: '🔍',
    text: '스페이스 검색',
    description: 'Confluence 스페이스 검색',
    action: 'onSpaceSearchClick'
  },
  {
    id: 'document-search',
    icon: '📄',
    text: '문서 검색',
    description: '문서 및 페이지 검색',
    action: 'onDocumentSearchClick'
  },
  {
    id: 'space-admin',
    icon: '👥',
    text: '공간 관리자 확인',
    description: '스페이스 관리자 정보',
    action: 'onSpaceAdminClick'
  },
  {
    id: 'organization-tree',
    icon: '🌳',
    text: '나의 조직도',
    description: '조직도 트리 보기',
    action: 'onOrganizationTreeClick'
  }
];

/**
 * API 응답 상태 코드
 */
export const HTTP_STATUS = {
  /** 성공 */
  OK: 200,
  /** 생성됨 */
  CREATED: 201,
  /** 승인됨 */
  ACCEPTED: 202,
  /** 콘텐츠 없음 */
  NO_CONTENT: 204,
  /** 잘못된 요청 */
  BAD_REQUEST: 400,
  /** 인증 필요 */
  UNAUTHORIZED: 401,
  /** 권한 없음 */
  FORBIDDEN: 403,
  /** 찾을 수 없음 */
  NOT_FOUND: 404,
  /** 내부 서버 오류 */
  INTERNAL_SERVER_ERROR: 500,
  /** 서비스 이용 불가 */
  SERVICE_UNAVAILABLE: 503
};

/**
 * 로딩 상태 메시지
 */
export const LOADING_MESSAGES = {
  DEFAULT: '로딩 중...',
  ORGANIZATION: '조직 데이터를 불러오는 중...',
  SPACES: '스페이스를 검색하는 중...',
  NOTICES: '공지사항을 불러오는 중...',
  SERVICE_REQUEST: '서비스 요청을 전송하는 중...',
  SAVING: '저장하는 중...',
  DELETING: '삭제하는 중...',
  UPDATING: '업데이트하는 중...'
};

/**
 * 에러 메시지
 */
export const ERROR_MESSAGES = {
  NETWORK: '네트워크 연결을 확인해주세요.',
  PERMISSION: '권한이 없습니다.',
  NOT_FOUND: '요청한 데이터를 찾을 수 없습니다.',
  SERVER_ERROR: '서버 오류가 발생했습니다.',
  VALIDATION: '입력값을 확인해주세요.',
  TIMEOUT: '요청 시간이 초과되었습니다.',
  UNKNOWN: '알 수 없는 오류가 발생했습니다.'
};

/**
 * 성공 메시지
 */
export const SUCCESS_MESSAGES = {
  SAVE: '저장되었습니다.',
  UPDATE: '수정되었습니다.',
  DELETE: '삭제되었습니다.',
  CREATE: '생성되었습니다.',
  SEND: '전송되었습니다.'
};

/**
 * UI 설정값
 */
export const UI_CONFIG = {
  /** 페이지당 기본 아이템 수 */
  DEFAULT_PAGE_SIZE: 10,
  /** 검색 결과 최대 표시 수 */
  MAX_SEARCH_RESULTS: 100,
  /** 자동 새로고침 간격 (밀리초) */
  AUTO_REFRESH_INTERVAL: 300000, // 5분
  /** 디바운스 지연시간 (밀리초) */
  DEBOUNCE_DELAY: 300,
  /** 애니메이션 지속시간 (밀리초) */
  ANIMATION_DURATION: 200
};

/**
 * 날짜 포맷 설정
 */
export const DATE_FORMATS = {
  /** 기본 날짜 형식 */
  DEFAULT: 'YYYY-MM-DD',
  /** 시간 포함 */
  WITH_TIME: 'YYYY-MM-DD HH:mm:ss',
  /** 한국어 형식 */
  KOREAN: 'YYYY년 MM월 DD일',
  /** 상대적 시간 표시용 */
  RELATIVE: 'relative'
};

/**
 * 로컬 스토리지 키
 */
export const STORAGE_KEYS = {
  /** 사용자 설정 */
  USER_PREFERENCES: 'hmg_user_preferences',
  /** 최근 검색어 */
  RECENT_SEARCHES: 'hmg_recent_searches',
  /** 테마 설정 */
  THEME: 'hmg_theme',
  /** 언어 설정 */
  LANGUAGE: 'hmg_language'
};

/**
 * 색상 테마
 */
export const THEME_COLORS = {
  PRIMARY: '#4f46e5',
  SECONDARY: '#6366f1',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  ERROR: '#ef4444',
  INFO: '#3b82f6',
  GRAY: '#6b7280'
};

/**
 * 반응형 브레이크포인트
 */
export const BREAKPOINTS = {
  /** 모바일 */
  MOBILE: 768,
  /** 태블릿 */
  TABLET: 1024,
  /** 데스크톱 */
  DESKTOP: 1280,
  /** 대형 화면 */
  LARGE: 1536
};