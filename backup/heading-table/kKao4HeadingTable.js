// Author: kKao4

function kKao4HeadingTable({ el, headingsEl, isGsapSmoothScroll = false, headingLevels = [2, 3, 4, 5, 6] }) {
  const contentsContainer = document.querySelector(el);

  headingLevels.forEach((level) => {
    document.querySelectorAll(`${headingsEl} h${level}`).forEach((heading) => {
      heading.classList.add("heading");
    });
  });

  const globalHeadings = Array.from(document.querySelectorAll(`${headingsEl} .heading`));
  const allHeadings = [];
  let currentLevel = {};

  const createHeadingObject = (heading, level) => {
    const newHeading = { element: heading, children: [] };
    if (level === 2) {
      allHeadings.push(newHeading);
    } else {
      const parent = currentLevel[level - 1];
      if (parent) {
        parent.children.push(newHeading);
      }
    }
    currentLevel[level] = newHeading;
  };

  globalHeadings.forEach((heading) => {
    const level = parseInt(heading.tagName.toLowerCase().replace("h", ""), 10);
    if (headingLevels.includes(level)) {
      createHeadingObject(heading, level);
    }
  });

  const createHeadingHTML = (heading, level, indexPrefix) => `
    <button class="heading-${level}" data-index="${globalHeadings.indexOf(heading.element)}">
      <span class="list-num">${indexPrefix}</span>${heading.element.textContent}
    </button>
    ${heading.children.map((child, idx) => createHeadingHTML(child, level + 1, `${indexPrefix}.${idx + 1}`)).join("")}
  `;

  contentsContainer.innerHTML = allHeadings.map((heading, i) => createHeadingHTML(heading, 2, `${i + 1}`)).join("");

  contentsContainer.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = btn.getAttribute("data-index");
      const heading = globalHeadings[index];
      if (isGsapSmoothScroll) {
        gsap.to(window, { scrollTo: { y: heading, duration: 1.2 } });
      } else {
        heading.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}
