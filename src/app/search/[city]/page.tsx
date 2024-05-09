"use client";

import Error from "@/components/Error";
import Loading from "@/components/Loading";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import { useRestaurantPublic } from "@/hooks/useRestaurantPublic";
import { useState } from "react";

export interface SearchState {
  searchQuery: string;
  page: number;
}

const SearchPage = ({ params }: { params: { city: string } }) => {
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
  });

  const { results, isLoading } = useRestaurantPublic(searchState, params.city);

  const setPage = (page: number) => {
    setSearchState((prev) => ({
      ...prev,
      page,
    }));
  };

  const handleSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };

  const handleResetSearch = () => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: "",
      page: 1,
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
        <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default SearchPage;
