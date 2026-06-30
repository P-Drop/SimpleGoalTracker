import { Goal } from "../models/goalModel.js";
import { Task } from "../models/taskModel.js";

export const mockData = {
  goals: [
    {
      id: "g1",
      title: "Dominar TypeScript",
      description: "Aprender a usar t=ipos, interfaces y arquitectura",
      timeline: {
        startDate: new Date("2026-06-01"),
        endDate: new Date("2026-07-01")
      },
      isCompleted: false
    },
    {
      id: "g2",
      title: "Construir una API Profesional",
      description: "Implementar un backend con arquitectura limpia",
      timeline: {
        startDate: new Date("2026-06-15"),
        endDate: new Date("2026-08-15")
      },
      isCompleted: false
    }
  ] as Goal[],

  tasks: [
    {
      id: "t1",
      linkedGoalId: "g1",
      title: "Crear tipos básicos",
      startDate: new Date("2026-06-02"),
      isCompleted: true
    },
    {
      id: "t2",
      linkedGoalId: "g1",
      title: "Entender el repositorio",
      startDate: new Date("2026-06-16"),
      isCompleted: false
    },
    {
      id: "t3",
      linkedGoalId: "g2",
      title: "Configurar Express y TS",
      startDate: new Date("2026-06-16"),
      isCompleted: false
    }
  ] as Task[]
};