// Author: kKao4

function kKao4DetectDirectionScroll(element = "root", upFnc, downFnc) {
  let lastScrollTop = element === "root" ? window.scrollY || document.documentElement.scrollTop : element.scrollTop;
  function detectDirection() {
    const scrollTopPosition =
      element === "root" ? window.scrollY || document.documentElement.scrollTop : element.scrollTop;
    if (scrollTopPosition < lastScrollTop) {
      upFnc();
    } else if (scrollTopPosition > lastScrollTop) {
      downFnc();
    }
    lastScrollTop = scrollTopPosition <= 0 ? 0 : scrollTopPosition;
  }
  (element === "root" ? window : element).addEventListener("scroll", detectDirection);
}
