"use client";
import { useEffect, useState } from "react";

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
import { PlusIcon, Table2, X } from "lucide-react";
import { Textarea } from "../ui/textarea";
import api from "@/utilities/axios";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import useIsMobile from "@/hooks/useIsMobile";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
const inter = Inter({ subsets: ["latin"] });

export type DNDType = {
  id: UniqueIdentifier;
  title: string;
  items: Task[];
};

type PropType = {
  data: DNDType[];
  org_id: number;
  team_id: number;
};

export default function KanbanBoard({ data, org_id, team_id }: PropType) {
  const addTaskWithPayload = createTask.bind(null, {
    org_id,
    team_id,
  });

  const [state, addTaskAction] = useFormState(addTaskWithPayload, null);

  const [containers, setContainers] = useState<DNDType[]>(data);
  const [selected, setSelected] = useState<Date>();

  const ChangeTaskProgressState = async (
    progressState: string,
    task_id: number
  ): Promise<{ updated: boolean }> => {
    console.log(progressState);
    console.log(task_id);

    if (
      !["InProgress", "Done", "NotStarted", "InReview"].includes(progressState)
    )
      return { updated: false };

    try {
      await api.put(`/orgs/${org_id}/teams/${team_id}/tasks/${task_id}`, {
        taskProgress: progressState,
      });
      return { updated: true };
    } catch (err) {
      return { updated: false };
    }
  };

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

  const findItemAssigneeDetails = (id: UniqueIdentifier | undefined) => {
    const container = findValueOfItems(id, "item");
    if (!container) return [];
    const item = container.items.find((item) => item.id === id);
    if (!item) return [];
    return item.assigned_to;
  };

  const findItemDeadline = (id: UniqueIdentifier | undefined) => {
    const container = findValueOfItems(id, "item");
    if (!container) return "";
    const item = container.items.find((item) => item.id === id);
    if (!item) return "";
    return item.task_deadline;
  };

  const findItemProgress = (id: UniqueIdentifier | undefined) => {
    const container = findValueOfItems(id, "item");
    if (!container) return "";
    const item = container.items.find((item) => item.id === id);
    if (!item) return "";
    return item.task_progress;
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

  const isMobile = useIsMobile();
  // DND Handlers
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: isMobile ? Infinity : 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const { id } = active;

    setActiveId(id);
  }

  const handleDragMove = async (event: DragMoveEvent) => {
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
  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over?.id) {
      //api-call for changing progress state
      //parsing
      const task_id = +active.id.toString().replace("item-", "");

      //get dragged down container
      const over_Container = findValueOfItems(active.id, "item");
      const position = over_Container;
      const updated_state = over_Container?.title!;
      const previous_state = findItemProgress(active.id);

      // If state didnt update return the function
      if (previous_state === updated_state) return;

      const { updated } = await ChangeTaskProgressState(updated_state, task_id);
      revalidatePath("/orgs/[org_id]/teams/[team_id]");

      if (updated) {
        toast.success("task updated");
      } else {
        toast.error("user is not authorized to do such actions");
        return;
      }
    }
    setActiveId(null);
  }

  return (
    <div className="py-10 px-10 flex flex-col gap-2 ">
      <AlertDialog>
        <div className="flex items-center justify-end gap-y-4">
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              className="flex flex-row gap-1 border-[#52297A] text-[#BF93EC] hover:bg-[#52297A] hover:text-white"
            >
              <PlusIcon className="w-4 h-4" />
              Add Task
            </Button>
          </AlertDialogTrigger>
        </div>
        <AlertDialogContent className="text-white border-[#52297A] border-[0.5px]">
          <div className="flex flex-col w-full">
            <div className="flex justify-end w-full">
              <AlertDialogCancel className="border-none">
                <X />
              </AlertDialogCancel>
            </div>
            <form action={addTaskAction} className="flex flex-col gap-2">
              <label>Task Title</label>
              <Input type="text" placeholder="Task Title" name="taskTitle" />
              <label>Task Description</label>
              <Textarea
                placeholder="Task Description"
                name="taskDescription"
                className="w-full"
              />
              <label>Task Progress</label>
              <div className="flex items-center space-x-4 text-sm">
                <label>
                  <input
                    type="radio"
                    name="taskProgress"
                    value="Done"
                    className="border-2 border-solid border-[#1967D2]"
                  />{" "}
                  Done
                </label>
                <label>
                  <input type="radio" name="taskProgress" value="InProgress" />{" "}
                  In Progress
                </label>
                <label>
                  <input type="radio" name="taskProgress" value="InReview" /> In
                  Review
                </label>
                <label>
                  <input type="radio" name="taskProgress" value="NotStarted" />{" "}
                  Not Started
                </label>
              </div>
              <label>Task Deadline</label>
              <div className="w-full items-center justify-center flex">
                <DayPicker
                  mode="single"
                  selected={selected}
                  onSelect={setSelected}
                  footer={
                    selected && (
                      <Input
                        type="text"
                        placeholder="Task Deadline"
                        name="taskDeadline"
                        value={selected.toLocaleDateString()}
                        readOnly
                      />
                    )
                  }
                />
              </div>
              <div className="flex justify-center items-center">
                <AlertDialogAction
                  type="submit"
                  className="flex gap-2 bg-[#52297A] text-white hover:bg-[#5a377d] hover:text-white"
                >
                  Add Task
                </AlertDialogAction>
              </div>
            </form>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <div className="mt-10 ">
        <div
          className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-4"} gap-6 `}
        >
          {isMobile ? (
            containers.map((container) => (
              <div key={container.id} className="mb-8 ">
                <h2 className="font-bold  text-[#8491A4] mb-4 ">
                  {container.title}
                </h2>
                <div className="flex flex-col gap-y-4">
                  {container.items.map((item) => (
                    <Items
                      key={item.id}
                      title={item.title}
                      id={item.id}
                      assigned_to={item.assigned_to || []}
                      task_deadline={item.task_deadline || ""}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center ">
                  <div className="font-bold  text-[#8491A4] ">In Review</div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center ">
                  <div className="font-bold  text-[#8491A4] ">In Progress</div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center ">
                  <div className="font-bold  text-[#8491A4] ">Done</div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center ">
                  <div className="font-bold  text-[#8491A4] ">Not Started</div>
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
                        <div className="flex items-start flex-col gap-y-4">
                          {container.items.map((i) => (
                            <Items
                              title={i.title}
                              id={i.id}
                              key={i.id}
                              assigned_to={i.assigned_to || []}
                              task_deadline={i.task_deadline || ""}
                            />
                          ))}
                        </div>
                      </SortableContext>
                    </Container>
                  ))}
                </SortableContext>
                <DragOverlay adjustScale={false}>
                  {/* Drag Overlay For item Item */}
                  {activeId && activeId.toString().includes("item") && (
                    <Items
                      id={activeId}
                      title={findItemTitle(activeId)}
                      assigned_to={findItemAssigneeDetails(activeId) || []}
                      task_deadline={findItemDeadline(activeId) || ""}
                    />
                  )}
                  {/* Drag Overlay For Container */}
                  {activeId && activeId.toString().includes("container") && (
                    <Container
                      id={activeId}
                      title={findContainerTitle(activeId)}
                    >
                      {findContainerItems(activeId).map((i) => (
                        <Items
                          key={i.id}
                          title={i.title}
                          id={i.id}
                          assigned_to={i.assigned_to || []}
                          task_deadline={i.task_deadline || ""}
                        />
                      ))}
                    </Container>
                  )}
                </DragOverlay>
              </DndContext>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
