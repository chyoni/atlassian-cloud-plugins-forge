/**
 * Forge App Main Entry Point
 * 
 * 이 파일은 Atlassian Forge 앱의 메인 진입점입니다.
 * 모든 resolver 함수들을 정의하고 외부 API와의 통신을 담당합니다.
 * 
 * @author HMG Development Team
 * @version 1.1.10
 */

import Resolver from '@forge/resolver';
import { storage } from '@forge/api';
import api, { route } from '@forge/api';

// Resolver 구성 파일들 import
import { organizationResolvers } from './resolvers/organizationResolvers.js';
import { serviceRequestResolvers } from './resolvers/serviceRequestResolvers.js';
import { spaceSearchResolvers } from './resolvers/spaceSearchResolvers.js';
import { noticeResolvers } from './resolvers/noticeResolvers.js';
import { externalApiResolvers } from './resolvers/externalApiResolvers.js';

// Resolver 인스턴스 생성
const resolver = new Resolver();

/**
 * 기본 텍스트 응답 함수
 * 앱 초기화 시 호출되는 기본 함수
 * 
 * @param {Object} req - 요청 객체
 * @returns {string} 초기화 메시지
 */
resolver.define('getText', (req) => {
  console.log('getText resolver called with:', req);
  return 'HMG Index Data Loaded Successfully!';
});

/**
 * 글로벌 설정 관리 함수
 * 관리자 페이지에서 사용되는 설정 정보를 처리
 * 
 * @param {Object} req - 요청 객체
 * @returns {Object} 설정 정보 객체
 */
resolver.define('globalSettingsResolver', (req) => {
  console.log('Global settings resolver called:', req);
  return {
    message: 'HMG Index Settings loaded successfully',
    version: '1.1.10',
    timestamp: new Date().toISOString()
  };
});

// 각 기능별 resolver들을 등록
organizationResolvers(resolver);
serviceRequestResolvers(resolver);
spaceSearchResolvers(resolver);
noticeResolvers(resolver);
externalApiResolvers(resolver);

// Forge에서 사용할 resolver 정의들을 export
export const handler = resolver.getDefinitions();