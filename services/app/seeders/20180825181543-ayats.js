const ayats = require('../data/ayats');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Ayats', ayats, {}),

  down: queryInterface => queryInterface.bulkDelete('Ayats', null, {}),
};
