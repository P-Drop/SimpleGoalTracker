import { mockData } from '../data/mockData.js';
export const goalRepository = {
    findAll: () => {return mockData["goals"]},
}
