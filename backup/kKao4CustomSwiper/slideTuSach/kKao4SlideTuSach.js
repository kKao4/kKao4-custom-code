// Author: kKao4

function kKao4SlideTuSach({
  containerEl,
  itemsEl,
  navigation: { prevEl, nextEl },
  speed = 800,
  startIndex = 0,
  initialItemWidth,
  initialDistance,
  onSlideChange,
}) {
  const container = document.querySelector(containerEl);
  const prevBtn = document.querySelector(prevEl);
  const nextBtn = document.querySelector(nextEl);
  const items = document.querySelectorAll(itemsEl);
  let prevIndex;
  let activeIndex = startIndex;
  let isAnimating = false;
  const containerWidth = parseFloat(container.offsetWidth);
  const initialDistance0 = 0;
  const initialDistance1 = initialDistance;
  const initialDistance2 = containerWidth - initialItemWidth - initialDistance;
  const initialDistance3 = containerWidth - initialItemWidth;

  items.forEach((item) => (item.style.offsetWidth = `${initialItemWidth}px`));

  const tl = gsap.timeline({});
  items.forEach((item, i) => {
    if (i < activeIndex) {
      tl.set(item, { x: `${initialDistance0}px`, autoAlpha: 0 });
    } else if (i === activeIndex) {
      tl.set(item, { x: `${initialDistance1}px`, autoAlpha: 1 });
    } else if (i === activeIndex + 1) {
      tl.set(item, { x: `${initialDistance2}px`, autoAlpha: 0.4 });
    } else {
      tl.set(item, { x: `${initialDistance3}px`, autoAlpha: 0 });
    }
  });

  prevBtn.addEventListener("click", () => {
    prevItem();
  });
  nextBtn.addEventListener("click", () => {
    nextItem();
  });

  Observer.create({
    target: document.querySelector(".section-tu-sach-desktop .tu-sach-container"),
    type: "pointer, touch",
    onRight: () => prevItem(),
    onLeft: () => nextItem(),
    dragMinimum: 12,
    tolerance: 12,
  });

  function prevItem() {
    if (!isAnimating) {
      activeIndex = gsap.utils.clamp(0, items.length - 1, activeIndex - 1);
      if (prevIndex !== activeIndex) {
        onSlideChange(activeIndex);
      }
      prevIndex = activeIndex;
      const tl = gsap.timeline({});
      tl.addLabel("root");
      tl.to(
        items[activeIndex],
        {
          x: `${initialDistance1}px`,
          autoAlpha: 1,
          duration: speed / 1000,
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
          x: `${initialDistance2}px`,
          autoAlpha: 0.4,
          duration: speed / 1000,
          ease: "power1.inOut",
          onStart: () => {
            setTimeout(() => {
              isAnimating = false;
            }, speed / 2);
          },
        },
        "root"
      );
      tl.to(
        items[activeIndex + 2],
        { x: `${initialDistance3}px`, autoAlpha: 0, duration: speed / 1000, ease: "power1.inOut" },
        "root"
      );
    }
  }

  function nextItem() {
    if (!isAnimating) {
      activeIndex = gsap.utils.clamp(0, items.length - 1, activeIndex + 1);
      if (prevIndex !== activeIndex) {
        onSlideChange(activeIndex);
      }
      prevIndex = activeIndex;
      const tl = gsap.timeline({});
      tl.addLabel("root");
      tl.to(
        items[activeIndex - 1],
        {
          x: `${initialDistance0}px`,
          autoAlpha: 0,
          duration: speed / 1000,
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
          x: `${initialDistance1}px`,
          autoAlpha: 1,
          duration: speed / 1000,
          ease: "power1.inOut",
          onStart: () => {
            setTimeout(() => {
              isAnimating = false;
            }, speed / 2);
          },
        },
        "root"
      );
      if (activeIndex < items.length - 1) {
        tl.to(
          items[activeIndex + 1],
          { x: `${initialDistance2}px`, autoAlpha: 0.4, duration: speed / 1000, ease: "power1.inOut" },
          "root"
        );
      }
    }
  }
}
