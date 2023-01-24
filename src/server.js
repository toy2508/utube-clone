import express from "express";
import morgan from "morgan";
import session from "express-session";
import flash from "express-flash";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";
import MongoStore from "connect-mongo";
import apiRouter from "./routers/apiRouter";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true })); //post 방식의 body를 사용하기 위함
app.use(express.json()); //frontEnd 화면에서 fecth body에 데이터를 보낼려면 text코드를 해석할 수 있는 middleware가 필요함

// 클라이언트 측에 자동으로 session키 값 저장
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false, //session에 변경사항(session 로그인 정보 추가)이 생기면 session을 생성
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

// resave : 모든 request마다 기존에 있던 session에 아무런 변경사항이
//          없을시에도 그 session을 다시저장하는 옵션
//          (true인 경우 매 request마다 세션을 다시 저장하는 것)
// saveUninitialized : request가 들어오면 해당 request에서 새로 생성된 session에 아무런 작업이 이루어지지 않는 상황을 말함

// 저장된 세션값 확인
// app.use((req, res, next) => {
//   req.sessionStore.all((error, sessions) => {
//     console.log(sessions);
//     next();
//   });
// });

app.use(localsMiddleware);
app.use(flash());

//Root Router 등록
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/", rootRouter);
app.use("/user", userRouter);
app.use("/video", videoRouter);
app.use("/api", apiRouter);

export default app;
