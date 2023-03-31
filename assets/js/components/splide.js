import Splide from '@splidejs/splide';

var sliders = document.querySelectorAll('.splide'),
  i = 0;

if (sliders) {
  for(i = 0; i < sliders.length; i += 1) {
    new Splide( sliders[i], {
        type   : 'loop',
        perPage: 1,
        focus: 'center',
        arrows: false,
        padding: { left: 280, right: 300 },
        breakpoints: {
          920: {
            perPage: 1,
            padding: { left: 160, right: 170 },
          },
          400: {
            padding: { left: 70, right: 60 },
          },
        }
      } ).mount();
  }
}