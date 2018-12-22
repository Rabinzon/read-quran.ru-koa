import _ from 'lodash';
import { Surah, Ayat } from '../models';

export default (router) => {
  router
    .get('surah', '/s/:id/:translator?', async (ctx) => {
      const translator = ctx.params.translator || 'krachkovsky';

      const surah = await Surah.find({
        where: {
          chronology: ctx.params.id,
        },
        include: [{
          model: Ayat,
          where: {
            translator,
          },
        }],
        order: [
          [Ayat, 'order', 'ASC'],
        ],
      });

      if (_.isNull(surah)) {
        ctx.throw(404);
        return;
      }

      const surahs = await Surah.findAll({
        order: [
          ['chronology', 'ASC'],
        ],
      });

      ctx.render('pages/surah', {
        surah, surahs, translator, isCanonical: false,
      });
    })
    .get('canonical', '/c/:id/:translator?', async (ctx) => {
      const translator = ctx.params.translator || 'krachkovsky';

      const surah = await Surah.find({
        where: {
          id: ctx.params.id,
        },
        include: [{
          model: Ayat,
          where: {
            translator,
          },
        }],
        order: [
          [Ayat, 'order', 'ASC'],
        ],
      });

      if (_.isNull(surah)) {
        ctx.throw(404);
        return;
      }

      const surahs = await Surah.findAll({
        order: [
          ['id', 'ASC'],
        ],
      });

      ctx.render('pages/surah', {
        surah, surahs, translator, isCanonical: true,
      });
    })
    .get('krack', '/krac/:id', async (ctx) => {
      ctx.redirect(router.url('surah', ctx.params.id));
    });
};
