import * as goalController from './controllers/goalController.js'
import { Router } from 'express';

// Rutas Goals

export const goalRouter = Router();

goalRouter.get("/", goalController.getAllGoals);
goalRouter.get("/:id", goalController.getGoalById)
goalRouter.post("/", goalController.createGoal)
goalRouter.patch("/:id", goalController.updateGoal)
goalRouter.delete("/:id", goalController.deleteGoal)