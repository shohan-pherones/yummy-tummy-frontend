import { useAuth0 } from "@auth0/auth0-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { CircleUserRound } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const UserMenu = () => {
  const { user, logout } = useAuth0();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="font-bold hover:text-pink-500 flex items-center gap-2">
        <CircleUserRound />
        {user?.email}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href="/user-profile">User Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button onClick={() => logout()} className="font-bold bg-pink-500">
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
