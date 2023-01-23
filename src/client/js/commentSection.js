const form = document.getElementById("commentForm");
const videoContainer = document.getElementById("videoContainer");

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  const icon = document.createElement("i");
  const span = document.createElement("span");
  newComment.className = "video__comment";
  icon.className = "fas fa-comment";
  span.innerText = ` ${text}`;
  newComment.appendChild(icon);
  newComment.appendChild(span);
  videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }

  //Backend 저장 요청
  //객체는 json으로 보내야하기때문에 content-type을 header에 application/json을 지정한다.
  const response = await fetch(`/api/video/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
    }),
  });

  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
