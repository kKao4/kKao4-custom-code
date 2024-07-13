function init({ speed = 4000, hoverSlow = 0.4 } = {}) {
  const itemsContainer = document.querySelector(".loop-item-container");
  const items = document.querySelectorAll(".loop-item-container .loop-item");
  let animationLength = 0;
  items.forEach((item) => {
    animationLength += parseFloat(item.offsetWidth);
  });
  const animationDuration = (speed * items.length) / 1000;
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
    const item = document.querySelectorAll(".loop-item-container .loop-item")[0];
    if (Math.abs(parseFloat(item.getBoundingClientRect().left)) >= Math.abs(parseFloat(item.offsetWidth))) {
      const progressDecrease = parseFloat(item.offsetWidth) / animationLength;
      const newItem = item.cloneNode(true);
      itemsContainer.removeChild(item);
      itemsContainer.appendChild(newItem);
      tween.progress(tween.progress() - progressDecrease);
    }
  });
}

window.addEventListener("DOMContentLoaded", init);
