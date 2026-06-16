import { Request, Response } from 'express';
import { goalRepository } from '../repositories/goalRepository.js';

export const getAllGoals = (req: Request, res: Response) => {
    console.log("Alguien pidió acceso a goals"); 
    const goals = goalRepository.findAll();

    res.json(goals); 
};

export const getGoalById = (req: Request, res: Response) => {
    const id = req.params.id;
    const goal = goalRepository.findOne(id);
    console.log("Alguien pidió acceso a la meta " + goal)
    if (goal) {
        return res.status(200).json(goal);
    } else {
        return res.status(404).json({ message: "Meta no encontrada" });
    }
}

