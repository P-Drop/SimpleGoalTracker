export type Task = {
  id: string;
  linkedGoalId: string;
  description: string;
  title: string;
  startDate: Date;
  isCompleted: boolean;
};