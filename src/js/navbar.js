import { gsap } from "gsap";

let prevScroll = window.pageYOffset;

const tl = gsap.timeline();

tl.from(".header", {
  height: "0vh",
  duration: 0.5,
})
  .from(".header__nav", {
    opacity: "0",
    delay: 0.1,
  })
  .from(".big-icon", {
    opacity: "0",
    delay: 0.1,
    duration: 0.6,
  })
  .to(".header", {
    height: "60vh",
  })
  .from(".about-item", {
    opacity: 0,
    delay: "-1",
    duration: 0.3,
    stagger: 0.2,
  });

gsap.from("main", {
  opacity: "0",
  delay: 0.8,
});
gsap.from("footer", {
  opacity: "0",
  delay: 0.8,
});

gsap.from(".top-products", {
  backgroundSize: 0,
  duration: 1,
  delay: 1,
});

window.onscroll = function () {
  let currentScroll = window.pageYOffset;

  if (prevScroll > currentScroll) {
    document.querySelector(".header__nav").style.top = 0;
  } else {
    document.querySelector(".header__nav").style.top = "-100px";
  }
  prevScroll = currentScroll;
};