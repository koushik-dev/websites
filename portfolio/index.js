const docElem = document.documentElement;
let activePage = 1;

function changePage(index, fromTop) {
  changeSelectedHeader(index);
  fromTop && changeSelectedFooter(index);
  changeContent(index);
  activePage = index;
}

function changeSelectedHeader(index) {
  let color,
    elem = docElem.querySelectorAll(".hero__header__links li")[index - 1];
  elem.classList.add("active");
  color = "--" + elem.getAttribute("data-color");
  docElem
    .querySelectorAll(".hero__header__links li")
    [activePage - 1].classList.remove("active");
  docElem.style.setProperty("--selected-tab", index * 25 + "%");
  docElem.style.setProperty(
    "--theme-color",
    getComputedStyle(docElem).getPropertyValue(color)
  );
}

function changeSelectedFooter(index) {
  docElem
    .querySelector(".hero__footer__buttons")
    .children[index - 1].querySelector("input").checked = !0;
}

function changeContent(index) { // ISSUE: Same Tab Click Again
  let tl = gsap.timeline();
  tl.to(".hero__section main:nth-child(" + activePage + ")", {
      duration: 0.5,
      height: "0%",
    })
    .to(".hero__section main:nth-child(" + activePage + ")", {
      duration: 0,
      display: "none",
    })
    .to(".hero__section main:nth-child(" + index + ")", {
      duration: 1,
      display: "grid",
      height: "100%",
    });
}
