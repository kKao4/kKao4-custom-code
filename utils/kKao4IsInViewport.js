function kKao4IsInViewport(selector, inFnc, outFnc, screenFill = 1, elementFill = 1) {
  let element = selector;
  if (typeof selector === "string") {
    element = document.querySelector(selector);
  }
  window.addEventListener("scroll", () => {
    const rect = element.getBoundingClientRect();
    if (Math.floor(rect.height) >= Math.floor(window.innerHeight)) {
      if (
        Math.floor(rect.top) <= Math.floor(window.innerHeight - window.innerHeight * screenFill) &&
        Math.floor(rect.bottom) >= Math.floor(window.innerHeight * screenFill)
      ) {
        inFnc();
      } else {
        outFnc();
      }
    } else if (Math.floor(rect.height) < Math.floor(window.innerHeight)) {
      if (
        window.innerHeight - Math.floor(rect.top) >= Math.floor(rect.height * elementFill) &&
        Math.floor(rect.bottom) >= Math.floor(rect.height * elementFill)
      ) {
        inFnc();
      } else {
        outFnc();
      }
    }
  });
}
