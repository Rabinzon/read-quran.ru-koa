const krac = require('../data/krac');
const kuliev = require('../data/kuliev');

const preparedKrac = krac.map(t => ({ ...t, translator: 'krachkovsky' }));
const preparedKuliev = kuliev.map(t => ({ ...t, translator: 'kuliev' }));

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Ayats', [...preparedKrac, ...preparedKuliev], {}),

  down: queryInterface => queryInterface.bulkDelete('Ayats', null, {}),
};
