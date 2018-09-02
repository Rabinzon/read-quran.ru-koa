import { Surah } from '../models';

export default (router) => {
  router
    .get('root', '/', async (ctx) => {
      const surahs = await Surah.findAll({
        order: [
          ['chronology', 'ASC'],
        ],
      });

      ctx.render('pages/index', { surahs });
    })
    .get('normal', '/normal', async (ctx) => {
      const surahs = await Surah.findAll({
        order: [
          ['id', 'ASC'],
        ],
      });
      ctx.render('pages/index', { surahs });
    });
};
