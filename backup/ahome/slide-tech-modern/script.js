function init() {
  const swiper = new Swiper(".swiper-tech-modern", {
    pagination: {
      el: ".swiper-pagination",
    },
  });
  const swiperContainer = document.querySelector(".swiper-tech-modern");
  const videoContainers = document.querySelectorAll(".video-container-tech-modern");
  const videos = document.querySelectorAll(".video-tech-modern");
  const swiperSlides = swiperContainer.querySelectorAll(".swiper-slide");
  const pagination = document.querySelector(".swiper-pagination-tech-modern");
  swiperSlides.forEach((swiperSlide, i) => {
    if (window.innerWidth >= 1024) {
      swiperSlide.addEventListener("mouseenter", () => {
        pagination.style.opacity = 1;
      });
      swiperSlide.addEventListener("mouseleave", () => {
        pagination.style.opacity = 0;
      });
    }
    swiperSlide.addEventListener("click", (e) => {
      e.stopPropagation();
      videoContainers[i].style.opacity = 1;
      videos[i].style.transform = "scale(1)";
      videoContainers[i].style.pointerEvents = "all";
    });
  });
  videoContainers.forEach((videoContainer, i) => {
    videoContainer.addEventListener("click", (e) => {
      e.stopPropagation();
      const targetElement = e.target;
      if (!videos[i].contains(targetElement)) {
        videoContainers[i].style.opacity = 0;
        videos[i].style.transform = "scale(0.8)";
        videoContainers[i].style.pointerEvents = "none";
      }
    });
  });
}

window.addEventListener("DOMContentLoaded", init);
