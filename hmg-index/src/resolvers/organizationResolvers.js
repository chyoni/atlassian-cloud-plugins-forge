/**
 * 조직 관리 관련 Resolver 함수들
 * 
 * 이 파일은 조직 데이터의 CRUD 작업을 담당합니다.
 * - 조직 데이터 조회
 * - 조직 데이터 저장
 * - 조직 데이터 수정
 * - 조직 데이터 삭제
 * 
 * @module OrganizationResolvers
 */

import { storage } from '@forge/api';

/**
 * 기본 조직 데이터
 * 앱 초기 설치 시 사용되는 샘플 데이터
 */
const DEFAULT_ORGANIZATION_DATA = [
  {
    id: 1,
    category: '조직',
    chonggwal: '(C) ICT본부',
    hyundai: '(H) CEO 직속',
    kia: '(K) CEO 직속',
    group: '42dot'
  },
  {
    id: 2,
    category: '조직',
    chonggwal: '(C) 통합보안센터',
    hyundai: '(H) 글로벌사업관리본부',
    kia: '(K) 글로벌사업관리본부',
    group: ''
  },
  {
    id: 3,
    category: '조직',
    chonggwal: '(C) 기획조정본부',
    hyundai: '(H) Global Sales and Marketing',
    kia: '(K) 기업전략실',
    group: ''
  },
  // ... 나머지 기본 데이터들
];

/**
 * 조직 관련 resolver 함수들을 등록하는 함수
 * 
 * @param {Resolver} resolver - Forge Resolver 인스턴스
 */
export function organizationResolvers(resolver) {
  
  /**
   * 조직 데이터 조회
   * 
   * @param {Object} req - 요청 객체
   * @returns {Object} 조직 데이터 배열을 포함한 응답 객체
   */
  resolver.define('getOrganizationData', async (req) => {
    try {
      console.log('📊 조직 데이터 조회 시작');
      
      // Forge storage에서 조직 데이터 조회
      const organizationData = await storage.get('organizationData');
      
      // 데이터가 없으면 기본 데이터를 저장하고 반환
      if (!organizationData) {
        console.log('📊 기본 조직 데이터를 초기화합니다');
        await storage.set('organizationData', DEFAULT_ORGANIZATION_DATA);
        return { 
          success: true,
          data: DEFAULT_ORGANIZATION_DATA 
        };
      }
      
      console.log(`📊 조직 데이터 조회 완료: ${organizationData.length}개 조직`);
      return { 
        success: true,
        data: organizationData 
      };
      
    } catch (error) {
      console.error('❌ 조직 데이터 조회 오류:', error);
      return { 
        success: false,
        data: DEFAULT_ORGANIZATION_DATA,
        error: error.message
      };
    }
  });

  /**
   * 조직 데이터 전체 저장
   * 
   * @param {Object} req - 요청 객체 (req.payload.data 필요)
   * @returns {Object} 저장 결과 응답 객체
   */
  resolver.define('saveOrganizationData', async (req) => {
    try {
      console.log('💾 조직 데이터 저장 시작');
      
      const { data } = req.payload;
      
      // 데이터 유효성 검사
      if (!Array.isArray(data)) {
        throw new Error('조직 데이터는 배열 형태여야 합니다');
      }
      
      await storage.set('organizationData', data);
      
      console.log(`💾 조직 데이터 저장 완료: ${data.length}개 조직`);
      return { 
        success: true, 
        message: '조직 데이터가 저장되었습니다.' 
      };
      
    } catch (error) {
      console.error('❌ 조직 데이터 저장 오류:', error);
      return { 
        success: false, 
        message: '조직 데이터 저장 중 오류가 발생했습니다: ' + error.message 
      };
    }
  });

  /**
   * 특정 조직 항목 수정
   * 
   * @param {Object} req - 요청 객체 (req.payload.id, req.payload.updatedItem 필요)
   * @returns {Object} 수정된 전체 데이터를 포함한 응답 객체
   */
  resolver.define('updateOrganizationItem', async (req) => {
    try {
      console.log('✏️ 조직 항목 수정 시작');
      
      const { id, updatedItem } = req.payload;
      
      // 기존 데이터 조회
      const organizationData = await storage.get('organizationData') || DEFAULT_ORGANIZATION_DATA;
      
      // 해당 ID의 항목 찾기 및 수정
      const updatedData = organizationData.map(item => 
        item.id === id ? { ...item, ...updatedItem } : item
      );
      
      // 수정된 데이터 저장
      await storage.set('organizationData', updatedData);
      
      console.log(`✏️ 조직 항목 수정 완료: ID ${id}`);
      return { 
        success: true, 
        data: updatedData,
        message: '조직 항목이 수정되었습니다.'
      };
      
    } catch (error) {
      console.error('❌ 조직 항목 수정 오류:', error);
      return { 
        success: false, 
        message: '조직 데이터 업데이트 중 오류가 발생했습니다: ' + error.message 
      };
    }
  });

  /**
   * 새 조직 항목 추가
   * 
   * @param {Object} req - 요청 객체 (req.payload.newItem 필요)
   * @returns {Object} 새 항목이 추가된 전체 데이터를 포함한 응답 객체
   */
  resolver.define('addOrganizationItem', async (req) => {
    try {
      console.log('➕ 새 조직 항목 추가 시작');
      
      const { newItem } = req.payload;
      
      // 기존 데이터 조회
      const organizationData = await storage.get('organizationData') || DEFAULT_ORGANIZATION_DATA;
      
      // 새 ID 생성 (현재 최대 ID + 1)
      const newId = Math.max(...organizationData.map(item => item.id), 0) + 1;
      const itemWithId = { ...newItem, id: newId };
      
      // 새 항목 추가
      const updatedData = [...organizationData, itemWithId];
      await storage.set('organizationData', updatedData);
      
      console.log(`➕ 새 조직 항목 추가 완료: ID ${newId}`);
      return { 
        success: true, 
        data: updatedData,
        message: '새 조직 항목이 추가되었습니다.'
      };
      
    } catch (error) {
      console.error('❌ 조직 항목 추가 오류:', error);
      return { 
        success: false, 
        message: '조직 데이터 추가 중 오류가 발생했습니다: ' + error.message 
      };
    }
  });

  /**
   * 조직 항목 삭제
   * 
   * @param {Object} req - 요청 객체 (req.payload.id 필요)
   * @returns {Object} 삭제 후 남은 데이터를 포함한 응답 객체
   */
  resolver.define('deleteOrganizationItem', async (req) => {
    try {
      console.log('🗑️ 조직 항목 삭제 시작');
      
      const { id } = req.payload;
      
      // 기존 데이터 조회
      const organizationData = await storage.get('organizationData') || DEFAULT_ORGANIZATION_DATA;
      
      // 해당 ID의 항목 제외하고 필터링
      const updatedData = organizationData.filter(item => item.id !== id);
      
      // 삭제된 데이터 저장
      await storage.set('organizationData', updatedData);
      
      console.log(`🗑️ 조직 항목 삭제 완료: ID ${id}`);
      return { 
        success: true, 
        data: updatedData,
        message: '조직 항목이 삭제되었습니다.'
      };
      
    } catch (error) {
      console.error('❌ 조직 항목 삭제 오류:', error);
      return { 
        success: false, 
        message: '조직 데이터 삭제 중 오류가 발생했습니다: ' + error.message 
      };
    }
  });
}