export type Task = {
  id: string;
  linkedGoalId: string;
  title: string;
  startDate: Date;
  isCompleted: boolean;
};

export type CreateTaskDTO = Omit<Task, 'id'>;