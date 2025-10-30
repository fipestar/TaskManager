import type { DraftTask, Task } from "../types";

export type TaskActions =
  | { type: 'add-task', payload: { task: DraftTask } }
  | { type: 'get-task-by-id', payload: { id: Task['id'] } }
  | { type: 'update-task', payload: { task: Task } }
  | { type: 'remove-task', payload: { id: Task['id'] } }
  | { type: 'restart-app' }
  | { type: 'show-modal' }
  | { type: 'close-modal' }
  | { type: 'set-filters', payload: { filters: TaskFilters } }
  | { type: 'clear-filters' };

export type TaskFilters = {
  status?: string;
  priority?: string;
  project?: string;
  searchText?: string;
};

export type TaskState = {
  tasks: Task[];
  editingId: Task['id'] | null;
  modal: boolean;
  filters: TaskFilters;
};

const initialFilters: TaskFilters = {
  status: '',
  priority: '',
  project: '',
  searchText: '',
};

export const initialState: TaskState = {
  tasks: [],
  editingId: null,
  modal: false,
  filters: initialFilters,
};

const createTask = (draftTask: DraftTask): Task => {
  return {
    ...draftTask,
    id: crypto.randomUUID()
  };
};

export const taskReducer = (
  state: TaskState = initialState,
  action: TaskActions
): TaskState => {
  if (action.type === 'add-task') {
    const newTask = createTask(action.payload.task);
    return {
      ...state,
      tasks: [...state.tasks, newTask],
      modal: false
    };
  }

  if (action.type === 'get-task-by-id') {
    return {
      ...state,
      editingId: action.payload.id,
      modal: true
    };
  }

  if (action.type === 'update-task') {
    return {
      ...state,
      tasks: state.tasks.map(task => task.id === action.payload.task.id
        ? action.payload.task
        : task
      ),
      modal: false,
      editingId: null
    };
  }

  if (action.type === 'remove-task') {
    return {
      ...state,
      tasks: state.tasks.filter(task => task.id !== action.payload.id)
    };
  }

  if (action.type === 'restart-app') {
    return {
      ...state,
      tasks: [],
      editingId: null,
      filters: initialFilters
    };
  }

  if (action.type === 'show-modal') {
    return {
      ...state,
      modal: true
    };
  }

  if (action.type === 'close-modal') {
    return {
      ...state,
      modal: false,
      editingId: null
    };
  }

  if (action.type === 'set-filters') {
    return {
      ...state,
      filters: action.payload.filters
    };
  }

  if (action.type === 'clear-filters') {
    return {
      ...state,
      filters: initialFilters
    };
  }

  return state;
};