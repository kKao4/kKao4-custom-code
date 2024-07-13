// Author: kKao4

function kKao4IsInViewport(selector, inFnc, outFnc, fill = 1) {
  const element = typeof selector === "string" ? document.querySelector(selector) : selector;
  window.addEventListener("scroll", () => {
    const rect = element.getBoundingClientRect();
    if (Math.floor(rect.height) >= Math.floor(window.innerHeight)) {
      if (
        Math.floor(rect.top) <= Math.floor(window.innerHeight - window.innerHeight * fill) &&
        Math.floor(rect.bottom) >= Math.floor(window.innerHeight * fill)
      ) {
        inFnc();
      } else {
        outFnc();
      }
    } else if (Math.floor(rect.height) < Math.floor(window.innerHeight)) {
      if (
        window.innerHeight - Math.floor(rect.top) >= Math.floor(rect.height * fill) &&
        Math.floor(rect.bottom) >= Math.floor(rect.height * fill)
      ) {
        inFnc();
      } else {
        outFnc();
      }
    }
  });
}
