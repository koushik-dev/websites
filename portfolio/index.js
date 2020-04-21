const docElem = document.documentElement;
let activePage = 1;

function changePage(index, fromTop) {
  if(index !== activePage) {
    changeSelectedHeader(index);
    fromTop && changeSelectedFooter(index);
    changeContent(index);
    activePage = index;
  }  
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

function changeContent(index) {
  let tl = gsap.timeline();
  tl.to('.hero__section main', {
    duration: 0,
    borderRadius: "0"
  })
  .to(".hero__section", {
    duration: 1,
    scrollTop: (index - 1) * parseInt(getComputedStyle(docElem.querySelector('main')).height),
  })
  .to('.hero__section main:nth-child(' + index + ')', {
    duration: 0.15,
    borderRadius: "50px 50px 0 0"
  });
}
