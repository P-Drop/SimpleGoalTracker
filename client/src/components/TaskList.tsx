import type {Task} from '../types/index'
import TaskItem from './TaskItem'
import {Mas} from '../assets/svgs'

type TaskListProps = {
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
  goalId: string
}

const TaskList = ({tasks, setTasks, goalId}: TaskListProps) => {


  const toggleCheck = (id: string)=>{
    setTasks(tasks.map(t =>
        t.id === id ? {...t, isCompleted: !t.isCompleted} : t
    ))
  }

  const updateTitle = (id: string, title: string) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, title } : t
    ))
  }


  const addTask = () => {
        const hoy = new Date().toISOString().split("T")[0]
        const nueva: Task = {
            id: crypto.randomUUID(),
            linkedGoalId: goalId,
            title: "Nueva Tarea",
            startDate: hoy,
            isCompleted: false,
        }
        setTasks([...tasks, nueva])
    
    }

  const goalTasks = tasks.filter(t => t.linkedGoalId === goalId)

  return (
    <div className='flex flex-col gap-2'>
      {goalTasks.length === 0 ? 
      (<p className='text-[#D4E4FA] text-lg font-bold'>No hay tareas aun</p> ): 
      (goalTasks.map(task => (
        <TaskItem key={task.id} task={task} onToggle={toggleCheck} onUpdateTitle={updateTitle} />
      )))}
      <button className="self-end flex flex-row items-center p-2 mb-5  rounded-full bg-[#57F1DB] font-bold text-[#003731] text-xs " onClick={addTask}><Mas height={15} width={15} /></button>
    </div>
  )
}

export default TaskList
