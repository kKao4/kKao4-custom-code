const speed = 800;

function init() {
  const swiper = new Swiper(".swiper-custom-class", {
    slidesPerView: 3,
    slidesPerGroup: 1,
    spaceBetween: (window.innerWidth / 100) * 1,
    loop: true,
    speed,
    initialSlide: 1,
    navigation: {
      nextEl: ".swiper-next-btn",
    },
  });
  const swiperContainer = document.querySelector(".swiper-custom-class");
  const swiperSlides = document.querySelectorAll(".swiper-slide");
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
    left: `${window.innerWidth - swiperContainer.offsetWidth}px`,
    yPercent: -50,
    height: initialHeight,
    width: initialWidth,
    borderRadius: initialBorderRadius,
  };
  const backgroundSlideContainers = document.querySelectorAll(".background-slide-container");
  const backgroundSlideContents = document.querySelectorAll(".background-slide-content");
  backgroundSlideContents.forEach((item, i) => {
    gsap.set(item, i !== 0 ? { yPercent: 100, autoAlpha: 0 } : { yPercent: 0, autoAlpha: 1 });
  });
  backgroundSlideContainers.forEach((item, i) => {
    gsap.set(item.querySelector("img"), i !== 0 ? backgroundSlideImageFromStyle : backgroundSlideImageToStyle);
  });
  gsap.set(backgroundSlideContainers[0], { zIndex: 44 });
  gsap.set(backgroundSlideContainers[0].querySelector("img"), backgroundSlideImageToStyle);
  let prevIndex = 0;
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
          tl.set(swiperSlides[i], { autoAlpha: 0 }, "<");
          tl.to(backgroundSlideContents[prevIndex], { autoAlpha: 0, yPercent: 100, duration: 0.8 }, "<");
          tl.to(backgroundSlideContents[i], { yPercent: 0, autoAlpha: 1, duration: 0.8 }, "-=0.4");
          tl.to(swiperSlides[i], { autoAlpha: 1, duration: 0.8 }, "<");
        }
      });
      prevIndex = index;
    } else {

    }
    prevRealIndex = realIndex;
  });
}

window.addEventListener("DOMContentLoaded", init);
