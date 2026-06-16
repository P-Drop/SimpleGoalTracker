import express from 'express';
import cors from 'cors';
import { getAllGoals, getGoalById } from './controllers/goalController.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get("/goals", getAllGoals);

app.get("/goals/:id", getGoalById)

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});

