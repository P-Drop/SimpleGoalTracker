# Goal simple tracker
App para gestionar el seguimiento de metas personales. Permite a los usuarios crear, listar, actualizar y consultar sus objetivos diarios a corto y largo plazo.

## Funcionalidades principales
Gestión de Metas: Listado completo y búsqueda individual.
Estado de Progreso: Soporte para identificar metas completadas vs. pendientes.
Arquitectura Escalable: Basada en TypeScript para garantizar la integridad de los datos en todo el ciclo de vida de la meta.

## Tecnologías
### Backend
 Lenguaje: Typescript.
 Runtime: Node.
 Frameworks: Express.
 Base de datos: PostgreSQL (dockerizado) + Prisma.
 Dependencias: Prisma, Zod.

## Frontend
Lenguaje: Typescript.
Frameworks: Tailwind CSS, React
Dependencias: TanStackQuery

## Endpoints de la API
| **Método** | **Endpoint**        | **Descripción**                                          |
| ---------- | ------------------ | -------------------------------------------------------- |
| `GET`      | `/goals`           | Recupera todas tus metas.                                |
| `GET`      | `/goals/:id`       | Consulta el detalle de una meta.                         |
| `GET`      | `/goals/:id/tasks` | Obtiene todas las tareas de una meta específica.         |
| `POST`     | `/goals/:id/tasks` | Crea una nueva tarea dentro de una meta.                 |
| `PATCH`    | `/tasks/:taskId`   | Actualiza el estado (completado/pendiente) de una tarea. |

## Instalación

### Requisitos
- Node.js 20+
- Docker + Docker Compose

### Requisitos en Windows

1. Instala **Docker Desktop**: https://www.docker.com/products/docker-desktop/
2. Durante la instalación, deja activado el backend **WSL 2** (recomendado).
3. Si pide habilitar la **virtualización**, actívala en la BIOS (busca "Intel VT-x" o "AMD-V").
4. **Abre Docker Desktop y espera a que el icono de la ballena esté estable** antes de ejecutar cualquier comando `npm run dev` o `npm test`.

### Pasos

1. Crea tu entorno:
    - **Windows (CMD):** `copy .env.example .env`
    - **macOS /Linux:** `cp .env.example .env`

    Si el puerto 5432 está ocupado, cambia `DB_PORT` en tu `.env`.
2. Instala las dependencias: `npm install`
3. Levanta BD + migraciones + datos: `npm run setup`
4. Inicia en modo desarrollo: `npm run dev`

¡Empieza a rastrear tus metas!

## Pruebas
El proyecto usa Jest y Supertest para los tests de la API.

Al ejecuta la suite de tests se resetea y seeda automáticamente una BD de test aislada. Se requiere Docker levantado: 

```bash
npm test

Los tests se localizan en la carpeta tests/ y cubren los endpoints del controlador de metas (GET /goals y GET /goals/:id).
Próximos pasos

    [X] Implementar CRUD completo de metas.

    [ ] Implementar CRUD completo de tareas

    [X] Añadir persistencia de datos (conectar a una base de datos dockerizada)

    [x] Añadir test unitarios al controlador de metas.

    [ ] Crear suit de test para el CRUD completo de metas.

    [ ] Crear suit de test para el CRUD completo de tareas.