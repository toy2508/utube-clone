const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenIcon = fullScreenBtn.querySelector("i");
const videoContainer = document.getElementById("videoContainer");
const videoControl = document.getElementById("videoControls");

let contorlsTimeout = null;
let controlMovementTimeout = null;
let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayClick = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

const handleMuteClick = (e) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtnIcon.classList = video.muted
    ? "fas fa-volume-mute"
    : "fas fa-volume-up";
  volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event;

  if (video.muted) {
    video.muted = false;
    muteBtnIcon.classList = "fas fa-volume-up";
  }

  volumeValue = value;
  video.volume = volumeValue;
};

// 초를 기준으로 시간 format(00:00:00)을 리턴
const formatTime = (seconds) => {
  return new Date(seconds * 1000).toISOString().substr(14, 5);
};

const handleLoadedmetadata = () => {
  console.log(video.duration);
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
  if (!video.duration) {
  }
};

const handleTimeUpdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

const handleTimelineChange = (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
};

const handleFullScreen = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
    fullScreenIcon.classList = "fas fa-expand";
  } else {
    videoContainer.requestFullscreen();
    fullScreenIcon.classList = "fas fa-compress";
  }
};

const hideControl = () => videoControl.classList.remove("showing");

const handleMouseMove = () => {
  if (contorlsTimeout) {
    clearTimeout(contorlsTimeout);
    contorlsTimeout = null;
  }

  if (controlMovementTimeout) {
    clearTimeout(controlMovementTimeout);
    controlMovementTimeout = null;
  }

  videoControl.classList.add("showing");
  controlMovementTimeout = setTimeout(hideControl, 3000);
};

const handleMouseLeave = () => {
  contorlsTimeout = setTimeout(hideControl, 3000); //3초후 실행
};

const handleEnded = () => {
  const { id } = videoContainer.dataset;
  fetch(`/api/video/${id}/view`, {
    method: "POST",
  });
};

const handlePause = () => {
  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("input", handleVolumeChange); //input은 움직일때마다 이벤트 발생, change는 마우스를 뗄때 발생
video.addEventListener("loadedmetadata", handleLoadedmetadata); //video에 대한 meta 데이터가 load될때
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("ended", handleEnded);
video.addEventListener("pause", handlePause);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullScreen);
