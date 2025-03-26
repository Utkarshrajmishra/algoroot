"use client";
import { useEffect, useMemo, useState } from "react";
import { DataTable } from "@/components/data-table/table";
import { Button } from "@/components/ui/button";
import { usePagination } from "@/hooks/use-pagination";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader } from "lucide-react";

export type RecipesType = {
  id: number;
  name: string;
  servings: number;
  cookTimeMinutes: number;
  difficulty: string;
  cuisine: string;
};

export type ResponseType = {
  total: number;
  skips: number;
  limit: number;
  recipes: RecipesType[];
};

const Page = () => {
  const [data, setData] = useState<ResponseType | null>(null);
  const [loading, setLoading] = useState(true);

  // State for filters and search
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Fetch recipes on component mount
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/recipes?limit=40&select=id,name,cookTimeMinutes,servings,difficulty,cuisine"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }
        const result = await response.json();
        setData(result)
        console.log(result)
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);


    const filteredAndSortedRecipes = useMemo(() => {
      if (!data?.recipes) return [];

      return data.recipes
        .filter(
          (recipe) =>
            (searchTerm === "" ||
              recipe.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (difficultyFilter === "" ||
              recipe.difficulty.toLowerCase() ===
                difficultyFilter.toLowerCase())
        )
        .sort((a, b) => {
          if (sortOrder === "asc") {
            return a.cookTimeMinutes - b.cookTimeMinutes;
          } else {
            return b.cookTimeMinutes - a.cookTimeMinutes;
          }
        });
    }, [data?.recipes, searchTerm, difficultyFilter, sortOrder]);



  
  const {
    currentPage,
    totalPages,
    nextPage,
    paginatedData,
    prevPage,
    setCurrentPage
  } = usePagination({
    data: filteredAndSortedRecipes,
    dataLength: filteredAndSortedRecipes.length,
  });

  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm, difficultyFilter, sortOrder, setCurrentPage]);

  // Clear filters
  const clearFilters = () => {
    setSearchTerm("");
    setDifficultyFilter("");
    setSortOrder("asc");
  };

  if (loading) {
    return <div className="flex h-screen w-screen items-center justify-center">
      <Loader className="text-zinc-200 animate-spin"/>
    </div>;
  }

  return (
    <section className="p-2 md:p-4">
      <div className="flex flex-col gap-2 md:flex-row justify-between mb-4 space-x-4">
        <Input
          className="md:w-[40%] w-full border-1 border-zinc-700 bg-neutral-900/40 text-sm text-zinc-200 focus:outline-none focus:border-0"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex gap-1">
          {/* Difficulty Filter */}
          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger className="w-[120px] border-1 border-zinc-700 bg-neutral-950/40 text-sm text-zinc-200">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent className="border-1 border-zinc-700 bg-neutral-950 text-white">
            <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort by Cook Time */}
          <Select
            value={sortOrder}
            onValueChange={(value: "asc" | "desc") => setSortOrder(value)}
          >
            <SelectTrigger className="w-[150px] border-1 border-zinc-700 bg-neutral-950/40 text-sm text-zinc-200">
              <SelectValue placeholder="Sort Cook Time" />
            </SelectTrigger>
            <SelectContent className="border-1 border-zinc-700 bg-neutral-950 text-white">
              <SelectItem value="asc">Cook Time: Low to High</SelectItem>
              <SelectItem value="desc">Cook Time: High to Low</SelectItem>
            </SelectContent>
          </Select>

          {/* Clear Filters Button */}
          <Button
            onClick={clearFilters}
            className="border-1 border-zinc-700 bg-neutral-900/40"
          >
            Clear
          </Button>
        </div>
      </div>

      <div className="mt-4">
    
        {paginatedData && filteredAndSortedRecipes.length > 0 ? (
          <>
            <DataTable recipes={paginatedData} />

            <div className="mt-4 flex justify-center  md:justify-end gap-6">
              <Button
                className="border-1 border-zinc-700 bg-neutral-900/40"
                onClick={prevPage}
                disabled={currentPage === 0}
              >
                Prev
              </Button>
              <span className="self-center text-zinc-400">
                Page {currentPage + 1} of {totalPages}
              </span>
              <Button
                onClick={nextPage}
                disabled={currentPage === totalPages - 1}
                className="border-1 border-zinc-700 bg-neutral-900/40"
              >
                Next
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center text-zinc-400">No recipes found</div>
        )}
      </div>
    </section>
  );
};

export default Page;
