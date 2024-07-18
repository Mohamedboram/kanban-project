// @ts-ignore
import {
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  ADD_COLUMN,
  UPDATE_COLUMN,
  DELETE_COLUMN,
  ADD_BOARD,
  UPDATE_BOARD,
  DELETE_BOARD
} from "../constants.ts";
import {Task} from "../../types";

export interface AddTaskAction {
  type: typeof ADD_TASK;
  payload: {
    boardIndex: number;
    columnIndex: number;
    task: Task;
  };
}

export interface UpdateTaskAction {
  type: typeof UPDATE_TASK;
  payload: {
    boardIndex: number;
    columnIndex: number;
    taskIndex: number;
    task: Task;
  };
}

export interface DeleteTaskAction {
  type: typeof DELETE_TASK;
  payload: {
    boardIndex: number;
    columnIndex: number;
    taskIndex: number;
  };
}

export interface AddColumnAction {
  type: typeof ADD_COLUMN;
  payload: {
    boardIndex: number;
    column: {
      name: string;
      tasks: Task[];
    };
  };
}

export interface UpdateColumnAction {
  type: typeof UPDATE_COLUMN;
  payload: {
    boardIndex: number;
    columnIndex: number;
    column: {
      title: string;
      tasks: Task[];
    };
  };
}

export interface DeleteColumnAction {
  type: typeof DELETE_COLUMN;
  payload: {
    boardIndex: number;
    columnIndex: number;
  };
}

export interface AddBoardAction {
  type: typeof ADD_BOARD;
  payload: {
    board: {
      name: string;
      columns: {
        title: string;
        tasks: Task[];
      }[];
    };
  };
}

export interface UpdateBoardAction {
  type: typeof UPDATE_BOARD;
  payload: {
    boardIndex: number;
    board: {
      title: string;
      columns: {
        title: string;
        tasks: Task[];
      }[];
    };
  };
}

export interface DeleteBoardAction {
  type: typeof DELETE_BOARD;
  payload: {
    boardIndex: number;
  };
}

export type TaskActionTypes = AddTaskAction | UpdateTaskAction | DeleteTaskAction;
export type ColumnActionTypes = AddColumnAction | UpdateColumnAction | DeleteColumnAction;
export type BoardActionTypes = AddBoardAction | UpdateBoardAction | DeleteBoardAction;

export const addTask = (boardIndex: number, columnIndex: number, task: Task): AddTaskAction => ({
  type: ADD_TASK,
  payload: {boardIndex, columnIndex, task}
});

export const updateTask = (boardIndex: number, columnIndex: number, taskIndex: number, task: Task): UpdateTaskAction => ({
  type: UPDATE_TASK,
  payload: { boardIndex, columnIndex, taskIndex, task }
});

export const deleteTask = (boardIndex: number, columnIndex: number, taskIndex: number): DeleteTaskAction => ({
  type: DELETE_TASK,
  payload: {boardIndex, columnIndex, taskIndex}
});

export const addColumn = (boardIndex: number, column: { name: string; tasks: Task[] }): AddColumnAction => ({
  type: ADD_COLUMN,
  payload: { boardIndex, column }
});

export const updateColumn = (boardIndex: number, columnIndex: number, column: { title: string; tasks: Task[] }): UpdateColumnAction => ({
  type: UPDATE_COLUMN,
  payload: { boardIndex, columnIndex, column }
});

export const deleteColumn = (boardIndex: number, columnIndex: number): DeleteColumnAction => ({
  type: DELETE_COLUMN,
  payload: { boardIndex, columnIndex }
});

export const addBoard = (board: { name: string; columns: { title: string; tasks: Task[] }[] }): AddBoardAction => ({
  type: ADD_BOARD,
  payload: { board }
});

export const updateBoard = (boardIndex: number, board: { title: string; columns: { title: string; tasks: Task[] }[] }): UpdateBoardAction => ({
  type: UPDATE_BOARD,
  payload: { boardIndex, board }
});

export const deleteBoard = (boardIndex: number): DeleteBoardAction => ({
  type: DELETE_BOARD,
  payload: { boardIndex }
});

export const SET_INITIAL_STATE = 'SET_INITIAL_STATE';

export interface SetInitialStateAction {
  type: typeof SET_INITIAL_STATE;
  payload: any;
}

export const setInitialState = (state: any): SetInitialStateAction => ({
  type: SET_INITIAL_STATE,
  payload: state,
});
