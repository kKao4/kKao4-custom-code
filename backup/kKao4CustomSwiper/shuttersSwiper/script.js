import { kKao4ShuttersSwiper } from "./kKao4ShuttersSwiper.js";

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
  let swiper = new kKao4ShuttersSwiper(".swiper-custom-class", {}, swiperOptions);

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

  const transitionTimeInput = document.querySelector(".transition-time");
  const parallaxPercentInput = document.querySelector(".parallax-percent");
  const decoWidthPercentInput = document.querySelector(".deco-width-percent");
  const decoTranslateScaleInput = document.querySelector(".deco-translate-scale");
  const decoTranslateRatioInput = document.querySelector(".deco-translate-ratio");
  const decoPositionPercentInput = document.querySelector(".deco-position-percent");
  const decoPositionScaleInput = document.querySelector(".deco-position-scale");

  transitionTimeInput.addEventListener("change", (e) => {
    swiper = new kKao4ShuttersSwiper(
      ".swiper-custom-class",
      {
        transitionTime: e.target.value,
        parallaxPercent: parallaxPercentInput.value,
        decoWidthPercent: decoWidthPercentInput.value,
        decoTranslateScale: decoTranslateScaleInput.value,
        decoTranslateRatio: decoTranslateRatioInput.value,
        decoPositionPercent: decoPositionPercentInput.value,
        decoPositionScale: decoPositionScaleInput.value,
      },
      swiperOptions
    );
  });
  parallaxPercentInput.addEventListener("change", (e) => {
    swiper = new kKao4ShuttersSwiper(
      ".swiper-custom-class",
      {
        transitionTime: transitionTimeInput.value,
        parallaxPercent: e.target.value,
        decoWidthPercent: decoWidthPercentInput.value,
        decoTranslateScale: decoTranslateScaleInput.value,
        decoTranslateRatio: decoTranslateRatioInput.value,
        decoPositionPercent: decoPositionPercentInput.value,
        decoPositionScale: decoPositionScaleInput.value,
      },
      swiperOptions
    );
  });
  decoWidthPercentInput.addEventListener("change", (e) => {
    swiper = new kKao4ShuttersSwiper(
      ".swiper-custom-class",
      {
        transitionTime: transitionTimeInput.value,
        parallaxPercent: parallaxPercentInput.value,
        decoWidthPercent: e.target.value,
        decoTranslateScale: decoTranslateScaleInput.value,
        decoTranslateRatio: decoTranslateRatioInput.value,
        decoPositionPercent: decoPositionPercentInput.value,
        decoPositionScale: decoPositionScaleInput.value,
      },
      swiperOptions
    );
  });
  decoTranslateScaleInput.addEventListener("change", (e) => {
    swiper = new kKao4ShuttersSwiper(
      ".swiper-custom-class",
      {
        transitionTime: transitionTimeInput.value,
        parallaxPercent: parallaxPercentInput.value,
        decoWidthPercent: decoWidthPercentInput.value,
        decoTranslateScale: e.target.value,
        decoTranslateRatio: decoTranslateRatioInput.value,
        decoPositionPercent: decoPositionPercentInput.value,
        decoPositionScale: decoPositionScaleInput.value,
      },
      swiperOptions
    );
  });
  decoTranslateRatioInput.addEventListener("change", (e) => {
    swiper = new kKao4ShuttersSwiper(
      ".swiper-custom-class",
      {
        transitionTime: transitionTimeInput.value,
        parallaxPercent: parallaxPercentInput.value,
        decoWidthPercent: decoWidthPercentInput.value,
        decoTranslateScale: decoTranslateScaleInput.value,
        decoTranslateRatio: e.target.value,
        decoPositionPercent: decoPositionPercentInput.value,
        decoPositionScale: decoPositionScaleInput.value,
      },
      swiperOptions
    );
  });
  decoPositionPercentInput.addEventListener("change", (e) => {
    swiper = new kKao4ShuttersSwiper(
      ".swiper-custom-class",
      {
        transitionTime: transitionTimeInput.value,
        parallaxPercent: parallaxPercentInput.value,
        decoWidthPercent: decoWidthPercentInput.value,
        decoTranslateScale: decoTranslateScaleInput.value,
        decoTranslateRatio: decoTranslateRatioInput.value,
        decoPositionPercent: e.target.value,
        decoPositionScale: decoPositionScaleInput.value,
      },
      swiperOptions
    );
  });
  decoPositionScaleInput.addEventListener("change", (e) => {
    swiper = new kKao4ShuttersSwiper(
      ".swiper-custom-class",
      {
        transitionTime: transitionTimeInput.value,
        parallaxPercent: parallaxPercentInput.value,
        decoWidthPercent: decoWidthPercentInput.value,
        decoTranslateScale: decoTranslateScaleInput.value,
        decoTranslateRatio: decoTranslateRatioInput.value,
        decoPositionPercent: decoPositionPercentInput.value,
        decoPositionScale: e.target.value,
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
