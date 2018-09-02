import request from 'supertest';
import matchers from 'jest-supertest-matchers';
import db from '../models/';

import app from '..';

describe('app', () => {
  let server;

  beforeAll(() => {
    jasmine.addMatchers(matchers);
    db.sequelize.sync({ force: true });
    server = app().listen();
  });

  describe('requests', () => {
    it('GET 200', async () => {
      const res = await request.agent(server)
        .get('/');

      expect(res).toHaveHTTPStatus(200);
      expect(res.text).toMatchSnapshot();
    });
  });


  afterAll(() => {
    server.close();
    db.sequelize.drop({ force: true });
  });
});
