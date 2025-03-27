"use client";

import { useState, useMemo } from "react";

interface UsePaginationProps<T> {
  data: T[] | undefined;
  dataLength: number;
  itemsPerPage?: number;
}

export function usePagination<T>({
  data,
  dataLength,
  itemsPerPage = 10,
}: UsePaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(0);

  const paginatedData = useMemo(() => {
    if (!data) return [];

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, itemsPerPage]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(dataLength / itemsPerPage));
  }, [dataLength, itemsPerPage]);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  return {
    currentPage,
    paginatedData,
    nextPage,
    prevPage,
    totalPages,
    setCurrentPage,
  };
}
