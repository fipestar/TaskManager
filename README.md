# Task Manager - Gestor de Tareas

Una aplicación de gestión de tareas construida con React, TypeScript y patrones avanzados de arquitectura frontend.

## Conceptos Técnicos Implementados

### 1. Context API y Estado Global

El proyecto utiliza **React Context** para implementar un estado global accesible en toda la aplicación sin prop drilling.

**Implementación:**
```typescript
// TaskContext.tsx
export const TaskContext = createContext<TaskContextProps>(null!)

export const TaskProvider = ({children}: TaskProviderProps) => {
    const [state, dispatch] = useReducer(taskReducer, initialState)
    
    return (
        <TaskContext.Provider value={{ state, dispatch }}>
            {children}
        </TaskContext.Provider>
    )
}
```

**Ventajas:**
- Eliminación del prop drilling
- Estado centralizado y predecible
- Facilita el testing y debugging

### 2. useReducer para Gestión de Estado Complejo

Se implementa el patrón **Reducer** para manejar la lógica compleja del estado de las tareas, similar a Redux pero con la API nativa de React.

**Estructura del Reducer:**
```typescript
export type TaskActions = 
    | { type: 'add-task', payload: { task: DraftTask } }
    | { type: 'update-task', payload: { task: Task } }
    | { type: 'remove-task', payload: { id: Task['id'] } }
    | { type: 'show-modal' }
    | { type: 'close-modal' }
    | { type: 'set-filters', payload: { filters: TaskFilters } }
    | { type: 'clear-filters' }
    | { type: 'restart-app' }

export const taskReducer = (state: TaskState, action: TaskActions): TaskState => {
    // Lógica de actualización del estado basada en acciones
}
```

**Beneficios:**
- Lógica de estado predecible y testeable
- Acciones tipadas con TypeScript
- Single source of truth
- Inmutabilidad garantizada

### 3. Custom Hooks

Se creó un **hook personalizado** `useTask` que encapsula la lógica de acceso al contexto y proporciona funcionalidades adicionales.

**Implementación:**
```typescript
export const useTask = () => {
    const context = useContext(TaskContext);
    
    if (!context) {
        throw new Error('useTask debe ser usado dentro de TaskProvider');
    }
    
    const { state, dispatch } = context;
    
    // Lógica de filtrado con useMemo para optimización
    const filteredTasks = useMemo(() => {
        return state.tasks.filter(task => {
            // Aplicación de múltiples filtros
        });
    }, [state.tasks, state.filters]);
    
    return { state, dispatch, filteredTasks, ... }
}
```

**Características:**
- Validación de contexto
- Memoización con `useMemo` para optimización de performance
- Cálculos derivados del estado
- Interfaz simplificada para componentes

### 4. TypeScript Avanzado

El proyecto hace uso extensivo de TypeScript para garantizar type safety en toda la aplicación.

**Tipos y Estructuras:**
```typescript
// Union types para acciones del reducer
export type TaskActions = 
    | { type: 'add-task', payload: { task: DraftTask } }
    | { type: 'update-task', payload: { task: Task } }

// Utility types
export type DraftTask = Omit<Task, 'id'>

// Generic types para reutilización
export function getItemById<T extends { id: string }>(
    list: T[],
    id: string
): T | undefined
```

**Ventajas:**
- Autocompletado inteligente en el IDE
- Detección de errores en tiempo de desarrollo
- Refactoring seguro
- Documentación implícita del código

### 5. Persistencia con LocalStorage

Implementación de persistencia de datos usando `useEffect` para sincronización automática.

**Implementación:**
```typescript
useEffect(() => {
    try {
        const serializable = state.tasks.map(t => ({
            ...t,
            date: t.date instanceof Date ? t.date.toISOString() : t.date
        }));
        localStorage.setItem('tasks', JSON.stringify(serializable));
    } catch (error) {
        console.error('Error al guardar:', error);
    }
}, [state.tasks])
```

**Consideraciones:**
- Serialización de objetos Date
- Manejo de errores
- Sincronización automática con cambios de estado

### 6. Sistema de Filtros Combinables

Implementación de un sistema de filtros múltiples que se pueden combinar dinámicamente.

**Lógica de Filtrado:**
```typescript
const filteredTasks = useMemo(() => {
    return state.tasks.filter(task => {
        const matchesStatus = !state.filters.status || task.status === state.filters.status;
        const matchesPriority = !state.filters.priority || task.priority === state.filters.priority;
        const matchesProject = !state.filters.project || task.project === state.filters.project;
        const matchesSearch = !state.filters.searchText || 
            task.taskName.toLowerCase().includes(state.filters.searchText.toLowerCase());
        
        return matchesStatus && matchesPriority && matchesProject && matchesSearch;
    });
}, [state.tasks, state.filters]);
```

**Características:**
- Filtros opcionales y combinables
- Búsqueda por texto case-insensitive
- Optimización con useMemo

### 7. Componentes Controlados

Todos los formularios utilizan el patrón de **componentes controlados** con React.

**Ejemplo:**
```typescript
const [task, setTask] = useState<DraftTask>({...})

const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask({
        ...task,
        [e.target.name]: e.target.value
    })
}
```

**Ventajas:**
- React como single source of truth
- Validación en tiempo real
- Control total sobre el estado del formulario

### 8. Optimización de Rendimiento

Uso de técnicas de optimización para evitar renders innecesarios:

- **useMemo**: Para cálculos costosos y filtrados
- **useCallback**: Para funciones que se pasan como props (implícito en el context)
- **Memoización de valores derivados**: Cálculos de estadísticas

### 9. Arquitectura de Carpetas

Estructura modular y escalable:

```
src/
├── components/      # Componentes reutilizables
├── context/         # Contexto global
├── data/           # Datos estáticos y configuración
├── helpers/        # Funciones utilitarias
├── hooks/          # Custom hooks
├── reducers/       # Lógica de reducers
└── types/          # Definiciones de tipos TypeScript
```

## Stack Tecnológico

- **React 18**: Biblioteca de UI con Hooks modernos
- **TypeScript**: Superset tipado de JavaScript
- **Vite**: Build tool rápido
- **TailwindCSS**: Framework de CSS utility-first
- **Headless UI**: Componentes accesibles sin estilos
- **Radix UI**: Primitivos de UI (Dropdown)
- **Lucide React**: Iconos modernos
- **date-fns**: Manipulación de fechas
- **react-datepicker**: Selector de fechas
- **react-circular-progressbar**: Gráficos circulares

## Instalación y Uso

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Build para producción
npm run build

# Preview de producción
npm run preview
```

## Patrones de Diseño Aplicados

1. **Provider Pattern**: Para distribución del contexto global
2. **Reducer Pattern**: Para gestión de estado complejo
3. **Custom Hooks Pattern**: Para lógica reutilizable
4. **Compound Components**: En modales y dropdowns
5. **Controlled Components**: En todos los formularios
6. **Render Props Pattern**: Implícito en bibliotecas UI

## Consideraciones de Desarrollo

- **Type Safety**: Todo el código está tipado con TypeScript
- **Inmutabilidad**: El estado se actualiza de forma inmutable
- **Separation of Concerns**: Lógica separada de la presentación
- **DRY Principle**: Código reutilizable con helpers y hooks
- **Performance**: Optimización con memoización
- **Accesibilidad**: Componentes accesibles de Headless UI y Radix
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
