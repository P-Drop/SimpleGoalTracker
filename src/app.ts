import express from 'express';
import cors from 'cors';
import { createGoal, deleteGoal, getAllGoals, getGoalById, updateGoal } from './controllers/goalController.js';

export const app = express();
app.use(cors());
app.use(express.json());

app.get("/goals", getAllGoals);

app.get("/goals/:id", getGoalById)

app.post("/goals/", createGoal)

app.patch("/goals/:id", updateGoal)

app.delete("/goals/:id", deleteGoal)