import welcome from './welcome';
import surah from './surah';
import search from './search';

const controllers = [
  welcome, surah, search,
];

export default (router, container) => controllers.forEach(f => f(router, container));
