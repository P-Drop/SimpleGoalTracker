import * as goalController from './controllers/goalController.js'
import * as taskcController from './controllers/taskController.js'
import { Router } from 'express';

// Rutas Goals

export const goalRouter = Router();

goalRouter.get("/", goalController.getAllGoals);
goalRouter.get("/:id", goalController.getGoalById)
goalRouter.post("/", goalController.createGoal)
goalRouter.patch("/:id", goalController.updateGoal)
goalRouter.delete("/:id", goalController.deleteGoal)

export const taskRouter = Router();

taskRouter.get("/", taskcController.getAllTasks);
taskRouter.get("/:id", taskcController.getTaskById);
taskRouter.post('/', taskcController.createTask)
taskRouter.patch('/:id', taskcController.updateTask)
taskRouter.delete('/:id', taskcController.deleteTask)
