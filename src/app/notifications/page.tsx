"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { spaceGrotesk } from "@/utilities/font";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const tabs = ["Activity", "Request", "What's New"];

type NotificationData = {
  Activity: {
    "Past 7 Days": string[];
    Earlier: string[];
    Done: string[];
  };
  Request: {
    Pending: string[];
    Completed: string[];
  };
  "What's New": {
    "Latest Updates": string[];
  };
};

const initialData: NotificationData = {
  Activity: {
    "Past 7 Days": [
      "UI Design for the Invitation/Rejection Page",
      "Lorem ipsum doret",
    ],
    Earlier: ["frontend update", "UI for mobile responsiveness"],
    Done: [],
  },
  Request: {
    Pending: ["XYZ Organization ", "ABC Organization ", "123 Organization "],
    Completed: [],
  },
  "What's New": {
    "Latest Updates": [
      "New feature: Dark mode",
      "Performance improvements",
      "Bug fixes in the dashboard",
    ],
  },
};

export default function Notifications() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [data, setData] = useState<NotificationData>(initialData);
  const [completedRequests, setCompletedRequests] = useState<
    Array<{ org: string; status: "accepted" | "rejected" }>
  >([]);

  const handleCheck = (item: string, sectionTitle: string) => {
    setData((prevData) => ({
      ...prevData,
      Activity: {
        ...prevData.Activity,
        [sectionTitle]: prevData.Activity[
          sectionTitle as keyof typeof prevData.Activity
        ].filter((i) => i !== item),
        Done: [...prevData.Activity.Done, item],
      },
    }));
  };

  const handleUncheck = (item: string) => {
    const originalSection =
      Object.keys(initialData.Activity).find((section) =>
        initialData.Activity[
          section as keyof typeof initialData.Activity
        ].includes(item)
      ) || "Past 7 Days";

    setData((prevData) => ({
      ...prevData,
      Activity: {
        ...prevData.Activity,
        [originalSection]: [
          ...prevData.Activity[
            originalSection as keyof typeof prevData.Activity
          ],
          item,
        ],
        Done: prevData.Activity.Done.filter((i) => i !== item),
      },
    }));
  };

  const handleRequestAction = (org: string, action: "accept" | "reject") => {
    setData((prevData) => ({
      ...prevData,
      Request: {
        ...prevData.Request,
        Pending: prevData.Request.Pending.filter((item) => !item.includes(org)),
      },
    }));
    setCompletedRequests((prev) => [
      ...prev,
      { org, status: action === "accept" ? "accepted" : "rejected" },
    ]);
  };

  return (
    <div
      className={`${spaceGrotesk.className} flex flex-col p-6 md:p-10 w-full !bg-[#13111C]`}
    >
      <h1 className="text-lg md:text-3xl font-semibold mb-4">Notifications</h1>
      <TabBar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex md:grid-cols-3 gap-6 mt-6 w-full">
        {activeTab === "Request" ? (
          <div className="flex gap-2 w-full md:flex-row flex-col">
            <div className="flex w-full ">
              <RequestSection
                title="Pending"
                requests={data.Request.Pending}
                onAction={handleRequestAction}
              />
            </div>
            <div className="flex w-full ">
              <CompletedRequestsSection requests={completedRequests} />
            </div>
          </div>
        ) : (
          <div className="flex gap-2 w-full md:flex-row flex-col">
            {Object.entries(data[activeTab as keyof NotificationData]).map(
              ([title, items]) => (
                <NotificationSection
                  key={title}
                  title={title}
                  notifications={items as string[]}
                  onCheck={
                    activeTab === "Activity"
                      ? (item) =>
                          title === "Done"
                            ? handleUncheck(item)
                            : handleCheck(item, title)
                      : undefined
                  }
                  isDoneSection={title === "Done"}
                  activeTab={activeTab}
                />
              )
            )}
          </div>
        )}
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
    <div className="flex space-x-2 mb-6">
      {tabs.map((tab) => (
        <Button
          key={tab}
          variant="outline"
          onClick={() => setActiveTab(tab)}
          className={`flex flex-row gap-1 bg-transparent ${
            activeTab === tab ? "border-[#52297A] text-[#BF93EC]" : "text-white"
          }`}
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
  isDoneSection = false,
  activeTab,
}: {
  title: string;
  notifications: string[];
  onCheck?: (item: string) => void;
  isDoneSection?: boolean;
  activeTab: string;
}) {
  return (
    <div className="rounded-lg border-[1px] border-[#1E293B] w-full">
      <div className="flex p-2 border-b-[1px] border-[#1E293B]">
        <h2 className="text-lg font-semibold text-[#94A3B8]">{title}</h2>
      </div>
      <ul className="space-y-2 p-2">
        {notifications.map((item, index) => (
          <NotificationItem
            key={index}
            item={item}
            onCheck={onCheck}
            isDone={isDoneSection}
            activeTab={activeTab}
          />
        ))}
      </ul>
    </div>
  );
}

function NotificationItem({
  item,
  onCheck,
  isDone,
  activeTab,
}: {
  item: string;
  onCheck?: (item: string) => void;
  isDone: boolean;
  activeTab: string;
}) {
  if (activeTab !== "Activity")
    return <li className="text-gray-300">{item}</li>;

  return (
    <motion.li
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "flex items-center text-gray-300 px-2 gap-2",
        isDone && "opacity-50"
      )}
    >
      <div className="relative flex items-center">
        <input
          type="checkbox"
          checked={isDone}
          onChange={() => onCheck?.(item)}
          className="absolute w-4 h-4 opacity-0 cursor-pointer"
        />
        <div
          className={cn(
            "w-4 h-4 border border-[#424244] rounded-full",
            isDone && "border-[#BF93EC]"
          )}
        >
          <Check
            size={16}
            className={cn("text-[#424244]", isDone && "text-[#BF93EC]")}
          />
        </div>
      </div>
      <span>{item}</span>
    </motion.li>
  );
}

function RequestSection({
  title,
  requests,
  onAction,
}: {
  title: string;
  requests: string[];
  onAction: (org: string, action: "accept" | "reject") => void;
}) {
  return (
    <div className="rounded-lg border-[1px] border-[#1E293B] w-full">
      <div className="flex p-2 border-b-[1px] border-[#1E293B]">
        <h2 className="text-lg font-semibold text-[#94A3B8]">{title}</h2>
      </div>

      <ul className="space-y-2 flex flex-col gap-2 p-4">
        {requests.map((request, index) => (
          <li
            key={index}
            className="flex items-center justify-between text-[#94A3B8]"
          >
            <span>{request}</span>
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                className="text-white rounded-xl border-[#181622] hover:border-green-200"
                onClick={() => onAction(request, "accept")}
              >
                Accept
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-white rounded-xl border-[#181622] hover:border-red-200"
                onClick={() => onAction(request, "reject")}
              >
                Reject
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CompletedRequestsSection({
  requests,
}: {
  requests: Array<{ org: string; status: "accepted" | "rejected" }>;
}) {
  return (
    <div className="rounded-lg border-[1px] border-[#1E293B] w-full">
      <div className="flex p-2 border-b-[1px] border-[#1E293B]">
        <h2 className="text-lg font-semibold text-[#94A3B8]">Completed</h2>
      </div>
      <ul className="space-y-1 p-4">
        {requests.map((request, index) => (
          <li key={index} className="flex items-center justify-between ">
            <span className="text-[#94A3B8] text-sm">{request.org}</span>
            <div
              className={`flex items-center text-[#94A3B8] rounded-xl border-[#181622] px-2 py-1 border-[0.5px] text-sm ${
                request.status === "accepted"
                  ? "text-green-100 border-green-100"
                  : "text-red-100 border-red-100"
              }`}
            >
              {request.status === "accepted" ? "Accepted" : "Rejected"}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
