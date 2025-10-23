export type Project = {
    id: string
    name: string
    iconKey: string
};
export type Status = {
    id: string
    name: string
    iconKey: string
};
export type Priority = {
    id: string
    name: string
    iconKey: string
};

export type Task = {
    id: string
    taskName: string
    description: string
    project: string
    status: string
    priority: string
    date: Date
}

export type DraftTask = Omit<Task, 'id'>