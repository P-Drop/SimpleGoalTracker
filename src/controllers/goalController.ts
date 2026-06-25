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

// Modificación en todos los handlers-> Añádir asincronía

// Obtener todas las metas
export const getAllGoals = async (req: Request, res: Response) => {
    console.log("Alguien pidió acceso a goals");
    try {
        const goals = await goalRepository.findAll();
        res.json(goals); 
    }  catch (error) {
        console.error('Error al obtener metas', error)
        res.status(500).json({ message: 'Error interno del servidor' })
    }

};

// Obtener una meta, filtrando por ID
export const getGoalById = async (req: Request, res: Response) => {
    try{
        const goal = await goalRepository.findOne(req.params.id);
        console.log("Alguien pidió acceso a la meta " + goal?.title);
        if (goal) return res.status(200).json(goal);
        return res.status(404).json({ message: "Meta no encontrada" });
    } catch (error) {
        console.error('Error al obtener la meta', error);
        return res.status(500).json({ message: 'Error interno del servidor' })
    } 
};

// Crear una nueva meta
export const createGoal = async (req: Request, res: Response) => {
    console.log("Alguien pidió añadir una meta");
    const goal = GoalSchema.safeParse(req.body);

    // Comprobar que el body contenga un json que se pueda conbvertir en Goal
    if (!goal.success) return res.status(400).json({ errors: goal.error.format() });

    try {
        const newGoal = await goalRepository.addOne(goal.data);
        console.log(`La meta ${goal.data.id} ha sido añadida`)
        return res.status(201).json(newGoal);

    } catch (error: any) {
        if (error?.code === 'P2002') return res.status(409).json({ message: 'Ya existe una meta con ese título' });
        console.error('Error al crear la meta', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Modificar datos de una meta
export const updateGoal = async (req: Request, res: Response) => {
    console.log("Alguien pidió modificar una meta");
    const {id} = req.params;
    const updates = UpdateGoalSchema.safeParse(req.body)
    if (!updates.success) return res.status(400).json({ errors: updates.error.format() });
    try {
        const updatedGoal = await goalRepository.updateOne(id, updates.data);
        if (!updatedGoal) return res.status(404).json({ message: "Meta no encontrada" });
        console.log(`La meta ${id} ha sido modificada`);
        return res.status(200).json(updatedGoal);
    } catch (error) {
        console.error('Error al modificar la meta', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Borrar meta
export const deleteGoal = async (req: Request, res: Response) => {
    console.log("Alguien pidió borrar una meta");
    try {
        const deletedGoal = await goalRepository.deleteOne(req.params.id);
        if (!deleteGoal) return res.status(404).json({ message: 'Meta no encontrada' });
        return res.status(200).json(deletedGoal);
    } catch (error) {
        console.error('Error al borrar la meta', error);
        res.status(500).json({ message: 'Error interno del servidor' })
    }
};

