import { createTask, deleteTask, updateTask, fetchTasks } from "../api/tasks";
import { useQuery, useQueryClient, useMutation  } from "@tanstack/react-query";
import type { CreateTaskInput, Task } from "../types";

export function useCreateTask(){
    const queryClient = useQueryClient()
    
    const mutation  = useMutation({
        mutationFn: ({goalId, task}: {goalId: string, task: CreateTaskInput}) => createTask(goalId, task),
        onSuccess: ()=> queryClient.invalidateQueries({queryKey: ['tasks']})
    })

    return mutation
}

export function useTasks(){
    return useQuery({
        queryKey : ['tasks'],
        queryFn : ()=> fetchTasks(),
    })

}

export function useDeleteTask(){
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (taskId: string) => deleteTask(taskId),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['tasks']})
    })

    return mutation
}

export function useUpdateTask(){
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: ({taskId, data}:{taskId: string, data: Task})=>  updateTask(taskId, data),
        onSuccess: ()=> queryClient.invalidateQueries({queryKey: ['tasks']})

    })

    return mutation
}

