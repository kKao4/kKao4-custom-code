function init() {
  if (window.innerWidth > 768) {
    gsap.registerPlugin(ScrollToPlugin);
    gsap.to(window, { scrollTo: 0, duration: 0.8 });
    const sections = document.querySelectorAll(".section");
    let activeSectionIndex = 0;
    let isScrolling = false;
    const fnc = (e) => {
      const rect = document.querySelector(".section-news").getBoundingClientRect();
      let isInViewport = false;
      if (rect) {
        if (Math.floor(rect.height) >= Math.floor(window.innerHeight)) {
          if (
            Math.floor(rect.top) <= Math.floor(window.innerHeight - window.innerHeight * 1) &&
            Math.floor(rect.bottom) >= Math.floor(window.innerHeight * 1)
          ) {
            isInViewport = true;
          } else {
            isInViewport = false;
          }
        }
      }
      if (!isInViewport) {
        e.preventDefault();
        e.stopPropagation();
        if (isScrolling) return;
        if (e.deltaY > 8) {
          if (activeSectionIndex < sections.length - 1) {
            activeSectionIndex++;
          }
        } else if (e.deltaY < -8) {
          if (activeSectionIndex > 0) {
            activeSectionIndex--;
          }
        } else {
          return;
        }
        isScrolling = true;
        gsap.to(window, {
          scrollTo: sections[activeSectionIndex],
          duration: 0.8,
          onStart: () => {
            isScrolling = true;
          },
          onUpdate: () => {
            isScrolling = true;
          },
          onComplete: () => {
            isScrolling = false;
          },
          overwrite: true,
        });
      }
    };
    window.addEventListener("wheel", (e) => fnc(e), { passive: false });
  }
}
window.addEventListener("DOMContentLoaded", init);
