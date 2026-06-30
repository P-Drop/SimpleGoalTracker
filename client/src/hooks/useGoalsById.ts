import { useQuery } from "@tanstack/react-query";
import { fetchGoalById } from "../api/goals";


export function useGoalById(id: string){
    return useQuery({
        queryKey: ['goal', id],
        queryFn: ()=> fetchGoalById(id)
    })
}