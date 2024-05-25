"use client";
import { use, useEffect, useMemo, useState } from "react";

// DnD
import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { v4 as uuidv4 } from "uuid";
import { Inter } from "next/font/google";

// Components
import Container from "@/components/ui/container";
import Items from "@/components/custom/Items";
import Modal from "@/components/ui/Modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Task } from "@/utilities/types";
import { createTask } from "@/actions/tasks.action";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import revalidatePath from "@/lib/revalidate";
import { Table2, X } from "lucide-react";
import { Textarea } from "../ui/textarea";

const inter = Inter({ subsets: ["latin"] });

export type DNDType = {
  id: UniqueIdentifier;
  title: string;
  items: Task[];
};

type PropType = {
  data: DNDType[];
  org_id: number;
  team_name: string;
};

export default function KanbanBoard({ data, org_id, team_name }: PropType) {
  const addTaskWithPayload = createTask.bind(null, {
    org_id,
    team_name,
  });
  const [state, addTaskAction] = useFormState(addTaskWithPayload, null);

  const [containers, setContainers] = useState<DNDType[]>(data);

  useEffect(() => {
    setContainers(data);
  }, [data]);

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [currentContainerId, setCurrentContainerId] =
    useState<UniqueIdentifier>();
  const [containerName, setContainerName] = useState("");
  const [itemName, setItemName] = useState("");
  const [showAddContainerModal, setShowAddContainerModal] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);

  useEffect(() => {
    if (state) {
      setShowAddContainerModal(false);
      if (state?.error) {
        toast.error(state.message);
      } else {
        toast.success(state.message);
      }
    }
  }, [state]);

  function findValueOfItems(id: UniqueIdentifier | undefined, type: string) {
    if (type === "container") {
      return containers.find((item) => item.id === id);
    }
    if (type === "item") {
      return containers.find((container) =>
        container.items.find((item) => item.id === id)
      );
    }
  }

  const findItemTitle = (id: UniqueIdentifier | undefined) => {
    const container = findValueOfItems(id, "item");
    if (!container) return "";
    const item = container.items.find((item) => item.id === id);
    if (!item) return "";
    return item.title;
  };

  const findContainerTitle = (id: UniqueIdentifier | undefined) => {
    const container = findValueOfItems(id, "container");
    if (!container) return "";
    return container.title;
  };

  const findContainerItems = (id: UniqueIdentifier | undefined) => {
    const container = findValueOfItems(id, "container");
    if (!container) return [];
    return container.items;
  };

  // DND Handlers
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const { id } = active;

    setActiveId(id);
  }

  const handleDragMove = (event: DragMoveEvent) => {
    const { active, over } = event;

    // Handle Items Sorting
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("item") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active container and over container
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "item");

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;

      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id
      );

      // Find the index of the active and over item
      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id
      );
      const overitemIndex = overContainer.items.findIndex(
        (item) => item.id === over.id
      );
      // In the same container
      if (activeContainerIndex === overContainerIndex) {
        let newItems = [...containers];
        newItems[activeContainerIndex].items = arrayMove(
          newItems[activeContainerIndex].items,
          activeitemIndex,
          overitemIndex
        );

        setContainers(newItems);
      } else {
        // In different containers
        let newItems = [...containers];
        const [removeditem] = newItems[activeContainerIndex].items.splice(
          activeitemIndex,
          1
        );
        newItems[overContainerIndex].items.splice(
          overitemIndex,
          0,
          removeditem
        );
        setContainers(newItems);
      }
    }

    // Handling Item Drop Into a Container
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("container") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "container");

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;

      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id
      );

      // Find the index of the active and over item
      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id
      );

      // Remove the active item from the active container and add it to the over container
      let newItems = [...containers];
      const [removeditem] = newItems[activeContainerIndex].items.splice(
        activeitemIndex,
        1
      );
      newItems[overContainerIndex].items.push(removeditem);
      setContainers(newItems);
    }
  };

  // This is the function that handles the sorting of the containers and items when the user is done dragging.
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    // Handling Container Sorting
    if (
      active.id.toString().includes("container") &&
      over?.id.toString().includes("container") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === active.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === over.id
      );
      // Swap the active and over container
      let newItems = [...containers];
      newItems = arrayMove(newItems, activeContainerIndex, overContainerIndex);
      setContainers(newItems);
    }

    // Handling item Sorting
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("item") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "item");

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;
      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id
      );
      // Find the index of the active and over item
      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id
      );
      const overitemIndex = overContainer.items.findIndex(
        (item) => item.id === over.id
      );

      // In the same container
      if (activeContainerIndex === overContainerIndex) {
        let newItems = [...containers];
        newItems[activeContainerIndex].items = arrayMove(
          newItems[activeContainerIndex].items,
          activeitemIndex,
          overitemIndex
        );
        setContainers(newItems);
      } else {
        // In different containers
        let newItems = [...containers];
        const [removeditem] = newItems[activeContainerIndex].items.splice(
          activeitemIndex,
          1
        );
        newItems[overContainerIndex].items.splice(
          overitemIndex,
          0,
          removeditem
        );
        setContainers(newItems);
      }
    }
    // Handling item dropping into Container
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("container") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "container");

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;
      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id
      );
      // Find the index of the active and over item
      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id
      );

      let newItems = [...containers];
      const [removeditem] = newItems[activeContainerIndex].items.splice(
        activeitemIndex,
        1
      );
      newItems[overContainerIndex].items.push(removeditem);
      setContainers(newItems);
    }
    setActiveId(null);
  }

  return (
    <div className='py-10'>
      <Modal
        showModal={showAddContainerModal}
        setShowModal={setShowAddContainerModal}
      >
        <form action={addTaskAction} className='p-10 flex flex-col gap-2'>
          <div className='flex justify-end w-full'>
            <X />
          </div>
          <label>Task Title</label>
          <Input type='text' placeholder='Task Title' name='taskTitle' />
          <label>Task Description</label>
          <Textarea
            placeholder='Task Description'
            name='taskDescription'
            className='w-full'
          />
          <label>Task Progress</label>
          <div className='flex items-center space-x-4 text-sm'>
            {" "}
            <label>
              <input
                type='radio'
                name='taskProgress'
                value='Done'
                className='border-2 border-solid border-[#205BF1]'
              />{" "}
              Done
            </label>
            <label>
              <input type='radio' name='taskProgress' value='in_progress' /> In
              Progress
            </label>
            <label>
              <input type='radio' name='taskProgress' value='in_review' /> In
              Review
            </label>
            <label>
              <input type='radio' name='taskProgress' value='not_started' /> Not
              Started
            </label>
          </div>
          <label>Task Deadline</label>
          <Input type='text' placeholder='Task Deadline' name='taskDeadline' />
          <div className='justify-center flex items-center pt-2'>
            <button
              className='bg-slate-950 dark:bg-white dark:text-slate-950 text-white px-2 py-3 rounded-md text-base font-bold w-[50%] flex items-center justify-center'
              type='submit'
            >
              Add Task
            </button>
          </div>
        </form>
      </Modal>

      <div className='flex items-center justify-between gap-y-4'>
        <div className='flex bg-[#334155] justify-between items-center px-6 py-2 gap-4 rounded-md'>
          <Table2 color='white' />
          <h1 className='text-white text-[16px] font-semibold'>Kanban</h1>
        </div>
        <Button onClick={() => setShowAddContainerModal(true)}>Add Task</Button>
      </div>
      <div className='mt-10'>
        <div className='grid grid-cols-4 gap-6'>
          <div className='flex flex-col gap-2'>
            <div className='flex gap-2 items-center '>
              <div className='bg-[#EA4335] rounded-full w-[10px] h-[10px]'></div>
              <div className='font-bold'>In Review</div>
            </div>
            <div className='bg-[#205BF1] text-white p-4 flex rounded-md font-bold text-[20px] justify-center w-full items-center'>
              Being Evaluated
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex gap-2 items-center '>
              <div className='bg-[#FEFEFF] rounded-full w-[10px] h-[10px]'></div>
              <div className='font-bold'>In Progress</div>
            </div>
            <div className='bg-[#205BF1] text-white p-4 flex rounded-md font-bold text-[20px] justify-center w-full items-center'>
              Ongoing
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex gap-2 items-center '>
              <div className='bg-[#34A853] rounded-full w-[10px] h-[10px]'></div>
              <div className='font-bold'>Done</div>
            </div>
            <div className='bg-[#205BF1] text-white p-4 flex rounded-md font-bold text-[20px] justify-center w-full items-center'>
              Completed
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex gap-2 items-center '>
              <div className='bg-[#9C9C9D] rounded-full w-[10px] h-[10px]'></div>
              <div className='font-bold'>Not Started</div>
            </div>
            <div className='bg-[#205BF1] text-white p-4 flex rounded-md font-bold text-[20px] justify-center w-full items-center'>
              Pending
            </div>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={containers.map((i) => i.id)}>
              {containers.map((container) => (
                <Container
                  id={container.id}
                  title={container.title}
                  key={container.id}
                  onAddItem={() => {
                    setShowAddItemModal(true);
                    setCurrentContainerId(container.id);
                  }}
                >
                  <SortableContext items={container.items.map((i) => i.id)}>
                    <div className='flex items-start flex-col gap-y-4'>
                      {container.items.map((i) => (
                        <Items title={i.title} id={i.id} key={i.id} />
                      ))}
                    </div>
                  </SortableContext>
                </Container>
              ))}
            </SortableContext>
            <DragOverlay adjustScale={false}>
              {/* Drag Overlay For item Item */}
              {activeId && activeId.toString().includes("item") && (
                <Items id={activeId} title={findItemTitle(activeId)} />
              )}
              {/* Drag Overlay For Container */}
              {activeId && activeId.toString().includes("container") && (
                <Container id={activeId} title={findContainerTitle(activeId)}>
                  {findContainerItems(activeId).map((i) => (
                    <Items key={i.id} title={i.title} id={i.id} />
                  ))}
                </Container>
              )}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </div>
  );
}
