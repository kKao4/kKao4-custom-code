function init() {
  // SECTION: config
  gsap.config({
    units: { left: "rem", top: "rem", right: "rem", bottom: "rem", x: "rem", y: "rem", width: "rem", height: "rem" },
  });

  // NOTE: gsap default animation config
  gsap.defaults({ repeat: -1, repeatDelay: 0.8, ease: "power2.inOut", yoyo: true, duration: 0.8 });

  // NOTE: register effects
  gsap.registerEffect({
    name: "movingRight",
    effect: (targets, config) => {
      return gsap.to(targets, { x: config.x, duration: config.duration });
    },
    defaults: { x: "+=12", repeat: -1, repeatDelay: 0.8, ease: "power2.inOut", yoyo: true, duration: 0.8 },
    extendedTimeline: true,
  });

  // SECTION: animation

  // NOTE: function-based values
  // gsap.to(".box", {
  //   x: function (i, target, targets) {
  //     return 12 * i + 12;
  //   },
  // });

  // NOTE: random values
  gsap.to(".box.purple", {
    x: "random(-20, 20)",
    repeatRefresh: true,
  });

  // NOTE: relative values
  gsap.effects.movingRight(".box.green");

  // NOTE: tween
  const tween = gsap.to(".box.blue", { x: 32, rotation: 360, duration: 1.2, ease: "power2.inOut" });

  document.querySelector("#play").addEventListener("click", function () {
    tween.timeScale(tween.timeScale() || 0.1).play();
  });
  document.querySelector("#pause").addEventListener("click", function () {
    tween.pause();
  });
  document.querySelector("#resume").addEventListener("click", function () {
    tween.resume();
  });
  document.querySelector("#reverse").addEventListener("click", function () {
    tween.reverse();
  });
  document.querySelector("#restart").addEventListener("click", function () {
    tween.restart();
  });
  document.querySelector("#timeScale").addEventListener("click", function () {
    tween.timeScale(0);
  });
}

window.addEventListener("DOMContentLoaded", init);
