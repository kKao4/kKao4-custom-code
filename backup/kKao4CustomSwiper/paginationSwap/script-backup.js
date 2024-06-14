function init() {
  const slidesPerViewAndGroup = 4;
  const swiperBanner = new Swiper(".swiper-banner", {
    speed: 800,
    slidesPerView: slidesPerViewAndGroup,
    spaceBetween: (window.innerWidth / 100) * 1.17,
    slidesPerGroup: slidesPerViewAndGroup,
    loop: true,
  });

  const paginationContainer = document.querySelector(".swiper-banner-pagination-container");

  // render all pagination bars
  swiperBanner.slides.forEach((item, i) => {
    if ((i + 1) % slidesPerViewAndGroup === 0) {
      paginationContainer.innerHTML += `<div class="swiper-banner-pagination-bar pagination-bar-${Math.floor(
        i / slidesPerViewAndGroup
      )}"></div>`;
    }
  });
  const bars = document.querySelectorAll(".swiper-banner-pagination-bar");
  const totalBars = bars.length;
  // set first pagination bar active
  bars[0].style.backgroundColor = "#262626";
  let previousActiveBar = 0;
  let activeBar = 0;
  swiperBanner.on("realIndexChange", (swiper) => {
    activeBar = swiper.realIndex / slidesPerViewAndGroup;
    if (previousActiveBar === totalBars - 1 && activeBar === 0) {
      const bar1 = document.querySelector(`.pagination-bar-${totalBars - 1}`);
      if (bar1) {
        const bar1MarginLeft = parseFloat(window.getComputedStyle(bar1).getPropertyValue("margin-left"));
        const distanceBar = bar1MarginLeft;
        const tl = gsap.timeline({});
        const translateBar1 = parseFloat(paginationContainer.offsetWidth) - parseFloat(bar1.offsetWidth);
        // active bar
        tl.to(bar1, {
          x: `-${translateBar1}px`,
          backgroundColor: "#262626",
          duration: 0.8,
        });
        // normal bars
        bars.forEach((bar, i) => {
          const translateBar = distanceBar + bar.offsetWidth;
          if (i !== totalBars - 1) {
            tl.to(
              bar,
              {
                x: `${translateBar}px`,
                backgroundColor: "#ececec",
              },
              "<"
            );
          }
        });
        // normal bars
        bars.forEach((bar, i) => {
          tl.set(bar, {
            x: 0,
            backgroundColor: i === 0 ? "#262626" : "#ececec",
          });
        });
      }
    } else if (previousActiveBar === 0 && activeBar === totalBars - 1) {
      const bar1 = document.querySelector(`.pagination-bar-0`);
      const translateBar1 = parseFloat(paginationContainer.offsetWidth) - parseFloat(bar1.offsetWidth);
      const distanceBar = parseFloat(window.getComputedStyle(bars[activeBar]).getPropertyValue("margin-left"));
      const tl = gsap.timeline({});
      tl.to(bar1, {
        x: `${translateBar1}px`,
        backgroundColor: "#262626",
        duration: 0.8,
      });
      bars.forEach((bar, i) => {
        if (i !== 0) {
          const translateBar = distanceBar + bar.offsetWidth;
          tl.to(
            bar,
            {
              x: `-${translateBar}px`,
              backgroundColor: "#ececec",
              duration: 0.8,
            },
            "<"
          );
        }
      });
      tl.set(bar1, {
        x: 0,
        backgroundColor: "#ececec",
      });
      bars.forEach((bar, i) => {
        tl.set(bar, { x: 0, backgroundColor: i === totalBars - 1 ? "#262626" : "#ececec" });
      });
    } else if (previousActiveBar < activeBar) {
      const bar1 = document.querySelector(`.pagination-bar-${activeBar - 1}`);
      const bar2 = document.querySelector(`.pagination-bar-${activeBar}`);
      if (bar1 && bar2) {
        const bar1MarginLeft = parseFloat(window.getComputedStyle(bar1).getPropertyValue("margin-left"));
        const bar2MarginLeft = parseFloat(window.getComputedStyle(bar2).getPropertyValue("margin-left"));
        const distanceBar = bar1MarginLeft === 0 ? bar2MarginLeft : bar1MarginLeft;
        const tl = gsap.timeline({});

        if (activeBar - 1 >= 0) {
          const translateBar1 = distanceBar + bar1.offsetWidth;
          const translateBar2 = distanceBar + bar2.offsetWidth;
          // active bar
          tl.to(bar1, {
            x: `${translateBar1}px`,
            backgroundColor: "#262626",
            duration: 0.8,
          });
          // normal bar
          tl.to(
            bar2,
            {
              x: `-${translateBar2}px`,
              duration: 0.8,
            },
            "<"
          );
          // normal bars
          bars.forEach((bar, i) => {
            if (i !== activeBar) {
              tl.set(bar, {
                x: 0,
                backgroundColor: "#ececec",
              });
            }
          });
          // active bar
          tl.set(
            bar2,
            {
              x: 0,
              backgroundColor: "#262626",
            },
            "<"
          );
        }
      }
    } else if (previousActiveBar > activeBar) {
      const bar1 = document.querySelector(`.pagination-bar-${activeBar}`);
      const bar2 = document.querySelector(`.pagination-bar-${activeBar === totalBars - 1 ? 0 : activeBar + 1}`);
      if (bar1 && bar2) {
        const bar1MarginLeft = parseFloat(window.getComputedStyle(bar1).getPropertyValue("margin-left"));
        const bar2MarginLeft = parseFloat(window.getComputedStyle(bar2).getPropertyValue("margin-left"));
        const distanceBar = bar1MarginLeft === 0 ? bar2MarginLeft : bar1MarginLeft;
        const tl = gsap.timeline({});
        if (activeBar !== totalBars - 1) {
          const translateBar1 = distanceBar + bar1.offsetWidth;
          const translateBar2 = distanceBar + bar2.offsetWidth;
          // normal bars
          tl.to(bar1, {
            x: `${translateBar1}px`,
            backgroundColor: "#ececec",
            duration: 0.8,
          });
          // active bar
          tl.to(
            bar2,
            {
              x: `-${translateBar2}px`,
              backgroundColor: "#262626",
              duration: 0.8,
            },
            "<"
          );
          // active bar
          tl.set(bar1, {
            x: 0,
            backgroundColor: "#262626",
          });
          // normal bar
          bars.forEach((bar, i) => {
            if (i !== activeBar) {
              tl.set(
                bar,
                {
                  x: 0,
                  backgroundColor: "#ececec",
                },
                "<"
              );
            }
          });
        }
      }
    }
  });
  swiperBanner.on("beforeTransitionStart", (swiper) => {
    previousActiveBar = swiper.realIndex / 4;
  });
}

window.addEventListener("DOMContentLoaded", init);
