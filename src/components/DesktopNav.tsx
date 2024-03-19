"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";

const DesktopNav = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      onClick={async () => loginWithRedirect()}
      variant="ghost"
      className="font-bold hover:text-pink-500 hover:bg-white"
    >
      Log In
    </Button>
  );
};

export default DesktopNav;
