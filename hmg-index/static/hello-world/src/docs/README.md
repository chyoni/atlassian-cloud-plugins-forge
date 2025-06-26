# HMG Index 프론트엔드

현대자동차그룹의 통합정보 인덱스 페이지 프론트엔드 애플리케이션입니다.

## 📁 프로젝트 구조

```
src/
├── components/           # React 컴포넌트
│   ├── common/          # 공통 컴포넌트
│   │   ├── LoadingSpinner.js
│   │   ├── ErrorMessage.js
│   │   └── EmptyState.js
│   ├── Header.js
│   ├── Navigation.js
│   └── Footer.js
├── pages/               # 페이지 컴포넌트
│   ├── HomePage.js
│   ├── OrganizationPage.js
│   ├── SpaceSearchPage.js
│   └── ...
├── services/            # API 서비스 레이어
│   └── apiService.js
├── hooks/               # 커스텀 React 훅
│   └── useApi.js
├── utils/               # 유틸리티 함수들
│   ├── constants.js
│   └── helpers.js
├── docs/                # 문서
│   └── README.md
├── App.js               # 메인 앱 컴포넌트
├── App.css              # 전역 스타일
└── index.js             # 앱 진입점
```

## 🚀 주요 기능

### 1. **홈 페이지**
- 웰컴 메시지 및 주요 액션 버튼
- 최근 공지사항 목록
- 빠른 액세스 카드

### 2. **조직 관리**
- 조직도 조회 및 편집
- 외부 API 연동 조직 데이터
- 실시간 데이터 동기화

### 3. **스페이스 검색**
- Confluence 스페이스 검색
- 실시간 검색 결과
- 페이지네이션 지원

### 4. **서비스 요청**
- Jira Service Desk 연동
- 요청 양식 작성 및 전송
- 요청 상태 추적

## 🛠️ 기술 스택

- **React 16** - UI 라이브러리
- **Forge Bridge** - Atlassian Forge 통신
- **CSS3** - 스타일링 (CSS Grid, Flexbox)
- **ES6+** - 모던 JavaScript

## 📝 개발 가이드

### 컴포넌트 작성 규칙

1. **함수형 컴포넌트** 사용
2. **JSDoc 주석** 필수 작성
3. **Props 검증** (PropTypes 또는 JSDoc)
4. **에러 바운더리** 적용

```javascript
/**
 * 예시 컴포넌트
 * 
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.title - 제목
 * @param {Function} props.onClick - 클릭 핸들러
 * @returns {JSX.Element} 컴포넌트
 */
function ExampleComponent({ title, onClick }) {
  return (
    <div className="example-component">
      <h2>{title}</h2>
      <button onClick={onClick}>클릭</button>
    </div>
  );
}
```

### API 서비스 사용법

```javascript
import { organizationService } from '../services/apiService.js';

// 조직 데이터 조회
const response = await organizationService.getAll();
if (response.success) {
  console.log('조직 데이터:', response.data);
} else {
  console.error('오류:', response.error);
}
```

### 커스텀 훅 사용법

```javascript
import { useApi } from '../hooks/useApi.js';
import { organizationService } from '../services/apiService.js';

function MyComponent() {
  const {
    data,
    loading,
    error,
    execute
  } = useApi(organizationService.getAll);
  
  useEffect(() => {
    execute();
  }, []);
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  
  return <div>{/* 컴포넌트 내용 */}</div>;
}
```

## 🎨 스타일 가이드

### CSS 클래스 명명 규칙

- **BEM 방식** 권장: `block__element--modifier`
- **의미 있는 이름** 사용
- **접두사** 사용: `hmg-`, `app-`, `page-`

### 색상 시스템

```css
:root {
  --primary: #4f46e5;
  --secondary: #6366f1;
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
  --gray: #6b7280;
}
```

### 반응형 브레이크포인트

```css
/* 모바일 */
@media (max-width: 768px) { }

/* 태블릿 */
@media (max-width: 1024px) { }

/* 데스크톱 */
@media (min-width: 1025px) { }
```

## 🔧 유틸리티 함수

### 날짜 포맷팅

```javascript
import { dateUtils } from '../utils/helpers.js';

const formattedDate = dateUtils.format(new Date(), 'YYYY-MM-DD');
const relativeTime = dateUtils.getRelativeTime(new Date());
```

### 문자열 처리

```javascript
import { stringUtils } from '../utils/helpers.js';

const truncated = stringUtils.truncate('긴 텍스트', 10);
const highlighted = stringUtils.highlight('원본 텍스트', '검색어');
```

## 🚨 에러 처리

### API 에러 처리

```javascript
try {
  const result = await apiService.someFunction();
  // 성공 처리
} catch (error) {
  console.error('API 오류:', error);
  // 에러 UI 표시
}
```

### 컴포넌트 에러 처리

```javascript
function MyComponent() {
  const [error, setError] = useState(null);
  
  if (error) {
    return <ErrorMessage message={error} onRetry={() => setError(null)} />;
  }
  
  // 정상 렌더링
}
```

## 📊 성능 최적화

### React 최적화

1. **React.memo** 사용
2. **useCallback, useMemo** 적절히 활용
3. **코드 스플리팅** 고려

### 이미지 최적화

1. **적절한 이미지 포맷** 사용
2. **지연 로딩** (Lazy Loading) 적용
3. **이미지 압축** 진행

## 🧪 테스트

### 테스트 작성 가이드

```javascript
// 컴포넌트 테스트 예시
describe('ExampleComponent', () => {
  test('제목이 올바르게 렌더링된다', () => {
    render(<ExampleComponent title="테스트 제목" />);
    expect(screen.getByText('테스트 제목')).toBeInTheDocument();
  });
});
```

## 🔍 디버깅

### 로그 레벨

- `console.log()` - 일반 정보
- `console.warn()` - 경고
- `console.error()` - 에러
- `console.debug()` - 디버그 정보

### 개발 도구

- **React Developer Tools**
- **Redux DevTools** (상태 관리 시)
- **Forge 로그** 확인

## 📚 참고 자료

- [React 공식 문서](https://reactjs.org/)
- [Atlassian Forge 문서](https://developer.atlassian.com/platform/forge/)
- [CSS Grid 가이드](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Flexbox 가이드](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

---

**문의사항이나 개선 제안이 있으시면 개발팀에 연락해주세요!** 📧