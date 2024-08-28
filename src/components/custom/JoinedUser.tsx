"use client";

import * as React from "react";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
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
import { User } from "@/utilities/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { usePathname } from "next/navigation";
import { parseUrlPath } from "@/utilities/parseUrl";
import { useFormState } from "react-dom";
import { makeUserAdmin, removeUser } from "@/actions/org.action";
import toast from "react-hot-toast";
import revalidatePath from "@/lib/revalidate";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <>
        <div className="flex gap-2 items-center">
          <Avatar
            className={row.original.isAdmin ? "ring-4 ring-blue-600 " : ""}
          >
            <AvatarImage src={row.original.picture} alt="ok" />
            <AvatarFallback>{}</AvatarFallback>
          </Avatar>
        </div>
      </>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          User Email
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("email")}</div>
      //   <div className='lowercase'>bneogi102002@gmail.com</div>
    ),
  },
  {
    accessorKey: "customisation",
    header: () => <div className="text-right">Customisation</div>,
    cell: ({ row }) => {
      const pathname = usePathname();
      const { org_id, team_id } = parseUrlPath(pathname)!;
      const user_id = row.original.id;

      const removeUserWithPayload = removeUser.bind(null, {
        user_id,
        org_id: org_id!,
        team_id: team_id!,
      });

      const makeUserAdminWithPayload = makeUserAdmin.bind(null, {
        user_id,
        org_id: org_id!,
        team_id: team_id!,
      });

      const [removeUserstate, removeUserformAction] = useFormState(
        removeUserWithPayload,
        null
      );

      const [makeUserAdminstate, makeUserAdminformAction] = useFormState(
        makeUserAdminWithPayload,
        null
      );

      // show toast on user removal
      React.useEffect(() => {
        if (removeUserstate) {
          if (removeUserstate.error) {
            toast.error(removeUserstate.message);
          } else {
            toast.success(removeUserstate.message);
            revalidatePath("orgs");
          }
        }
      }, [removeUserstate]);

      // show toast on user admin permission granting
      React.useEffect(() => {
        if (makeUserAdminstate) {
          if (makeUserAdminstate.error) {
            toast.error(makeUserAdminstate.message);
          } else {
            toast.success(makeUserAdminstate.message);
          }
        }
      }, [makeUserAdminstate]);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Power Ups</DropdownMenuLabel>
            <DropdownMenuItem>
              <form action={removeUserformAction}>
                <button type="submit">Kick User</button>
              </form>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <form action={makeUserAdminformAction}>
                <button type="submit">Make Admin</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

type propType = {
  data: User[];
};

export function JoinedUser({ data }: propType) {
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
  const [startIndex, setStartIndex] = React.useState(0);
  const [endIndex, setEndIndex] = React.useState(rowsPerPage);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center gap-4 py-4">
        <div>
          <Input
            placeholder="Search Users"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
      </div>
      <div className="rounded-md border dark:border-slate-800 h-[300px]">
        <Table className="relative w-full">
          <TableHeader className="flex items-center w-full">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="flex items-center w-full dark:border-slate-800 sticky top-0"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="flex items-center w-full justify-center dark:border-slate-800 sticky top-0"
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
              table
                .getRowModel()
                .rows.slice(startIndex, endIndex)
                .map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="flex items-center w-full dark:border-slate-800 h-[60px]"
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
        <div className="pb-2">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className={
                    startIndex === 0
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                  onClick={() => {
                    setStartIndex(startIndex - rowsPerPage);
                    setEndIndex(endIndex - rowsPerPage);
                  }}
                />
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  className={
                    endIndex === 6
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                  onClick={() => {
                    setStartIndex(startIndex + rowsPerPage);
                    setEndIndex(endIndex + rowsPerPage);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
