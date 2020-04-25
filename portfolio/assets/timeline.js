(function () {
  window.Timeline = function(selector, data) {
    const parent = document.querySelector(selector),
      create = document.createElement.bind(document);

    parent.append(createContent(data));

    // click the default active
    data.map((dot, index) => {
      if (dot.isActive) {
        document.querySelectorAll(".line__dots")[index].click();
        return;
      }
    });

    function createContent(data) {
      const el = create("div");
      el.className = "timeline-container";
      el.append(createDots(data));
      el.append(createSlides(data));
      return el;
    }

    function createSlides(data) {
      const len = data.length,
        container = create("div"),
        scroller = create("div");
      container.className = "content-container";
      scroller.className = "content-scroller";
      for (var i = 0; i < len; i++) {
        const cont = create("div");
        cont.className = "content";

        //create template

        scroller.append(cont);
      }
      container.append(scroller);
      return container;
    }

    function createDots(dotsData) {
      const len = dotsData.length,
        line = create("div"),
        dots = create("div"),
        container = create("div");
      line.className = "line";
      dots.className = "dots";
      container.className = "line-container";

      for (var i = 0; i < len; i++) {
        dots.append(createDot(i, dotsData[i].year));
      }

      line.append(dots);
      container.append(line);
      return container;
    }

    function createDot(index, label) {
      const el = create("article"),
        span = create("span");
      el.className = "line__dots";
      el.setAttribute("data-dot", index);

      span.className = "line__dots__label";
      span.textContent = label;
      el.append(span);
      addDotEvent(el);
      return el;
    }

    function addDotEvent(dot) {
      dot.addEventListener("click", (e) => {
        removeActive();
        addActive(e.target);
        scrollContainer(e.target.getAttribute("data-dot"));
      });
    }
    function addActive(el) {
      el.classList.add("active");
    }
    function removeActive() {
      document
        .querySelectorAll(".line__dots")
        .forEach((dot) => dot.classList.remove("active"));
    }
    function scrollContainer(index) {
      var container = document.querySelector(".dots"),
        dots = document.querySelectorAll(".line__dots"),
        dotWidth = dots[0].clientWidth,
        spaceWidth =
          (container.clientWidth - dots.length * dotWidth) / (dots.length - 1);
      container.style.left =
        "calc(50% - " +
        (spaceWidth * index + parseInt(index) * dotWidth) +
        "px)";

      scrollContent(index);
    }

    function scrollContent(index) {
      const scroller = document.querySelector(".content-scroller");
      scroller.style.left = -(index * 420) + "px"; // 420 width of the card.
    }
  }
})();
