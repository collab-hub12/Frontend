import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { Column, Id, Task } from "../../utilities/types";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import TaskCard from "./TaskCard";
import { Card } from "../ui/card";

interface Props {
  column: Column;
  // deleteColumn: (id: Id) => void;
  // updateColumn: (id: Id, title: string) => void;

  createTask: (columnId: Id) => void;
  updateTask: (id: Id, content: string) => void;
  deleteTask: (id: Id) => void;
  tasks: Task[];
}

function ColumnContainer({
  column,
  tasks,
  createTask,
  deleteTask,
  updateTask,
}: Props) {
  const [editMode, setEditMode] = useState(false);

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const { setNodeRef, transform, transition, isDragging } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <Card
        ref={setNodeRef}
        // style={style}
        className="
      opacity-40
      border-2
      border-slate-200
      w-[350px]
      h-[500px]
      max-h-[500px]
      rounded-md
      flex
      flex-col
      "
      ></Card>
    );
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="
  w-[350px]
  h-[500px]
  max-h-[500px]
  rounded-md
  flex
  flex-col
  "
    >
      {/* Column title */}
      <div
        className="
      cursor-grab
      rounded-none
      p-3
      font-bold
      border-b
      flex
      items-center
      justify-center
      "
      >
        {column.title}
      </div>

      {/* Column task container */}
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>
    </Card>
  );
}

export default ColumnContainer;
