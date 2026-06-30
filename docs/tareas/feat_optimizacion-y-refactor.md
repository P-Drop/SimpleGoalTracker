# Backend - Optimización y refactor

Registro de los errores y mejoras detectados:

## Plan
1. **Bug**: el 404 de `deleteGoal` nunca se dispara (comprueba la función, no la variable).
2. **Seguridad**: Fuga de información al cliente en `createTask` (`details: error.message` + log DEBUG).
3. **Manejo de errores**: `catch` de los repos confunde "no existe"(404) con error real de DB (500) -> mapear `P2025`.
4. **Validación**: No se valida que la meta vinculada exista al crear tarea (mapear `P2003`).
5. **Inconsistencias**: comentarios, logs y mensajes referidos a metas en el controller de tareas.
6. **Data Model**: Tipo `Task` sin `description` (no alineado con schema/Prisma).
7. **Integridad**: `UpdateGoalSchema` permite mutar el `id`.
8. **Docs**: Actualizar docs, Plan.md con PostgreSQL.

---

## Cambios aplicados
### 1. Fix 404 en `deleteGoal`
- **Archivo:** `src/controllers/goalController.ts:79`
- **Cambio:** corregido el typo `deleteGoal` → `deletedGoal`
- **Motivo:** comprobaba la función (siempre truthy), por lo que borrar una meta inexistente devolvía `200` con body `null` en vez de `404`.
- **Validación:** `DELETE /goals/<id-inexistente>` → `404`; meta existente → `200`.

### 2. Sin fuga de internals en `createTask`
- **Archivo:** `src/controllers/taskController.ts:47-51`
- **Cambio:** eliminado `details: error.message` del 500; log `DEBUG ERROR` → `'Error al crear la tarea'`; mensaje del `P2002` ajustado a la restricción real de unicidad de títulos de tarea por meta (`@@unique([title, linkedGoalId])`).
- **Motivo:** el 500 exponía el mensaje crudo de Prisma al cliente; se protege esa información siguiendo el comportamiento de `createGoal`.
- **Validación:** un 500 en `POST /tasks` responde solo `{ message: 'Error interno del servidor' }`.

### 3. Repos distinguen "no existe" de error real
- **Archivos:** `src/repositories/goalRepository.ts` (updateOne, deleteOne) y `src/repositories/taskRepository.ts` (updateOne, deleteOne).
- **Cambio:** los cuatro `catch` ahora devuelven `null` solo ante `P2025` (registro inexistente); cualquier otro error se re-lanza para ser capturado por el controller.
- **Motivo:** antes el `catch` tragaba cualquier excepción (también fallos de conexión) y respondía 404 engañoso; ahora un error real propaga a 500.
- **Validación:** `PATCH`/`DELETE` con id inexistente → 404; error real de DB → 500.

### 4. Validación de meta vinculada al crear tarea
- **Archivo:** `src/controllers/taskController.ts:49`
- **Cambio:** añadida rama `P2003` (violación de FK) → `400 { message: 'La meta vinculada no existe' }`.
- **Motivo:** la regla "solo tareas vinculadas a una meta" se delega al FK de Prisma; un `linkedGoalId` inexistente daba 500 en vez de error de cliente.
- **Validación:** `POST /tasks` con `linkedGoalId` inexistente → 400.

### 5. Limpieza de comentarios/logs incorrectos Goal→Task
- **Archivo:** `src/controllers/taskController.ts`.
- **Cambio:** comentarios, logs y mensajes 404 que decían "meta" ajustados a "tarea".
- **Motivo:** comentarios y mensajes del dominio equivocado.
- **Validación:** `DELETE /tasks/<id-inexistente>` → `404 { message: 'Tarea no encontrada' }`.

### 6. Tipo `Task` alineado con schema/Prisma
- **Archivo:** `src/models/taskModel.ts`
- **Cambio:** añadido `description: string` al tipo `Task` (lo hereda `CreateTaskDTO`).
- **Motivo:** el tipo no declaraba `description` aunque la usan el schema Zod, Prisma y `toApiTask`.
- **Validación:** `npx tsc --noEmit` → 0 errores.
- **Resuelto:** `CreateTaskDTO` ahora declara `description?: string`; `taskRepository.addOne` se tipa con `CreateTaskDTO` (en vez de `Task`/`any`) y se elimina el cast `as CreateTaskDTO` en `taskController.ts`. `tsc --noEmit` → 0 errores.
- **Nota:** el import `TaskRow` en `taskRepository.ts` quedó sin uso; candidato a limpieza futura junto al `addOne(item: any)` de la interfaz genérica.

### 7. Hacer que la PK no sea mutable vía PATCH
- **Archivos:** `src/schemas/goalSchema.ts`, `src/schemas/taskSchema.ts`
- **Cambio:** `UpdateGoalSchema`/`UpdateTaskSchema` ahora son `.omit({ id: true }).partial()`.
- **Motivo:** `.partial()` solo hacía `id` opcional; un body con otro `id` podía reescribir la clave primaria en `updateOne`.
- **Validación:** `tsc --noEmit` → 0 errores; `PATCH /goals/g1` con `{ id: 'otro', ... }` ya no cambia el `id`.
- **Pendiente (regla de negocio):** valorar omitir también `linkedGoalId` de `UpdateTaskSchema` si una tarea no debe cambiar de meta vía PATCH.

### 8. PLAN.md alineado con la BD real
- **Archivo:** `docs/PLAN.md:15`
- **Cambio:** `Base de datos: MySQL.` → `PostgreSQL.`
- **Motivo:** la implementación (Prisma, Docker, `.env`) usa PostgreSQL; actualizar el PLAN con esta decisión para no inducir a errores.

---

## Mejoras pendientes (por decidir)
- Refactor: `asyncHandler` + middleware de errores centralizado (incl. mapeo Prisma `P2002`→409 en updates) y handler 404 global.
- Logging: sustituir los `console.log` ad-hoc por un logger/middleware (sugiero `pino`).
- Funcional (PLAN): `orderBy` en los `findMany` (metas por `endDate`, tareas por fecha de creación).
- Limpieza de tipos: `addOne(item: any)` en la interfaz genérica e import `TaskRow` sin uso.
- Menores: puerto hardcodeado en `server.ts`, `rootDir`/tests en `tsconfig`, doble carga de dotenv.
