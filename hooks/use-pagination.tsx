import { RecipesType } from "@/app/dashboard/[...userId]/page";
import { useState, useMemo } from "react";

interface UsePaginationProps {
  data: RecipesType[] | undefined;
  dataLength?: number;
  itemsPerPage?: number;
}

export function usePagination({
    data,
  dataLength=0,
  itemsPerPage = 10,
}: UsePaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data?.slice(startIndex, endIndex);
  }, [dataLength, currentPage, itemsPerPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(dataLength / itemsPerPage);
  }, [dataLength, itemsPerPage]);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };



  return {
    currentPage,
    paginatedData,
    nextPage,
    prevPage,
    totalPages
    
  };
}
