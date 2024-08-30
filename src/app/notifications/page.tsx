"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { spaceGrotesk } from "@/utilities/font";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const tabs = ["Activity", "Request", "What's New"];

const activityData = {
  "Past 7 Days": [
    "UI for mobile responsiveness",
    "UI Design for the Invitation/Rejection Page",
    "Lorem ipsum doret",
    "UI for mobile responsiveness",
    "UI for mobile responsiveness Lorem ipsum doret",
  ],
  Earlier: [
    "frontend update",
    "UI for mobile responsiveness",
    "UI for mobile responsiveness",
  ],
};

const requestData = {
  Pending: ["Request for project access", "Invitation to collaborate"],
  Completed: ["Access granted to Project X", "Collaboration request accepted"],
};

const whatsNewData = {
  "Latest Updates": [
    "New feature: Dark mode",
    "Performance improvements",
    "Bug fixes in the dashboard",
  ],
};

export default function Notifications() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [currentData, setCurrentData] =
    useState<Record<string, string[]>>(activityData);
  const [doneItems, setDoneItems] = useState<
    { item: string; originalSection: string }[]
  >([]);

  useEffect(() => {
    switch (activeTab) {
      case "Activity":
        setCurrentData(activityData);
        break;
      case "Request":
        setCurrentData(requestData);
        break;
      case "What's New":
        setCurrentData(whatsNewData);
        break;
      default:
        setCurrentData(activityData);
    }
    setDoneItems([]);
  }, [activeTab]);

  const handleCheck = (item: string, sectionTitle: string) => {
    setCurrentData((prevData) => ({
      ...prevData,
      [sectionTitle]: prevData[sectionTitle].filter((i) => i !== item),
    }));
    setDoneItems((prev) => [...prev, { item, originalSection: sectionTitle }]);
  };

  const handleUncheck = (item: string, originalSection: string) => {
    setDoneItems((prev) => prev.filter((i) => i.item !== item));
    setCurrentData((prevData) => ({
      ...prevData,
      [originalSection]: [...prevData[originalSection], item],
    }));
  };

  return (
    <div
      className={`${spaceGrotesk.className} flex flex-col p-6 md:p-10 w-full !bg-[#13111C]`}
    >
      <h1 className="text-lg md:text-3xl font-semibold mb-4">Notifications</h1>
      <TabBar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {Object.entries(currentData).map(([title, notifications]) => (
          <NotificationSection
            key={title}
            title={title}
            notifications={notifications}
            onCheck={(item) => handleCheck(item, title)}
          />
        ))}
        <NotificationSection
          title="Done"
          notifications={doneItems.map((item) => item.item)}
          onUncheck={(item) => {
            const doneItem = doneItems.find((i) => i.item === item);
            if (doneItem) {
              handleUncheck(item, doneItem.originalSection);
            }
          }}
          isDoneSection
        />
      </div>
    </div>
  );
}

function TabBar({
  tabs,
  activeTab,
  setActiveTab,
}: {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  return (
    <div className="flex space-x-4 mb-6">
      {tabs.map((tab) => (
        <Button
          key={tab}
          variant="outline"
          className={`flex flex-row gap-1 bg-transparent ${
            activeTab === tab ? "border-[#52297A] text-[#BF93EC]" : "text-white"
          }`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </Button>
      ))}
    </div>
  );
}

function NotificationSection({
  title,
  notifications,
  onCheck,
  onUncheck,
  isDoneSection = false,
}: {
  title: string;
  notifications: string[];
  onCheck?: (item: string) => void;
  onUncheck?: (item: string) => void;
  isDoneSection?: boolean;
}) {
  return (
    <div className="bg-[#1C1A26] rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <ul className="space-y-2">
        {notifications.map((item, index) => (
          <NotificationItem
            key={index}
            item={item}
            onCheck={onCheck}
            onUncheck={onUncheck}
            isDone={isDoneSection}
          />
        ))}
      </ul>
    </div>
  );
}

function NotificationItem({
  item,
  onCheck,
  onUncheck,
  isDone,
}: {
  item: string;
  onCheck?: (item: string) => void;
  onUncheck?: (item: string) => void;
  isDone: boolean;
}) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={cn("flex items-center text-gray-300", isDone && "opacity-50")}
    >
      <div className="relative flex items-center mr-2">
        <input
          type="checkbox"
          checked={isDone}
          onChange={() => (isDone ? onUncheck?.(item) : onCheck?.(item))}
          className="absolute w-4 h-4 opacity-0 cursor-pointer"
        />
        <div
          className={cn(
            "w-4 h-4 border !border-[#424244] rounded-full",
            isDone && " !border-[#9A74BF] "
          )}
        >
          <Check
            size={16}
            strokeWidth={3}
            className={cn("text-[#424244]", isDone && " text-[#9A74BF]")}
          />
        </div>
      </div>
      <span>{item}</span>
    </motion.li>
  );
}
