function init() {
  const swiper = new Swiper(".swiper-custom-class", {
    speed: 1000,
    effect: "creative",
    creativeEffect: {
      prev: {
        opacity: 1,
      },
      next: {
        opacity: 1,
      },
    },
  });

  const swiperSlide = document.querySelector(".swiper-custom-class");
  const slides = swiperSlide.querySelectorAll(".swiper-slide");
  const progressPerSlide = 1 / (slides.length - 1);
  const decos = document.querySelectorAll(".deco-next-image");
  const initialWidth = parseFloat(decos[0].offsetWidth);
  const progressPerDeco = progressPerSlide / decos.length;
  let prevProgress = 0;

  swiper.on("progress", () => {
    const activeIndex = Math.floor(swiper.progress / progressPerSlide);
    // console.log("🚀 ~ init ~ activeIndex:", activeIndex);

    const dragging = Math.abs(swiper.progress - prevProgress) < 0.01;
    slides.forEach((slide, i) => {
      const image = slide.querySelector(".swiper-slide-image");
      if (i !== activeIndex) {
        gsap.set(image, { opacity: 0 });
      } else {
        // console.log("🚀 ~ slides.forEach ~ dragging:", dragging + " / " + swiper.progress);
        gsap.set(image, { opacity: 1, delay: dragging ? 0 : 1 });
      }
      const currentProgress = (swiper.progress - progressPerSlide * i) / progressPerSlide;
      if (i === 0) {
        // console.log(currentProgress);
        if (dragging) {
          decos.forEach((deco, j) => {
            deco.style.transition = "none";
            deco.style.width = `${Math.min(
              Math.max((initialWidth * (swiper.progress / 2 - progressPerDeco * j * 0.5)) / progressPerDeco, 0),
              initialWidth
            )}px`;
          });
        } else {
          decos.forEach((deco, j) => {
            deco.style.transition = "all 1s ease";
            deco.style.width = `${Math.min(
              Math.max((initialWidth * (swiper.progress / 2 - progressPerDeco * j * 0.5)) / progressPerDeco, 0),
              initialWidth
            )}px`;
          });
        }
      }
    });
    prevProgress = swiper.progress;
  });
}

window.addEventListener("DOMContentLoaded", init);
