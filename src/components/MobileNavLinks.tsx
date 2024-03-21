import { useAuth0 } from "@auth0/auth0-react";
import Link from "next/link";
import { Button } from "./ui/button";

const MobileNavLinks = () => {
  const { logout } = useAuth0();

  return (
    <div className="w-full flex flex-col gap-3">
      <Link href="/user-profile" className="hover:text-pink-500">
        User Profile
      </Link>
      <Button onClick={() => logout()} className="flex-1 font-bold bg-pink-500">
        Log Out
      </Button>
    </div>
  );
};

export default MobileNavLinks;
