import { Request, Response } from 'express';
import { z } from 'zod';
import { goalRepository } from '../repositories/goalRepository.js';

// Esquema de zod
export const GoalSchema = z.object({
  id: z.string(), 
  title: z.string().min(1, "El título es obligatorio"),
  description: z.string().max(500),
  timeline: z.object({
    startDate: z.coerce.date(), 
    endDate: z.coerce.date(),
  }),
  isCompleted: z.boolean().default(false),
});

export const UpdateGoalSchema = GoalSchema.partial()

export const getAllGoals = (req: Request, res: Response) => {
    console.log("Alguien pidió acceso a goals"); 
    const goals = goalRepository.findAll();

    res.json(goals); 
};

export const getGoalById = (req: Request, res: Response) => {
    const id = req.params.id;
    const goal = goalRepository.findOne(id);
    console.log("Alguien pidió acceso a la meta " + goal?.title)
    if (goal) {
        return res.status(200).json(goal);
    } else {
        return res.status(404).json({ message: "Meta no encontrada" });
    }
}

export const createGoal = (req: Request, res: Response) => {
    const goal = GoalSchema.safeParse(req.body);
    console.log("Alguien pidió añadir una meta")
    // Comprobar que el body contenga un json que se pueda conbvertir en Goal
    if (!goal.success) {
        return res.status(400).
        json({ errors: goal.error.format() });
    }
    const newGoal = goalRepository.addOne(goal.data);
    console.log(`La meta ${goal.data.id} ha sido añadida`)
    return res.status(201).json(newGoal);
};

// Modificar datos de una meta
export const updateGoal = (req: Request, res: Response) => {
    console.log("Alguien pidió modificar una meta");
    const {id} = req.params;
    const updates = UpdateGoalSchema.safeParse(req.body)
    if (!updates.success) {
        return res.status(400).json({ errors: updates.error.format() });
    };
    const updatedGoal = goalRepository.updateOne(id, updates.data);
    if (!updatedGoal) {
        return res.status(404).json({ message: "Meta no encontrada" });
    };
    console.log(`La meta ${id} ha sido modificada`);
    return res.status(200).json(updatedGoal);
};

// Borrar meta
export const deleteGoal = (req: Request, res: Response) => {
    console.log("Alguien pidió borrar una meta")
    const {id} = req.params;
    const deletedGoal = goalRepository.deleteOne(id)
    if (deletedGoal) {
        return res.status(200).json(deletedGoal);
    }
    else {
        return res.status(404).json({
            message: "Meta no encontrada"
        });
    };
};

