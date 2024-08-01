function init() {
  const toggleHeadingTableButton = document.querySelector(".heading-table .toggle-btn");

  kKao4HeadingTable({
    el: ".heading-table .content-container",
    headingsEl: ".content-post",
    isGsapSmoothScroll: false,
  });
  kKao4Accordion({
    el: ".heading-table .content-container",
    toggleEl: ".heading-table .toggle-btn",
    onShow: () => {
      toggleHeadingTableButton.style.transform = "none";
    },
    onHide: () => {
      toggleHeadingTableButton.style.transform = "rotate(180deg)";
    },
    openAfterInit: true,
  });
}

window.addEventListener("DOMContentLoaded", init);
