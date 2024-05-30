"use client";

import Error from "@/components/Error";
import Loading from "@/components/Loading";
import OrderStatusDetail from "@/components/OrderStatusDetail";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useGetMyOrders } from "@/hooks/useGetMyOrders";
import Image from "next/image";

const OrderStatusPage = () => {
  const { orders, isLoading } = useGetMyOrders();

  if (isLoading) {
    return <Loading />;
  }

  if (!orders?.length) {
    return <Error message="No order found" />;
  }

  return (
    <div className="container mx-auto space-y-10 mt-10">
      {orders.map((order) => (
        <div key={order._id} className="space-y-10 bg-gray-50 p-10 rounded-lg">
          <OrderStatusHeader order={order} />
          <div className="grid md:grid-cols-2 gap-10">
            <OrderStatusDetail order={order} />
            <AspectRatio ratio={16 / 5}>
              <Image
                src={order.restaurant.imageUrl}
                alt={order.restaurant.restaurantName}
                fill
                className="w-full h-full object-cover rounded-md"
              />
            </AspectRatio>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStatusPage;
