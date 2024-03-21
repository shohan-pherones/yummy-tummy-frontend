import { API_BASE_URL } from "@/constants";
import { useMutation } from "react-query";

type CreateUserType = {
  auth0Id: string;
  email: string;
};

export const useCreateUser = () => {
  const createMyUserRequest = async (user: CreateUserType) => {
    const res = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!res.ok) {
      throw new Error("Failed to create user");
    }
  };

  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createMyUserRequest);

  return {
    createUser,
    isLoading,
    isError,
    isSuccess,
  };
};
