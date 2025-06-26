/**
 * 공지사항 관련 Resolver 함수들
 * 
 * 이 파일은 공지사항 데이터를 관리하고 조회하는 기능을 담당합니다.
 * 현재는 하드코딩된 샘플 데이터를 제공하지만, 추후 Confluence API 연동 예정입니다.
 * 
 * @module NoticeResolvers
 */

/**
 * 샘플 공지사항 데이터
 * 실제 운영에서는 Confluence API나 다른 데이터 소스에서 가져올 예정
 */
const SAMPLE_NOTICES = [
  {
    id: 1,
    space: 'COMMONGUIDE',
    summary: '(2025.05.19) Bi Weekly Report of ICT',
    updated: '2025-05-19',
    creator: '김동진 책임매니저 IT정책지원팀',
    priority: 'high',
    category: 'report'
  },
  {
    id: 2,
    space: 'COMMONGUIDE', 
    summary: '(2025.05.04) Bi Weekly Report of ICT',
    updated: '2025-05-02',
    creator: '차협성 팀장 IT정책지원팀',
    priority: 'medium',
    category: 'report'
  },
  {
    id: 3,
    space: 'COMMONGUIDE',
    summary: '미래차전력협의회 운영방안 공지',
    updated: '2025-04-29', 
    creator: '김동진 책임매니저 IT정책지원팀',
    priority: 'high',
    category: 'announcement'
  },
  {
    id: 4,
    space: 'COMMONGUIDE',
    summary: 'Global IT Forum 2025',
    updated: '2025-04-10',
    creator: '차협성 팀장 IT정책지원팀',
    priority: 'medium',
    category: 'event'
  },
  {
    id: 5,
    space: 'COMMONGUIDE',
    summary: '25년 UML 교육 후기',
    updated: '2025-04-03',
    creator: '김동진 책임매니저 IT정책지원팀',
    priority: 'low',
    category: 'education'
  }
];

/**
 * 공지사항 관련 resolver 함수들을 등록하는 함수
 * 
 * @param {Resolver} resolver - Forge Resolver 인스턴스
 */
export function noticeResolvers(resolver) {
  
  /**
   * 공지사항 목록 조회
   * 
   * @param {Object} req - 요청 객체
   * @param {number} [req.payload.limit] - 조회할 최대 개수 (기본값: 전체)
   * @param {string} [req.payload.category] - 카테고리 필터
   * @param {string} [req.payload.priority] - 우선순위 필터
   * @returns {Object} 공지사항 목록 응답 객체
   */
  resolver.define('getNotices', (req) => {
    try {
      console.log('📢 공지사항 조회 시작');
      
      const { limit, category, priority } = req.payload || {};
      
      let notices = [...SAMPLE_NOTICES];
      
      // 카테고리 필터링
      if (category) {
        notices = notices.filter(notice => notice.category === category);
        console.log(`📢 카테고리 '${category}' 필터링 적용`);
      }
      
      // 우선순위 필터링
      if (priority) {
        notices = notices.filter(notice => notice.priority === priority);
        console.log(`📢 우선순위 '${priority}' 필터링 적용`);
      }
      
      // 최신순으로 정렬 (updated 기준)
      notices.sort((a, b) => new Date(b.updated) - new Date(a.updated));
      
      // 개수 제한
      if (limit && limit > 0) {
        notices = notices.slice(0, limit);
        console.log(`📢 최대 ${limit}개 제한 적용`);
      }
      
      console.log(`📢 공지사항 조회 완료: ${notices.length}개`);
      
      return {
        success: true,
        notices: notices,
        totalCount: notices.length,
        filters: {
          category: category || null,
          priority: priority || null,
          limit: limit || null
        }
      };
      
    } catch (error) {
      console.error('❌ 공지사항 조회 오류:', error);
      return {
        success: false,
        message: '공지사항 조회 중 오류가 발생했습니다: ' + error.message,
        notices: []
      };
    }
  });

  /**
   * 특정 공지사항 상세 조회
   * 
   * @param {Object} req - 요청 객체
   * @param {number} req.payload.id - 공지사항 ID
   * @returns {Object} 공지사항 상세 정보 응답 객체
   */
  resolver.define('getNoticeDetail', (req) => {
    try {
      console.log('📄 공지사항 상세 조회 시작');
      
      const { id } = req.payload;
      
      if (!id) {
        throw new Error('공지사항 ID가 필요합니다');
      }
      
      const notice = SAMPLE_NOTICES.find(notice => notice.id === parseInt(id));
      
      if (!notice) {
        return {
          success: false,
          message: '해당 공지사항을 찾을 수 없습니다',
          notice: null
        };
      }
      
      console.log(`📄 공지사항 상세 조회 완료: ID ${id}`);
      
      return {
        success: true,
        notice: notice
      };
      
    } catch (error) {
      console.error('❌ 공지사항 상세 조회 오류:', error);
      return {
        success: false,
        message: '공지사항 상세 조회 중 오류가 발생했습니다: ' + error.message,
        notice: null
      };
    }
  });
}