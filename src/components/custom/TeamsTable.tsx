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
import { Checkbox } from "@/components/ui/checkbox";
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

const data: TeamsData[] = [
  {
    id: "m5gr84i9",
    team_name: "Frontend Team",
  },
  {
    id: "3u1reuv4",
    team_name: "Backend Team",
  },
  {
    id: "derv1ws0",
    team_name: "Devops Team",
  },
];

export type TeamsData = {
  id: string;
  team_name: string;
};

export const columns: ColumnDef<TeamsData>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Team ID
          <CaretSortIcon className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => <div className='lowercase'>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "team_name",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Team Name
          <CaretSortIcon className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className='uppercase'>{row.getValue("team_name")}</div>
    ),
  },
  {
    accessorKey: "customisation",
    header: () => <div className='text-right'>Customisation</div>,
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <DotsHorizontalIcon className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Buckle Up</DropdownMenuLabel>
            <DropdownMenuItem>Edit Team</DropdownMenuItem>
            <Link href='/work'>
              <DropdownMenuItem>Enter Team</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete Team</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function TeamsTable() {
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

  return (
    <div className='w-full'>
      <div className='flex justify-between items-center gap-4 py-4'>
        <div>
          <Input
            placeholder='Filter Team Names'
            value={
              (table.getColumn("team_name")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("team_name")?.setFilterValue(event.target.value)
            }
            className='max-w-sm'
          />
        </div>
        <div className='flex items-center gap-4'>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant='outline'>Create Team</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className='dark:text-white'>
              <div className='flex flex-col w-full'>
                <div className='flex justify-end w-full'>
                  <AlertDialogCancel className='border-none'>
                    <X />
                  </AlertDialogCancel>
                </div>
                <form className='p-10 flex flex-col gap-2'>
                  <label>Team ID</label>
                  <Input placeholder='Team ID' />
                  <label>Team Name</label>
                  <Input placeholder='Team Name' />
                </form>
                <div className='flex justify-center items-center'>
                  <AlertDialogAction>Create Team</AlertDialogAction>
                </div>
              </div>
            </AlertDialogContent>
          </AlertDialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant='outline'>Join Team</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className='dark:text-white'>
              <div className='flex flex-col w-full'>
                <div className='flex justify-end w-full'>
                  <AlertDialogCancel className='border-none'>
                    <X />
                  </AlertDialogCancel>
                </div>
                <form className='p-10 flex flex-col gap-2'>
                  <label>Team ID</label>
                  <Input placeholder='Team ID' />
                  <label>Team Name</label>
                  <Input placeholder='Team Name' />
                </form>
                <div className='flex justify-center items-center'>
                  <AlertDialogAction>Join Team</AlertDialogAction>
                </div>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <div className='rounded-md border dark:border-slate-800 '>
        <Table className='flex flex-col w-full'>
          <TableHeader className='flex items-center w-full'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className='flex items-center w-full dark:border-slate-800'
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className='flex items-center w-full justify-center dark:border-slate-800'
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className='flex items-center w-full dark:border-slate-800'
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className='flex items-center w-full justify-center dark:border-slate-800'
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
