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

type ItemsType = {
  id: UniqueIdentifier;
  title: string;
  assigned_to: User[];
};

const Items = ({ id, title, assigned_to }: ItemsType) => {
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
        "px-4 py-4 bg-white dark:bg-[#262626] shadow-md rounded-xl w-full border border-transparent hover:border-gray-200 cursor-pointer",
        isDragging && "opacity-50"
      )}
    >
      <div className="flex items-center justify-between">
        {title}
        <Link href={`${pathname}/tasks/${task_id}`}>
          <PaperPlaneIcon color="#0090FF" fontSize={20} />
        </Link>
      </div>

      <div className="flex -space-x-4 rtl:space-x-reverse mt-3">
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
    </div>
  );
};

export default Items;
