"use client";

import { useGetUser } from "@/hooks/useGetUser";
import { useAuth0 } from "@auth0/auth0-react";
import { Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import UserProfileForm, { UserFormDataType } from "./UserProfileForm";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

interface Props {
  onCheckout: (userFormData: UserFormDataType) => void;
  disabled: boolean;
  isLoading: boolean;
}

const CheckoutButton = ({ disabled, onCheckout, isLoading }: Props) => {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();

  const pathname = usePathname();

  const { currentUser, isLoading: isGetUserLoading } = useGetUser();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };

  if (!isAuthenticated) {
    return (
      <Button onClick={handleLogin} className="bg-pink-500 flex-1">
        Log in to checkout
      </Button>
    );
  }

  if (!currentUser || isAuthLoading || isLoading) {
    return (
      <Button disabled className="flex-1 flex items-center gap-2">
        <Loader2 className="animate-spin" size={18} />
        <span>Loading</span>
      </Button>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-pink-500 flex-1" disabled={disabled}>
          Proceed to checkout
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[450px] md:max-w-[750px] bg-gray-50">
        <UserProfileForm
          currentUser={currentUser}
          isLoading={isGetUserLoading}
          onSave={onCheckout}
          noMargin
          title="Confirm Delivery Details"
          buttonText="Continue to payment"
        />
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutButton;
