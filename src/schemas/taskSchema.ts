 import z from "zod";
 
 export const TaskSchema = z.object({
  id: z.string().optional(), 
  title: z.string().min(1, "El título es obligatorio"),
  description: z.string().max(500).optional(),
  startDate: z.coerce.date(),
  isCompleted: z.boolean().default(false),
  linkedGoalId: z.string()
});


export const UpdateTaskSchema = TaskSchema.omit({ id: true }).partial()