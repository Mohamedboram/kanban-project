import {Board} from "../types";

export const getUniqueStatuses = (boards: Board[], boardIndex: number): string[] => {
  const storedData = localStorage.getItem("reduxState");
  let parsedBoards: Board[] = [];

  if (storedData) {
    try {
      parsedBoards = JSON.parse(storedData).boards ?? boards;
    } catch (error) {
      console.error("Error parsing localStorage data: ", error);
      parsedBoards = boards;
    }
  } else {
    parsedBoards = boards;
  }

  if (boardIndex < 0 || boardIndex >= parsedBoards.length) {
    console.warn(`Board index ${boardIndex} is out of bounds.`);
    return [];
  }

  const selectedBoard = parsedBoards[boardIndex];

  const statuses = new Set<string>();
  selectedBoard.columns.forEach((column:any) => {
    statuses.add(column.name); // Add column name as a status
    column.tasks.forEach((task:any) => {
      statuses.add(task.status);
    });
  });

  return Array.from(statuses);
};
