// Author: kKao4

function kKao4RoundDecoScaleButton({ buttonEl, decoEl }) {
  const buttons = document.querySelectorAll(buttonEl);
  buttons.forEach((btn) => {
    const buttonRoundDeco = btn.querySelector(decoEl);
    const buttonRoundDecoWidth = parseFloat(buttonRoundDeco.offsetWidth);
    const btnWidth = parseFloat(btn.offsetWidth);
    const scaleMultiply = (btnWidth / buttonRoundDecoWidth) * 2.5;
    const fnc = (e) => {
      const rect = btn.getBoundingClientRect();
      const rectBtnX = rect.left;
      const rectBtnY = rect.top;
      buttonRoundDeco.style.left =
        parseFloat(e.clientX) - parseFloat(rectBtnX) - parseFloat(buttonRoundDeco.offsetWidth / 2) + "px";
      buttonRoundDeco.style.top =
        parseFloat(e.clientY) - parseFloat(rectBtnY) - parseFloat(buttonRoundDeco.offsetHeight / 2) + "px";
    };
    btn.addEventListener("mouseenter", () => {
      buttonRoundDeco.style.transform = `scale(${scaleMultiply})`;
      window.addEventListener("mousemove", fnc);
    });
    btn.addEventListener("mouseleave", () => {
      buttonRoundDeco.style.transform = "scale(0)";
      window.removeEventListener("mousemove", fnc);
    });
  });
}
