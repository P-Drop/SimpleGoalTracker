import React, { useState } from "react"
import type { Task } from "../types"
import { Pencil } from "../assets/svgs"


type TaskRowProps = {
  task: Task
  onToggle: (id: string) => void
  onUpdateTitle: (id: string, newTitle: string) => void
}



const TaskItem = ({task, onToggle, onUpdateTitle}: TaskRowProps) => {
    const[isEditing, setIsEditing] = useState(false)
    const[editValue, setEditValue] = useState(task.title)

    const handleDoubleClick = () =>{
        setEditValue(task.title)
        setIsEditing(true)
    }

    const handleSave = ()=>{
        const trimmed = editValue.trim();
        if(trimmed && trimmed !== task.title){
            onUpdateTitle(task.id, trimmed)
        }
        setIsEditing(false)
    }

    const handleKeyDown = (e : React.KeyboardEvent) =>{
        if(e.key === 'Enter') handleSave()
        if(e.key === 'Escape') setIsEditing(false)
    }
  return (
    <div className="flex items-center gap-3 py-1">
      <input type="checkbox" checked={task.isCompleted} onChange={()=> onToggle(task.id)} className='accent-[#52E2CD]'></input>
      {isEditing ? <input type="text" value={editValue} onChange={(e)=> setEditValue(e.target.value)} onBlur={handleSave} onKeyDown={handleKeyDown} autoFocus className="bg-[#0D1A26] text-[#D4E4FA] px-2 py-0.5 rounded outline-none border border-[#3C4A46] w-full"
      />: (
        <div className="flex items-center flex-row gap-2">
            <span onDoubleClick={handleDoubleClick} className={`text-[#D4E4FA] text-sm cursor-default ${task.isCompleted ? "line-through opacity-60" : ""}`}>
                {task.title}
            </span>
            <button className='text-[#52E2CD]' onClick={()=> {setIsEditing(true); setEditValue(task.title)}}><Pencil height={15} width={15}/></button>
        </div>
        )}
        <span className="text-[#BACAC5] text-xs ml-auto">{task.startDate}</span>

    </div>
  )
}

export default TaskItem
