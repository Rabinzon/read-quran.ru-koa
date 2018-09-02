module.exports = (sequelize, DataTypes) => {
  const Surah = sequelize.define('Surah', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    chronology: {
      type: DataTypes.INTEGER,
    },
  }, { timestamps: false });

  Surah.associate = (models) => {
    models.Surah.hasMany(models.Ayat, { foreignKey: 'surah' });
  };
  return Surah;
};
