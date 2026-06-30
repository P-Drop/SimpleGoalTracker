/* eslint-disable react-x/no-use-context */
import { useContext } from "react"
import { taskContext } from "../context/TaskModalContext"

export function useTaskModal() {
    const context = useContext(taskContext)
    if (!context) throw new Error("useTaskModal debe usarse dentro de un TaskModalProvider")
    return context
}