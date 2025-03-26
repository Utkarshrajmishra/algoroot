"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table/table";
import { Button } from "@/components/ui/button";
import { usePagination } from "@/hooks/use-pagination";
import { Input } from "@/components/ui/input";

export type RecipesType = {
  id: number;
  name: string;
  serving: number;
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
        setData(result);
      } catch (error) {
        console.log("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const {currentPage,totalPages,nextPage,paginatedData, prevPage}=usePagination({data:data?.recipes, dataLength:data?.recipes.length})

  return (
    <section className="p-4">
      <Input
        className="w-[40%]  border-1 border-zinc-700 bg-neutral-900/40 text-sm text-zinc-200 focus:outline-none focus:border-0"
        placeholder="Search by name"
      />
      <div className="mt-4">
        {data && paginatedData && <DataTable recipes={paginatedData} />}
        <div className="mt-4 flex justify-end gap-6">
          <Button
            className="border-1 border-zinc-700 bg-neutral-900/40"
            onClick={prevPage}
            disabled={currentPage == 0}
          >
            Prev
          </Button>
          <Button
            onClick={nextPage}
            disabled={currentPage == totalPages}
            className="border-1 border-zinc-700 bg-neutral-900/40"
          >
            Next
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Page;
