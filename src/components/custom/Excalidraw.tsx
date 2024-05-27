"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import {
  ExcalidrawAPIRefValue,
  ExcalidrawImperativeAPI,
} from "@excalidraw/excalidraw/types/types";
import { socket } from "@/lib/socket";

export default function ExcalidrawComponent() {
  const [isConnected, setIsConnected] = useState(false);
  const [excalidrawAPI, setExcalidrawAPI] =
    useState<ExcalidrawImperativeAPI | null>(null);
  const excalidraw = useRef<ExcalidrawAPIRefValue | null>(null);
  const [isCollaborating, setIsCollaborating] = useState(false);

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  useEffect(() => {
    function changeBoardState({ elements }: { elements: any; appState: any }) {
      if (excalidraw.current) {
        excalidraw.current?.readyPromise
          ?.then((d) => {
            console.log(elements);

            d.updateScene({ elements });
          })
          .catch((d) => console.log(d));
      }
    }

    socket.on("message", changeBoardState);
    return () => {
      socket.off("message", changeBoardState);
    };
  }, []);

  const onChange = (elements: any, appState: any) => {
    socket.emit("message", { elements, appState });
  };

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <p style={{ fontSize: "16px" }}>
        Selecting the checkbox to see the collaborator count
      </p>

      <Excalidraw
        ref={excalidraw}
        // renderTopRightUI={() => (
        //   <LiveCollaborationTrigger
        //     onChange={(data) => {}}
        //     isCollaborating={isCollaborating}
        //     onSelect={() => {
        //       setIsCollaborating(true);
        //     }}
        //   />
        // )}
        onChange={(el) => {
          socket.emit("message", { elements: el });
        }}
      />
    </div>
  );
}
