// Author: kKao4

function kKao4SlideTuSach({
  containerEl,
  itemsEl,
  navigation: { prevEl, nextEl },
  speed = 800,
  startIndex = 0,
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
  const itemWidth = parseFloat(items[0].offsetWidth);
  const initialDistance0 = 0;
  const initialDistance1 = initialDistance;
  const initialDistance2 = containerWidth - itemWidth - initialDistance;
  const initialDistance3 = containerWidth - itemWidth;

  items.forEach((item, i) => {
    gsap.set(item, { autoAlpha: 0 });
    if (i < activeIndex) {
      gsap.set(item, { x: initialDistance0 });
    } else if (i === activeIndex) {
      gsap.set(item, { x: initialDistance1, autoAlpha: 1 });
    } else if (i === activeIndex + 1) {
      gsap.set(item, { x: initialDistance2, autoAlpha: speed / 2000 });
    } else {
      gsap.set(item, { x: initialDistance3 });
    }
  });

  prevBtn.addEventListener("click", () => {
    prevItem();
  });
  nextBtn.addEventListener("click", () => {
    nextItem();
  });

  kKao4Drag({
    containerEl,
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
      if (prevIndex !== activeIndex) {
        onSlideChange(activeIndex);
      }
      prevIndex = activeIndex;
      const tl = gsap.timeline({});
      tl.addLabel("root");
      tl.to(
        items[activeIndex],
        {
          x: initialDistance1,
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
          x: initialDistance2,
          autoAlpha: speed / 2000,
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
        { x: initialDistance3, autoAlpha: 0, duration: speed / 1000, ease: "power1.inOut" },
        "root"
      );
    }
  }

  function nextItem() {
    if (!isAnimating) {
      activeIndex = Math.min(activeIndex + 1, items.length - 1);
      if (prevIndex !== activeIndex) {
        onSlideChange(activeIndex);
      }
      prevIndex = activeIndex;
      const tl = gsap.timeline({});
      tl.addLabel("root");
      tl.to(
        items[activeIndex - 1],
        {
          x: initialDistance0,
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
          x: initialDistance1,
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
          { x: initialDistance2, autoAlpha: speed / 2000, duration: speed / 1000, ease: "power1.inOut" },
          "root"
        );
      }
    }
  }
}
