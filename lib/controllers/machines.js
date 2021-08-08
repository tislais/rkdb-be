import { Router } from 'express';
import Machine from '../models/Machine.js';

export default Router()
  .post('/api/v1/machines', async (req, res, next) => {
    try {
      const machine = await Machine.insert(req.body);
      res.send(machine);
    } catch(err) {
      next(err);
    }
  })

  .get('/api/v1/machines', async (req, res, next) => {
    try {
      const machine = await Machine.findAll();
      res.send(machine);
    } catch(err) {
      next(err);
    }
  })
  
  
;




