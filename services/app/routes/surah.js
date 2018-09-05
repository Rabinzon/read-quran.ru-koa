import _ from 'lodash';
import { Surah, Ayat } from '../models';

export default (router) => {
  router
    .get('surah', '/s/:id', async (ctx) => {
      const surah = await Surah.find({
        where: {
          chronology: ctx.params.id,
        },
        include: [{
          model: Ayat,
        }],
        order: [
          [Ayat, 'order', 'ASC'],
        ],
      });

      if (_.isNull(surah)) {
        ctx.throw(404);
        return;
      }
      ctx.render('pages/surah', { surah });
    })
    .get('canonical', '/c/:id', async (ctx) => {
      const surah = await Surah.find({
        where: {
          id: ctx.params.id,
        },
        include: [{
          model: Ayat,
        }],
        order: [
          [Ayat, 'order', 'ASC'],
        ],
      });

      if (_.isNull(surah)) {
        ctx.throw(404);
        return;
      }

      ctx.render('pages/surah', { surah });
    })
    .get('krack', '/krac/:id', async (ctx) => {
      ctx.redirect(router.url('surah', ctx.params.id));
    });
};
