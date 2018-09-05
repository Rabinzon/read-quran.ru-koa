import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import './styles/base.scss';

const selectors = {
  ayat: '.ayat',
  toTop: '.js-to-top-btn',
};

const $window = $(window);
let $bodyHtml = null;

const scrollToAnchor = (scrollTop = 0) => {
  $bodyHtml.animate({ scrollTop }, 1000);
};

let prevScrollPos = false;

const onScroll = () => {
  const { pathname } = window.location;
  const { scrollY, innerHeight } = window;
  if (pathname === '/' || innerHeight > scrollY) {
    return;
  }

  if (prevScrollPos <= scrollY) {
    $(selectors.toTop).addClass('d-none');
  } else {
    $(selectors.toTop).removeClass('d-none');
  }
  prevScrollPos = scrollY;
};

const scrollByHash = () => {
  const { hash } = window.location;
  const $block = $(hash);

  if ($block.length) {
    $block.addClass('selected');
    scrollToAnchor($block.offset().top - 70);
  }
};

const render = () => {
  scrollByHash();
  $bodyHtml = $('body, html');
  $(selectors.toTop).on('click', () => scrollToAnchor());
  $window.on('scroll', onScroll);
};

$(() => {
  render();
  $('[data-toggle="tooltip"]').tooltip();
});
