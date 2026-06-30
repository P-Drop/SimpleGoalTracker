import type { CreateTaskInput, Task } from "../types";

export async function fetchTasks(): Promise<Task[]> {
    const res = await fetch('/tasks')

    if(!res.ok) throw new Error (`Error: ${res.status}`)
    return res.json() as Promise<Task[]>
}

export async function createTask(goalId: string, task: CreateTaskInput): Promise<Task>{
     const body = {
        ...task,
        linkedGoalId: goalId
    }

    const res = await fetch(`/tasks`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    })

    if(!res.ok) throw new Error (`Error: ${res.status}`)
    return res.json() as Promise<Task>
}

export async function deleteTask(taskId:string): Promise<Task> {
    const res = await fetch(`/tasks/${taskId}`, {
        method: 'DELETE'
    })
    if(!res.ok) throw new Error (`Error: ${res.status}`)
    return res.json() as Promise<Task>
}

export async function updateTask(taskId:string, data:Task) {
    const res = await fetch(`/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    if(!res.ok) throw new Error (`Error: ${res.status}`)
    return res.json() as Promise<Task>
}