"use client";

import { useRestaurantPublic } from "@/hooks/useRestaurantPublic";

const SearchPage = ({ params }: { params: { city: string } }) => {
  const { results, isLoading } = useRestaurantPublic(params.city);

  return (
    <div>
      {results?.data.map((restaurant) => (
        <div key={restaurant._id}>
          <h2>{restaurant.restaurantName}</h2>
          <p>
            {restaurant.city}, {restaurant.country}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SearchPage;
