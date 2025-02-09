# SIMPLE CSR & SSR 🌍⚡
### 순수 JS로 구현된 간단한 CSR, SSR 시스템

이 프로젝트는 클라이언트 사이드 렌더링(CSR)과 서버 사이드 렌더링(SSR)을 각각 간단하게 구현해본 실험적 프로젝트입니다.
특정 프레임워크 없이 순수 JavaScript를 활용하여 기본적인 렌더링 방식의 차이를 경험해보는 것이 목표입니다.
프로젝트는 영화검색 서비스의 형식을 따라 구현되었습니다.

---

## 🎯 **프로젝트 목표 (Goals)**  

✅ **CSR과 SSR의 기본적인 동작 방식 이해**  
✅ **JavaScript만을 이용해 간단한 렌더링 로직 구현**  
✅ **Next.js 등의 모던 ssr 프레임워크에서 이루어지는 서버와 클라이언트 간의 데이터 흐름 파악**

---

## ✨ **주요 기능 (Features)**  

🔹 **CRS**: URL 경로를 기반으로 페이지를 동적으로 렌더링하는 시스템  
🔹 **SSR**: URL 경로 및 쿼리 스트링을 활용하여, 사용자의 페이지 진입 시 데이터를 페칭하고 HTML을 완성하여 반환하는 시스템  

---

## 🛠 **기술 스택 (Tech Stack)**  

- **[JavaScript (Vanilla JS)]** - 최소한의 코드로 CSR & SSR 구현
- **[Node.js (Express)](https://expressjs.com/ko/)** - SSR 서버 구축
- **[vite](https://ko.vite.dev/guide/)** - 번들링, 빌드 도구
- **[nodemon](https://www.npmjs.com/package/nodemon)** - express 서버파일에서 HMR(Hot Module Reload) 적용

---

## 🚀 **설치 및 실행 방법 (Installation & Setup)**  

이 프로젝트를 실행하려면 **Node.js 20 이상**이 필요합니다.  
아래 명령어를 실행하여 프로젝트를 로컬에서 실행할 수 있습니다.  

```sh
# 의존성 설치
yarn

# 프로젝트 빌드
yarn build

# express 서버 구동
yarn dev:server
```

---

## 💡 배운 점 & 기술적 인사이트 (Learnings & Insights)

🔹 CSR: history API의 메소드와 window.history 이벤트를 활용하여, 프레임워크에서 CSR을 어떻게 구현하는지 이해할 수 있었음.  
🔹 SSR: 서버에서 요청별로 HTML을 구성하는 방식과, 서버에서 가져온 데이터를 window 객체에 주입하여 클라이언트에서 이를 활용하는 방법을 학습함.  

---

## 🔧 향후 개선점 (Improvements)

🚧 스타일 개선: Tailwind를 사용한 스타일 처리  
🚧 서버에서 반환된 html과 하이드레이션 이후의 html에 대한 비교: Next.js에서 제공하는 각 시점의 html 내용 비교 및 불일치할 시 에러 던지기 구현  
🚧 배포 진행: Vercel을 통한 배포  