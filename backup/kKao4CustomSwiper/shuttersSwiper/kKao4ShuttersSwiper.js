// Author: kKao4
// P/s: Nếu code chạy xin đừng động vào, chỉ nên custom parameters (づ ◕‿◕ )づ

// Parameters:

// Name            | Type           | Default           | Description
// enabled         | boolean        | true              | bật/tắt shutters swiper
// transitionTime  | number         | 850               | tốc độ bằng ms của các hiệu ứng
// parallaxPercent | number         | 24                | % parallax

// Usage:
// let swiper = new kKao4ShuttersSwiper(".swiper-custom-class", {}, swiperOptions);

export class kKao4ShuttersSwiper {
  constructor(className, options, swiperOptions) {
    this.className = className;
    this.enabled = options.enabled || true;
    this.transitionTime = options.transitionTime || 850;
    this.parallaxPercent = options.parallaxPercent || 24;
    this.decoPositionPercent = options.decoPositionPercent || 20;
    this.decoTranslateScale = options.decoTranslateScale || 0.4;
    this.decoTranslateRatio = options.decoTranslateRatio || 1;
    this.decoPositionScale = options.decoPositionScale || 0.65;
    this.decoWidthPercent = options.decoWidthPercent || 20;
    this.swiperOptions = swiperOptions;
    return this.init();
  }
  init() {
    const {
      transitionTime,
      parallaxPercent,
      decoPositionPercent,
      decoTranslateScale,
      decoTranslateRatio,
      decoPositionScale,
      decoWidthPercent,
    } = this;

    const swiper = new Swiper(this.className, this.swiperOptions);

    if (this.enabled) {
      const decoLeftPrimaryContainers = document.querySelectorAll(".deco-left-primary");
      const decoLeftSecondaryContainers = document.querySelectorAll(".deco-left-secondary");
      const decoRightPrimaryContainers = document.querySelectorAll(".deco-right-primary");
      const decoRightSecondaryContainers = document.querySelectorAll(".deco-right-secondary");
      const slideTexts = document.querySelectorAll(".slide-text");

      // set initial style for all deco
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

      // calculate progress per slide
      const images = document.querySelectorAll(".slide-image");
      const progressPerSlide = 1 / (swiper.slides.length - 1);

      let prevProgress = 0;

      // event on slide progress change
      swiper.on("progress", (swiper) => {
        images.forEach((img, i) => {
          const decoLeftPrimary = decoLeftPrimaryContainers[i].querySelector("img");
          const decoLeftSecondary = decoLeftSecondaryContainers[i].querySelector("img");
          const decoRightPrimary = decoRightPrimaryContainers[i].querySelector("img");
          const decoRightSecondary = decoRightSecondaryContainers[i].querySelector("img");
          const slideText = slideTexts[i];

          // calculate current progress for slide
          const progressSlide = Math.min(Math.max(-1, (swiper.progress - progressPerSlide * i) / progressPerSlide), 1);

          // compare old and new progress to detect drag or not drag
          const dragging = Math.abs(swiper.progress - prevProgress) < 0.01;

          function parallaxTranslateMainImage() {
            img.style.transition = dragging ? "none" : `all ${transitionTime}ms ease`;
            img.style.transform = `translateX(${progressSlide * parallaxPercent}%)`;
          }
          function parallaxTranslateLeftPrimary() {
            decoLeftPrimary.style.transition = dragging ? "none" : `all ${transitionTime}ms ease`;
            decoLeftPrimary.style.transform = `translateX(calc(-${decoPositionPercent}% + ${
              progressSlide * parallaxPercent * decoTranslateScale
            }%))`;
          }
          function parallaxTranslateLeftSecondary() {
            decoLeftSecondary.style.transition = dragging ? "none" : `all ${transitionTime}ms ease`;
            decoLeftSecondary.style.transform = `translateX(calc(-${decoPositionPercent}% - ${
              progressSlide * parallaxPercent * decoTranslateScale * decoTranslateRatio
            }%))`;
          }
          function parallaxPositionLeftPrimary() {
            decoLeftSecondaryContainers[i].style.transition = dragging ? "none" : `all ${transitionTime}ms ease`;
            decoLeftSecondaryContainers[i].style.left = `calc(${decoPositionPercent}% + ${
              progressSlide * parallaxPercent * decoPositionScale
            }%)`;
          }
          function parallaxPositionLeftSecondary() {
            decoLeftSecondaryContainers[i].style.transition = dragging ? "none" : `all ${transitionTime}ms ease`;
            decoLeftSecondaryContainers[i].style.left = `calc(${decoPositionPercent}% + ${
              progressSlide * parallaxPercent * decoPositionScale
            }%)`;
          }
          function parallaxTranslateRightPrimary() {
            decoRightPrimary.style.transition = dragging ? "none" : `all ${transitionTime}ms ease`;
            decoRightPrimary.style.transform = `translateX(calc(-${100 - decoPositionPercent * 2}% + ${
              progressSlide * parallaxPercent * decoTranslateScale
            }%))`;
          }
          function parallaxTranslateRightSecondary() {
            decoRightSecondary.style.transition = dragging ? "none" : `all ${transitionTime}ms ease`;
            decoRightSecondary.style.transform = `translateX(calc(-${100 - decoPositionPercent * 2}% - ${
              progressSlide * parallaxPercent * decoTranslateScale * decoTranslateRatio
            }%))`;
          }
          function parallaxPositionRightPrimary() {
            decoRightPrimaryContainers[i].style.transition = dragging ? "none" : `all ${transitionTime}ms ease`;
            decoRightPrimaryContainers[i].style.right = `calc(${decoPositionPercent}% + ${
              progressSlide * parallaxPercent * decoPositionScale
            }%)`;
          }
          function parallaxPositionRightSecondary() {
            decoRightSecondaryContainers[i].style.transition = dragging ? "none" : `all ${transitionTime}ms ease`;
            decoRightSecondaryContainers[i].style.right = `calc(${decoPositionPercent}% - ${
              progressSlide * parallaxPercent * decoPositionScale
            }%)`;
          }
          function parallaxSlideText() {
            slideText.style.transition = dragging ? "none" : `all ${transitionTime}ms ease`;
            slideText.style.transform = `translateX(${progressSlide * parallaxPercent * 12}%)`;
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
          parallaxSlideText();
        });

        // set new prev progress
        prevProgress = swiper.progress;
      });
    }

    return swiper;
  }
}
