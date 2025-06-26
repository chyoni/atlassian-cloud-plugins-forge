# 🏢 HMG Index - 현대자동차그룹 통합정보 인덱스

> 현대자동차그룹의 혁신을 이끄는 통합정보 인덱스 페이지

[![Forge App](https://img.shields.io/badge/Atlassian-Forge-blue)](https://developer.atlassian.com/platform/forge/)
[![React](https://img.shields.io/badge/React-16.14-61dafb)](https://reactjs.org/)
[![Version](https://img.shields.io/badge/Version-1.1.10-green)](https://github.com)

## 📖 개요

HMG Index는 현대자동차그룹의 다양한 정보와 서비스를 통합적으로 관리하고 접근할 수 있는 Atlassian Forge 기반의 웹 애플리케이션입니다.

### 🎯 주요 목표
- **통합 정보 관리**: 조직, 프로젝트, 공지사항 등 핵심 정보 중앙화
- **효율적인 협업**: Confluence와 Jira Service Desk 연동을 통한 원활한 업무 프로세스
- **사용자 친화적 인터페이스**: 직관적이고 반응형 UI/UX 제공
- **확장 가능한 구조**: 모듈화된 아키텍처로 기능 확장 용이

## ✨ 주요 기능

### 🏠 **대시보드**
- 웰컴 메시지 및 주요 액션 버튼
- 최근 공지사항 실시간 조회
- 빠른 액세스 카드 제공

### 🏢 **조직 관리**
- 현대자동차그룹 조직도 조회 및 편집
- 외부 API 연동을 통한 동적 조직 데이터
- 실시간 조직 정보 업데이트

### 🔍 **스페이스 검색**
- Confluence 스페이스 통합 검색
- 실시간 검색 결과 및 필터링
- 페이지네이션 지원으로 대용량 데이터 처리

### 🎫 **서비스 요청**
- Jira Service Desk 직접 연동
- 간편한 요청 양식 작성
- 요청 상태 실시간 추적

### 📢 **공지사항**
- 카테고리별 공지사항 분류
- 우선순위 기반 정렬
- 상세 공지사항 뷰어

### ❓ **도움말 센터**
- FAQ 및 사용 가이드
- 연락처 정보 제공
- 단계별 사용법 안내

## 🏗️ 아키텍처

### 📁 프로젝트 구조

```
hmg-index/
├── 📁 src/                          # 백엔드 소스코드
│   ├── 📁 resolvers/                # 기능별 Resolver 모듈
│   │   ├── 📄 organizationResolvers.js
│   │   ├── 📄 serviceRequestResolvers.js
│   │   ├── 📄 spaceSearchResolvers.js
│   │   ├── 📄 noticeResolvers.js
│   │   └── 📄 externalApiResolvers.js
│   ├── 📁 docs/                     # 백엔드 문서
│   └── 📄 index.js                  # 백엔드 진입점
├── 📁 static/
│   ├── 📁 hello-world/              # 메인 애플리케이션
│   │   ├── 📁 src/
│   │   │   ├── 📁 components/       # React 컴포넌트
│   │   │   │   ├── 📁 common/       # 공통 컴포넌트
│   │   │   │   │   ├── 📄 LoadingSpinner.js
│   │   │   │   │   ├── 📄 ErrorMessage.js
│   │   │   │   │   └── 📄 EmptyState.js
│      │   │   │   ├── 📄 Header.js
│   │   │   │   ├── 📄 Navigation.js
│   │   │   │   └── 📄 Footer.js
│   │   │   ├── 📁 pages/            # 페이지 컴포넌트
│   │   │   │   ├── 📄 HomePage.js
│   │   │   │   ├── 📄 OrganizationPage.js
│   │   │   │   ├── 📄 SpaceSearchPage.js
│   │   │   │   └── 📄 ...
│   │   │   ├── 📁 services/         # API 서비스 레이어
│   │   │   │   └── 📄 apiService.js
│   │   │   ├── 📁 hooks/            # 커스텀 React 훅
│   │   │   │   └── 📄 useApi.js
│   │   │   ├── 📁 utils/            # 유틸리티 함수
│   │   │   │   ├── 📄 constants.js
│   │   │   │   └── 📄 helpers.js
│   │   │   ├── 📁 docs/             # 프론트엔드 문서
│   │   │   ├── 📄 App.js
│   │   │   ├── 📄 App.css
│   │   │   └── 📄 index.js
│   │   └── 📁 build/                # 빌드 결과물
│   └── 📁 admin/                    # 관리자 페이지
├── 📄 manifest.yml                  # Forge 앱 설정
├── 📄 package.json                  # 프로젝트 설정
└── 📄 README.md                     # 프로젝트 문서
```

### 🔧 기술 스택

#### **프론트엔드**
- **React 16** - 사용자 인터페이스 라이브러리
- **CSS3** - 모던 스타일링 (Grid, Flexbox, 애니메이션)
- **Forge Bridge** - Atlassian Forge 통신 라이브러리
- **ES6+** - 모던 JavaScript 문법

#### **백엔드**
- **Atlassian Forge** - 서버리스 플랫폼
- **Forge API** - Confluence/Jira 연동 API
- **Forge Storage** - 데이터 저장소
- **Node.js 22.x** - 런타임 환경

#### **외부 연동**
- **Confluence REST API v2** - 스페이스 검색
- **Jira Service Desk API** - 서비스 요청 관리
- **공공데이터포털 API** - 기업 정보 조회
- **JSONPlaceholder API** - 테스트 데이터

## 🚀 시작하기

### 📋 사전 요구사항

- **Node.js** 18.x 이상
- **Forge CLI** 설치
- **Atlassian 계정** 및 개발 사이트

### 🛠️ 설치 및 실행

1. **프로젝트 클론**
   ```bash
   git clone <repository-url>
   cd hmg-index
   ```

2. **의존성 설치**
   ```bash
   # 루트 의존성 설치
   npm install
   
   # 프론트엔드 의존성 설치
   cd static/hello-world
   npm install
   
   # 관리자 페이지 의존성 설치
   cd ../admin
   npm install
   ```

3. **프론트엔드 빌드**
   ```bash
   # 메인 애플리케이션 빌드
   cd static/hello-world
   npm run build
   
   # 관리자 페이지 빌드
   cd ../admin
   npm run build
   ```

4. **Forge 앱 배포**
   ```bash
   # 루트 디렉토리에서
   forge deploy
   ```

5. **앱 설치**
   ```bash
   forge install
   ```

### 🔧 개발 환경 설정

1. **환경 변수 설정**
   ```bash
   # .env 파일 생성 (필요시)
   PUBLIC_DATA_API_KEY=your_api_key_here
   ```

2. **개발 서버 실행**
   ```bash
   # 프론트엔드 개발 서버
   cd static/hello-world
   npm start
   
   # 관리자 페이지 개발 서버
   cd static/admin
   npm start
   ```

3. **Forge 터널링** (개발 중)
   ```bash
   forge tunnel
   ```

## 📚 사용 가이드

### 👤 사용자 가이드

#### **홈 페이지 사용법**
1. **액션 버튼 활용**
   - 🔍 **스페이스 검색**: Confluence 스페이스 통합 검색
   - 📄 **문서 검색**: 문서 및 페이지 검색
   - 👥 **공간 관리자 확인**: 스페이스 관리자 정보 조회
   - 🌳 **나의 조직도**: 외부 API 연동 조직도 보기

2. **최근 공지사항 확인**
   - 실시간 업데이트되는 공지사항 목록
   - 클릭하여 상세 내용 확인
   - 작성자 및 업데이트 날짜 정보

#### **조직 관리 사용법**
1. **조직도 조회**
   - 현대자동차그룹 전체 조직 구조 확인
   - 부서별 상세 정보 조회
   - 조직 링크를 통한 관련 페이지 이동

2. **조직 정보 편집** (관리자 권한 필요)
   - 조직 정보 실시간 수정
   - 새로운 조직 추가
   - 기존 조직 정보 삭제

#### **스페이스 검색 사용법**
1. **검색 실행**
   - 검색창에 스페이스 이름 또는 키워드 입력
   - 실시간 검색 결과 확인
   - 검색 결과 카드 클릭으로 스페이스 이동

2. **검색 결과 활용**
   - 스페이스 타입 및 상태 확인
   - 설명 정보를 통한 스페이스 파악
   - 즐겨찾기 및 최근 검색어 관리

#### **서비스 요청 사용법**
1. **요청 작성**
   - 명확한 제목 작성
   - 상세한 내용 기술
   - 긴급도에 따른 우선순위 설정

2. **요청 추적**
   - 요청 번호를 통한 진행 상황 확인
   - 이메일 알림을 통한 상태 업데이트
   - 추가 정보 요청 시 신속한 대응

### 👨‍💼 관리자 가이드

#### **관리자 페이지 접근**
1. Confluence 전역 페이지에서 "HMG Index 글로벌" 접근
2. 관리자 권한 확인 후 설정 페이지 진입

#### **설정 관리**
1. **홈 페이지 설정**
   - 앱 이름 및 환영 메시지 수정
   - 최대 공지사항 수 조정
   - 표시 옵션 설정

2. **조직 설정**
   - 조직 페이지 활성화/비활성화
   - 카테고리 컬럼 표시 설정
   - 조직 링크 활성화 설정

3. **기능별 설정**
   - 각 페이지별 활성화 상태 관리
   - 표시 옵션 세부 설정
   - 사용자 권한 관리

## 🔧 개발 가이드

### 📝 코딩 규칙

#### **JavaScript/React**
```javascript
/**
 * 함수 설명
 * 
 * @param {Object} props - 매개변수 설명
 * @param {string} props.title - 제목
 * @returns {JSX.Element} 반환값 설명
 */
function ExampleComponent({ title }) {
  // 구현 내용
}
```

#### **CSS**
```css
/* BEM 방식 클래스 명명 */
.hmg-index__header {
  /* 스타일 */
}

.hmg-index__header--active {
  /* 수정자 스타일 */
}
```

### 🧪 테스트

#### **단위 테스트**
```bash
# 프론트엔드 테스트
cd static/hello-world
npm test

# 백엔드 테스트
npm test
```

#### **통합 테스트**
```bash
# E2E 테스트 실행
npm run test:e2e
```

### 📦 빌드 및 배포

#### **프로덕션 빌드**
```bash
# 전체 빌드
npm run build:all

# 개별 빌드
npm run build:frontend
npm run build:admin
```

#### **배포 프로세스**
```bash
# 1. 코드 검증
npm run lint
npm run test

# 2. 빌드
npm run build:all

# 3. Forge 배포
forge deploy

# 4. 배포 확인
forge install --upgrade
```

## 🔍 트러블슈팅

### 자주 발생하는 문제

#### **1. 권한 오류 (403 Forbidden)**
```
원인: Jira Service Desk API 권한 부족
해결: manifest.yml의 권한 설정 확인
```

#### **2. 스페이스 검색 결과 없음**
```
원인: Confluence API 권한 또는 네트워크 문제
해결: 
1. 권한 설정 확인
2. API 엔드포인트 상태 확인
3. 네트워크 연결 상태 확인
```

#### **3. 조직 데이터 로딩 실패**
```
원인: Forge Storage 접근 문제
해결:
1. Storage 권한 확인
2. 데이터 형식 검증
3. 기본 데이터 초기화
```

### 디버깅 방법

#### **로그 확인**
```bash
# Forge 로그 실시간 확인
forge logs

# 특정 함수 로그 필터링
forge logs --filter "organizationResolvers"
```

#### **개발자 도구 활용**
1. **브라우저 개발자 도구**
   - Console 탭에서 JavaScript 오류 확인
   - Network 탭에서 API 호출 상태 확인
   - Application 탭에서 로컬 스토리지 확인

2. **React Developer Tools**
   - 컴포넌트 상태 및 props 확인
   - 성능 프로파일링
   - 컴포넌트 트리 분석

## 🤝 기여하기

### 개발 프로세스

1. **이슈 생성**
   - 버그 리포트 또는 기능 요청 이슈 생성
   - 명확한 제목과 상세한 설명 작성

2. **브랜치 생성**
   ```bash
   git checkout -b feature/새로운-기능
   git checkout -b bugfix/버그-수정
   ```

3. **개발 및 테스트**
   - 코딩 규칙 준수
   - 단위 테스트 작성
   - 문서 업데이트

4. **Pull Request**
   - 명확한 PR 제목과 설명
   - 관련 이슈 링크
   - 리뷰어 지정

### 코드 리뷰 가이드라인

- **기능성**: 요구사항 충족 여부
- **가독성**: 코드의 명확성과 주석
- **성능**: 최적화 및 효율성
- **보안**: 보안 취약점 검토
- **테스트**: 테스트 커버리지 확인

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 📞 지원 및 문의

### 개발팀 연락처
- **이메일**: hmg-dev-team@hyundai.com
- **Slack**: #hmg-index-support
- **Jira**: HMG-INDEX 프로젝트

### 문서 및 리소스
- [Atlassian Forge 문서](https://developer.atlassian.com/platform/forge/)
- [React 공식 문서](https://reactjs.org/)
- [Confluence REST API](https://developer.atlassian.com/cloud/confluence/rest/v2/)
- [Jira Service Desk API](https://developer.atlassian.com/cloud/jira/service-desk/rest/)

---

**🚀 HMG Index와 함께 현대자동차그룹의 디지털 혁신을 이끌어가세요!**

*Made with ❤️ by HMG Development Team*