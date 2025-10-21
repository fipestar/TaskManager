1 Gestor de tareas con proyectos y etiquetas

- Qué construyes:
    - CRUD de tareas con título, descripción, prioridad, fecha límite, proyecto y etiquetas.
    - Vista de lista con filtros por estado, proyecto, etiqueta y rango de fechas.
    - Modal para crear/editar tarea y confirmación para eliminar.
- Estado global sugerido:
    - tasks: Task[]
    - currentFilters: { projectId: string, tagIds: string[], status: 'todo' | 'in_progress' | 'done', dateRange?: [Date, Date] }
    - ui: { modalOpen: boolean, editingId: string }
- Acciones clave:
    - add-task, update-task, remove-task, toggle-status
    - set-filters, clear-filters
    - show-modal, close-modal, set-editing-id
- Extras opcionales:
    - LocalStorage para tasks y filtros
    - Contadores de progreso por proyecto
    - Búsqueda por texto y sort por prioridad/fecha