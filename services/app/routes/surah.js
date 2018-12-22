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

      const translatorName = translator === 'krachkovsky' ? 'И. Ю. Крачковского' : 'Э. Р. Кулиева';
      const pageTitle = `Сура ${surah.id + 1}. ${surah.name}, перевод ${translatorName}`;

      ctx.render('pages/surah', {
        surah,
        surahs,
        translator,
        isCanonical: false,
        title: pageTitle,
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

      const translatorName = translator === 'krachkovsky' ? 'И. Ю. Крачковского' : 'Э. Р. Кулиева';
      const pageTitle = `Сура ${surah.id + 1}. ${surah.name}, перевод ${translatorName}`;

      ctx.render('pages/surah', {
        surah,
        surahs,
        translator,
        isCanonical: true,
        title: pageTitle,
      });
    })
    .get('krack', '/krac/:id', async (ctx) => {
      ctx.redirect(router.url('surah', ctx.params.id));
    });
};
