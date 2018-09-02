module.exports = (sequelize, DataTypes) => {
  const Ayat = sequelize.define('Ayat', {
    text: {
      type: DataTypes.STRING(5000),
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
    },
    surah: {
      type: DataTypes.INTEGER,
    },
    chronology: {
      type: DataTypes.INTEGER,
    },
  }, { timestamps: false });

  Ayat.associate = () => {
  };
  return Ayat;
};
