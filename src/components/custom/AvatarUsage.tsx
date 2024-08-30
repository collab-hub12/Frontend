import { getOrgDetails } from "@/lib/orgs.query";
import { getSession } from "@/lib/session";
import { getUsers } from "@/lib/users.query";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogoutHandler } from "@/actions/auth.action";
export default async function AvatarUsage() {
  const data = await getSession();
  if (data?.statusCode === 401) {
    redirect("/");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="rounded-full border-1 border-[#52297A]">
            <AvatarImage src={data?.picture} alt="ok" />
            <AvatarFallback>
              {data?.name.substr(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-[#BF93EC] ">
              {data?.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground bg-clip-text text-transparent bg-gradient-to-r from-[#C6BEE5] via-[#7B89D4] to-[#C6BEE5]">
              {data?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <form action={LogoutHandler} className="w-full">
            <button type="submit" className="w-full">
              Logout
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
