import { SearchState } from "@/app/search/[city]/page";
import { API_BASE_URL } from "@/constants";
import { RestaurantSearchResponse } from "@/types";
import { useQuery } from "react-query";

export const useRestaurantPublic = (
  searchState: SearchState,
  city?: string
) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisines", searchState.selectedCuisines.join(","));

    const res = await fetch(
      `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
    );

    if (!res.ok) {
      throw new Error("Failed to get restaurants");
    }

    return res.json();
  };

  const { data: results, isLoading } = useQuery(
    ["SearchRestaurants", searchState],
    createSearchRequest,
    { enabled: !!city }
  );

  return { results, isLoading };
};
