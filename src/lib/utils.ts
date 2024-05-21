import {DNDType} from "@/components/custom/KanbanBoard"
import {Task} from "@/utilities/types"
import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function GroupByContainer(tasks: Task[], containers: DNDType[]) {

  tasks.map(task => {
    const suitable_container = containers.find(container => container.title === task.task_progress)
    if (suitable_container) {
      suitable_container.items.push({...task, id: `item-${task.id}`})
    }
  })
  return containers;

}