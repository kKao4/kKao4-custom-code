function init() {
  gsap.registerPlugin(GSDevTools);

  const boxes = gsap.utils.toArray(".box");
  const box1 = document.querySelector(".box.green");
  const box2 = document.querySelector(".box.purple");
  const box3 = document.querySelector(".box.blue");

  // SECTION: config
  gsap.config({
    units: { left: "rem", top: "rem", right: "rem", bottom: "rem", x: "rem", y: "rem", width: "rem", height: "rem" },
  });

  // NOTE: gsap default animation config
  gsap.defaults({ repeatDelay: 0.8, ease: "power2.inOut", yoyo: true, duration: 0.8 });

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
  gsap.to(boxes, {
    x: function (i, target, targets) {
      return 12 * i + 12;
    },
  });

  // NOTE: random values
  // gsap.to(box2, {
  //   x: "random(-20, 20)",
  //   repeatRefresh: true,
  // });

  // NOTE: relative values
  // gsap.effects.movingRight(box1);

  // NOTE: tween
  // const tween = gsap.to(box3, { x: 32, rotation: 360, duration: 1.2, ease: "power2.inOut" });

  // document.querySelector("#play").addEventListener("click", function () {
  //   tween.timeScale(tween.timeScale() || 0.1).play();
  // });
  // document.querySelector("#pause").addEventListener("click", function () {
  //   tween.pause();
  // });
  // document.querySelector("#resume").addEventListener("click", function () {
  //   tween.resume();
  // });
  // document.querySelector("#reverse").addEventListener("click", function () {
  //   tween.reverse();
  // });
  // document.querySelector("#restart").addEventListener("click", function () {
  //   tween.restart();
  // });
  // document.querySelector("#timeScale").addEventListener("click", function () {
  //   tween.timeScale(0);
  // });

  // NOTE: modifiers
  // gsap.to(box1, {
  //   x: "+=12",
  //   modifiers: {
  //     x: function (x) {
  //       console.log(x);
  //       return x;
  //     },
  //   },
  //   duration: 0.8,
  //   repeat: -1,
  // });

  // NOTE: snap
  // gsap.to(box2, {
  //   x: "+=24",
  //   rotation: 360,
  //   duration: 2.4,
  //   snap: {
  //     rotation: 45,
  //   },
  //   repeat: -1,
  // });

  // NOTE: timeline
  // const tl = gsap.timeline({ ease: "power2.out", repeat: -1 });
  // tl.addLabel("root");
  // const tween1 = gsap.to(box1, { x: "+=18", duration: 0.8, id: "green" });
  // const tween2 = gsap.to(box2, { x: "+=18", duration: 1.6, id: "purple" });
  // const tween3 = gsap.to(box3, { x: "+=18", duration: 2.4, id: "blue" });

  // tl.add(tween1).add(tween2, "<25%").add(tween3, "<+=25%");
  // tl.call(
  //   () => {
  //     console.log("call");
  //   },
  //   [],
  //   "root+=1"
  // );
  // document.querySelector("#clear").addEventListener("click", function () {
  //   tl.clear();
  // });
  // GSDevTools.create({ animation: tl, visibility: "auto" });

  // NOTE: clamp
  console.log(gsap.utils.clamp(-12, 24, 25)); // => 24
  console.log(gsap.utils.clamp(-12, 24, -13)); // => -12

  // NOTE: getUnit
  console.log(gsap.utils.getUnit("2rem"));

  // NOTE: interpolate
  gsap.to(".box.black", { x: "+=24", duration: 1.8, backgroundColor: gsap.utils.interpolate(["#000", "#fff"], 0.4) });

  // NOTE: mapRange
  console.log(gsap.utils.mapRange(-12, 24, 0, 100, 12)); // => 66.6667

  // NOTE: normalize
  console.log(gsap.utils.normalize(-12, 24, 12)); // => 0.6667

  // NOTE: pipe
  // without pipe()
  // var value1 = func1(input);
  // var value2 = func2(value1);
  // var output = func3(value2);
  // var output = func1(func2(func3(input)));
  // cleaner with pipe()
  // var transform = gsap.utils.pipe(func1, func2, func3);
  // var output = transform(input);

  // NOTE: random
  console.log(gsap.utils.random(0, 24, 4));
  const random = gsap.utils.random(0, 24, 4, true);
  console.log(random());

  // NOTE: snap
  console.log(gsap.utils.snap(4, 7)); // => 8
  console.log(gsap.utils.snap([4, 8, 12], 7)); // => 8
  console.log(gsap.utils.snap({ values: [4, 8, 12], radius: 2 }, 15)); // => 15

  // NOTE: split color
  console.log(gsap.utils.splitColor("red")); // => [255, 0, 0]
  console.log(gsap.utils.splitColor("#6fb936")); // => [111, 185, 54]
}

window.addEventListener("DOMContentLoaded", init);
