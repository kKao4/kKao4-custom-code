// Author: kKao4

function kKao4Drag({ containerEl, onDrop }) {
  const element = typeof containerEl === "string" ? document.querySelector(containerEl) : containerEl;
  let isDragging = false;
  let startX, startY, endX, endY;
  element.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });
  function onMouseMove(e) {
    if (isDragging) {
      endX = e.clientX;
      endY = e.clientY;
    }
  }
  function onMouseUp() {
    if (isDragging) {
      isDragging = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      const distanceX = endX - startX;
      const distanceY = endY - startY;
      onDrop(distanceX, distanceY);
    }
  }
}
