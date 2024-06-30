import React from "react";
import { Card, CardContent } from "../ui/card";
import { ModeToggle } from "../mode-toggle";

export default function Navbar() {
  return (
    <Card className="flex px-10 py-2 flex-between rounded-none border-b-1 border-t-0 border-x-0   items-center justify-between">
      <div className="flex text-2xl font-bold">COLLABHUB</div>
      <ModeToggle />
    </Card>
  );
}
