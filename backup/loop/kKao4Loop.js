// Author: kKao4

function kKao4Loop({ speed = 4000, hoverSlow = 0.4, containerEl, itemEl } = {}) {
  const itemsContainer = document.querySelector(containerEl);
  const items = document.querySelectorAll(itemEl);
  let animationLength = 0;
  items.forEach((item) => {
    animationLength +=
      parseFloat(item.offsetWidth) +
      parseFloat(window.getComputedStyle(item).marginLeft) +
      parseFloat(window.getComputedStyle(item).marginRight);
  });
  const requireLength =
    items.length === 1
      ? window.innerWidth +
        (parseFloat(items[0].offsetWidth) +
          parseFloat(window.getComputedStyle(items[0]).marginLeft) +
          parseFloat(window.getComputedStyle(items[0]).marginRight)) *
          2
      : window.innerWidth +
        parseFloat(items[0].offsetWidth) +
        parseFloat(window.getComputedStyle(items[0]).marginLeft) +
        parseFloat(window.getComputedStyle(items[0]).marginRight) +
        (items.length > 1
          ? parseFloat(items[1].offsetWidth) +
            parseFloat(window.getComputedStyle(items[1]).marginLeft) +
            parseFloat(window.getComputedStyle(items[1]).marginRight)
          : 0);
  if (animationLength <= requireLength) {
    const t = Math.ceil(requireLength / animationLength);
    for (let i = 0; i < t - 1; i++) {
      items.forEach((item) => {
        const newItem = item.cloneNode(true);
        itemsContainer.appendChild(newItem);
      });
    }
    animationLength *= t;
  }
  const animationDuration = (speed * document.querySelectorAll(itemEl).length) / 1000;
  const tween = gsap.to(itemsContainer, {
    x: `-${animationLength}px`,
    duration: animationDuration,
    ease: "none",
  });
  itemsContainer.addEventListener("mouseenter", () => {
    tween.timeScale(hoverSlow);
    itemsContainer.addEventListener("mouseleave", () => {
      tween.timeScale(1);
    });
  });
  gsap.ticker.add(() => {
    const item = document.querySelectorAll(itemEl)[0];
    if (Math.abs(parseFloat(item.getBoundingClientRect().left)) >=  abs(parseFloat(item.offsetWidth))) {
      const progressDecrease =
        (parseFloat(item.offsetWidth) +
          parseFloat(window.getComputedStyle(item).marginLeft) +
          parseFloat(window.getComputedStyle(item).marginRight)) /
        animationLength;
      const newItem = item.cloneNode(true);
      itemsContainer.removeChild(item);
      itemsContainer.appendChild(newItem);
      tween.progress(tween.progress() - progressDecrease);
    }
  });
}
