import { useRef, useState } from "react"
import { motion } from "framer-motion"
import type { CreateTaskInput } from "../types"
import { Cancel } from "../assets/svgs"

const TaskModal = ({ onClose, onTaskCreated }: {
    onClose: () => void
    onTaskCreated: (task: CreateTaskInput) => void
}) => {
    const titleRef = useRef<HTMLInputElement>(null)
    const submitRef = useRef<HTMLButtonElement>(null)
    const [form, setForm] = useState({ title: "", description: "" })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const hoy = new Date().toISOString().split("T")[0]
        onTaskCreated({
            title: form.title,
            description: form.description,
            startDate: hoy,
            isCompleted: false,
        })
        onClose()
    }

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center flex-col w-full" onClick={onClose}>
            <div className="m-auto w-10/12" onClick={(e) => e.stopPropagation()}>
                <div className="flex flex-row items-center bg-[#1C2B3C] py-8 justify-between text-[#D4E4FA] font-bold text-xl rounded-t-xl border-[#3C4A46] border-2">
                    <h2 className="pl-5">Nueva Tarea</h2>
                    <div className="pr-5" onClick={onClose}><Cancel height={20} width={20} /></div>
                </div>
                <form onSubmit={handleSubmit} className="bg-[#1C2B3C] flex flex-col px-3 pt-5 border-[#3C4A46] rounded-b-xl border-x-2 border-b-2">
                    <span className="text-[15px] text-[#BACAC5] font-bold px-3 py-2">Nombre de la tarea *</span>
                    <input
                        type="text"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        placeholder="Ej. Estudiar TypeScript"
                        required
                        className="w-full bg-[#0D1A26] text-[#D4E4FA] px-3 py-3 rounded-xl outline-none border border-[#3C4A46] mb-3"
                        ref={titleRef}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault()
                                submitRef.current?.click()
                            }
                        }}
                    />
                    <span className="text-[15px] text-[#BACAC5] font-bold px-3 py-2">Descripcion</span>
                    <textarea
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        placeholder="Añade detalles sobre lo que quieres lograr..."
                        className="w-full bg-[#0D1A26] text-[#D4E4FA] px-3 py-2 rounded outline-none border border-[#3C4A46] mb-3"
                        rows={5}
                    />
                    <div className="flex flex-row items-center justify-center">
                        <motion.button
                            whileHover={{ scale: 0.9 }}
                            whileTap={{ scale: 1.1 }}
                            type="submit"
                            className="bg-[#2DD4BF] rounded-xl px-20 py-3 mt-4 mb-6 font-bold text-[#003731]"
                            ref={submitRef}
                        >
                            Guardar
                        </motion.button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TaskModal
