function init() {
  const mySwiper = new kKao4ZoomInOutSwiper(
    ".swiper-custom-class",
    { speed: 800, containerEl: ".background-slide-container", contentEl: ".background-slide-content" },
    {
      slidesPerView: 3,
      slidesPerGroup: 1,
      spaceBetween: (window.innerWidth / 100) * 1,
      loop: true,
      speed: 800,
      initialSlide: 1,
      navigation: {
        nextEl: ".swiper-next-btn",
        prevEl: ".swiper-prev-btn",
      },
    }
  );
}

window.addEventListener("DOMContentLoaded", init);