function init() {
  const btn1 = document.querySelector(".noti-trigger-btn-1");
  const btn2 = document.querySelector(".noti-trigger-btn-2");
  btn1.addEventListener("click", () => {
    kKao4Notification({ text: "kKao4 đã viết dòng này và nó khá ngắn 💀🤞" });
  });
  btn2.addEventListener("click", () => {
    kKao4Notification({ text: "kKao4 cũng đã viết dòng này nhưng nó dài hơn để nó xuống dòng 💩" });
  });
}

window.addEventListener("DOMContentLoaded", init);
