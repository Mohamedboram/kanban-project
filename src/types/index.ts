import data from '../data/data.json';

export interface Subtask {
  title: string;
  isCompleted: boolean;
}

export interface Task {
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
}

export interface Column {
  name: string;
  tasks: Task[];
}

export interface Board {
  name: string;
  columns: Column[];
}

export interface initialDataType {
  boards: Board[];
}


export interface initialDataType {
  boards: Board[];
}

export interface AppState {
  boards: Board[];
}

export const initialData: initialDataType = data;
