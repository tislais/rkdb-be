import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Machine from '../lib/models/Machine.js';

const machines = [
  {
    name: 'Medieval Madness',
    manufacturer: 'Williams',
    image: 'url',
    date: 'today',
    type: 'solid state'
  },
  {
    name: 'The Addams Family',
    manufacturer: 'Williams',
    image: 'url',
    date: 'today',
    type: 'solid state'
  }
];

describe('machine database routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('adds a new machine to our database', async () => {
    
    const res = await request(app)
      .post('/api/v1/machines')
      .send(machines[0]);

    expect(res.body).toEqual({
      id: 1,
      ...machines[0]
    });
  });

  it('finds all machines in our database', async () => {
    await Machine.insert(machines[0]);
    await Machine.insert(machines[1]);
    const res = await request(app).get('/api/v1/machines');

    expect(res.body).toEqual(
      [{ ...machines[0], id: 1 }, { ...machines[1], id: 2 }]
    );
  });

  it('finds a machine in our database by id', async () => {
    const machine = await Machine.insert(machines[0]);
    const res = await request(app).get(`/api/v1/machines/${machine.id}`);
    expect(res.body).toEqual(machine);
  });

  it('adds a serial number to a machine', async () => {
    const machine = await Machine.insert(machines[0]);
    machine.serial = '123';

    const updatedMachine = {
      ...machine, 
      serial: '123'
    };

    const res = await request(app)
      .put(`/api/v1/machines/${machine.id}`)
      .send({ serial: '123' });

    expect(res.body).toEqual(updatedMachine);
  });

});

