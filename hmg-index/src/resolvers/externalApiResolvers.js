/**
 * 외부 API 연동 관련 Resolver 함수들
 * 
 * 이 파일은 외부 API와의 통신을 담당합니다.
 * - JSONPlaceholder API (샘플 데이터용)
 * - 공공데이터포털 API (실제 기업 정보용)
 * - 기타 외부 서비스 API
 * 
 * @module ExternalApiResolvers
 */

/**
 * 외부 API 설정 상수
 */
const EXTERNAL_API_CONFIG = {
  /** JSONPlaceholder API 기본 URL */
  JSONPLACEHOLDER_BASE_URL: 'https://jsonplaceholder.typicode.com',
  /** 공공데이터포털 API 기본 URL */
  PUBLIC_DATA_BASE_URL: 'http://apis.data.go.kr',
  /** API 요청 타임아웃 (밀리초) */
  REQUEST_TIMEOUT: 10000
};

/**
 * 외부 API 관련 resolver 함수들을 등록하는 함수
 * 
 * @param {Resolver} resolver - Forge Resolver 인스턴스
 */
export function externalApiResolvers(resolver) {
  
  /**
   * 외부 API에서 조직도 데이터 가져오기
   * 
   * JSONPlaceholder API를 사용하여 샘플 사용자 데이터를 조직도 형태로 변환합니다.
   * 실제 운영에서는 회사의 HR 시스템 API로 교체해야 합니다.
   * 
   * @param {Object} req - 요청 객체
   * @returns {Object} 조직도 데이터 응답 객체
   */
  resolver.define('getExternalOrganizationData', async (req) => {
    try {
      console.log('🌐 외부 API에서 조직도 데이터 조회 시작');
      
      // JSONPlaceholder API에서 사용자 데이터 조회
      const apiUrl = `${EXTERNAL_API_CONFIG.JSONPLACEHOLDER_BASE_URL}/users`;
      console.log('🌐 API 호출:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        // Forge에서는 timeout 설정이 자동으로 적용됨
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}, statusText: ${response.statusText}`);
      }
      
      const users = await response.json();
      console.log('🌐 외부 API 응답:', `${users.length}명의 사용자 데이터 수신`);
      
      // 조직도 형태로 데이터 변환
      const organizationData = users.slice(0, 10).map((user, index) => ({
        id: user.id,
        category: '조직',
        chonggwal: `(C) ${user.company?.name || 'ICT본부'}`,
        hyundai: `(H) ${user.name}`,
        kia: `(K) ${user.email.split('@')[0]}`,
        group: user.company?.catchPhrase || '42dot',
        // 추가 정보
        phone: user.phone,
        website: user.website,
        address: `${user.address?.city} ${user.address?.street}`,
        department: user.company?.name || '미정'
      }));
      
      console.log('🌐 조직도 데이터 변환 완료:', `${organizationData.length}개 조직`);
      
      return {
        success: true,
        data: organizationData,
        source: 'JSONPlaceholder API',
        message: '외부 API에서 조직도 데이터를 성공적으로 가져왔습니다.',
        timestamp: new Date().toISOString(),
        dataCount: organizationData.length
      };
      
    } catch (error) {
      console.error('❌ 외부 조직도 데이터 조회 오류:', error);
      return {
        success: false,
        message: '외부 API 호출 중 오류가 발생했습니다: ' + error.message,
        error: error.name,
        data: []
      };
    }
  });

  /**
   * 공공데이터포털 기업정보 API 호출
   * 
   * 실제 기업 정보를 조회하는 함수입니다.
   * 현재는 샘플 응답을 반환하며, 실제 사용시 API 키가 필요합니다.
   * 
   * @param {Object} req - 요청 객체
   * @param {string} [req.payload.companyName] - 조회할 기업명
   * @param {string} [req.payload.corpCode] - 기업 코드
   * @returns {Object} 기업 정보 응답 객체
   */
  resolver.define('getPublicCompanyData', async (req) => {
    try {
      console.log('🏢 공공데이터 기업정보 조회 시작');
      
      const { companyName, corpCode } = req.payload || {};
      console.log('🏢 조회 대상:', { companyName, corpCode });
      
      // 실제 사용 시 주석을 해제하고 API 키를 설정해야 함
      /*
      const API_KEY = process.env.PUBLIC_DATA_API_KEY;
      if (!API_KEY) {
        throw new Error('공공데이터 API 키가 설정되지 않았습니다');
      }
      
      const apiUrl = `${EXTERNAL_API_CONFIG.PUBLIC_DATA_BASE_URL}/1160100/service/GetCorpBasicInfoService/getCorpOutline`;
      const params = new URLSearchParams({
        serviceKey: API_KEY,
        corp_code: corpCode,
        response_type: 'json'
      });
      
      const response = await fetch(`${apiUrl}?${params}`);
      const data = await response.json();
      */
      
      // 현재는 샘플 데이터 반환
      const sampleData = {
        companyName: companyName || '현대자동차그룹',
        ceo: '정의선',
        established: '1967-12-29',
        employees: 120000,
        address: '서울특별시 종로구 율곡로 75',
        business: '자동차 제조 및 판매',
        capital: '1조 7천억원',
        revenue: '142조원',
        website: 'https://www.hyundaimotorgroup.com',
        industry: '자동차',
        // 추가 샘플 데이터
        subsidiaries: ['현대자동차', '기아', '제네시스', '현대모비스'],
        stockCode: '005380',
        description: '글로벌 자동차 제조업체로 혁신적인 모빌리티 솔루션을 제공합니다.'
      };
      
      console.log('🏢 기업정보 조회 완료:', sampleData.companyName);
      
      return {
        success: true,
        data: sampleData,
        source: 'Public Data Portal (Sample)',
        message: '공공데이터에서 기업 정보를 가져왔습니다.',
        timestamp: new Date().toISOString(),
        isample: true // 샘플 데이터임을 표시
      };
      
    } catch (error) {
      console.error('❌ 공공데이터 기업정보 조회 오류:', error);
      return {
        success: false,
        message: '공공데이터 API 호출 중 오류가 발생했습니다: ' + error.message,
        error: error.name,
        data: null
      };
    }
  });

  /**
   * 실시간 날씨 정보 조회 (예시)
   * 
   * 대시보드에 표시할 추가 정보로 날씨 데이터를 조회하는 예시 함수입니다.
   * 
   * @param {Object} req - 요청 객체
   * @param {string} [req.payload.city] - 도시명
   * @returns {Object} 날씨 정보 응답 객체
   */
  resolver.define('getWeatherData', async (req) => {
    try {
      console.log('🌤️ 날씨 정보 조회 시작');
      
      const { city = '서울' } = req.payload || {};
      
      // 실제로는 날씨 API (OpenWeatherMap 등) 호출
      // 현재는 샘플 데이터 반환
      const weatherData = {
        city: city,
        temperature: Math.floor(Math.random() * 30) + 5, // 5-35도 랜덤
        humidity: Math.floor(Math.random() * 50) + 30, // 30-80% 랜덤
        condition: ['맑음', '흐림', '비', '눈'][Math.floor(Math.random() * 4)],
        windSpeed: Math.floor(Math.random() * 20) + 1, // 1-20 m/s
        lastUpdated: new Date().toISOString()
      };
      
      console.log('🌤️ 날씨 정보 조회 완료:', `${city} ${weatherData.temperature}°C`);
      
      return {
        success: true,
        data: weatherData,
        source: 'Weather API (Sample)',
        message: `${city}의 날씨 정보를 조회했습니다.`
      };
      
    } catch (error) {
      console.error('❌ 날씨 정보 조회 오류:', error);
      return {
        success: false,
        message: '날씨 정보 조회 중 오류가 발생했습니다: ' + error.message,
        data: null
      };
    }
  });
}