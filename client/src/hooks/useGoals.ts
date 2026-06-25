import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createGoal, fetchGoals, updateGoal } from "../api/goals";
import type { Goal } from "../types";

export function useGoals(){
    return useQuery<Goal[]>({
        queryKey: ['goals'],
        queryFn: fetchGoals
    })
}

export function useCreateGoal(){
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: createGoal,
        onSuccess: ()=> queryClient.invalidateQueries({queryKey: ['goals']})
    })
    return mutation
}

export function useUpdateGoal(){
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: updateGoal,
        onSuccess: ()=> queryClient.invalidateQueries({queryKey:['goals']})
    }
    )
    return mutation
}

