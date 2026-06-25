import { DesplegableDown} from "../assets/svgs"
import type { Goal, Task } from "../types"
import { useState } from "react"
import {motion, AnimatePresence} from 'framer-motion'
import TaskList from "./TaskList"


export function GoalCard({goal, onViewDetails}: {goal: Goal, onViewDetails: ()=> void}){
    const [isGoalExpanded, setIsGoalExpanded] = useState(false)
    const [tasks, setTasks] = useState<Task[]>([
  { id: "t1", linkedGoalId: goal.id, title: "Crear tipos básicos", startDate: "2026-06-02", isCompleted: true },
  { id: "t2", linkedGoalId: goal.id, title: "Entender el repositorio", startDate: "2026-06-16", isCompleted: false },
  { id: "t3", linkedGoalId: goal.id, title: "Hacer ejercicios", startDate: "2026-06-20", isCompleted: false }
])
    const completed = tasks.filter(t => t.isCompleted).length
    const total = tasks.length
    const percentage = total > 0 ? (completed / total) * 100 : 0
    return (
        <motion.div layout className={`bg-[#122131] rounded-xl overflow-hidden border border-[#3C4A46] mb-2.5`}>
            <div onClick={()=> setIsGoalExpanded(!isGoalExpanded)} className={isGoalExpanded ? "bg-[#122131] pt-5  mb-2.5 h-auto flex flex-row justify-between rounded-t-xl border-[#3C4A46] border ": "bg-[#122131] pt-5  mb-2.5 h-auto flex flex-row justify-between rounded-t-xl border-[#3C4A46] border-t border-r border-l "}>
                <div className="pr-5 pl-5 pb-5">
                    <h3 className="text-[#D4E4FA] font-bold pb-1">{goal.title}</h3>
                    <div className="flex flex-row items-center gap-3">
                        <div className="w-28 h-2 bg-gray-600 rounded-full">
                            <div
                                className="h-2  bg-[#57F1DB] rounded-full"
                                style={{ width: `${percentage}%` }}
                            />
                        </div>
                        <h4 className="text-[#BACAC5] font-bold text-xs">{completed} de {total} tareas</h4>
                    </div>
                </div>
                <div className="flex flex-col justify-between">
                    <div className="pr-4 self-end">
                        <motion.span animate={{rotate: isGoalExpanded ? 180 : 0}} transition={{duration: 0.2}} style={{display: "inline-block"}}> <DesplegableDown/></motion.span>
                    </div>
                    <motion.button whileTap={{scale: 1.1}} whileHover={{scale:0.9}} className="text-[#57F1DB] text-xs mb-2 pr-4 inline-block whitespace-nowrap" onClick={(e)=>{e.stopPropagation(); onViewDetails()}}>Ver detalles</motion.button>
                </div>
            </div>
            <AnimatePresence>
                    {isGoalExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden px-5 pb-0"
                    >
                        <TaskList tasks={tasks} setTasks={setTasks} goalId={goal.id} />
                    </motion.div>
                    )}
            </AnimatePresence>

        </motion.div>
        
    )
}

export default GoalCard