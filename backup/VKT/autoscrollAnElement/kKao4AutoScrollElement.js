// Author: kKao4
// P/s: Nếu code chạy xin đừng động vào, chỉ nên custom parameters (づ ◕‿◕ )づ

// Parameters:

// Name           | Type           | Default           | Description
// duration       | number         | 12                | thời gian bằng s để scroll hết từ đầu xuống cuối trang
// delay          | number         | 0.8               | thời gian delay trước khi scroll bắt đầu scroll lại
// once           | boolean        | false             | nếu true sẽ chỉ chạy 1 lần

// Usage:

//   kKao4AutoScrollElement(".trademark-images-container-scroll-noi-tang-canh-quan");

function kKao4AutoScrollElement(className, { duration = 12, delay = 0.8, once = false } = {}) {
  gsap.registerPlugin(ScrollToPlugin);

  const width = window.innerWidth;
  const element = document.querySelector(className);

  let directionScroll = "down";
  kKao4DetectDirectionScroll({
    el: "root",
    onScroll: (direction) => {
      directionScroll = direction;
    },
  });

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

  element.addEventListener(width < 768 ? "touchstart" : "mouseenter", () => {
    gsap.killTweensOf(element);
  });
  element.addEventListener(width < 768 ? "touchend" : "mouseleave", () => {
    const progress = gsap.utils.clamp(0, 1, parseFloat(element.scrollTop) / parseFloat(element.offsetHeight));
    autoScrollElement({ progress, directionScroll });
  });
}
