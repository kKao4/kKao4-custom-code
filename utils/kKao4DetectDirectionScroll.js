// Author: kKao4

function kKao4DetectDirectionScroll({ el = "root", onScroll }) {
  let direction;
  let lastScrollTop = el === "root" ? window.scrollY || document.documentElement.scrollTop : el.scrollTop;
  function detectDirection() {
    const scrollTopPosition = el === "root" ? window.scrollY || document.documentElement.scrollTop : el.scrollTop;
    if (scrollTopPosition < lastScrollTop) {
      direction = "up";
      onScroll(direction);
    } else if (scrollTopPosition > lastScrollTop) {
      direction = "down";
      onScroll(direction);
    }
    lastScrollTop = scrollTopPosition <= 0 ? 0 : scrollTopPosition;
  }
  (el === "root" ? window : element).addEventListener("scroll", detectDirection);
}
