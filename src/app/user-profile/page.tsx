"use client";

import UserProfileForm from "@/components/UserProfileForm";
import { useUpdateUser } from "@/hooks/useUpdateUser";

const UserProfilePage = () => {
  const { isLoading, updateUser } = useUpdateUser();

  return <UserProfileForm isLoading={isLoading} onSave={updateUser} />;
};

export default UserProfilePage;
