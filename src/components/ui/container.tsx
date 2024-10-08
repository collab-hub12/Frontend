import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import { Button } from "./button";

import { UniqueIdentifier } from "@dnd-kit/core";

interface ContainerProps {
  id: UniqueIdentifier;
  children: React.ReactNode;
  title?: string;
  description?: string;
  onAddItem?: () => void;
}

const Container = ({
  id,
  children,
  description,
  onAddItem,
}: ContainerProps) => {
  const {
    attributes,
    setNodeRef,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: "container",
    },
  });
  return (
    <div
      {...attributes}
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={clsx(
        "w-full h-full  rounded-xl  flex flex-col ",
        isDragging && "opacity-50"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-1">
          {/* <h1 className='text-gray-800 text-xl'>{title}</h1> */}
          <p className="text-gray-400 bg-red-300 text-sm">{description}</p>
        </div>
      </div>

      {children}
    </div>
  );
};

export default Container;
