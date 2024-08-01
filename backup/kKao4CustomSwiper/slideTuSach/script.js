function init() {
  const container = document.querySelector(".tu-sach-container");
  const prevBtn = document.querySelector(".section-tu-sach .prev-btn");
  const nextBtn = document.querySelector(".section-tu-sach .next-btn");
  const items = document.querySelectorAll(".section-tu-sach .item");
  let activeIndex = 0;
  let isAnimating = false;
  const containerWidth = parseFloat(container.offsetWidth);
  const initialDistance = parseFloat((window.innerWidth / 100) * 7.5);
  const itemWidth = parseFloat(items[0].offsetWidth);
  const initialDistance0 = 0;
  const initialDistance1 = initialDistance;
  const initialDistance2 = containerWidth - itemWidth - initialDistance;
  const initialDistance3 = containerWidth - itemWidth;
  items.forEach((item, i) => {
    gsap.set(item, { autoAlpha: 0 });
    if (i < activeIndex) {
      gsap.set(item, { x: initialDistance0, duration: 0.4 });
    } else if (i === activeIndex) {
      gsap.to(item, { x: initialDistance1, autoAlpha: 1, duration: 0.4 });
    } else if (i === activeIndex + 1) {
      gsap.to(item, { x: initialDistance2, autoAlpha: 0.4, duration: 0.4 });
    } else {
      gsap.set(item, { x: initialDistance3, duration: 0.4 });
    }
  });
  prevBtn.addEventListener("click", () => {
    prevItem();
  });
  nextBtn.addEventListener("click", () => {
    nextItem();
  });
  kKao4Drag({
    containerEl: ".tu-sach-container",
    onDrop: (x, y) => {
      if (x < -20) {
        nextItem();
      } else if (x > 20) {
        prevItem();
      }
    },
  });
  function prevItem() {
    if (!isAnimating) {
      activeIndex = Math.max(activeIndex - 1, 0);
      const tl = gsap.timeline({});
      tl.addLabel("root");
      tl.to(
        items[activeIndex],
        {
          x: initialDistance1,
          autoAlpha: 1,
          duration: 0.8,
          ease: "power1.inOut",
          onStart: () => {
            isAnimating = true;
          },
        },
        "root"
      );
      tl.to(
        items[activeIndex + 1],
        {
          x: initialDistance2,
          autoAlpha: 0.4,
          duration: 0.8,
          ease: "power1.inOut",
          onStart: () => {
            setTimeout(() => {
              isAnimating = false;
            }, 400);
          },
        },
        "root"
      );
      tl.to(items[activeIndex + 2], { x: initialDistance3, autoAlpha: 0, duration: 0.8, ease: "power1.inOut" }, "root");
    }
  }
  function nextItem() {
    if (!isAnimating) {
      activeIndex = Math.min(activeIndex + 1, items.length - 1);
      const tl = gsap.timeline({});
      tl.addLabel("root");
      tl.to(
        items[activeIndex - 1],
        {
          x: initialDistance0,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power1.inOut",
          onStart: () => {
            isAnimating = true;
          },
        },
        "root"
      );
      tl.to(
        items[activeIndex],
        {
          x: initialDistance1,
          autoAlpha: 1,
          duration: 0.8,
          ease: "power1.inOut",
          onStart: () => {
            setTimeout(() => {
              isAnimating = false;
            }, 400);
          },
        },
        "root"
      );
      if (activeIndex < items.length - 1) {
        tl.to(
          items[activeIndex + 1],
          { x: initialDistance2, autoAlpha: 0.4, duration: 0.8, ease: "power1.inOut" },
          "root"
        );
      }
    }
  }
}

window.addEventListener("DOMContentLoaded", init);
