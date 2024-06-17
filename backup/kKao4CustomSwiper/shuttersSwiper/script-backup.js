// speed slide
const transitionTime = 1000;
// parallax global
const parallaxPercent = 20;
// deco position change percent
const decoPositionPercent = 20;
// deco translate primary change value
const decoTranslateScale = 0.4;
// deco translate primary and secondary ratio
const decoTranslateRatio = 1;
// deco position change value
const decoPositionScale = 0.65;
// deco width percent
const decoWidthPercent = 20;

function init() {
  var swiper = new Swiper(".swiper-custom-class", {
    speed: transitionTime,
    navigation: {
      nextEl: ".next-slide-btn",
      prevEl: ".prev-slide-btn",
    },
    pagination: {
      el: ".swiper-pagination",
    },
  });
  const decoLeftPrimaryContainers = document.querySelectorAll(".deco-left-primary");
  const decoLeftSecondaryContainers = document.querySelectorAll(".deco-left-secondary");
  const decoRightPrimaryContainers = document.querySelectorAll(".deco-right-primary");
  const decoRightSecondaryContainers = document.querySelectorAll(".deco-right-secondary");

  // set initial style for all deco
  decoLeftPrimaryContainers.forEach((container, i) => {
    container.style.left = `${decoPositionPercent}%`;
    container.style.width = `${decoWidthPercent}%`;
    container.querySelector("img").style.transform = `translateX(-${decoPositionPercent}%)`;
  });
  decoLeftSecondaryContainers.forEach((container, i) => {
    container.style.left = `${decoPositionPercent}%`;
    container.style.width = `${decoWidthPercent}%`;
    container.querySelector("img").style.transform = `translateX(-${decoPositionPercent}%)`;
  });
  decoRightPrimaryContainers.forEach((container, i) => {
    container.style.right = `${decoPositionPercent}%`;
    container.style.width = `${decoWidthPercent}%`;
    container.querySelector("img").style.transform = `translateX(-${100 - decoPositionPercent * 2}%)`;
  });
  decoRightSecondaryContainers.forEach((container, i) => {
    container.style.right = `${decoPositionPercent}%`;
    container.style.width = `${decoWidthPercent}%`;
    container.querySelector("img").style.transform = `translateX(-${100 - decoPositionPercent * 2}%)`;
  });

  // calculate progress per slide
  const images = document.querySelectorAll(".slide-image");
  const progressPerSlide = 1 / (swiper.slides.length - 1);

  let prevProgress = 0;

  // event on slide progress change
  swiper.on("progress", (swiper) => {
    images.forEach((img, i) => {
      const decoLeftPrimary = decoLeftPrimaryContainers[i].querySelector("img");
      const decoLeftSecondary = decoLeftSecondaryContainers[i].querySelector("img");
      const decoRightPrimary = decoRightPrimaryContainers[i].querySelector("img");
      const decoRightSecondary = decoRightSecondaryContainers[i].querySelector("img");

      // calculate current progress for slide
      const progressSlide = Math.min(Math.max(-1, (swiper.progress - progressPerSlide * i) / progressPerSlide), 1);

      // compare old and new progress to detect drag or not drag
      const dragging = Math.abs(swiper.progress - prevProgress) < 0.02;

      function parallaxTranslateMainImage() {
        img.style.transition = dragging ? "none" : `all ${transitionTime}ms ease`;
        img.style.transform = `translateX(${progressSlide * parallaxPercent}%)`;
      }
      function parallaxTranslateLeftPrimary() {
        decoLeftPrimary.style.transition = dragging ? "none" : `all ${transitionTime}ms ease`;
        decoLeftPrimary.style.transform = `translateX(calc(-${decoPositionPercent}% + ${
          progressSlide * parallaxPercent * decoTranslateScale
        }%))`;
      }
      function parallaxTranslateLeftSecondary() {
        decoLeftSecondary.style.transition = dragging ? "none" : `all ${transitionTime}ms ease`;
        decoLeftSecondary.style.transform = `translateX(calc(-${decoPositionPercent}% - ${
          progressSlide * parallaxPercent * decoTranslateScale * decoTranslateRatio
        }%))`;
      }
      function parallaxPositionLeftPrimary() {
        decoLeftSecondaryContainers[i].style.transition = dragging ? "none" : `all ${transitionTime}ms ease`;
        decoLeftSecondaryContainers[i].style.left = `calc(${decoPositionPercent}% + ${
          progressSlide * parallaxPercent * decoPositionScale
        }%)`;
      }
      function parallaxPositionLeftSecondary() {
        decoLeftSecondaryContainers[i].style.transition = dragging ? "none" : `all ${transitionTime}ms ease`;
        decoLeftSecondaryContainers[i].style.left = `calc(${decoPositionPercent}% + ${
          progressSlide * parallaxPercent * decoPositionScale
        }%)`;
      }
      function parallaxTranslateRightPrimary() {
        decoRightPrimary.style.transition = dragging ? "none" : `all ${transitionTime}ms ease`;
        decoRightPrimary.style.transform = `translateX(calc(-${100 - decoPositionPercent * 2}% + ${
          progressSlide * parallaxPercent * decoTranslateScale
        }%))`;
      }
      function parallaxTranslateRightSecondary() {
        decoRightSecondary.style.transition = dragging ? "none" : `all ${transitionTime}ms ease`;
        decoRightSecondary.style.transform = `translateX(calc(-${100 - decoPositionPercent * 2}% - ${
          progressSlide * parallaxPercent * decoTranslateScale * decoTranslateRatio
        }%))`;
      }
      function parallaxPositionRightPrimary() {
        decoRightPrimaryContainers[i].style.transition = dragging ? "none" : `all ${transitionTime}ms ease`;
        decoRightPrimaryContainers[i].style.right = `calc(${decoPositionPercent}% + ${
          progressSlide * parallaxPercent * decoPositionScale
        }%)`;
      }
      function parallaxPositionRightSecondary() {
        decoRightSecondaryContainers[i].style.transition = dragging ? "none" : `all ${transitionTime}ms ease`;
        decoRightSecondaryContainers[i].style.right = `calc(${decoPositionPercent}% - ${
          progressSlide * parallaxPercent * decoPositionScale
        }%)`;
      }

      parallaxTranslateMainImage();
      parallaxTranslateLeftPrimary();
      parallaxTranslateLeftSecondary();
      parallaxPositionLeftPrimary();
      parallaxPositionLeftSecondary();
      parallaxTranslateRightPrimary();
      parallaxTranslateRightSecondary();
      parallaxPositionRightPrimary();
      parallaxPositionRightSecondary();
    });
    // set new prev progress
    prevProgress = swiper.progress;
  });
}

window.addEventListener("DOMContentLoaded", init);
