import { mockData } from '../data/mockData.js';
import { Goal } from '../models/goalModel.js';

const goals = mockData["goals"];

export const goalRepository = {
    // Acceder a la lista de metas
    findAll: () => {
        return goals
    },
    
    // Acceder a la lista de metas
    findOne: (id: string): Goal | undefined => {
        return goals.find(goal => goal.id === id)
    },

    // Añadir una meta
    addOne: (goal: Goal) => {
        goals.push(goal);
        return goal;
    },

    // Modificar una meta
    updateOne: (id: string, updates: Partial<Goal>) => {
        const goalToChange = goals.find(g => g.id === id);
        if (!goalToChange) return null;
        Object.assign(goalToChange, updates);
        return goalToChange;
    }
}
