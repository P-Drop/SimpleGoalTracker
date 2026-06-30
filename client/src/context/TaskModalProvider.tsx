/* eslint-disable react-x/no-context-provider */
import { useState, type ReactNode } from "react"
import { taskContext } from "./TaskModalContext"
import type { Task } from "../types"

export function TaskModalProvider({ children }: { children: ReactNode }) {
    const [taskGoalId, setTaskGoalId] = useState<string | null>(null)
    const openTaskModal = (goalId: string) => setTaskGoalId(goalId)
    const closeTaskModal = () => setTaskGoalId(null)

    const [editingTask, setEditingTask] = useState<Task | null>(null)
    const openEditTaskModal = (task: Task) => setEditingTask(task)
    const closeEditTaskModal = () => setEditingTask(null)

    return (
        <taskContext.Provider value={{
            taskGoalId, openTaskModal, closeTaskModal,
            editingTask, openEditTaskModal, closeEditTaskModal,
        }}>
            {children}
        </taskContext.Provider>
    )
}