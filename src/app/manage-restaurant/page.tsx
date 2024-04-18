"use client";

import ManageRestaurantForm from "@/components/ManageRestaurantForm";
import { useCreateRestaurant } from "@/hooks/useCreateRestaurant";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading } = useCreateRestaurant();

  return (
    <ManageRestaurantForm isLoading={isLoading} onSave={createRestaurant} />
  );
};

export default ManageRestaurantPage;
