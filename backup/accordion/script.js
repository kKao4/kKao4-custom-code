function init() {
  kKao4Accordion({
    el: ".heading-table .content-container",
    toggleEl: ".heading-table .toggle-btn",
    openAfterInit: true,
    onShow: () => {
      console.log("show");
    },
    onHide: () => {
      console.log("hide");
    },
  });
}

window.addEventListener("DOMContentLoaded", init);
