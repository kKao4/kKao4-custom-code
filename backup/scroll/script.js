// Author: kKao4

function init() {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  ScrollSmoother.create({
    smooth: 0.8,
    effects: true,
  });
  // window.addEventListener("scroll", () => {
  //   const parallaxBackground = document.querySelector(".parallax-bg");
  //   console.log((window.scrollY / parallaxBackground.offsetHeight) * 1);
  //   const parallaxPercent = (window.scrollY / parallaxBackground.offsetHeight) * 50;
  //   parallaxBackground.style.transform = `translateY(${parallaxPercent}%)`;
  // });
}

window.addEventListener("DOMContentLoaded", init);
