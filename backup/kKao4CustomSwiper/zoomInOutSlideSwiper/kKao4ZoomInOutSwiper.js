// Author: kKao4
// P/s: Nếu code chạy xin đừng động vào, chỉ nên custom parameters (づ ◕‿◕ )づ

// Parameters:

// Name           | Type           | Default           | Description
// speed          | number         | swiper speed      | tốc độ ms của animation
// containerEl    | string         |                   | className của container
// contentEl      | string         |                   | className của content

// Usage:

// const mySwiper = new kKao4ZoomInOutSwiper(
//   ".swiper-custom-class",
//   { speed: 800, containerEl: ".background-slide-container", contentEl: ".background-slide-content" },
//   {
//     slidesPerView: 3,
//     slidesPerGroup: 1,
//     spaceBetween: (window.innerWidth / 100) * 1,
//     loop: true,
//     speed: 800,
//     initialSlide: 1,
//     navigation: {
//       nextEl: ".swiper-next-btn",
//       prevEl: ".swiper-prev-btn",
//     },
//   }
// );

class kKao4ZoomInOutSwiper {
  constructor(className, options, swiperOptions) {
    this.className = className;
    this.speed = options.speed || swiperOptions.speed;
    this.containerEl = options.containerEl;
    this.contentEl = options.contentEl;
    this.swiperOptions = swiperOptions;
    return this.init();
  }
  init() {
    const { className, speed, swiperOptions, containerEl, contentEl } = this;
    const swiper = new Swiper(className, swiperOptions);
    const swiperContainer = document.querySelector(className);
    const swiperSlides = swiperContainer.querySelectorAll(".swiper-slide");
    const initialWidth = swiperSlides[0].offsetWidth;
    const initialHeight = swiperSlides[0].offsetHeight;
    const initialBorderRadius = window.getComputedStyle(swiperSlides[0].querySelector("img")).borderRadius;
    const backgroundSlideImageToStyle = {
      top: 0,
      left: 0,
      yPercent: 0,
      width: "100%",
      height: "100%",
      borderRadius: "0px",
    };
    const backgroundSlideImageFromStyle = {
      top: "50%",
      left: `${
        parseFloat(window.innerWidth) -
        parseFloat(swiperContainer.offsetWidth) -
        parseFloat(window.getComputedStyle(swiperContainer).marginRight)
      }px`,
      yPercent: -50,
      height: initialHeight,
      width: initialWidth,
      borderRadius: initialBorderRadius,
    };
    const backgroundSlideContainers = document.querySelectorAll(containerEl);
    const backgroundSlideContents = document.querySelectorAll(contentEl);
    backgroundSlideContents.forEach((item, i) => {
      gsap.set(item, i !== 0 ? { yPercent: 100, autoAlpha: 0 } : { yPercent: 0, autoAlpha: 1 });
    });
    backgroundSlideContainers.forEach((item, i) => {
      gsap.set(item.querySelector("img"), backgroundSlideImageToStyle);
    });
    gsap.set(backgroundSlideContainers[0], { zIndex: 44 });
    let prevRealIndex = 0;
    swiper.on("realIndexChange", () => {
      const realIndex = swiper.realIndex;
      const slidesLength = swiperSlides.length;
      let direction;
      if (realIndex === 0 && prevRealIndex === slidesLength - 1) {
        direction = "right";
      } else if (realIndex === slidesLength - 1 && prevRealIndex === 0) {
        direction = "left";
      } else if (realIndex > prevRealIndex) {
        direction = "right";
      } else if (realIndex < prevRealIndex) {
        direction = "left";
      }
      if (direction === "right") {
        const index = realIndex - 1 < 0 ? slidesLength - 1 : realIndex - 1;
        backgroundSlideContainers.forEach((slide, i) => {
          if (i === index) {
            const tl = gsap.timeline({});
            backgroundSlideContainers.forEach((container, j) => {
              if (j === i) {
                gsap.set(container, { zIndex: 44 });
              } else if (j === i - 1) {
                gsap.set(container, { zIndex: 43 });
              } else {
                gsap.set(container, { zIndex: 0 });
              }
            });
            tl.fromTo(slide.querySelector("img"), backgroundSlideImageFromStyle, {
              ...backgroundSlideImageToStyle,
              duration: 1.2,
              ease: "power1.inOut",
            });
            tl.set(swiperSlides[i], { autoAlpha: 0, overwrite: true }, "<");
            tl.to(backgroundSlideContents[i - 1], { autoAlpha: 0, yPercent: 100, duration: speed / 1000 }, "<");
            tl.to(
              backgroundSlideContents[i],
              { yPercent: 0, autoAlpha: 1, duration: speed / 1000 },
              `>-=${speed / 4000}`
            );
            tl.set(swiperSlides[i], { autoAlpha: 1 }, "<");
          }
        });
      } else {
        const index = realIndex;
        backgroundSlideContainers.forEach((slide, i) => {
          if (i === index) {
            const tl = gsap.timeline({});
            backgroundSlideContainers.forEach((container, j) => {
              if (j === i) {
                gsap.set(container, { zIndex: 44 });
              } else if (j === (i - 1 < 0 ? backgroundSlideContainers.length - 1 : i - 1)) {
                gsap.set(container, { zIndex: 43 });
              } else {
                gsap.set(container, { zIndex: 0 });
                gsap.set(container.querySelector("img"), backgroundSlideImageToStyle);
              }
            });
            tl.set(swiperSlides[i], { autoAlpha: 0, overwrite: true }, "<");
            tl.fromTo(slide.querySelector("img"), backgroundSlideImageToStyle, {
              ...backgroundSlideImageFromStyle,
              duration: (speed * 1.5) / 1000,
              ease: "power1.inOut",
            });
            tl.to(backgroundSlideContents[i], { autoAlpha: 0, yPercent: 100, duration: speed / 1000 }, "<");
            tl.to(
              backgroundSlideContents[i - 1 < 0 ? backgroundSlideContainers.length - 1 : i - 1],
              { yPercent: 0, autoAlpha: 1, duration: speed / 1000 },
              `>-=${speed / 4000}`
            );
            tl.set(swiperSlides[i], { autoAlpha: 1 }, `>-=${speed / 4000}`);
          }
        });
      }
      prevRealIndex = realIndex;
    });
    return swiper;
  }
}
