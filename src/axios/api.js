import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
});

// intercepotrs
// 첫 번째 인자와 두 번째 인자 모두 콜백 함수
api.interceptors.request.use((config) => {
  // 여기에서 요청을 보내기 전에 할 작업
  console.log("인터셉트 요청 성공!");
  return config;
});
api.interceptors.response.use(
  // 여기에서 요청 성공 시 할 작업
  (config) => {
    console.log("인터셉트 응답 성공");
    return config;
  },
  (error) => {
    console.log("인터셉트 응답을 받지 못했습니다.", error);
    return Promise.reject(error);
  }
);
export default api;
