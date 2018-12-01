import request from 'supertest';
import sequelizeFixtures from 'sequelize-fixtures';
import matchers from 'jest-supertest-matchers';
import models, { sequelize } from '../models';
import ayat from './__fixtures__/ayat.json';
import surah from './__fixtures__/surah.json';
import search from '../migrations/3.search';

import app from '..';

let server;

describe('app', () => {
  beforeAll(async () => {
    jasmine.addMatchers(matchers);

    await sequelize.sync({ force: true });

    await sequelizeFixtures.loadFixtures([
      { model: 'Surah', data: surah },
      { model: 'Ayat', data: ayat },
    ], models);

    await search.up(sequelize.queryInterface);

    server = app().listen(3000);
  });

  describe('requests', () => {
    it('GET index page', async () => {
      const res = await request.agent(server)
        .get('/');

      expect(res).toHaveHTTPStatus(200);
      expect(res.text).toMatchSnapshot();
    }, 10000);

    it('GET surah page', async () => {
      const res = await request.agent(server)
        .get('/s/1');
      expect(res).toHaveHTTPStatus(200);
      expect(res.text).toMatchSnapshot();
    });

    it('GET canonical surah page', async () => {
      const res = await request.agent(server)
        .get('/c/96');
      expect(res).toHaveHTTPStatus(200);
      expect(res.text).toMatchSnapshot();
    });

    it('GET search page', async () => {
      const res = await request.agent(server)
        .get('/search')
        .query({ q: 'читай' });

      expect(res).toHaveHTTPStatus(200);
      expect(res.text).toMatchSnapshot();
    });
  });


  afterAll(async () => {
    await sequelize.drop({ force: true });
    await sequelize.close();
    server.close();
  });
});

