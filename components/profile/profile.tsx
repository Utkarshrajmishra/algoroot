"use client";
import { User, LogOut, Mail, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/auth-context";

const Profile = () => {
  const { user, logout, deleteAccount } = useAuth();

  

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="rounded-full flex items-center justify-center h-10 w-10 outline-1 outline-blue-200 bg-neutral-900 cursor-pointer">
          <User className="size-6 text-zinc-200" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit font-inter bg-neutral-950 text-white outline-1 outline-zinc-800">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            {user ? user.name : "Guest"}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Mail className="mr-2 h-4 w-4" />
            {user ? user.email : "No email"}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <button
              type="button"
              onClick={logout}
              className="flex gap-2 w-full"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <button
              type="button"
              onClick={()=>deleteAccount(user?.id ? user?.id : "00")}
              className="flex gap-2 w-full items-center"
            >
              <Trash className="mr-2 h-4 w-4" />
              <span>Delete account</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
