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

  .get('/api/v1/machines/:id', async (req, res, next) => {
    try {
      const machine = await Machine.findById(req.params.id);
      res.send(machine);
    } catch(err) {
      next(err);
    }
  })

  .put('/api/v1/machines/:id', async (req, res, next) => {
    try {            
      const machine = await Machine.update(req.body, req.params.id);
      res.send(machine);
    } catch(err) {
      next(err);
    }
  })

  .delete('/api/v1/machines/:id', async (req, res, next) => {
    try {
      const machine = await Machine.delete(req.params.id);
      res.send(machine);
    } catch(err) {
      next(err);
    }
  })
  
  
;




