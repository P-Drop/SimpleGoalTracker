import { Request, Response } from 'express';
import { taskRepository } from '../repositories/taskRepository.js';
import { TaskSchema, UpdateTaskSchema } from '../schemas/taskSchema.js';

// Modificación en todos los handlers-> Añádir asincronía

// Obtener todas las tareas
export const getAllTasks = async (req: Request, res: Response) => {
    console.log("Alguien pidió acceso a tasks");
    try {
        const tasks = await taskRepository.findAll();
        res.json(tasks); 
    }  catch (error) {
        console.error('Error al obtener tasks:', error)
        res.status(500).json({ message: 'Error interno del servidor' })
    }

};

// Obtener una tarea, filtrando por ID
export const getTaskById = async (req: Request, res: Response) => {
    try{
        const task = await taskRepository.findOne(req.params.id);
        console.log("Alguien pidió acceso a la tarea " + task?.title);
        if (task) return res.status(200).json(task);
        return res.status(404).json({ message: "Tarea no encontrada" });
    } catch (error) {
        console.error('Error al obtener la tarea:', error);
        return res.status(500).json({ message: 'Error interno del servidor' })
    } 
};

// Crear una nueva tarea
export const createTask = async (req: Request, res: Response) => {
    console.log("Alguien pidió añadir una tarea");
    const task = TaskSchema.safeParse(req.body);

    // Comprobar que el body contenga un json que se pueda convertir en task
    if (!task.success) return res.status(400).json({ errors: task.error.format() });
    try {
        const { id, ...dataToSave } = task.data;
        const newTask = await taskRepository.addOne(dataToSave);
        console.log(`La tarea ha sido añadida`)
        return res.status(201).json(newTask);

    } catch (error: any) {
        if (error?.code === 'P2002') return res.status(409).json({ message: 'Ya existe una tarea con ese título en esta meta' });
        if (error?.code === 'P2003') return res.status(400).json({ message: 'La meta vinculada no existe' })
        console.error("Error al crear la tarea:", error);
        return res.status(500).json({ message: 'Error interno del servidor'})
    }
};

// Modificar datos de una tarea
export const updateTask = async (req: Request, res: Response) => {
    console.log("Alguien pidió modificar una tarea");
    const {id} = req.params;
    const updates = UpdateTaskSchema.safeParse(req.body)
    if (!updates.success) return res.status(400).json({ errors: updates.error.format() });
    try {
        const updateTask = await taskRepository.updateOne(id, updates.data);
        if (!updateTask) return res.status(404).json({ message: "Tarea no encontrada" });
        console.log(`La tarea ${id} ha sido modificada`);
        return res.status(200).json(updateTask);
    } catch (error) {
        console.error('Error al modificar la tarea:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Borrar tarea
export const deleteTask = async (req: Request, res: Response) => {
    console.log("Alguien pidió borrar una tarea");
    try {
        const deleteTask = await taskRepository.deleteOne(req.params.id);
        if (!deleteTask) return res.status(404).json({ message: 'Tarea no encontrada' });
        return res.status(200).json(deleteTask);
    } catch (error) {
        console.error('Error al borrar la tarea:', error);
        res.status(500).json({ message: 'Error interno del servidor' })
    }
};