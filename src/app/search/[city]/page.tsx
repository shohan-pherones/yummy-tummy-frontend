"use client";

import Error from "@/components/Error";
import Loading from "@/components/Loading";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import { useRestaurantPublic } from "@/hooks/useRestaurantPublic";
import { useState } from "react";

export interface SearchState {
  searchQuery: string;
}

const SearchPage = ({ params }: { params: { city: string } }) => {
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
  });

  const { results, isLoading } = useRestaurantPublic(searchState, params.city);

  const handleSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: searchFormData.searchQuery,
    }));
  };

  const handleResetSearch = () => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: "",
    }));
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!results?.data || !params.city) {
    return <Error message="No result found" />;
  }

  return (
    <div className="container mx-auto mt-5 grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div>{/* INSERT CUISINE LIST HERE LATER */}</div>
      <div className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={handleSearchQuery}
          onReset={handleResetSearch}
          placeholder="Search by cuisine or restaurant name"
        />
        <SearchResultInfo total={results.pagination.total} city={params.city} />
        {results.data.map((restaurant) => (
          <SearchResultCard key={restaurant._id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
