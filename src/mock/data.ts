import { Column, Id, Task } from "@/utilities/types";
export const defaultCols: Column[] = [
  {
    id: "inprogress",
    title: "In Progress",
  },
  {
    id: "notstarted",
    title: "Not Started",
  },
  {
    id: "inreview",
    title: "In Review",
  },
  {
    id: "done",
    title: "Done",
  },
];

export const defaultTasks: Task[] = [
  {
    id: "1",
    columnId: "inporgress",
    content: "Task 1",
  },
  {
    id: "2",
    columnId: "notstarted",
    content: "Task 2",
  },
  {
    id: "3",
    columnId: "inreview",
    content: "Task 3",
  },
  {
    id: "4",
    columnId: "done",
    content: "Task 4",
  },
  {
    id: "5",
    columnId: "done",
    content: "Task 5",
  },
  {
    id: "6",
    columnId: "inprogress",
    content: "Task 6",
  },
  {
    id: "7",
    columnId: "inprogress",
    content: "Task 7",
  },
  {
    id: "8",
    columnId: "inreview",
    content: "Task 8",
  },
  {
    id: "9",
    columnId: "inreview",
    content: "Task 9",
  },
  {
    id: "10",
    columnId: "inprogress",
    content: "Task 10",
  },
  {
    id: "11",
    columnId: "inreview",
    content: "Task 11",
  },
  {
    id: "12",
    columnId: "done",
    content: "Task 12",
  },
];
