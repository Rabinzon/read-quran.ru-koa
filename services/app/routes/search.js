import models from '../models';

export default (router) => {
  router.get('search', '/search', async (ctx) => {
    const { q } = ctx.query;
    const results = await models.sequelize.query(`
      SELECT surah, "order", "chronology", ts_headline(text, keywords, 'StartSel=<mark>,StopSel=</mark>,HighlightAll=true') as result
      FROM "Ayats", plainto_tsquery('russian', :query) as keywords
      WHERE TRANSLATOR='krachkovsky' AND _search @@ keywords ORDER BY "chronology";
    `, {
      model: models.Ayats,
      replacements: { query: q },
    });
    ctx.render('pages/search', { results: results[0], q, title: `Поиск по запросу: ${q}` });
  });
};
