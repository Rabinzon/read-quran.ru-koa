module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Surahs', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    chronology: {
      type: Sequelize.INTEGER,
    },
  }),
  down: queryInterface => queryInterface.dropTable('Surahs'),
};
