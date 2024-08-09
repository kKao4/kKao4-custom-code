// Author: kKao4
// P/s: Nếu code chạy xin đừng động vào, chỉ nên custom parameters (づ ◕‿◕ )づ

// Parameters:

// Name            | Type         | Default          | Description
// enabled         | boolean      | true             | bật/tắt shutters swiper
// speed           | number       | swiper speed     | tốc độ ms của parallax
// parallaxPercent | number       | 20               | % parallax
// contentEl       | string       |                  | class của content slide

// Usage:
// const swiper = new kKao4ShuttersSwiper(
//   ".swiper-custom-class",
//   { enabled: true, speed: 1000, parallaxPercent: 20, contentEl: ".swiper-slide-content" },
//   swiperOptions
// );

class kKao4ShuttersSwiper {
  constructor(className, options, swiperOptions) {
    this.className = className;
    this.enabled = options.enabled || true;
    this.speed = options.speed || swiperOptions.speed;
    this.parallaxPercent = options.parallaxPercent || 20;
    this.contentEl = options.contentEl;
    this.swiperOptions = swiperOptions;
    return this.init();
  }
  init() {
    const decoPositionPercent = 20;
    const decoTranslateScale = 0.4;
    const decoTranslateRatio = 1;
    const decoPositionScale = 0.65;
    const decoWidthPercent = 20;

    const { speed, parallaxPercent, contentEl } = this;

    const swiper = new Swiper(this.className, this.swiperOptions);

    if (this.enabled) {
      const decoLeftPrimaryContainers = document.querySelectorAll(".deco-left-primary");
      const decoLeftSecondaryContainers = document.querySelectorAll(".deco-left-secondary");
      const decoRightPrimaryContainers = document.querySelectorAll(".deco-right-primary");
      const decoRightSecondaryContainers = document.querySelectorAll(".deco-right-secondary");
      const contents = document.querySelectorAll(contentEl);

      decoLeftPrimaryContainers.forEach((container, i) => {
        container.style.left = `${decoPositionPercent}%`;
        container.style.width = `${decoWidthPercent}%`;
        container.querySelector("img").style.transform = `translateX(-${decoPositionPercent}%)`;
      });
      decoLeftSecondaryContainers.forEach((container, i) => {
        container.style.left = `${decoPositionPercent}%`;
        container.style.width = `${decoWidthPercent}%`;
        container.querySelector("img").style.transform = `translateX(-${decoPositionPercent}%)`;
      });
      decoRightPrimaryContainers.forEach((container, i) => {
        container.style.right = `${decoPositionPercent}%`;
        container.style.width = `${decoWidthPercent}%`;
        container.querySelector("img").style.transform = `translateX(-${100 - decoPositionPercent * 2}%)`;
      });
      decoRightSecondaryContainers.forEach((container, i) => {
        container.style.right = `${decoPositionPercent}%`;
        container.style.width = `${decoWidthPercent}%`;
        container.querySelector("img").style.transform = `translateX(-${100 - decoPositionPercent * 2}%)`;
      });

      const images = document.querySelectorAll(".slide-image");
      const progressPerSlide = 1 / (swiper.slides.length - 1);

      let isGsap = typeof gsap !== "undefined";
      let prevProgress = 0;

      swiper.on("progress", (swiper) => {
        images.forEach((img, i) => {
          const decoLeftPrimary = decoLeftPrimaryContainers[i].querySelector("img");
          const decoLeftSecondary = decoLeftSecondaryContainers[i].querySelector("img");
          const decoRightPrimary = decoRightPrimaryContainers[i].querySelector("img");
          const decoRightSecondary = decoRightSecondaryContainers[i].querySelector("img");
          const content = contents[i];

          const progressSlide = isGsap
            ? gsap.utils.clamp(-1, 1, (swiper.progress - progressPerSlide * i) / progressPerSlide)
            : Math.min(Math.max(-1, (swiper.progress - progressPerSlide * i) / progressPerSlide), 1);

          const dragging = Math.abs(swiper.progress - prevProgress) < 0.02;

          function parallaxTranslateMainImage() {
            img.style.transition = dragging ? "none" : `all ${speed}ms ease`;
            img.style.transform = `translateX(${progressSlide * parallaxPercent}%)`;
          }
          function parallaxTranslateLeftPrimary() {
            decoLeftPrimary.style.transition = dragging ? "none" : `all ${speed}ms ease`;
            decoLeftPrimary.style.transform = `translateX(calc(-${decoPositionPercent}% + ${
              progressSlide * parallaxPercent * decoTranslateScale
            }%))`;
          }
          function parallaxTranslateLeftSecondary() {
            decoLeftSecondary.style.transition = dragging ? "none" : `all ${speed}ms ease`;
            decoLeftSecondary.style.transform = `translateX(calc(-${decoPositionPercent}% - ${
              progressSlide * parallaxPercent * decoTranslateScale * decoTranslateRatio
            }%))`;
          }
          function parallaxPositionLeftPrimary() {
            decoLeftSecondaryContainers[i].style.transition = dragging ? "none" : `all ${speed}ms ease`;
            decoLeftSecondaryContainers[i].style.left = `calc(${decoPositionPercent}% + ${
              progressSlide * parallaxPercent * decoPositionScale
            }%)`;
          }
          function parallaxPositionLeftSecondary() {
            decoLeftSecondaryContainers[i].style.transition = dragging ? "none" : `all ${speed}ms ease`;
            decoLeftSecondaryContainers[i].style.left = `calc(${decoPositionPercent}% + ${
              progressSlide * parallaxPercent * decoPositionScale
            }%)`;
          }
          function parallaxTranslateRightPrimary() {
            decoRightPrimary.style.transition = dragging ? "none" : `all ${speed}ms ease`;
            decoRightPrimary.style.transform = `translateX(calc(-${100 - decoPositionPercent * 2}% + ${
              progressSlide * parallaxPercent * decoTranslateScale
            }%))`;
          }
          function parallaxTranslateRightSecondary() {
            decoRightSecondary.style.transition = dragging ? "none" : `all ${speed}ms ease`;
            decoRightSecondary.style.transform = `translateX(calc(-${100 - decoPositionPercent * 2}% - ${
              progressSlide * parallaxPercent * decoTranslateScale * decoTranslateRatio
            }%))`;
          }
          function parallaxPositionRightPrimary() {
            decoRightPrimaryContainers[i].style.transition = dragging ? "none" : `all ${speed}ms ease`;
            decoRightPrimaryContainers[i].style.right = `calc(${decoPositionPercent}% + ${
              progressSlide * parallaxPercent * decoPositionScale
            }%)`;
          }
          function parallaxPositionRightSecondary() {
            decoRightSecondaryContainers[i].style.transition = dragging ? "none" : `all ${speed}ms ease`;
            decoRightSecondaryContainers[i].style.right = `calc(${decoPositionPercent}% - ${
              progressSlide * parallaxPercent * decoPositionScale
            }%)`;
          }
          function parallaxContent() {
            content.style.transition = dragging ? "none" : `all ${speed}ms ease`;
            content.style.transform = `translateX(${progressSlide * parallaxPercent * 12}%)`;
          }

          parallaxTranslateMainImage();
          parallaxTranslateLeftPrimary();
          parallaxTranslateLeftSecondary();
          parallaxPositionLeftPrimary();
          parallaxPositionLeftSecondary();
          parallaxTranslateRightPrimary();
          parallaxTranslateRightSecondary();
          parallaxPositionRightPrimary();
          parallaxPositionRightSecondary();
          parallaxContent();
        });

        prevProgress = swiper.progress;
      });
    }

    return swiper;
  }
}
