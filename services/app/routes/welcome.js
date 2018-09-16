import { Surah } from '../models';

export default (router) => {
  router
    .get('root', '/', async (ctx) => {
      const surahs = await Surah.findAll({
        order: [
          ['chronology', 'ASC'],
        ],
      });
      ctx.session.isNormalOrder = false;
      ctx.state.isNormalOrder = false;
      ctx.render('pages/index', { surahs });
    })
    .get('normal', '/normal', async (ctx) => {
      const surahs = await Surah.findAll({
        order: [
          ['id', 'ASC'],
        ],
      });
      ctx.session.isNormalOrder = true;
      ctx.state.isNormalOrder = true;
      ctx.render('pages/index', { surahs });
    });
};
