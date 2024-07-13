// Author: kKao4

function kKao4Notification({ text, duration } = { text: "This is from kKao4", duration: 4000 }) {
  const noti = document.querySelector(".noti-container");
  const notiContent = document.querySelector(".noti-container strong");
  const closeNotiButton = document.querySelector(".noti-container button");
  closeNotiButton.addEventListener("click", () => {
    clearTimeout(window.notiTimeOut);
    noti.style.transform =
      window.innerWidth > 768
        ? `translate(0, calc(100% + ${window.getComputedStyle(noti).bottom}))`
        : `translate(50%, calc(100% + ${window.getComputedStyle(noti).bottom}))`;
  });
  notiContent.textContent = text;
  noti.style.transform = window.innerWidth > 768 ? "none" : "translate(50%, 0)";
  clearTimeout(window.notiTimeOut);
  window.notiTimeOut = setTimeout(() => {
    noti.style.transform = `translate(${window.innerWidth > 768 ? 0 : "50%"}, calc(100% + ${
      window.getComputedStyle(noti).bottom
    }))`;
  }, duration);
}
