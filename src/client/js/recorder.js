import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
const actionBtn = document.getElementById("actionBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const files = {
  input: "recording.webm",
  output: "output.mp4",
  thumb: "thumbnail.jpg",
};

const downloadFile = (fileUrl, fileName) => {
  const a = document.createElement("a");
  a.href = fileUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
};

const handleDownload = async () => {
  actionBtn.removeEventListener("click", handleDownload);
  actionBtn.innerText = "Transcoding..";
  actionBtn.disabled = true;

  const ffmpeg = createFFmpeg({ log: true });
  await ffmpeg.load();

  //파일 생성
  ffmpeg.FS("writeFile", files.input, await fetchFile(videoFile));
  await ffmpeg.run("-i", files.input, "-r", "60", files.output); //transcoding

  //썸내일 만들기
  await ffmpeg.run(
    "-i",
    "-ss",
    files.input,
    "00:00:01",
    "-frames:v",
    "1",
    files.thumb
  );

  //mp4 파일 읽어오기
  const mp4file = ffmpeg.FS("readFile", files.output);
  const mp4Blob = new Blob([mp4file.buffer], { type: "video/mp4" }); //blob파일 변환

  //thumbname 파일 읽어오기
  const thumbFile = ffmpeg.FS("readFile", files.thumb);
  const thumbBlob = new Blob([thumbFile.buffer], { type: "image/jpg" });

  const mp4Url = URL.createObjectURL(mp4Blob);
  const thumbUrl = URL.createObjectURL(thumbBlob);

  downloadFile(mp4Url, "MyRecording.webm");
  downloadFile(thumbUrl, "MyThumbnail.jpg");

  ffmpeg.FS("unlink", files.input);
  ffmpeg.FS("unlink", files.output);
  ffmpeg.FS("unlink", files.thumb);

  URL.revokeObjectURL(mp4Url);
  URL.revokeObjectURL(thumbUrl);
  URL.revokeObjectURL(videoFile);

  actionBtn.disabled = false;
  actionBtn.innerText = "Record Again";
  actionBtn.addEventListener("click", handleStart);
};

const handleStart = () => {
  try {
    recorder = new MediaRecorder(stream, { mimeType: "video/webm" });

    actionBtn.innerText = "Recording";
    actionBtn.disabled = true;
    actionBtn.removeEventListener("click", handleStart);

    //recording이 stop되면 해당 이벤트가 발생
    //해당 이벤트의 e.data은 녹화된 영상데이터가 존재함
    recorder.ondataavailable = (event) => {
      //CreateObjectUrl : 브라우저 메모리에 저장된 데이터에 url 주소를 리턴한다
      //                  (오직 자기 브라우저에서만 해당 주소가 유효하다.)
      videoFile = URL.createObjectURL(event.data);
      video.srcObject = null;
      video.src = videoFile;
      video.loop = true;
      video.play();
      actionBtn.innerText = "Download";
      actionBtn.disabled = false;
      actionBtn.addEventListener("click", handleDownload);
    };

    recorder.start();

    setTimeout(() => {
      recorder.stop();
    }, 5000);
  } catch (e) {
    alert("Not found record device");
  }
};

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
    video: { width: 1024, height: 576 },
  });

  video.srcObject = stream;
  video.play();
};

init();
actionBtn.addEventListener("click", handleStart);
