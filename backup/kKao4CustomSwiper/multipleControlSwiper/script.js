// Author: kKao4
// P/s: Nếu code chạy xin đừng động vào (づ ◕‿◕ )づ

function init() {
  const activeIndexElement = document.querySelector(".swiper-active-slide");
  const totalIndexElement = document.querySelector(".swiper-total-slide");
  var swiper1 = new Swiper(".swiper-custom-class-1", {
    slidesPerView: 3,
    slidesPerGroup: 3,
    speed: 800,
    spaceBetween: (window.innerWidth / 100) * 1.5,
    navigation: {
      prevEl: ".swiper-prev-btn",
      nextEl: ".swiper-next-btn",
    },
  });
  var swiper2 = new Swiper(".swiper-custom-class-2", {
    slidesPerView: 6,
    slidesPerGroup: 6,
    speed: 800,
    spaceBetween: (window.innerWidth / 100) * 1.5,
    controller: {
      control: swiper1,
    },
  });
  var swiper3 = new Swiper(".swiper-custom-class-3", {
    slidesPerView: 6,
    slidesPerGroup: 6,
    speed: 800,
    spaceBetween: (window.innerWidth / 100) * 1.5,
    controller: {
      control: swiper1,
    },
  });
  swiper1.controller.control = [swiper2, swiper3];
  totalIndexElement.textContent = formatNumber(swiper1.slides.length / swiper1.slidesPerViewDynamic());
  swiper1.on("slideChange", (swiper) => {
    activeIndexElement.textContent = formatNumber(swiper.activeIndex / swiper1.slidesPerViewDynamic() + 1);
  });
}

window.addEventListener("DOMContentLoaded", init);
