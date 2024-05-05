import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Usages } from "../../../public/assets";
const memberData = [
  {
    member_name: "Bishakh Neogi",
    member_email: "bneogi102002@gmail.com",
    member_joined: "2021-10-02",
  },
  {
    member_name: "Bishakh Neogi",
    member_email: "bneogi102002@gmail.com",
    member_joined: "2021-10-02",
  },
  {
    member_name: "Bishakh Neogi",
    member_email: "bneogi102002@gmail.com",
    member_joined: "2021-10-02",
  },
  {
    member_name: "Bishakh Neogi",
    member_email: "bneogi102002@gmail.com",
    member_joined: "2021-10-02",
  },
  {
    member_name: "Bishakh Neogi",
    member_email: "bneogi102002@gmail.com",
    member_joined: "2021-10-02",
  },
  {
    member_name: "Bishakh Neogi",
    member_email: "bneogi102002@gmail.com",
    member_joined: "2021-10-02",
  },
  {
    member_name: "Bishakh Neogi",
    member_email: "bneogi102002@gmail.com",
    member_joined: "2021-10-02",
  },
];
export default function Member() {
  return (
    <div className="dark:border-slate-800 border rounded-md pb-4">
      <Table className="w-full ">
        <TableCaption>A list of team members</TableCaption>
        <TableHeader className="dark:border-b-slate-800">
          <TableRow className="dark:border-b-slate-800">
            <TableHead colSpan={3}>Members</TableHead>
            <TableHead>Joined</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="w-full">
          {memberData.map((memberData, idx) => (
            <TableRow key={idx} className="w-full border-none">
              <TableCell colSpan={3} className="font-medium flex gap-4 py-4">
                <Avatar>
                  <AvatarImage src={Usages.Avatar} alt="ok" />
                  <AvatarFallback>BN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <div>{memberData.member_name}</div>
                  <div>{memberData.member_email}</div>
                </div>
              </TableCell>

              <TableCell className="font-medium" colSpan={3}>
                {memberData.member_joined}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
