import { Request, Response } from 'express';
import { taskRepository } from '../repositories/taskRepository.js';
import { TaskSchema, UpdateTaskSchema } from '../schemas/taskSchema.js';
import { CreateTaskDTO } from '../models/taskModel.js';

// Modificación en todos los handlers-> Añádir asincronía

// Obtener todas las metas
export const getAllTasks = async (req: Request, res: Response) => {
    console.log("Alguien pidió acceso a tasks");
    try {
        const tasks = await taskRepository.findAll();
        res.json(tasks); 
    }  catch (error) {
        console.error('Error al obtener metas', error)
        res.status(500).json({ message: 'Error interno del servidor' })
    }

};

// Obtener una meta, filtrando por ID
export const getTaskById = async (req: Request, res: Response) => {
    try{
        const task = await taskRepository.findOne(req.params.id);
        console.log("Alguien pidió acceso a la meta " + task?.title);
        if (task) return res.status(200).json(task);
        return res.status(404).json({ message: "Meta no encontrada" });
    } catch (error) {
        console.error('Error al obtener la meta', error);
        return res.status(500).json({ message: 'Error interno del servidor' })
    } 
};

// Crear una nueva meta
export const createTask = async (req: Request, res: Response) => {
    console.log("Alguien pidió añadir una meta");
    const task = TaskSchema.safeParse(req.body);

    // Comprobar que el body contenga un json que se pueda conbvertir en task
    if (!task.success) return res.status(400).json({ errors: task.error.format() });
    try {
        const { id, ...dataToSave } = task.data;
        const newTask = await taskRepository.addOne(dataToSave as CreateTaskDTO);
        console.log(`La meta ha sido añadida`)
        return res.status(201).json(newTask);

    } catch (error: any) {
        if (error?.code === 'P2002') return res.status(409).json({ message: 'Ya existe una meta con ese título' });
        console.error("DEBUG ERROR:", error);
        return res.status(500).json({ message: 'Error interno', details: error.message })
    }
};

// Modificar datos de una meta
export const updateTask = async (req: Request, res: Response) => {
    console.log("Alguien pidió modificar una meta");
    const {id} = req.params;
    const updates = UpdateTaskSchema.safeParse(req.body)
    if (!updates.success) return res.status(400).json({ errors: updates.error.format() });
    try {
        const updateTask = await taskRepository.updateOne(id, updates.data);
        if (!updateTask) return res.status(404).json({ message: "Tarea no encontrada" });
        console.log(`La tarea ${id} ha sido modificada`);
        return res.status(200).json(updateTask);
    } catch (error) {
        console.error('Error al modificar la meta', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Borrar meta
export const deleteTask = async (req: Request, res: Response) => {
    console.log("Alguien pidió borrar una meta");
    try {
        const deleteTask = await taskRepository.deleteOne(req.params.id);
        if (!deleteTask) return res.status(404).json({ message: 'Meta no encontrada' });
        return res.status(200).json(deleteTask);
    } catch (error) {
        console.error('Error al borrar la meta', error);
        res.status(500).json({ message: 'Error interno del servidor' })
    }
};