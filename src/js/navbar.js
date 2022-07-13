import { gsap } from 'gsap';

window.addEventListener('load', () => {
  let prevScroll = window.pageYOffset;

  const tl = gsap.timeline();

  tl.from('.header', {
    height: '0vh',
    duration: window.innerWidth > 790 ? 0.4 : 0.5,
  })
    .from('.header__nav', {
      opacity: '0',
      delay: 0.2,
    })
    .from('.big-icon', {
      opacity: '0',
      delay: 0.1,
      duration: 0.6,
    })
    .to('.header', {
      height: window.innerWidth > 810 ? '60vh' : '40vh',
      duration: window.innerWidth > 810 ? 0.5 : 0.6,
    })
    .to(
      '.big-icon',
      {
        bottom: window.innerWidth > 810 ? '20%' : '34%',
        delay: 0,
      },
      '<'
    )
    .to('.big-icon', {
      boxShadow: '3px 3px 4px #00000040',
      transform: 'translate(-3px, -3px)',

      duration: 0.2,
    })
    .from('.about-item', {
      opacity: 0,
      delay: '-1',
      duration: 0.3,
      stagger: 0.2,
    });

  gsap.from('main', {
    opacity: '0',
    delay: 0.6,
  });
  gsap.from('footer', {
    opacity: '0',
    delay: 0.6,
  });

  gsap.from('.top-products', {
    backgroundSize: 0,
    duration: 1,
    delay: 1,
  });
  window.onscroll = function () {
    let currentScroll = window.pageYOffset;

    // if (currentScroll == 0) {
    //   document.querySelector(".header__nav").style.background = "transparent";
    // }

    if (prevScroll > currentScroll) {
      document.querySelector('.header__nav').style.top = 0;
    } else {
      document.querySelector('.header__nav').style.top = '-100px';
    }
    prevScroll = currentScroll;
  };
});
