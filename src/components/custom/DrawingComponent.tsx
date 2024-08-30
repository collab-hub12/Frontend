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
import { PlusIcon } from "lucide-react";

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
    <div className="h-[60vh] w-full flex items-center flex-col ">
      <div className="flex gap-4 items-center py-4 flex-col md:flex-row justify-between w-full">
        <h1 className="text-white font-bold text-xl basis-[50%]">
          Draw your flowcharts at ease
        </h1>
        <div className="flex items-center gap-2 basis-[50%]">
          <Input
            className="py-2  flex p-6"
            onChange={(e) => setNodelabel(e.target.value)}
            defaultValue={nodelabel}
            placeholder="Component name"
          />

          <Button
            variant="outline"
            className="flex flex-row gap-1 border-[#52297A] text-[#BF93EC] hover:bg-[#52297A] hover:text-white"
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
            <PlusIcon className="w-4 h-4" />
            Add Node
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6 items-start w-full">
        {connectedUsers.length > 0 ? (
          connectedUsers.map((username) => (
            <Button key={username} variant="outline" size="sm">
              {username}
            </Button>
          ))
        ) : (
          <span>No users connected</span>
        )}
      </div>
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
