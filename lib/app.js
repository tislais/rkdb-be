import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import machinesController from './controllers/machines.js';


const app = express();

app.use(express.json());

app.use(machinesController);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
