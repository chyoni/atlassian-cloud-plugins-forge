# HMG Index 백엔드

현대자동차그룹의 통합정보 인덱스 페이지 백엔드 API 서버입니다.

## 📁 프로젝트 구조

```
src/
├── resolvers/              # 기능별 Resolver 모듈
│   ├── organizationResolvers.js   # 조직 관리
│   ├── serviceRequestResolvers.js # 서비스 요청
│   ├── spaceSearchResolvers.js    # 스페이스 검색
│   ├── noticeResolvers.js         # 공지사항
│   └── externalApiResolvers.js    # 외부 API 연동
├── docs/                   # 문서
│   └── README.md
└── index.js               # 메인 진입점
```

## 🚀 주요 기능

### 1. **조직 관리 (organizationResolvers.js)**
- 조직 데이터 CRUD 작업
- Forge Storage 연동
- 기본 조직 데이터 관리

**사용 가능한 Resolver:**
- `getOrganizationData` - 조직 데이터 조회
- `saveOrganizationData` - 조직 데이터 저장
- `updateOrganizationItem` - 조직 항목 수정
- `addOrganizationItem` - 새 조직 항목 추가
- `deleteOrganizationItem` - 조직 항목 삭제

### 2. **서비스 요청 (serviceRequestResolvers.js)**
- Jira Service Desk API 연동
- 서비스 요청 티켓 생성
- 에러 처리 및 로깅

**사용 가능한 Resolver:**
- `createServiceDeskRequest` - 서비스 요청 생성

### 3. **스페이스 검색 (spaceSearchResolvers.js)**
- Confluence REST API v2 연동
- 페이지네이션 지원
- 스페이스 검색 및 필터링

**사용 가능한 Resolver:**
- `searchSpaces` - 스페이스 검색

### 4. **공지사항 (noticeResolvers.js)**
- 공지사항 데이터 관리
- 카테고리 및 우선순위 필터링
- 샘플 데이터 제공

**사용 가능한 Resolver:**
- `getNotices` - 공지사항 목록 조회
- `getNoticeDetail` - 공지사항 상세 조회

### 5. **외부 API 연동 (externalApiResolvers.js)**
- 외부 API 호출 관리
- 공공데이터포털 연동
- 날씨 정보 등 부가 서비스

**사용 가능한 Resolver:**
- `getExternalOrganizationData` - 외부 조직 데이터
- `getPublicCompanyData` - 공공데이터 기업정보
- `getWeatherData` - 날씨 정보

## 🛠️ 기술 스택

- **Atlassian Forge** - 플랫폼
- **Forge API** - Confluence/Jira 연동
- **Forge Storage** - 데이터 저장
- **ES6 Modules** - 모듈 시스템

## 📝 개발 가이드

### Resolver 작성 규칙

1. **모듈화**: 기능별로 별도 파일 분리
2. **JSDoc 주석**: 모든 함수에 상세 주석 작성
3. **에러 처리**: try-catch 블록 필수 사용
4. **로깅**: console.log로 상세한 로그 기록
5. **응답 형식**: 일관된 응답 구조 사용

```javascript
/**
 * 예시 Resolver 함수
 * 
 * @param {Object} req - 요청 객체
 * @param {string} req.payload.id - 항목 ID
 * @returns {Object} 응답 객체
 */
resolver.define('exampleResolver', async (req) => {
  try {
    console.log('🚀 예시 Resolver 시작');
    
    const { id } = req.payload;
    
    // 비즈니스 로직 수행
    const result = await performOperation(id);
    
    console.log('✅ 예시 Resolver 완료');
    
    return {
      success: true,
      data: result,
      message: '성공적으로 처리되었습니다.'
    };
    
  } catch (error) {
    console.error('❌ 예시 Resolver 오류:', error);
    
    return {
      success: false,
      message: '처리 중 오류가 발생했습니다: ' + error.message,
      error: error.name
    };
  }
});
```

### 응답 구조 표준

**성공 응답:**
```javascript
{
  success: true,
  data: {...},           // 실제 데이터
  message: "성공 메시지",
  timestamp: "ISO 날짜"
}
```

**실패 응답:**
```javascript
{
  success: false,
  message: "에러 메시지",
  error: "ErrorType",
  details: "상세 정보"
}
```

### Forge Storage 사용법

```javascript
import { storage } from '@forge/api';

// 데이터 저장
await storage.set('key', data);

// 데이터 조회
const data = await storage.get('key');

// 데이터 삭제
await storage.delete('key');
```

### Confluence API 호출

```javascript
import api, { route } from '@forge/api';

const response = await api.asUser().requestConfluence(
  route`/wiki/api/v2/spaces`,
  {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  }
);
```

### Jira API 호출

```javascript
import api, { route } from '@forge/api';

const response = await api.asUser().requestJira(
  route`/rest/servicedeskapi/request`,
  {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData)
  }
);
```

## 🔧 설정 관리

### 환경별 설정

```javascript
const CONFIG = {
  development: {
    logLevel: 'debug',
    timeout: 10000
  },
  production: {
    logLevel: 'error',
    timeout: 5000
  }
};
```

### API 엔드포인트 설정

```javascript
const API_ENDPOINTS = {
  confluence: '/wiki/api/v2',
  jira: '/rest/api/3',
  serviceDesk: '/rest/servicedeskapi'
};
```

## 🚨 에러 처리

### 에러 타입 분류

1. **네트워크 에러**: API 호출 실패
2. **인증 에러**: 권한 부족
3. **데이터 에러**: 잘못된 입력값
4. **시스템 에러**: 내부 오류

### 에러 로깅 패턴

```javascript
try {
  // 작업 수행
} catch (error) {
  console.error('❌ [함수명] 오류 발생:', {
    message: error.message,
    stack: error.stack,
    payload: req.payload,
    timestamp: new Date().toISOString()
  });
  
  return {
    success: false,
    message: '사용자 친화적 메시지',
    error: error.name
  };
}
```

## 📊 성능 최적화

### 캐싱 전략

```javascript
const cache = new Map();

// 캐시 확인
if (cache.has(key)) {
  return cache.get(key);
}

// 데이터 조회 및 캐싱
const data = await fetchData();
cache.set(key, data);
```

### 페이지네이션 구현

```javascript
// 페이지네이션 파라미터
const { page = 1, limit = 10 } = req.payload;
const offset = (page - 1) * limit;

// 결과 제한
const results = allData.slice(offset, offset + limit);
```

## 🧪 테스트

### 단위 테스트 예시

```javascript
describe('organizationResolvers', () => {
  test('getOrganizationData should return data', async () => {
    const req = { payload: {} };
    const result = await resolver.getOrganizationData(req);
    
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
  });
});
```

### API 테스트

```javascript
// Postman이나 curl로 테스트
curl -X POST \
  'https://api.atlassian.com/invoke/...' \
  -H 'Content-Type: application/json' \
  -d '{"payload": {"id": 1}}'
```

## 🔍 디버깅

### 로그 레벨

- 🚀 시작: 함수 실행 시작
- ✅ 성공: 정상 완료
- ❌ 실패: 에러 발생
- ⚠️ 경고: 주의 사항
- ℹ️ 정보: 일반 정보

### 디버깅 팁

1. **상세한 로그**: 입력값, 중간 결과, 최종 결과 모두 로깅
2. **타임스탬프**: 성능 측정을 위한 시간 기록
3. **에러 스택**: 전체 스택 트레이스 로깅
4. **요청 추적**: 고유 ID로 요청 추적

## 📚 API 명세

### organizationResolvers

#### getOrganizationData
- **설명**: 조직 데이터 전체 조회
- **파라미터**: 없음
- **응답**: `{success: boolean, data: Array}`

#### saveOrganizationData
- **설명**: 조직 데이터 저장
- **파라미터**: `{data: Array}`
- **응답**: `{success: boolean, message: string}`

### serviceRequestResolvers

#### createServiceDeskRequest
- **설명**: 서비스 요청 생성
- **파라미터**: `{title: string, content: string}`
- **응답**: `{success: boolean, issueKey: string}`

### spaceSearchResolvers

#### searchSpaces
- **설명**: 스페이스 검색
- **파라미터**: `{query: string}`
- **응답**: `{success: boolean, spaces: Array}`

## 🔗 외부 API 연동

### 공공데이터포털 API

```javascript
const API_KEY = process.env.PUBLIC_DATA_API_KEY;
const url = `http://apis.data.go.kr/service?serviceKey=${API_KEY}`;
```

### JSONPlaceholder API (테스트용)

```javascript
const response = await fetch('https://jsonplaceholder.typicode.com/users');
const data = await response.json();
```

## 📋 체크리스트

### 새 Resolver 추가 시

- [ ] JSDoc 주석 작성
- [ ] 에러 처리 구현
- [ ] 로깅 추가
- [ ] 응답 형식 통일
- [ ] 타입 검증
- [ ] 테스트 작성
- [ ] 문서 업데이트

### 배포 전 체크

- [ ] 모든 테스트 통과
- [ ] 로그 레벨 확인
- [ ] 환경 변수 설정
- [ ] API 키 보안 확인
- [ ] 권한 설정 검토

---

**문의사항이나 개선 제안이 있으시면 개발팀에 연락해주세요!** 📧