// Author: kKao4

function kKao4Accordion({ el, toggleEl, onShow, onHide, openAfterInit = false }) {
  const toggleHeadingTableButton = document.querySelector(toggleEl);
  const contentsContainer = document.querySelector(el);
  if (openAfterInit) {
    showAccordion();
  }
  toggleHeadingTableButton.addEventListener("click", () => {
    if (contentsContainer.style.maxHeight) {
      hideAccordion();
    } else {
      showAccordion();
    }
  });
  function showAccordion() {
    contentsContainer.style.maxHeight = contentsContainer.scrollHeight + "px";
    toggleHeadingTableButton.classList.add("show");
    onShow();
  }
  function hideAccordion() {
    contentsContainer.style.maxHeight = null;
    toggleHeadingTableButton.classList.remove("show");
    onHide();
  }
}
