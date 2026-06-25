import { prisma } from '../lib/prisma.js';
import { Goal } from '../models/goalModel.js';
import type { Goal as GoalRow } from '../../generated/prisma/client.js';
import { Repository } from './repository.js';


// Mapeo para reconstruir timeline
function toApiGoal(row: GoalRow): Goal {
    const { startDate, endDate, ...rest} = row
    return { ...rest, timeline: { startDate, endDate } }
}



export const goalRepository : Repository<Goal> = {
    findAll: async () => {
        const rows = await prisma.goal.findMany()
        return rows.map(toApiGoal)
    },

    findOne: async (id) => {
        const row = await prisma.goal.findUnique({ where: { id }})
        return row ? toApiGoal(row) : undefined
    },

    addOne: async (goal) => {
        const { timeline, ...rest } = goal
        const row = await prisma.goal.create({
            data: {
                ...rest,
                startDate: timeline.startDate,
                endDate: timeline.endDate
            }
        })
        return toApiGoal(row)
    },

    updateOne: async (id, updates) => {
        const { timeline, ...rest } = updates
        const data = {
            ...rest,
            ...(timeline?.startDate && { startDate: timeline.startDate }),
            ...(timeline?.endDate && { endDate: timeline.endDate }) 
        }
        try {
            const row = await prisma.goal.update({ where: { id }, data })
            return toApiGoal(row)
        } catch {
            return null
        }
    },

    deleteOne: async (id) => {
        try {
            const row = await prisma.goal.delete({ where: { id }})
            return toApiGoal(row)
        } catch {
            return null
        }
    },

};