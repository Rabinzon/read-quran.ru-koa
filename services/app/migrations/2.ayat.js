module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Ayats', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    text: {
      type: Sequelize.STRING(5000),
      allowNull: false,
    },
    order: {
      type: Sequelize.INTEGER,
    },
    surah: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      allowNull: false,
      references: {
        model: 'Surahs',
        key: 'id',
      },
    },
    chronology: {
      type: Sequelize.INTEGER,
    },
  }),
  down: queryInterface => queryInterface.dropTable('Ayats'),
};
