// Author: kKao4

function kKao4DetectDirectionScroll({ el = "root", onScroll }) {
  let directionScroll;
  let lastScrollTop = el === "root" ? window.scrollY || document.documentElement.scrollTop : el.scrollTop;
  function detectDirectionScroll() {
    const scrollTopPosition = el === "root" ? window.scrollY || document.documentElement.scrollTop : el.scrollTop;
    if (scrollTopPosition < lastScrollTop) {
      directionScroll = "up";
      onScroll(directionScroll);
    } else if (scrollTopPosition > lastScrollTop) {
      directionScroll = "down";
      onScroll(directionScroll);
    }
    lastScrollTop = scrollTopPosition <= 0 ? 0 : scrollTopPosition;
  }
  (el === "root" ? window : element).addEventListener("scroll", detectDirectionScroll);
}
