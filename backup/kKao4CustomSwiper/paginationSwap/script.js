class kKao4PaginationSwapSwiper {
  constructor(className, options, swiperOptions) {
    this.className = className.startsWith(".") ? className.slice(1) : className;
    this.slidesPerViewAndGroup = options.slidesPerViewAndGroup;
    this.activeStyle = options.activeStyle;
    this.normalStyle = options.normalStyle;
    this.swiperOptions = swiperOptions;
    this.previousActiveBar = 0;
    this.activeBar = 0;
    return this.init();
  }

  init() {
    const { slidesPerViewAndGroup, activeStyle, normalStyle } = this;
    const swiper = new Swiper(`.${this.className}`, this.swiperOptions);

    const paginationContainer = document.querySelector(`.${this.className}-pagination-container`);
    paginationContainer.innerHTML = ""; // Reset pagination container

    // render all pagination bars
    swiper.slides.forEach((item, i) => {
      if ((i + 1) % parseFloat(slidesPerViewAndGroup) === 0) {
        paginationContainer.innerHTML += `<div class="${this.className}-pagination-bar ${
          this.className
        }-pagination-bar-${Math.floor(i / slidesPerViewAndGroup)}"></div>`;
      }
    });

    const bars = document.querySelectorAll(`.${this.className}-pagination-bar`);
    const totalBars = bars.length;

    // set first pagination bar active
    for (const key in activeStyle) {
      bars[0].style[key] = activeStyle[key];
    }

    swiper.on("realIndexChange", (swiper) => {
      this.handleRealIndexChange(
        swiper,
        bars,
        totalBars,
        paginationContainer,
        slidesPerViewAndGroup,
        activeStyle,
        normalStyle
      );
    });

    swiper.on("beforeTransitionStart", (swiper) => {
      this.previousActiveBar = swiper.realIndex / slidesPerViewAndGroup;
    });

    return swiper;
  }

  handleRealIndexChange(swiper, bars, totalBars, paginationContainer, slidesPerViewAndGroup, activeStyle, normalStyle) {
    this.activeBar = Math.round(swiper.realIndex / slidesPerViewAndGroup);

    if (this.previousActiveBar === totalBars - 1 && this.activeBar === 0) {
      this.handleTransitionEnd(totalBars - 1, 0, bars, paginationContainer, activeStyle, normalStyle, true);
    } else if (this.previousActiveBar === 0 && this.activeBar === totalBars - 1) {
      this.handleTransitionEnd(0, totalBars - 1, bars, paginationContainer, activeStyle, normalStyle, false);
    } else if (this.previousActiveBar < this.activeBar) {
      this.handleNextSlide(bars, this.activeBar, activeStyle, normalStyle);
    } else if (this.previousActiveBar > this.activeBar) {
      this.handlePrevSlide(bars, this.activeBar, totalBars, activeStyle, normalStyle);
    }
  }

  handleTransitionEnd(prevIndex, newIndex, bars, paginationContainer, activeStyle, normalStyle, isReverse) {
    const bar1 = document.querySelector(`.${this.className}-pagination-bar-${prevIndex}`);
    const bar2 = document.querySelector(`.${this.className}-pagination-bar-${newIndex}`);
    const distanceBar =
      parseFloat(window.getComputedStyle(bar1).getPropertyValue("margin-left")) === 0
        ? parseFloat(window.getComputedStyle(bar2).getPropertyValue("margin-left"))
        : parseFloat(window.getComputedStyle(bar1).getPropertyValue("margin-left"));
    const tl = gsap.timeline({});
    const translateBar1 = parseFloat(paginationContainer.offsetWidth) - parseFloat(bar1.offsetWidth);

    // active bar
    tl.to(bar1, {
      x: isReverse ? `-${translateBar1}px` : `${translateBar1}px`,
      ...activeStyle,
      duration: 0.8,
    });

    // normal bars
    bars.forEach((bar, i) => {
      const translateBar = distanceBar + bar.offsetWidth;
      if (i !== prevIndex) {
        tl.to(
          bar,
          {
            x: isReverse ? `${translateBar}px` : `-${translateBar}px`,
            ...normalStyle,
          },
          "<"
        );
      }
    });

    // reset bars
    bars.forEach((bar, i) => {
      tl.set(bar, {
        x: 0,
        ...(i === newIndex ? activeStyle : normalStyle),
      });
    });
  }

  handleNextSlide(bars, activeBar, activeStyle, normalStyle) {
    const bar1 = document.querySelector(`.${this.className}-pagination-bar-${activeBar - 1}`);
    const bar2 = document.querySelector(`.${this.className}-pagination-bar-${activeBar}`);
    if (bar1 && bar2) {
      const bar1MarginLeft = parseFloat(window.getComputedStyle(bar1).getPropertyValue("margin-left"));
      const bar2MarginLeft = parseFloat(window.getComputedStyle(bar2).getPropertyValue("margin-left"));
      const distanceBar = bar1MarginLeft === 0 ? bar2MarginLeft : bar1MarginLeft;
      const tl = gsap.timeline({});

      if (activeBar - 1 >= 0) {
        const translateBar1 = distanceBar + bar1.offsetWidth;
        const translateBar2 = distanceBar + bar2.offsetWidth;

        tl.to(bar1, {
          x: `${translateBar1}px`,
          ...activeStyle,
          duration: 0.8,
        });

        tl.to(
          bar2,
          {
            x: `-${translateBar2}px`,
            ...normalStyle,
            duration: 0.8,
          },
          "<"
        );

        bars.forEach((bar, i) => {
          if (i !== activeBar) {
            tl.set(bar, {
              x: 0,
              ...normalStyle,
            });
          }
        });

        tl.set(
          bar2,
          {
            x: 0,
            ...activeStyle,
          },
          "<"
        );
      }
    }
  }

  handlePrevSlide(bars, activeBar, totalBars, activeStyle, normalStyle) {
    const bar1 = document.querySelector(`.${this.className}-pagination-bar-${activeBar}`);
    const bar2 = document.querySelector(
      `.${this.className}-pagination-bar-${activeBar === totalBars - 1 ? 0 : activeBar + 1}`
    );
    if (bar1 && bar2) {
      const bar1MarginLeft = parseFloat(window.getComputedStyle(bar1).getPropertyValue("margin-left"));
      const bar2MarginLeft = parseFloat(window.getComputedStyle(bar2).getPropertyValue("margin-left"));
      const distanceBar = bar1MarginLeft === 0 ? bar2MarginLeft : bar1MarginLeft;
      const tl = gsap.timeline({});
      if (activeBar !== totalBars - 1) {
        const translateBar1 = distanceBar + bar1.offsetWidth;
        const translateBar2 = distanceBar + bar2.offsetWidth;

        tl.to(bar1, {
          x: `${translateBar1}px`,
          ...normalStyle,
          duration: 0.8,
        });

        tl.to(
          bar2,
          {
            x: `-${translateBar2}px`,
            ...activeStyle,
            duration: 0.8,
          },
          "<"
        );

        tl.set(bar1, {
          x: 0,
          ...activeStyle,
        });

        bars.forEach((bar, i) => {
          if (i !== activeBar) {
            tl.set(
              bar,
              {
                x: 0,
                ...normalStyle,
              },
              "<"
            );
          }
        });
      }
    }
  }
}
