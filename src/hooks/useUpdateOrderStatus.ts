import { API_BASE_URL } from "@/constants";
import { UpdateOrderSatusRequest } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { toast } from "sonner";

export const useUpdateOrderStatus = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateOrderStatusRequest = async (
    updateOrderStatusRequest: UpdateOrderSatusRequest
  ) => {
    const accessToken = await getAccessTokenSilently();

    const res = await fetch(
      `${API_BASE_URL}/api/my/restaurant/order/${updateOrderStatusRequest.orderId}/status`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: updateOrderStatusRequest.status }),
      }
    );

    console.log(res);

    if (!res.ok) {
      throw new Error("Failed to update order status");
    }
  };

  const {
    mutateAsync: updateOrderStatus,
    isLoading,
    isSuccess,
    isError,
    error,
    reset,
  } = useMutation(updateOrderStatusRequest);

  if (isSuccess) {
    toast.success("Order status updated");
  }

  if (isError) {
    toast.error("Unable to update order status");
    reset();
  }

  return {
    isLoading,
    updateOrderStatus,
  };
};
