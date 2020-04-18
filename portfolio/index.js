function selectedTab(index, fromTop) {
  const docElem = document.documentElement;
  let color;
  docElem.querySelectorAll('.hero__header__links li').forEach((el, i) => {
    if (i + 1 === index) {
      el.classList.add('active');
      color = "--" + el.getAttribute('data-color')
    } else {
      el.classList.remove('active');
    }
  });
  fromTop && (docElem.querySelector('.hero__footer__buttons').children[index - 1].querySelector("input").checked = !0);
  docElem.style.setProperty('--selected-tab', (index * 25) + '%')
  docElem.style.setProperty('--theme-color', getComputedStyle(docElem).getPropertyValue(color))
}