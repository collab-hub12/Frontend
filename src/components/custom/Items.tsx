"use client";
import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import { DotsHorizontalIcon, DotsVerticalIcon } from "@radix-ui/react-icons";

type ItemsType = {
  id: UniqueIdentifier;
  title: string;
};

const Items = ({ id, title }: ItemsType) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: "item",
    },
  });
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={clsx(
        "px-4 py-4 bg-white shadow-md rounded-xl w-full border border-transparent hover:border-gray-200 cursor-pointer",
        isDragging && "opacity-50"
      )}
    >
      <div className="flex items-center justify-between">
        {title}
        <div className="px-2 py-2 border rounded-[50%]  bg-white">
          <DotsVerticalIcon />
        </div>
      </div>
      <div className="flex -space-x-4 rtl:space-x-reverse mt-3">
        <div className="w-10 h-10 bg-slate-500 border-2 border-white rounded-full dark:border-gray-800"></div>
        <div className="w-10 h-10 border-2  bg-slate-500 border-white rounded-full dark:border-gray-800"></div>
        <div className="w-10 h-10 border-2 bg-slate-500 border-white rounded-full dark:border-gray-800"></div>
        <a
          className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
          href="#"
        >
          +99
        </a>
      </div>
    </div>
  );
};

export default Items;
