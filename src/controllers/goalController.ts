import { Request, Response } from 'express';
import { goalRepository } from '../repositories/goalRepository.js';

export const getAllGoals = (req: Request, res: Response) => {
    console.log("Alguien pidió acceso a goals"); 
    const goals = goalRepository.findAll();

    res.json(goals); 
};

