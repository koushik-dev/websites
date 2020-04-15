function opener() {
  gsap
    .timeline()
    .add("open")
    .to(".hero__opener__left", {
      keyframes: [
        {
          width: 0
        },
        {
          display: "none",
          delay: 1
        }
      ]
    })
    .to(
      ".hero__opener__right",
      {
        keyframes: [
          {
            width: 0
          },
          {
            display: "none",
            delay: 1
          }
        ]
      },
      "open"
    )
    .to(
      ".hero__opener__text",
      {
        keyframes: [
          {
            y: "-100%",
            duration: 1,
            opacity: 0
          },
          {
            display: "none",
            delay: 1
          }
        ]
      },
      "open"
    )
    .to('.hero__opener', {
        display: 'none'
    });
}
