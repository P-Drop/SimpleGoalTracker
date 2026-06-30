
import type { Goal } from "../types";


export async function fetchGoals(): Promise<Goal[]>{
        const answer = await fetch('/goals')

        if(!answer.ok) throw new Error(`Error en la peticion: ${answer.status}`);
        return answer.json() as Promise<Goal[]>
}

export async function createGoal(data: Goal): Promise<Goal>{
    const body = {
        id: crypto.randomUUID(),
        title: data.title,
        description: data.description || '',
        timeline: {
            startDate: data.timeline.startDate,
            endDate: data.timeline.endDate,
        },
        isCompleted: data.isCompleted,
    }

    const res = await fetch('/goals/', {
        method: 'POST',
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify(body)
    })

    if(!res.ok) throw new Error(`Error: ${res.status}`)
    return res.json() as Promise<Goal>
}

export async function fetchGoalById(id: string): Promise<Goal> {
  const res = await fetch(`/goals/${id}`)

  if (!res.ok) throw new Error(`Error: ${res.status}`)
  return res.json() as Promise<Goal>
}

export async function updateGoal(data: Goal): Promise<Goal> {
    const res = await fetch(`/goals/${data.id}`,{
        method: 'PATCH',
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify(data)

    } )

    if(!res.ok) throw new Error (`Error: ${res.status}`)
    return res.json() as Promise<Goal>
}

export async function deleteGoal(data: Goal): Promise<Goal> {
    const res = await fetch(`/goals/${data.id}`,{
        method: 'DELETE',
        headers: {"Content-Type": "application/json"}
    })
    if(!res.ok) throw new Error(`Error: ${res.status}`)
    return res.json() as Promise<Goal>
}