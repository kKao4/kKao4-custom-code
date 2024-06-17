// class kKao4ParallaxSwiper {
//   constructor(className, options, swiperOptions) {
//     this.className = className;
//     this.speed = options.speed || swiperOptions.speed;
//     this.imageEl = options.imageEl;
//     this.contentEl = options.contentEl;
//     this.swiperOptions = swiperOptions;
//     return this.init();
//   }
//   init() {
//     const parallaxContent = 20;

//     const { className, speed, swiperOptions, imageEl, contentEl } = this;

//     const swiper = new Swiper(className, swiperOptions);

//     const images = document.querySelectorAll(imageEl);
//     const contents = document.querySelectorAll(contentEl);

//     if (swiperOptions.prevEl && swiperOptions.nextEl) {
//       const prevSlideButton = document.querySelector(swiperOptions.prevEl);
//       const nextSlideButton = document.querySelector(swiperOptions.nextEl);
//       swiper.on("slideChangeTransitionStart", () => {
//         prevSlideButton.style.pointerEvents = "none";
//         nextSlideButton.style.pointerEvents = "none";
//       });
//       swiper.on("slideChangeTransitionEnd", () => {
//         prevSlideButton.style.pointerEvents = "all";
//         nextSlideButton.style.pointerEvents = "all";
//       });
//     }

//     let prevProgress = 0;

//     swiper.on("progress", () => {
//       const realIndex = swiper.realIndex;
//       const dragging = Math.abs(swiper.progress - prevProgress) < 0.04;
//       const progressPerSlide = 1 / (swiper.slides.length - 1);

//       images.forEach((img, i) => {
//         if (realIndex < i) {
//           img.style.transition = "none";
//           img.style.transform = "translateX(-100%)";
//         }
//         if (realIndex > i) {
//           img.style.transition = "none";
//           img.style.transform = "translateX(100%)";
//         }
//         const parallax = Math.min(Math.max((swiper.progress - progressPerSlide * i) / progressPerSlide, -1), 1);
//         if (dragging) {
//           contents[i].style.transition = "none";
//           contents[i].style.transform = `translateX(${parallax * parallaxContent * 100}%)`;
//         } else {
//           contents[i].style.transition = `all ${speed}ms ease`;
//           contents[i].style.transform = `translateX(${parallax * parallaxContent * 100}%)`;
//         }
//         if (realIndex === i) {
//           const parallax = Math.min(Math.max((swiper.progress - progressPerSlide * i) / progressPerSlide, -1), 1);
//           if (dragging) {
//             img.style.transition = "none";
//             img.style.transform = `translateX(${parallax * 100}%)`;
//           } else {
//             img.style.transition = `all ${speed}ms ease`;
//             img.style.transform = `translateX(${parallax * 100}%)`;
//           }
//         }
//         if (realIndex - 1 === i) {
//           const parallax = Math.min(Math.max((progressPerSlide * (i + 1) - swiper.progress) / progressPerSlide, 0), 1);
//           if (dragging) {
//             img.style.transition = "none";
//             img.style.transform = `translateX(${100 - parallax * 100}%)`;
//           } else {
//             img.style.transition = `all ${speed}ms ease`;
//             img.style.transform = `translateX(${100 - parallax * 100}%)`;
//           }
//         }
//         if (realIndex + 1 === i) {
//           const parallax = Math.min(Math.max((swiper.progress - progressPerSlide * (i - 1)) / progressPerSlide, 0), 1);
//           if (dragging) {
//             img.style.transition = "none";
//             img.style.transform = `translateX(-${100 - parallax * 100}%)`;
//           } else {
//             img.style.transition = `all ${speed}ms ease`;
//             img.style.transform = `translateX(-${100 - parallax * 100}%)`;
//           }
//         }
//       });
//       prevProgress = swiper.progress;
//     });
//   }
// }

function init() {
  const swiper = new Swiper(".swiper-custom-class", {
    speed: 1000,
    slidesPerView: 1,
    navigation: {
      nextEl: ".next-slide-btn",
      prevEl: ".prev-slide-btn",
    },
  });
  const images = document.querySelectorAll(".swiper-slide-image");
  const contents = document.querySelectorAll(".swiper-slide-content");
  let prevProgress = 0;
  const prevSlideButton = document.querySelector(".prev-slide-btn");
  const nextSlideButton = document.querySelector(".next-slide-btn");
  swiper.on("slideChangeTransitionStart", () => {
    prevSlideButton.style.pointerEvents = "none";
    nextSlideButton.style.pointerEvents = "none";
  });
  swiper.on("slideChangeTransitionEnd", () => {
    prevSlideButton.style.pointerEvents = "all";
    nextSlideButton.style.pointerEvents = "all";
  });
  swiper.on("progress", () => {
    const realIndex = swiper.realIndex;
    const dragging = Math.abs(swiper.progress - prevProgress) < 0.04;
    const progressPerSlide = 1 / (swiper.slides.length - 1);
    images.forEach((img, i) => {
      if (realIndex < i) {
        img.style.transition = "none";
        img.style.transform = "translateX(-100%)";
      }
      if (realIndex > i) {
        img.style.transition = "none";
        img.style.transform = "translateX(100%)";
      }
      const parallax = Math.min(Math.max((swiper.progress - progressPerSlide * i) / progressPerSlide, -1), 1);
      if (dragging) {
        contents[i].style.transition = "none";
        contents[i].style.transform = `translateX(${parallax * 20 * 100}%)`;
      } else {
        contents[i].style.transition = "all 1s ease";
        contents[i].style.transform = `translateX(${parallax * 20 * 100}%)`;
      }
      if (realIndex === i) {
        const parallax = Math.min(Math.max((swiper.progress - progressPerSlide * i) / progressPerSlide, -1), 1);
        if (dragging) {
          img.style.transition = "none";
          img.style.transform = `translateX(${parallax * 100}%)`;
        } else {
          img.style.transition = "all 1s ease";
          img.style.transform = `translateX(${parallax * 100}%)`;
        }
      }
      if (realIndex - 1 === i) {
        const parallax = Math.min(Math.max((progressPerSlide * (i + 1) - swiper.progress) / progressPerSlide, 0), 1);
        if (dragging) {
          img.style.transition = "none";
          img.style.transform = `translateX(${100 - parallax * 100}%)`;
        } else {
          img.style.transition = "all 1s ease";
          img.style.transform = `translateX(${100 - parallax * 100}%)`;
        }
      }
      if (realIndex + 1 === i) {
        const parallax = Math.min(Math.max((swiper.progress - progressPerSlide * (i - 1)) / progressPerSlide, 0), 1);
        if (dragging) {
          img.style.transition = "none";
          img.style.transform = `translateX(-${100 - parallax * 100}%)`;
        } else {
          img.style.transition = "all 1s ease";
          img.style.transform = `translateX(-${100 - parallax * 100}%)`;
        }
      }
    });
    prevProgress = swiper.progress;
  });
}

window.addEventListener("DOMContentLoaded", init);
