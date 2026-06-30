import { createContext} from "react";
import type { Task } from "../types";

type TaskModalContextType = {
    taskGoalId: string | null
    openTaskModal: (goalId: string) => void
    closeTaskModal: () => void
    editingTask: Task | null
    openEditTaskModal: (task: Task) => void
    closeEditTaskModal: () => void

}
export const taskContext = createContext<TaskModalContextType | null>(null);



