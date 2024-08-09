// Author: kKao4

function kKao4Notification({
  text = "This is from kKao4",
  duration = 4000,
  gap = window.innerWidth / 100,
  bottom = (window.innerWidth / 100) * 2,
} = {}) {
  const isDesktop = window.innerWidth > 768;

  window.totalNoti = Math.max(typeof window.totalNoti === "number" ? window.totalNoti + 1 : 1, 1);
  const notiId = window.totalNoti - 1;

  const notisContainer = document.querySelector(".notis-container");
  let allNotis = notisContainer.querySelectorAll(".noti-container");
  let prevNotisHeight = bottom;

  allNotis.forEach((noti) => {
    prevNotisHeight += noti.offsetHeight + gap;
  });

  const newNotiHTML = `
    <div class="noti-container" data-index="${notiId}">
      <button>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <path
            d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
          />
        </svg>
      </button>
      <strong>${text}</strong>
    </div>
  `;
  notisContainer.insertAdjacentHTML("beforeend", newNotiHTML);

  allNotis = notisContainer.querySelectorAll(".noti-container");
  const activeNoti = notisContainer.querySelector(`.noti-container[data-index="${notiId}"]`);

  allNotis.forEach((noti, i) => {
    noti.querySelector("button").addEventListener("click", () => {
      noti.style.transform = `translate(${isDesktop ? "0" : "50%"},100%)`;
      window.totalNoti -= 1;
      const decreaseY = noti.offsetHeight + gap;

      allNotis.forEach((item, j) => {
        if (j > i) {
          const { y } = kKao4DecodeTranslateValue(item);
          item.style.transform = `translate(${isDesktop ? "0" : "50%"}, -${y - decreaseY}px)`;
        }
      });

      noti.addEventListener("transitionend", () => {
        noti.remove();
      });
    });
  });

  setTimeout(() => {
    activeNoti.style.transform = `translate(${isDesktop ? "0" : "50%"}, -${prevNotisHeight}px)`;
  }, 1);

  setTimeout(() => {
    const noti = notisContainer.querySelector(`.noti-container[data-index="${notiId}"]`);
    if (noti) {
      noti.style.transform = `translate(${isDesktop ? "0" : "50%"},100%)`;
      window.totalNoti -= 1;
      noti.addEventListener("transitionend", () => {
        noti.remove();
      });
    }
  }, duration);
}
