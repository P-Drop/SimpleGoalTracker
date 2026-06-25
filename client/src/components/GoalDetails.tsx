import type { Goal } from "../types"
import { Cancel } from "../assets/svgs";
import {motion} from 'framer-motion'
import { Pencil } from "../assets/svgs";
import { useState } from "react";

const GoalDetails = ({onClose, goal, onGoalCreated}:{onClose: ()=> void; goal: Goal | undefined; onGoalCreated: (goal: Goal)=> void }) => {
     const [form, setForm] = useState({
        title: goal?.title ?? '',
        description: goal?.description  ?? '',
        startDate: goal?.timeline.startDate ?? '',
        endDate: goal?.timeline.endDate ?? '',
    })
  const [isEditing, setIsEditing] = useState(false)

  if (!goal) return null
 
  const handleEdit = () =>{
    const editedGoal = {
        id: goal.id ?? '',
        title: form.title ?? '',
        description: form.description ?? '',
        timeline: 
           {startDate: form.startDate ?? '',
            endDate: form.endDate ?? ''},
        isCompleted: false
    }

    onGoalCreated(editedGoal)
    onClose()
  }

  return !isEditing ? (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center flex-col w-full" onClick={onClose}>
        <div className="m-auto w-10/12" onClick={(e)=> e.stopPropagation()} >
            <div className="flex flex-row items-center bg-[#1C2B3C] py-8 justify-between text-[#D4E4FA] font-bold text-xl rounded-t-xl border-[#3C4A46] border-2 flex-1 min-w-0">
                <h2 className="pl-5 wrap-break-word flex-1 min-h-0">Detalles</h2>
                <div className="pr-5 pl-2" onClick={onClose}><Cancel height={20} width={20} /></div>
            </div>  
            <div className="bg-[#1C2B3C] flex flex-col px-3 pt-5 border-[#3C4A46] rounded-b-xl border-x-2 border-b-2 pb-5">
                <span className="text-[15px] text-[#BACAC5] font-bold px-3 py-2">Nombre *</span>
                <p className="px-3 text-[#D4E4FA] mb-2">{goal.title}</p>
                <span className="text-[15px] text-[#BACAC5] font-bold px-3 py-2">Descripcion *</span>
                <p className="px-3 text-[#D4E4FA] mb-2">{goal.description}</p>
                <span className="text-[15px] text-[#BACAC5] font-bold px-3 py-2">Fecha de creacion *</span>
                <p className="px-3 text-[#D4E4FA] mb-2">{goal.timeline.startDate.split('T')[0]}</p>
                <span className="text-[15px] text-[#BACAC5] font-bold px-3 py-2">Fecha limite *</span>
                <p className="px-3 text-[#D4E4FA] mb-2">{goal.timeline.endDate.split('T')[0]}</p>
                <motion.button whileTap={{scale:1.1}} whileHover={{scale:0.9}} className=" items-center p-2  rounded-full bg-[#57F1DB] font-bold text-[#003731] text-xs self-end" onClick={()=> setIsEditing(true)}><Pencil height={20} width={20}/></motion.button>
            </div>
            
        </div>
    </div>
  ) : (
     <div className="fixed inset-0 bg-black/50 z-50 flex justify-center flex-col w-full" onClick={onClose}>
            <div className="m-auto w-10/12" onClick={(e)=> e.stopPropagation()} >
                <div className="flex flex-row items-center bg-[#1C2B3C] py-8 justify-between text-[#D4E4FA] font-bold text-xl rounded-t-xl border-[#3C4A46] border-2">
                    <h2 className="pl-5">Editar Meta</h2>
                    <div className="pr-5" onClick={onClose}><Cancel height={20} width={20} /></div>
                </div>  
                <form onSubmit={handleEdit} className="bg-[#1C2B3C] flex flex-col px-3 pt-5 border-[#3C4A46] rounded-b-xl border-x-2 border-b-2">
    
                    <span className="text-[15px] text-[#BACAC5] font-bold px-3 py-2">Nombre de la meta *</span>
                    <input
                        type="text"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        placeholder="Ej. Maraton 2026"
                        className="w-full bg-[#0D1A26] text-[#D4E4FA] px-3 py-3 rounded-xl outline-none border border-[#3C4A46] mb-3"
                        
                    />
                    <span className="text-[15px] text-[#BACAC5] font-bold px-3 py-2">Descripcion *</span>
                    <textarea
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        placeholder="Añade detalles sobre lo que quieres lograr..."
                        className="w-full bg-[#0D1A26] text-[#D4E4FA] px-3 py-2 rounded outline-none border border-[#3C4A46] mb-3"
                        rows={5}
                    />

                    <span className="text-[15px] text-[#BACAC5] font-bold px-3 py-2">Fecha inicio *</span>
                    <input
                        type="date"
                        value={form.startDate}
                        onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                        className="w-full bg-[#0D1A26] text-[#D4E4FA] px-3 py-2 rounded outline-none border border-[#3C4A46] mb-3"
                    />
                   
                
                    <span className="text-[15px] text-[#BACAC5] font-bold px-3 py-2">Fecha limite *</span>
                    <input
                        type="date"
                        value={form.endDate}
                        onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                        className="w-full bg-[#0D1A26] text-[#D4E4FA] px-3 py-2 rounded outline-none border border-[#3C4A46] mb-3"
                    />
                    <div className="flex flex-row items-center justify-center">
                        <motion.button whileHover={{scale: 0.9}} whileTap={{scale: 1.1}} type="submit" className="bg-[#2DD4BF] rounded-xl px-20 py-3 mt-4  mb-6 font-bold text-[#003731]">Guardar</motion.button>
                    </div>
                </form>
            </div>
        </div>
  )

}

export default GoalDetails
