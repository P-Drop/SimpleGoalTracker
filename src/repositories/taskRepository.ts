import { prisma } from '../lib/prisma.js';
import { Task } from '../models/taskModel.js';
import type { Task as TaskRow } from '../../generated/prisma/client.js';
import { Repository } from './repository.js';

// Formatear el retorno del objeto
function toApiTask(row: any): Task {
    const { goal, ...taskData } = row;
    return {
        ...taskData,
        description: taskData.description ?? ""
    };
}

export const taskRepository : Repository<Task> = {
    findAll: async () => {
        const rows = await prisma.task.findMany()
        return rows.map(toApiTask)
    },

    findOne: async (id) => {
        const row = await prisma.task.findUnique({ where: { id }})
        return row ? toApiTask(row) : undefined
    },

    addOne: async (task: Task) => {
    const row = await prisma.task.create({
        data: task 
    });

    return toApiTask(row);
},

    updateOne: async (id, updates:Partial<Task>) => {
        try {
            const { goal, ...dataToUpdate } = updates as any;
            const row = await prisma.task.update({where: { id }, data: dataToUpdate})
            return toApiTask(row)
        } catch (error) {
            return null
        }
    },

    deleteOne: async (id) => {
        try {
            const row = await prisma.task.delete({ where: { id }})
            return toApiTask(row)
        } catch (error) {
            return null
        }
    },

};