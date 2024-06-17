const swiperOptions = {
  speed: 1000,
  navigation: {
    nextEl: ".next-slide-btn",
    prevEl: ".prev-slide-btn",
  },
  pagination: {
    el: ".swiper-pagination",
  },
};

function init() {
  let swiper = new kKao4ShuttersSwiper(".swiper-custom-class", { contentEl: ".swiper-slide-content" }, swiperOptions);

  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("change", () => {
      swiper.destroy(true, true);
    });
  });

  const shuttersCheckbox = document.querySelector(".shutters-checkbox");
  shuttersCheckbox.addEventListener("change", (e) => {
    if (e.target.checked) {
      swiper = new kKao4ShuttersSwiper(".swiper-custom-class", {}, swiperOptions);
    } else {
      swiper = new kKao4ShuttersSwiper(".swiper-custom-class", { enabled: false }, swiperOptions);
    }
  });

  const speedInput = document.querySelector(".transition-time");
  const parallaxPercentInput = document.querySelector(".parallax-percent");

  speedInput.addEventListener("change", (e) => {
    swiper = new kKao4ShuttersSwiper(
      ".swiper-custom-class",
      {
        speed: e.target.value,
        parallaxPercent: parallaxPercentInput.value,
      },
      swiperOptions
    );
  });
  parallaxPercentInput.addEventListener("change", (e) => {
    swiper = new kKao4ShuttersSwiper(
      ".swiper-custom-class",
      {
        speed: speedInput.value,
        parallaxPercent: e.target.value,
      },
      swiperOptions
    );
  });

  const creditToggleButton = document.querySelector(".credit-toggle-btn");
  const formContainer = document.querySelector(".form-container");
  creditToggleButton.addEventListener("click", () => {
    if (formContainer.style.maxHeight) {
      formContainer.style.maxHeight = null;
      formContainer.style.overflow = "hidden";
      formContainer.style.marginBottom = "0.25rem";
      creditToggleButton.classList.remove("credit-toggle-btn-active");
    } else {
      formContainer.style.maxHeight = "12rem";
      formContainer.style.overflow = "auto";
      formContainer.style.marginBottom = "1rem";
      creditToggleButton.classList.add("credit-toggle-btn-active");
    }
  });
}

window.addEventListener("DOMContentLoaded", init);
