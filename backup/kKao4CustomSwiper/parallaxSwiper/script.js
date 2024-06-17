function init() {
  const swiper = new kKao4ParallaxSwiper(
    ".swiper-custom-class",
    { imageEl: ".swiper-slide-image", contentEl: ".swiper-slide-content" },
    {
      speed: 1000,
      slidesPerView: 1,
      navigation: {
        nextEl: ".next-slide-btn",
        prevEl: ".prev-slide-btn",
      },
    }
  );
}

window.addEventListener("DOMContentLoaded", init);
