import express from 'express';
import cors from 'cors';
import { goalRouter, taskRouter} from './routes.js';

export const app = express();
app.use(cors());

app.use(express.json());

app.use('/goals', goalRouter)
app.use('/tasks', taskRouter)




