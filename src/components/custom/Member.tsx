"use client";

import * as React from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
} from "../ui/alert-dialog";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { SquareX, X } from "lucide-react";
import Link from "next/link";
import { Org } from "@/utilities/types";
import { createOrg } from "@/actions/org.action";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Usages } from "../../../public/assets";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

const data: User[] = [
  {
    username: "Bishakh Neogi",
    user_email: "bneogi102002@gmail.com",
  },
  {
    username: "Irshit Mukherjee",
    user_email: "irshit@gmail.com",
  },
  {
    username: "Soham Pal",
    user_email: "soham@gmail.com",
  },
  {
    username: "Anurag Tiwari",
    user_email: "anurag@gmail.com",
  },
  {
    username: "Shreya Dhar",
    user_email: "shreya@gmail.com",
  },
  {
    username: "Neelakshi Das",
    user_email: "bluecoder2003@gmail.com",
  },
];
export type User = {
  username: string;
  user_email: string;
};
export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username
          <CaretSortIcon className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => (
      <>
        <div className='flex gap-2 items-center'>
          <Avatar>
            <AvatarImage src={Usages.Avatar} alt='ok' />
            <AvatarFallback>BN</AvatarFallback>
          </Avatar>
          <div className='uppercase'>{row.getValue("username")}</div>
        </div>
      </>
    ),
  },
  {
    accessorKey: "user_email",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          User Email
          <CaretSortIcon className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className='lowercase'>{row.getValue("user_email")}</div>
      //   <div className='lowercase'>bneogi102002@gmail.com</div>
    ),
  },
  {
    accessorKey: "customisation",
    header: () => <div className='text-right'>Customisation</div>,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <DotsHorizontalIcon className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Power Ups</DropdownMenuLabel>
            <DropdownMenuItem>Kick User</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Make Admin</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

type propType = {
  data: User[];
};

export function Member() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const rowsPerPage = 3;

  return (
    <div className='w-full'>
      <div className='flex justify-between items-center gap-4 py-4'>
        <div>
          <Input
            placeholder='Search Users'
            value={
              (table.getColumn("username")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("username")?.setFilterValue(event.target.value)
            }
            className='max-w-sm'
          />
        </div>
      </div>
      <div className='rounded-md border dark:border-slate-800 h-[300px] overflow-auto'>
        <Table className='relative w-full'>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className='flex items-center justify-between w-full dark:border-slate-800 h-[60px]'
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className='flex items-center justify-start dark:border-slate-800'
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
