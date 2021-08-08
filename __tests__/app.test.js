import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

const machine = {
  name: 'Medieval Madness',
  manufacturer: 'Williams',
  image: 'url',
  date: 'today',
  type: 'solid state'
};

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('does something', async () => {
    const res = await request(app)
      .post('/api/v1/machines')
      .send(machine);

    expect(res.body).toEqual({
      id: 1,
      ...machine
    });
  });
  
});

