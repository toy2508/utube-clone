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
  2. app.get을 통해 요청을 받으면 반드시 res 매개변수를 통해서 요청한 브라우저에게
     응답을 주거나 next(미들웨어 역활)를 통해서 다음 코드가 실행될 수 있도록 해야함
     아니면 요청한 유저의 브라우저가 응답이 오기까지 계속 대기상태에 걸려있음

     ```JS
     app.get('/', (req, res, next) => {
       return req.send("Hi")
     })
     ```

- express app.use

  1. app.use(미들웨어) : 라우터없이 미들웨어를 전체에 적용할 수 있다

- External Middleware(외부 미들웨어)

  1. Morgan : Logger Middle (npm install morgan)

- Router

  1. router는 global, user, video 형태로 기능적으로
     root되는 router명을 만들고 user/delete, user/edit, user/search
     형태로 기능을 추가하는 형식으로 route path의 이름을 명명한다.
     global인 경우는 예외사항이 필요할때 사용한다. 예를 들면 마케팅적으로
     주소가 짧게 사용될때 "웹사이트주소/Search" 형태로 기능만 붙여주는 경우일때
     global로 분류해서 이름을 짓는다.

  2. express에서 route 코딩 방법은 root router를 만든다.

     ```JS
        //Root Router 정의
        const globalRouter = express.Router();
        const userRouter = express.Router();
        const videoRouter = express.Router();

        //Controller 정의
        const handleHome = (req, res) => res.send("Home");
        const handleEditUser = (req, res) => res.send("Edit User");
        const handleWatchVideo = (req, res) => res.send("Watch Video");

        //세부적인 Route 기능 등록 및 Controller 연결
        globalRouter.get('/', handleHome);
        userRouter.get('/edit', handleEditUser);
        videoRouter.get('/watch', handleWatchVideo);

        //Root Router 등록
        app.use("/", globalRouter);
        app.use("/user", userRouter);
        app.use("/video", videoRoute);
     ```

# 2022/08/30

- planning Router

  1.  Home
      : /join -> join
      /login -> Login
      /search -> Search

  2.  User
      : /users/:id -> See User
      /users/logout -> Log Out
      /users/edit -> Edit My Profile
      /users/delete -> Delete My Profile

  3.  Video
      : /videos/:id -> See Video
      /videos/:id/edit -> Edit Video
      /videos/:id/delete -> Delete Video
      /videos/upload -> Upload Video

# 2022/09/04

1.  route는 :id (파라미터) 때문에 일반 router명이 id로 인식되는 문제가 발생한다
    그래서 일반 router명을 parameter가 있는 router보다 더 빨리 인식되도록 코딩
    순서를 우선으로 하거나, 정규식을 사용한다.

    ```JS
    videoRouter.get("/upload", upload);
    videoRouter.get("/:id(\\d+)", see); //정규식을 사용(숫자만 인식하도록 함)
    videoRouter.get("/:id(\\d+)/edit", edit);
    videoRouter.get("/:id(\\d+)/delete", deleteVideo);

    ```

# 2022/09/05

- Returning HTML

  1. pug 설치 > express view engine 설정 > views 폴더 위치 설정

# 2022/09/06

- Partial

  1. include : pug 파일의 데이터를 불러와서 특정 부분에 포함
  2. extends : 다른 pug 파일 html 데이터를 불러온다.
  3. block : extends를 불러온 pug 파일에 block을 설정해서
     불러온 데이터에서 block으로 설정된 부분만 변경한다.

  ```PUG
    // base.pug ----------------------

    doctype html
    html(lang="ko")
    head
        title Wetube
    body
        block content
    include partials/footer.pug // footer.pug 데이터를 포함시킨다.


    // home.pug ----------------------

    extends base.pug //base.pug의 파일을 불러온다.

    block content // base.pug 에서 block content를 설정한 부분만
    h1 Home!      // home.pug 파일에서 입력한 내용으로 변경된다.

  ```

# 2022/09/08

1. mvp styles : CSS 작업을 하기전에 HTML 구조를 잡을때 대략적인 스타일을
   자동으로 입히기 위한 라이브러리
   link(rel="stylesheet" href="https://unpkg.com/mvp.css")

2. pug - conditional : pug에 사용하는 조건문
3. pug - iteration : pug에 반복문
4. pug - mixin : pug에 함수(component 만들때 사용)
5. href 경로 : href를 "/temp"를 입력하면 기본 주소값에 http://localhost:4000/temp 주소로 이동하고
   href를 "temp"를 입력하면 현재 주소의 맨마지막 /이후의 값을 바꾼 주소(http://localhost:4000/video/test/temp)
   로 이동한다

# 2022/09/09

1. mongoose 설치 후, 연결을 위한 db.js 파일을 만들어 server.js에
   export 한다. 서버가 시작될때 mongoDB와 연결하기 위함이다.

2. mongoose 연결이 끝나면 model(테이블) 파일을 하나 만들고
   파일안에 schema(객체로 표현) 변수를 만들어 moongose의 model가 연결한다. ex) const Video = mongoose.model("Video", videoSchema);
   model 파일을 만들면 이것도 역시 server.js에 export를 해줘야 해당 모델을 사용이 가능하다.

# 2022/10/02

1. mongoose는 schema 생성시 SchemaType Option을 통해 문자길이제한, 공백제거, 대/소문자등
   을 설정하면 DB에 데이터가 저장될때 데이터를 자동으로 수정하거나 validation 체크를한다.
   site : https://mongoosejs.com/docs/schematypes.html
   예시 :

   ```JS

   const videoSchema = new mongoose.Schema({
      title: { type: String, required: true, trim: true },
      description: { type: String, required: true, trim: true },
      createdAt: { type: Date, required: true, default: Date.now },
   });

   ```

# 2022/10/03

1. MongoDB는 16진수를 ID로 생성 : 정규식을통해 사이트주소에서 id 찾아야함 /[0-9a-f]{24}/g

# 2022/11/18 -- 다시 시작

1. node.bcrypt.js : password에 대한 hashing 처리
   - 암호처리 방법 : 유저가 암호를 입력해서 서버에 입려된 암호 정보를 보내면
     서버에서 암호를 해싱해서 DB에 저장된 해싱 암호와 비교해서 똑같은면 암호가 맞다고 인식

# 2022/11/19

1. express-session : Express에서 세션을 사용하기 위한 프로그램
2. res.locals의 값은 pug 파일과 공유할 수 있다. 그래서 pug 파일 전체에 필요한 기본정보(로그인, 유저정보)
   등은 res.locals에 보관하면 전체 pug 파일에서 확인할 수 있다.
3. connect-mongodb : session을 mongoDB 저장하기위한 connector(backend 서버가 reset될때마다 session정보가 리셋되기때문에
   별도 DBMS에 저장해야한다.)=
4. github 로그인 정보 얻기 :
   - 참조 사이트 : https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps
5. URLSearchParams : 객체를 URL 파라미터로 자동 변경
6. node-fetch : backend에서 fecth를 사용하기위한 프로그램
