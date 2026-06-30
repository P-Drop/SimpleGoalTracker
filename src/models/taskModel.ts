export type Task = {
  id: string;
  linkedGoalId: string;
  title: string;
  description: string;
  startDate: Date;
  isCompleted: boolean;
};

export type CreateTaskDTO = Omit<Task, 'id' | 'description'> & { description?: string };
