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
      const el = create("div"), leftArrow = create('a'), rightArrow = create('a');
      el.className = "timeline-container";
      leftArrow.className = 'left-arrow';
      rightArrow.className = 'right-arrow';
      addArrowEvent(leftArrow);
      addArrowEvent(rightArrow);
      el.append(leftArrow);
      el.append(createDots(data));
      el.append(createSlides(data));
      el.append(rightArrow);
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
        cont.append(createTemplate(data[i]));

        scroller.append(cont);
      }
      container.append(scroller);
      return container;
    }

    function createTemplate(data) {
      const container = create('div'),
      title = create('h1'),
      company = create('span'), year = create('span');
      container.className = "template";

      year.className = "m-year"; // mobile year display
      year.textContent = data.year;

      title.className = "template__title";
      title.textContent = data.title;

      company.className = "template__company";
      company.textContent = data.company;

      container.append(title);
      container.append(company);
      container.append(year);

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

      const div = create('div');
      div.style.width = '70%';
      div.append(dots);
      line.append(div);
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

    function addArrowEvent(arrow) {
      arrow.addEventListener('click', (e) => {
        let buffer = 0;
        if(e.target.classList.contains('left-arrow')) {
          buffer = -1;
        } else {
          buffer = 1;
        }
        let dots = document.querySelectorAll('.line__dots'), activeIndex = parseInt([...dots].filter(e => e.classList.contains('active'))[0].getAttribute('data-dot')) + buffer;
        activeIndex === dots.length && (activeIndex = 0);
        activeIndex === -1 && (activeIndex = dots.length - 1);
        const el = dots[activeIndex]
        removeActive();
        addActive(el);
        scrollContainer(el.getAttribute("data-dot"));
      });
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
      const scroller = document.querySelector(".content-scroller"), width = parseInt(getComputedStyle(document.querySelector('.content')).width) + 10; // 10 for margin-left
      scroller.style.left = -(index * width) + "px";
    }
  }
})();
