// Author: kKao4

function kKao4IsInViewport({ el, onScroll, fill = 1 }) {
  let isInViewport = false;
  const element = typeof el === "string" ? document.querySelector(el) : el;
  window.addEventListener("scroll", () => {
    const rect = element.getBoundingClientRect();
    if (Math.floor(rect.height) >= Math.floor(window.innerHeight)) {
      if (
        Math.floor(rect.top) <= Math.floor(window.innerHeight - window.innerHeight * fill) &&
        Math.floor(rect.bottom) >= Math.floor(window.innerHeight * fill)
      ) {
        isInViewport = true;
        onScroll(isInViewport);
      } else {
        isInViewport = false;
        onScroll(isInViewport);
      }
    } else if (Math.floor(rect.height) < Math.floor(window.innerHeight)) {
      if (
        window.innerHeight - Math.floor(rect.top) >= Math.floor(rect.height * fill) &&
        Math.floor(rect.bottom) >= Math.floor(rect.height * fill)
      ) {
        isInViewport = true;
        onScroll(isInViewport);
      } else {
        isInViewport = false;
        onScroll(isInViewport);
      }
    }
  });
}
