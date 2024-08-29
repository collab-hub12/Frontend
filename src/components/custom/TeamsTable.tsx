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
import { PlusIcon, SquareX, X } from "lucide-react";
import Link from "next/link";
import { Team } from "@/utilities/types";
import { createTeam } from "@/actions/team.action";
import toast from "react-hot-toast";
import { useFormState } from "react-dom";
import { useParams, useRouter } from "next/navigation";

export const columns: ColumnDef<Team>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Team ID
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Team Name
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="uppercase">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "customisation",
    header: () => <div className="text-right">Customisation</div>,
    cell: ({ row }) => {
      const router = useRouter();
      const { org_id } = useParams();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="dark:border-[#52297A] dark:text-[#BF93EC]  hover:text-white"
          >
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="dark:border-[#52297A]  dark:text-[#BF93EC]  hover:text-white"
          >
            <DropdownMenuLabel>Buckle Up</DropdownMenuLabel>
            <DropdownMenuItem>Edit Team</DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                router.push(`/orgs/${org_id}/teams/${row.original.id}`);
              }}
            >
              Enter Team
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete Team</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

type propType = {
  data: Team[];
  org_id: number;
};

export function TeamsTable({ data, org_id }: propType) {
  const createTeamwithOrgId = createTeam.bind(null, org_id);
  const [createTeamActionState, createTeamAction] = useFormState(
    createTeamwithOrgId,
    null
  );
  // show toast on user admin permission granting
  React.useEffect(() => {
    if (createTeamActionState) {
      if (createTeamActionState.error) {
        toast.error(createTeamActionState.message);
      } else {
        toast.success(createTeamActionState.message);
      }
    }
  }, [createTeamActionState]);

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
    <div className="w-full">
      <div className="flex justify-between items-center gap-4 py-4">
        <div>
          <Input
            placeholder="Filter Team Names"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        <div className="flex items-center gap-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="flex flex-row gap-1 dark:border-[#52297A] dark:text-[#BF93EC] hover:dark:bg-[#52297A] hover:text-white"
              >
                <PlusIcon className="w-4 h-4" />
                Create Team
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="dark:text-white dark:border-[#52297A] dark:border-[0.5px]">
              <div className="flex flex-col w-full">
                <div className="flex justify-end w-full">
                  <AlertDialogCancel className="border-none">
                    <X />
                  </AlertDialogCancel>
                </div>
                <form action={createTeamAction} className="flex flex-col gap-2">
                  <label>Team Name</label>
                  <Input name="team_name" placeholder="Team Name" />

                  <div className="flex justify-center items-center">
                    <AlertDialogAction
                      type="submit"
                      className="flex gap-2 dark:bg-[#52297A] dark:text-white hover:dark:bg-[#5a377d] hover:dark:text-white"
                    >
                      Create Team
                    </AlertDialogAction>
                  </div>
                </form>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <div className="rounded-md border dark:border-slate-800 ">
        <Table className="flex flex-col w-full">
          <TableHeader className="flex items-center w-full">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="flex items-center w-full dark:border-slate-800"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="flex items-center w-full justify-center dark:border-slate-800"
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
                  className="flex items-center w-full dark:border-slate-800"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="flex items-center w-full justify-center dark:border-slate-800"
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
                  className="h-24 text-center"
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
