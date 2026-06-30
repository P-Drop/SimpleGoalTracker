export type Goal = {
  id: string;
  title: string;
  description: string;
  timeline: {
    startDate: string;
    endDate: string;
  }
  isCompleted: boolean;
}

export type Task = {
  id: string;
  linkedGoalId: string;
  title: string;
  description?: string;     
  startDate: string;
  isCompleted: boolean;
};

export type CreateTaskInput = {
  title: string;
  description?: string;
  startDate: string;
  isCompleted: boolean;
}