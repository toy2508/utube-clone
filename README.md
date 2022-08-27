# 22/8/27

- Babel 설치

  1. npm install --save-dev @babel/core 설치
  2. npm install --save-dev @babel/preset-env
     : javascript의 최신문법을 사용할 수 있는 설정을 저장
  3. npm install @babel/node --save-dev
     : 바벨의 transpile 하는 작업을 복잡한 문법없이
     명령어(package.json으 scirpts 명령어를 통해)로 실행하게 해줌
  4. babel.config.json 파일 설정
  5. package.json 파일에 scripts 셋업
     : "dev" : "babel-node index.js"

- express Get 방식

  1. 유저가 브라우저로 get 방식으로 요청하면 app.get 형태롤 받을수 있음
  2. app.get을 통해 요청을 받으면 반드시 res 인자를 통해서 요청한 브라우저에게
     응답을 주거나 next(미들웨어 역활)를 통해서 다음 코드가 실행될 수 있도록 해야함
     아니면 요청한 유저의 브라우저가 응답이 오기까지 계속 대기상태에 걸려있음

     ```JS
     app.get('/', (req, res, next) => {
       return req.send("Hi")
     })
     ```
