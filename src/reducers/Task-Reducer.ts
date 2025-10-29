import type { DraftTask, Task } from "../types"

export type TaskActions = 
    {type: 'add-task', payload: {task: DraftTask}} |
    {type: 'show-modal'} |
    {type: 'close-modal'} |
    {type: 'remove-task', payload: {id: Task['id']}} |
    {type: 'get-task-by-id', payload: {id: Task['id']}} |
    {type: 'update-task', payload: {task: Task}}
    

export type TaskState = {
    tasks: Task[]
    modal: boolean
    editingId : Task['id']
}

const localStorageTasks = () : Task[] => {
    const tasks = localStorage.getItem('tasks')
    return tasks ? JSON.parse(tasks) : []
}
export const initialState : TaskState = {
    tasks: localStorageTasks(),
    modal: false,
    editingId: ''
}

const createTask = (draftTask: DraftTask) : Task => {
    return {
        ...draftTask,
        id: crypto.randomUUID()
    }
}

export const taskReducer = (
    state: TaskState = initialState,
    action: TaskActions
): TaskState => {
    if(action.type === 'add-task') {
        const task = createTask(action.payload.task);
        return {
            ...state,
            tasks: [...state.tasks, task],
            modal: false
        }
    }
    
    if(action.type === 'show-modal') {
        return {
            ...state,
            modal: true
        }
    }
    
    if(action.type === 'close-modal') {
        return {
            ...state,
            modal: false,
            editingId: ''
        }
    }
    if(action.type === 'remove-task') {
        return {
            ...state,
            tasks: state.tasks.filter( expense => expense.id !== action.payload.id)
        }
    }
    if(action.type === 'get-task-by-id'){
        return {
            ...state,
            editingId: action.payload.id,
            modal: true
        }
    }
    if(action.type === 'update-task'){
      const updatedTask = action.payload?.task;
      if(!updatedTask) return state;  
        return{
            ...state,
            tasks: state.tasks.map(task => task.id === updatedTask.id ? updatedTask : task),
            editingId: '',
            modal: false
        }
    }
    
    return state
}