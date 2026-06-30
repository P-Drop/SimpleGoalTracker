
import type { Task } from "../types"
import { Pencil } from "../assets/svgs"
import { useTaskModal } from "../hooks/useTaskModal"

type TaskRowProps = {
  task: Task
  onToggle: (id: string) => void
}



const TaskItem = ({task, onToggle}: TaskRowProps) => {
    
    const { openEditTaskModal } = useTaskModal()


   
  return (
    <div className="flex items-center gap-3 py-1">
      <input type="checkbox" checked={task.isCompleted} onChange={()=> onToggle(task.id)} className='accent-[#52E2CD]'></input>
       (
        <div className="flex items-center flex-row gap-2">
            <span  className={`text-[#D4E4FA] text-sm cursor-default ${task.isCompleted ? "line-through opacity-60" : ""}`}>
                {task.title}
            </span>
            <button className='text-[#52E2CD]' onClick={()=> {openEditTaskModal(task)}}><Pencil height={15} width={15}/></button>
        </div>
        )
        <span className="text-[#BACAC5] text-xs ml-auto">{task.startDate}</span>

    </div>
  )
}

export default TaskItem
