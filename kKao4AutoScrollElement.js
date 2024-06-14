// Author: kKao4
// P/s: Nếu code chạy xin đừng động vào, chỉ nên custom parameters (づ ◕‿◕ )づ

// Parameters:

// Name           | Type           | Default           | Description

// duration       | number         | 12                | thời gian bằng s để scroll hết từ đầu xuống cuối trang
// delay          | number         | 0.8               | thời gian delay trước khi scroll bắt đầu scroll lại
// once           | boolean        | false             | nếu true sẽ chỉ chạy 1 lần

function kKao4AutoScrollElement(className, { duration = 12, delay = 0.8, once = false } = {}) {
  gsap.registerPlugin(ScrollToPlugin);

  // select element
  const element = document.querySelector(className);

  // detect direction scroll
  let directionScroll = "down";
  let lastScrollTop = element.scrollTop;
  function detectDirection() {
    const scrollTopPosition = element.scrollTop;
    if (scrollTopPosition < lastScrollTop) {
      directionScroll = "up";
    } else if (scrollTopPosition > lastScrollTop) {
      directionScroll = "down";
    }
    lastScrollTop = scrollTopPosition <= 0 ? 0 : scrollTopPosition;
  }
  element.addEventListener("scroll", detectDirection);

  // function auto scroll
  const autoScrollElement = ({ progress = 0, directionScroll = "down" } = {}) => {
    const tl = gsap.timeline({});
    tl.to(element, {
      duration: directionScroll === "down" ? duration - duration * progress : duration * progress,
      scrollTo: { y: directionScroll === "down" ? "max" : 0 },
      ease: "none",
      delay,
    });
    tl.to(
      element,
      {
        duration,
        scrollTo: { y: directionScroll === "down" ? 0 : "max" },
        ease: "none",
        repeat: once ? 0 : -1,
        repeatDelay: delay,
        yoyo: true,
      },
      `>+=${delay}`
    );
  };

  autoScrollElement();

  element.addEventListener("mouseenter", () => {
    gsap.killTweensOf(element);
  });
  element.addEventListener("mouseleave", () => {
    const progress = Math.max(Math.min(parseFloat(element.scrollTop) / parseFloat(element.offsetHeight), 1), 0);
    autoScrollElement({ progress, directionScroll });
  });
}

// Usage:
// function init() {
//   kKao4AutoScrollElement(".trademark-images-container-scroll-noi-that");
//   kKao4AutoScrollElement(".trademark-images-container-scroll-ngoai-that");
//   kKao4AutoScrollElement(".trademark-images-container-scroll-noi-tang-canh-quan");
// }

// window.addEventListener("DOMContentLoaded", init);
