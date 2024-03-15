import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-pink-500" />
      </SheetTrigger>
      <SheetContent className="space-y-5">
        <SheetTitle>Navigation</SheetTitle>
        <SheetDescription className="flex">
          <Button className="flex-1 font-bold bg-pink-500">Log In</Button>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
