/**
 * 서비스 요청 관련 Resolver 함수들
 * 
 * 이 파일은 Jira Service Desk API를 사용하여 서비스 요청을 생성하는 기능을 담당합니다.
 * Atlassian Jira Service Desk REST API v3을 사용합니다.
 * 
 * @module ServiceRequestResolvers
 * @see https://developer.atlassian.com/cloud/jira/service-desk/rest/api-group-request/
 */

import api, { route } from '@forge/api';

/**
 * 서비스 데스크 설정 상수
 */
const SERVICE_DESK_CONFIG = {
  /** 서비스 데스크 ID */
  SERVICE_DESK_ID: "33",
  /** 요청 타입 ID */
  REQUEST_TYPE_ID: "279"
};

/**
 * 서비스 요청 관련 resolver 함수들을 등록하는 함수
 * 
 * @param {Resolver} resolver - Forge Resolver 인스턴스
 */
export function serviceRequestResolvers(resolver) {
  
  /**
   * Jira Service Desk에 새 요청 생성
   * 
   * @param {Object} req - 요청 객체
   * @param {string} req.payload.title - 요청 제목
   * @param {string} req.payload.content - 요청 내용
   * @param {string} [req.payload.accountId] - 요청자 계정 ID (선택사항)
   * @returns {Object} 생성 결과 응답 객체
   */
  resolver.define('createServiceDeskRequest', async (req) => {
    try {
      console.log('📤 서비스 데스크 요청 생성 시작');
      
      const { title, content, accountId } = req.payload;
      
      // 입력값 유효성 검사
      if (!title || !title.trim()) {
        throw new Error('제목은 필수 입력 항목입니다');
      }
      
      if (!content || !content.trim()) {
        throw new Error('내용은 필수 입력 항목입니다');
      }
      
      console.log('📤 요청 데이터:', { 
        title: title.substring(0, 50) + '...',
        contentLength: content.length,
        hasAccountId: !!accountId 
      });
      
      // Jira Service Desk API 요청 본문 구성
      const requestBody = {
        serviceDeskId: SERVICE_DESK_CONFIG.SERVICE_DESK_ID,
        requestTypeId: SERVICE_DESK_CONFIG.REQUEST_TYPE_ID,
        requestFieldValues: {
          summary: title.trim(),
          description: content.trim()
        }
        // reporter 필드는 asUser() 호출로 현재 사용자가 자동 설정됨
      };

      console.log('📤 API 요청 본문:', JSON.stringify(requestBody, null, 2));

      // Jira Service Desk API 호출
      const response = await api.asUser().requestJira(
        route`/rest/servicedeskapi/request`,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody)
        }
      );

      console.log('📤 Service Desk API 응답 상태:', response.status);

      // 성공 응답 처리 (201 Created)
      if (response.status === 201) {
        const responseData = await response.json();
        console.log('✅ 서비스 요청 생성 성공:', responseData);
        
        return {
          success: true,
          issueKey: responseData.issueKey || responseData.issueId,
          issueId: responseData.issueId,
          message: '서비스 요청이 성공적으로 생성되었습니다.',
          data: responseData
        };
      } 
      // 오류 응답 처리
      else {
        const errorData = await response.text();
        console.error('❌ Service Desk API 오류 응답:', {
          status: response.status,
          statusText: response.statusText,
          body: errorData
        });
        
        return {
          success: false,
          message: `서비스 요청 생성 실패: ${response.status} ${response.statusText}`,
          details: errorData,
          httpStatus: response.status
        };
      }

    } catch (error) {
      console.error('❌ 서비스 요청 생성 오류:', error);
      return {
        success: false,
        message: '서비스 요청 생성 중 오류가 발생했습니다: ' + error.message,
        error: error.name
      };
    }
  });
}