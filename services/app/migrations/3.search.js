const vectorName = '_search';

const searchObjects = {
  Ayats: ['text'],
};

module.exports = {
  up: queryInterface => (
    queryInterface.sequelize.transaction(t =>
      Promise.all(Object.keys(searchObjects).map(table =>
        console.log(`
                ALTER TABLE "${table}" DROP COLUMN ${vectorName};
              `) ||
        queryInterface.sequelize.query(`
          ALTER TABLE "${table}" ADD COLUMN ${vectorName} TSVECTOR;
        `, { transaction: t })
          .then(() =>
            console.log(table) ||
            queryInterface.sequelize.query(`
                UPDATE "${table}" SET ${vectorName} = to_tsvector('russian', ${searchObjects[table].join(" || ' ' || ")});
              `, { transaction: t })).then(() =>
            queryInterface.sequelize.query(`
                CREATE INDEX ${table}_search ON "${table}" USING gin(${vectorName});
              `, { transaction: t })).then(() =>
            queryInterface.sequelize.query(`
                CREATE TRIGGER ${table}_vector_update
                BEFORE INSERT OR UPDATE ON "${table}"
                FOR EACH ROW EXECUTE PROCEDURE tsvector_update_trigger(${vectorName}, 'pg_catalog.russian', ${searchObjects[table].join(', ')});
              `, { transaction: t }))
          .error(console.log))))
  ),

  down: queryInterface => (
    queryInterface.sequelize.transaction(t =>
      Promise.all(Object.keys(searchObjects).map(table =>
        queryInterface.sequelize.query(`
          DROP TRIGGER ${table}_vector_update ON ${table};
        `, { transaction: t })
          .then(() =>
            queryInterface.sequelize.query(`
                DROP INDEX ${table}_search;
              `, { transaction: t })).then(() =>
            queryInterface.sequelize.query(`
                ALTER TABLE "${table}" DROP COLUMN ${vectorName};
              `, { transaction: t })))))
  ),
};
// SELECT * FROM "Ayats" WHERE _search @@ plainto_tsquery('russian', 'знамение');
