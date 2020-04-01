// var intersect = new IntersectionObserver(e => { if(e[0].isIntersecting) { console.log(e[0]) }}, { threshold: 0.5, rootMargin: '0px'});
// intersect.observe(document.querySelector('.b'))

let mouse = document.querySelector(".mouse"),
  header = document.querySelector("header");
document.addEventListener("mousemove", event => {
  mouse.style.top = event.pageY + "px";
  mouse.style.left = event.pageX + "px";
});
document.addEventListener("mousedown", () => {
  mouse.classList.add("mouse-down");
});
document.addEventListener("mouseup", () => {
  mouse.classList.remove("mouse-down");
});
document.querySelector(".ham-menu").addEventListener(
  "click",
  event => {
    let classList = event.target.classList;
    if (classList.contains("active")) {
      classList.remove("active");
      header.classList.remove('active');
    } else {
      classList.add("active");
      header.classList.add('active');
    }
  },
  false
);
