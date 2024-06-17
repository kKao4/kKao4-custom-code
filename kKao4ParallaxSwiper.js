// Author: kKao4
// P/s: Nếu code chạy xin đừng động vào, chỉ nên custom parameters (づ ◕‿◕ )づ

// Parameters:

// Name           | Type           | Default           | Description
// speed          | number         | swiper speed      | tốc độ ms của parallax
// imageEl        | string         |                   | className của image
// contentEl      | string         |                   | className của content

// Usage:

// const swiper = new kKao4ParallaxSwiper(
//   ".swiper-custom-class",
//   { imageEl: ".swiper-slide-image", contentEl: ".swiper-slide-content" },
//   {
//     speed: 1000,
//     slidesPerView: 1,
//     navigation: {
//       nextEl: ".next-slide-btn",
//       prevEl: ".prev-slide-btn",
//     },
//   }
// );

class kKao4ParallaxSwiper {
  constructor(className, options, swiperOptions) {
    this.className = className;
    this.speed = options.speed || swiperOptions.speed;
    this.imageEl = options.imageEl;
    this.contentEl = options.contentEl;
    this.swiperOptions = swiperOptions;
    return this.init();
  }

  init() {
    const parallaxContent = 20;
    const { className, speed, swiperOptions, imageEl, contentEl } = this;
    const swiper = new Swiper(className, swiperOptions);
    const images = document.querySelectorAll(imageEl);
    const contents = document.querySelectorAll(contentEl);
    let prevProgress = 0;

    if (swiperOptions.prevEl && swiperOptions.nextEl) {
      const prevSlideButton = document.querySelector(swiperOptions.prevEl);
      const nextSlideButton = document.querySelector(swiperOptions.nextEl);

      const disableButtons = () => {
        prevSlideButton.style.pointerEvents = "none";
        nextSlideButton.style.pointerEvents = "none";
      };

      const enableButtons = () => {
        prevSlideButton.style.pointerEvents = "all";
        nextSlideButton.style.pointerEvents = "all";
      };

      swiper.on("slideChangeTransitionStart", disableButtons);
      swiper.on("slideChangeTransitionEnd", enableButtons);
    }

    const updateTransforms = (realIndex, progressPerSlide, dragging) => {
      images.forEach((img, i) => {
        const parallax = Math.min(Math.max((swiper.progress - progressPerSlide * i) / progressPerSlide, -1), 1);
        const translateX = `${parallax * 100}%`;

        if (realIndex < i) {
          img.style.transition = "none";
          img.style.transform = "translateX(-100%)";
        } else if (realIndex > i) {
          img.style.transition = "none";
          img.style.transform = "translateX(100%)";
        } else {
          img.style.transition = dragging ? "none" : `all ${speed}ms ease`;
          img.style.transform = `translateX(${translateX})`;
        }

        if (realIndex - 1 === i) {
          const parallaxPrev = Math.min(
            Math.max((progressPerSlide * (i + 1) - swiper.progress) / progressPerSlide, 0),
            1
          );
          img.style.transition = dragging ? "none" : `all ${speed}ms ease`;
          img.style.transform = `translateX(${100 - parallaxPrev * 100}%)`;
        }

        if (realIndex + 1 === i) {
          const parallaxNext = Math.min(
            Math.max((swiper.progress - progressPerSlide * (i - 1)) / progressPerSlide, 0),
            1
          );
          img.style.transition = dragging ? "none" : `all ${speed}ms ease`;
          img.style.transform = `translateX(-${100 - parallaxNext * 100}%)`;
        }
      });

      contents.forEach((content, i) => {
        const parallax = Math.min(Math.max((swiper.progress - progressPerSlide * i) / progressPerSlide, -1), 1);
        content.style.transition = dragging ? "none" : `all ${speed}ms ease`;
        content.style.transform = `translateX(${parallax * parallaxContent * 100}%)`;
      });
    };

    swiper.on("progress", () => {
      const realIndex = swiper.realIndex;
      const dragging = Math.abs(swiper.progress - prevProgress) < 0.04;
      const progressPerSlide = 1 / (swiper.slides.length - 1);
      updateTransforms(realIndex, progressPerSlide, dragging);
      prevProgress = swiper.progress;
    });
  }
}
