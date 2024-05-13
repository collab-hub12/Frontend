"use client";
import React, { useState } from "react";
import { Input } from "./input";
import useDebounce from "@/hooks/UseDebounce";
import api from "@/utilities/axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "./button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

const SearchMember = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]); // Replace with your API response type
  const debouncedSearchTerm = useDebounce(
    async (searchTerm) => {
      // Call your API here (replace with your actual API call)
      const { data } = await api.get(`/users?search=${searchTerm}`);
      console.log(data);
      setSearchResults(data);
    },
    [searchTerm],
    500
  ); // Debounce with 500ms delay

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <div className="flex flex-col w-full max-w-sm items-center space-x-2 m-5">
        <Input
          placeholder="search for users to join"
          value={searchTerm}
          onChange={handleChange}
        />
        {searchResults.map(() => {
          return (
            <div className="rounded-md border dark:border-slate-800  overflow-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <DotsHorizontalIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Add User</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SearchMember;
