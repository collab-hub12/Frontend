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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import { addMember } from "@/actions/org.action";
import useDebounce from "@/hooks/UseDebounce";
import api from "@/utilities/axios";
import { parseUrlPath } from "@/utilities/parseUrl";

import { useActionState } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import { User } from "@/utilities/types";
import { useRouter } from "next/router";
import { usePathname, useSearchParams } from "next/navigation";
import { AxiosError } from "axios";
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
          name
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <>
        <div className="flex gap-2 items-center">
          {/* <Avatar>
            <AvatarImage src={Usages.Avatar} alt="ok" />
            <AvatarFallback>{row.getValue("name")}</AvatarFallback>
          </Avatar> */}
          <div className="uppercase">{row.getValue("name")}</div>
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
      const { org_id, team_id, task_id } = parseUrlPath(pathname);
      const user_id = row.original.id;

      if (!task_id) {
        const addMemberWithPayload = addMember.bind(null, {
          user_id,
          org_id: +org_id!,
          team_id,
        });

        const [state, formAction] = useFormState(addMemberWithPayload, null);

        React.useEffect(() => {
          if (state) {
            if (state.error) {
              toast.error(state.message);
            } else {
              toast.success(state.message);
            }
          }
        }, [state]);

        return (
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className="border-[#52297A] text-[#BF93EC]  hover:text-white"
            >
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <form action={formAction}>
                  <button type="submit">Add User</button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      } else {
        const assignTaskToUser = async () => {
          try {
            const { data } = await api.post(
              `orgs/${org_id}/teams/${team_id}/tasks/${task_id}`,
              { assignee_id: user_id }
            );
            toast.success(data?.msg);
            revalidatePath(`orgs/${org_id}/teams/${team_id}/tasks/${task_id}`);
          } catch (err) {
            const errorMsg = (err as AxiosError<{ message: string }>)?.response
              ?.data.message;
            toast.error(errorMsg!);
          }
        };

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <button
                  onClick={() => {
                    assignTaskToUser();
                  }}
                >
                  assign user
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
    },
  },
];

interface propType {
  org_id?: number;
  team_id?: number;
}

export default function Member({ org_id, team_id }: propType) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<any[]>([]); // Replace with your API response type

  const getUsers = async (searchTerm: string) => {
    if (org_id && team_id) {
      return await api.get(
        `/orgs/${org_id}/teams/${team_id}/users?search=${searchTerm}`
      );
    } else if (org_id) {
      return await api.get(`/orgs/${org_id}/users?search=${searchTerm}`);
    } else {
      return await api.get(`/users?search=${searchTerm}`);
    }
  };

  useDebounce(
    async (searchTerm) => {
      const { data } = await getUsers(searchTerm as string);
      setSearchResults(data);
    },
    [searchTerm],
    500
  ); // Debounce with 500ms delay

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const table = useReactTable({
    data: searchResults,
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
    <div className="w-full">
      <div className="flex justify-between items-center gap-4 py-4">
        <div>
          <Input
            placeholder="Search Users"
            value={searchTerm}
            onChange={handleChange}
            className="max-w-sm"
          />
        </div>
      </div>
      <div className="rounded-md border border-slate-800 h-[300px] overflow-auto">
        <Table className="relative w-full">
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="flex items-center justify-between w-full border-slate-800 h-[60px]"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="flex items-center justify-start border-slate-800"
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
