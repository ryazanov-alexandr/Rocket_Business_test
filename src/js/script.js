import hamburger from './modules/hamburger';
import slider from './modules/slider';
import form from './modules/form';
import modal from './modules/modal';
import scrollTop from './modules/scrolltop';

window.addEventListener('DOMContentLoaded', () => {
    hamburger();
    slider('.slider__wrapper');
    form('form');
    modal('[data-modal]', '.modal');
    scrollTop();
});
  