import { API_BASE_URL } from "@/constants";
import { RestaurantSearchResponse } from "@/types";
import { useQuery } from "react-query";

export const useRestaurantPublic = (city?: string) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    const res = await fetch(`${API_BASE_URL}/api/restaurant/search/${city}`);

    if (!res.ok) {
      throw new Error("Failed to get restaurants");
    }

    return res.json();
  };

  const { data: results, isLoading } = useQuery(
    ["SearchRestaurants"],
    createSearchRequest,
    { enabled: !!city }
  );

  return { results, isLoading };
};
