"use client";
import { socket } from "@/lib/socket";
import { useState, useEffect, useCallback } from "react";
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  useEdgesState,
  useNodesState,
  MiniMap,
  useReactFlow,
  ReactFlowProvider,
  ReactFlowInstance,
} from "reactflow";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { v4 as uuid } from "uuid";
import { Board, User } from "@/utilities/types";

function Flow({
  roomId,
  user,
  task_id,
  board_details,
}: {
  roomId: string;
  user: User;
  task_id: number;
  board_details: Board;
}) {
  const [nodes, setNodes] = useNodesState(board_details?.nodes ?? []);
  const [edges, setEdges] = useEdgesState(board_details?.edges ?? []);
  const [nodelabel, setNodelabel] = useState("");
  const [connectedUsers, setConnectedUsers] = useState<string[]>([]);

  useEffect(() => {
    const socketConnection = () => {
      socket.emit("join", {
        user: { ...user, userId: user.id, username: user.name },
        roomId,
      });
    };
    const disconnectSocket = () => {
      socket.disconnect();
    };

    window.addEventListener("beforeunload", disconnectSocket);
    socketConnection();
    return () => {
      window.removeEventListener("beforeunload", disconnectSocket);
    };
  }, []);

  useEffect(() => {
    const getConnectedUsers = (data: any) => {
      const onlineUser = data?.users?.map((user: any) => user.username) || [];
      setConnectedUsers(onlineUser);
    };
    socket.on("connectedUsers", getConnectedUsers);
    return () => {
      socket.off("connectedUsers", getConnectedUsers);
    };
  }, [connectedUsers]);

  useEffect(() => {
    // Listen for changes from other clients
    socket.on("nodesChange", (newNodes) => {
      setNodes(newNodes);
    });

    socket.on("edgesChange", (newEdges) => {
      setEdges(newEdges);
    });

    return () => {
      socket.off("nodesChange");
      socket.off("edgesChange");
    };
  }, [setNodes, setEdges]);

  const handleNodesChange: OnNodesChange = (changes) => {
    const newNodes = applyNodeChanges(changes, nodes);
    setNodes(newNodes);
    socket.emit("nodesChange", { roomId, changes: newNodes, task_id });
  };

  const handleEdgesChange: OnEdgesChange = (changes) => {
    const newEdges = applyEdgeChanges(changes, edges);
    setEdges(newEdges);
    socket.emit("edgesChange", { roomId, changes: newEdges, task_id });
  };

  const onConnect: OnConnect = (params) => {
    const newEdge = addEdge(params, edges);
    setEdges(newEdge);
    socket.emit("edgesChange", { roomId, changes: newEdge, task_id });
  };

  return (
    <div className="h-[80vh] w-[80vw] flex items-center flex-col ">
      Connected Users:{" "}
      {connectedUsers.length > 0
        ? connectedUsers.join(", ")
        : "No users connected"}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={onConnect}
        fitView
        className="flex items-center w-full justify-center"
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
      <div className="flex gap-4 items-center py-4">
        <h1 className="text-xl font-bold text-blue-500">
          Component Onboarding
        </h1>
        <Input
          className="py-2 w-[40%] flex p-6"
          onChange={(e) => setNodelabel(e.target.value)}
          defaultValue={nodelabel}
          placeholder="Component name"
        />
      </div>
      <Button
        className="m-4"
        onClick={() => {
          const node_id = uuid();
          const node = {
            id: node_id,
            data: { label: nodelabel },
            position: { x: 0, y: 0 },
          };
          setNodes((prev) => [...prev, node]);
        }}
      >
        Add node
      </Button>
    </div>
  );
}

function DrawingComponent({
  roomId,
  user,
  task_id,
  board_details,
}: {
  roomId: string;
  user: User;
  task_id: number;
  board_details: Board;
}) {
  return (
    <ReactFlowProvider>
      <Flow
        roomId={roomId}
        user={user}
        task_id={task_id}
        board_details={board_details}
      />
    </ReactFlowProvider>
  );
}

export default DrawingComponent;
