import type { Goal } from "../types";

export async function fetchGoals(){
    try {
        const answer = await fetch('/goals')

        if(!answer.ok) throw new Error(`Error en la peticion: ${answer.status}`);
        const datos = await answer.json()
        return datos
    }
    catch(error){
        console.error('Hubo un problema en la operacion fetch', error)
    }
}

export async function createGoal(data: Goal){
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
    return res.json()
}

export async function fetchGoalById(id: string) {
  const res = await fetch(`/goals/${id}`)

  if (!res.ok) throw new Error(`Error: ${res.status}`)
  return res.json()
}