### axios 복습
axios란 noce.js와 브라우저를 위한 Promsie기반 http클라이언트
즉, http를 이용하여 서버와 통신하기 위해 사용하는 패키지

- axios 설치 -> npm i axios
- json-server 실행
  npx json-server db.json --port 4000

### axios를 활용한 기본 CRUD
- get, post, delete, patch(해당 항목만 변경)  or put(원래의 값을 무시하고 덮어씌움)

### HTTP 요청을 처리하기 위한 도구, fetch와 axios
fetch와 axios모두 HTTP요청 (GET, POST)를 처리하기 위한 JavaScript라이브러리 <br>
React에서 axios를 fetch보다 선호하는 경우가 종종 있는데 그 이유는 axios의 다음과 같은 장점 때문이다. <br>

### axios 장점
1. 기본 설정 및 인터셉터 지원
     - 기본설정: axios는 기본 설정을 정의하고 이를 통해 모든 요청에 공통 설정을 적용할 수 있다.
     ```jsx
      const api = axios.create({
        baseURL: 'http://localhost:4000",
        timeout: 1000,
        headers: {
            'X-Custom-Header':'foobar'
        }
     })
     ```
     - 인터셉트: 요청 또는 응답을 가로채서 전처리 또는 후처리할 수 있다.
     - 이를 통해 인증 토큰을 자동으로 추가하거나 오류를 일괄처리할 수 있다.
     ```jsx
     axios.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
     }, error => {
        return Promise.reject(error);
     });
     ```

2. 더 나은 오류 처리
   - 에러 핸들링: HTTP 상태코드를 기준으로 한 일관된 오류 처리를 제공한다.
   - fetch는 기본적으로 네트워크 오류만 catch블록으로 전달되고 4xx,5xx오류는 then블록에서 처리해야한다.
   
3. 브라우저 호환성
   - 구형 브라우저 지원: axios는 구형 브라우저와의 호환성이 좋다. fetch는 구형 브라우저에서 지원되지 않을 수 있어 폴리필이 필요하다.

4. 간단한 사용 문법
   - axios는 간결하고 직관적인 문법을 제공하여 사용하기 쉽다. fetch보다 코드가 더 깔끔해 질 수 있다.
   ```jsx
    axios.get('/user').then(res=> console.log(res.data))
    .catch(error => console.error(error));
   ```
     
