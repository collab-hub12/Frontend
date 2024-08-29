"use client";
import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import { User } from "@/utilities/types";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import Link from "next/link";
import { CalendarDays, PlusIcon } from "lucide-react";

type ItemsType = {
  id: UniqueIdentifier;
  title: string;
  assigned_to: User[];
  task_deadline: string;
};

const Items = ({ id, title, assigned_to, task_deadline }: ItemsType) => {
  const router = useRouter();
  const pathname = usePathname();
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
  const task_id = id?.toString().replace("item-", "");

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
        "px-4 py-4 bg-white dark:bg-[#181622] shadow-md rounded-xl w-full border border-transparent hover:border-gray-200 cursor-pointer",
        isDragging && "opacity-50"
      )}
    >
      <div className="flex items-center flex-col gap-2 w-full">
        <div className="flex flex-row justify-between w-full items-center">
          <h1>{title}</h1>
          <div className="bg-red-400 rounded-full w-2 h-2"></div>
        </div>
        <div className="flex  gap-2 text-[#EA4335] w-full">
          <CalendarDays size={16} color="#EA4335" />
          <p className="text-xs text-[#EA4335]">{task_deadline}</p>
        </div>

        <div className="flex w-full gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex flex-row gap-1 dark:border-[#1E293B] dark:text-[#8491A4]"
          >
            Development
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex flex-row gap-1 dark:border-[#1E293B] dark:text-[#8491A4] "
          >
            Label
          </Button>
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center justify-center -space-x-4 rtl:space-x-reverse ">
            {assigned_to.map((user) => (
              <Image
                key={user.id}
                width={35}
                height={35}
                className="border-2 border-white rounded-full dark:border-gray-800"
                src={user.picture}
                alt={user.name}
              />
            ))}
          </div>
          <Link
            href={`${pathname}/tasks/${task_id}`}
            className="flex-end justify-end items-end"
          >
            <Button
              variant="outline"
              className="flex flex-row gap-1 dark:border-[#52297A] dark:text-[#BF93EC] hover:dark:bg-[#52297A] hover:text-white"
            >
              Enter
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Items;
