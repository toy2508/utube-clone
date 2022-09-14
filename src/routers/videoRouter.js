import express from "express";
import {
  watch,
  getEdit,
  postEdit,
  getUpload,
  postUpload,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.route("/upload").get(getUpload).post(postUpload);
videoRouter.get("/:id(\\d+)", watch); //정규식을 사용(숫자만 인식하도록 함)

// 동일한 주소에 전송 method만 다를 경우 route에 경로를쓰고
// get, post를 함수로 연결하고 controller를 등록한다.
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);

export default videoRouter;
