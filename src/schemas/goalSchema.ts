import z from "zod";

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