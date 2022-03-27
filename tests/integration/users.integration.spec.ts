import 'mocha';
import { request, expect, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/app';

use(chaiHttp);

describe('Users API Request', () => {
  it('should return 400', () => {
    return request(app).get('/users')
      .then(res => {
        expect(res.status).to.eql(400);
      });
  });
});