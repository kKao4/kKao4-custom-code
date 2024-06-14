function init() {
  const swiperMain = new Swiper(".swiper-outstanding-project", {
    loop: true,
    speed: 600,
    navigation: {
      prevEl: ".swiper-prev-btn",
      nextEl: ".swiper-next-btn",
    },
  });
  const swiperThumb = new Swiper(".swiper-outstanding-project-thumb", {
    loop: true,
    slidesPerView: 2,
    speed: 600,
    spaceBetween: (window.innerWidth / 100) * 1.5,
  });
  swiperThumb.on("slideChangeTransitionEnd", (swiper) => {
    swiperMain.slideTo(swiper.realIndex, 600, false);
  });
  swiperMain.on("slideChangeTransitionEnd", (swiper) => {
    console.log("main end");
    swiperThumb.slideTo(swiper.realIndex, 600, false);
  });
  document.querySelector(".swiper-prev-btn").addEventListener("click", () => console.log("hihi"));
}

window.addEventListener("DOMContentLoaded", init);
