import { mockData } from '../data/mockData.js';
import { Goal } from '../models/goalModel.js';
export const goalRepository = {
    findAll: () => {
        return mockData["goals"]
    },

    findOne: (id: string): Goal | undefined => {
        return mockData["goals"].find(goal => goal.id === id)
    }
}
