const surahs = require('../data/surahs');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Surahs', surahs, {}),

  down: queryInterface => queryInterface.bulkDelete('Surahs', null, {}),
};
