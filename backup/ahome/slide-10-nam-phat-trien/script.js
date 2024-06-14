function init() {
  const swiperTenYears = new Swiper(".swiper-ten-years", {
    slidesPerView: 1,
    spaceBetween: 0,
    navigation: {
      prevEl: ".slide-ten-years-prev-btn",
      nextEl: ".slide-ten-years-next-btn",
    },
    breakpoints: {
      768: {
        slidesPerView: 4,
        spaceBetween: (window.innerWidth / 100) * 1.5,
      },
    },
  });
  const swiperTenYearsSlide = document.querySelector(".swiper-ten-years").querySelectorAll(".swiper-slide");
  const paginationContainer = document.querySelector(".swiper-ten-years-pagination-container");
  swiperTenYearsSlide.forEach((slide, i) => {
    if (i === 0) {
      paginationContainer.innerHTML += `<div class='swiper-ten-years-pagination-bar-overlay' data-index='${i}'><div class='swiper-ten-years-pagination-bar swiper-ten-years-pagination-bar-active'><p class='swiper-ten-years-pagination-bar-description'>${slide.dataset.year}</p></div></div>`;
    } else {
      paginationContainer.innerHTML += `<div class='swiper-ten-years-pagination-bar-overlay' data-index='${i}'><div class='swiper-ten-years-pagination-bar'><p class='swiper-ten-years-pagination-bar-description'>${slide.dataset.year}</p></div></div>`;
    }
  });
  const paginationBars = document.querySelectorAll(".swiper-ten-years-pagination-bar");
  swiperTenYears.on("slideChange", (swiper) => {
    paginationBars.forEach((bar, i) => {
      if (i === swiper.realIndex) {
        bar.classList.add("swiper-ten-years-pagination-bar-active");
      } else {
        bar.classList.remove("swiper-ten-years-pagination-bar-active");
      }
    });
  });
  const paginationBarsOverlay = document.querySelectorAll(".swiper-ten-years-pagination-bar-overlay");
  paginationBarsOverlay.forEach((barOverlay) => {
    barOverlay.addEventListener("click", () => {
      console.log(parseInt(barOverlay.dataset.index));
      swiperTenYears.slideTo(parseInt(barOverlay.dataset.index));
    });
  });
  const paginationBarsDescription = document.querySelectorAll(".swiper-ten-years-pagination-bar-description");
  let prevYear = paginationBarsDescription[0].textContent;
  paginationBarsDescription.forEach((barDescription, i) => {
    if (i !== 0) {
      const newYear = barDescription.textContent;
      if (prevYear === newYear) {
        barDescription.style.opacity = 0;
      } else {
        barDescription.style.opacity = 1;
        prevYear = newYear;
      }
    }
  });
  document.querySelector(".slide-count-total").textContent = swiperTenYears.slides.length.toString();
  swiperTenYears.on("slideChange", (swiper) => {
    document.querySelector(".slide-count-active").textContent = (swiper.activeIndex + 1).toString();
  });
}

window.addEventListener("DOMContentLoaded", init);
