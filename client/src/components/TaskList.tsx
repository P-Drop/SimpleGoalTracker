import type { Task } from '../types/index'
import TaskItem from './TaskItem'
import {Mas} from '../assets/svgs'
import { useTaskModal } from "../hooks/useTaskModal"
import { useUpdateTask } from '../hooks/useTasks'

type TaskListProps = {
  tasks: Task[]
  goalId: string
}

const TaskList = ({tasks, goalId}: TaskListProps) => {
  const { openTaskModal } = useTaskModal()
  const updateTaskMutation = useUpdateTask()
  const toggleCheck = (task: Task)=>{
    updateTaskMutation.mutate({
      taskId: task.id,
      data: {...task, isCompleted: !task.isCompleted}
    })
  }


  const goalTasks = tasks.filter(t => t.linkedGoalId === goalId)

  return (
    <div className='flex flex-col gap-2'>
      {goalTasks.length === 0 ? 
      (<p className='text-[#D4E4FA] text-lg font-bold'>No hay tareas aun</p> ): 
      (goalTasks.map(task => (
        <TaskItem key={task.id} task={task} onToggle={()=>toggleCheck(task)} />
      )))}
      <button className="self-end flex flex-row items-center p-2 mb-5  rounded-full bg-[#57F1DB] font-bold text-[#003731] text-xs " onClick={() => openTaskModal(goalId)}><Mas height={15} width={15} /></button>
    </div>
  )
}

export default TaskList
