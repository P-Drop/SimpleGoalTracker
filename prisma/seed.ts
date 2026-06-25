import { prisma } from '../src/lib/prisma.js';
import { mockData } from '../src/data/mockData.js';

async function main() {
    // Metas primero
    for (const goal of mockData.goals){
        const { timeline, ...rest } = goal;
        await prisma.goal.upsert({
            where: { id: goal.id},
            update: {},
            create: { ...rest, startDate: timeline.startDate, endDate: timeline.endDate },
        }); 
    };

    // Tareas
    for (const task of mockData.tasks) {
        await prisma.task.upsert({
            where: { id: task.id },
            update: {},
            create: task,
        });
    };

      console.log(`Seed OK: ${mockData.goals.length} metas, ${mockData.tasks.length} tareas`);
};

main()
    .catch ((e) => {
        console.error('Error en el seed', e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());