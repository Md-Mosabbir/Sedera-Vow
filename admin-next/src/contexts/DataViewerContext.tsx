"use client";

import { useFilters } from "@/hooks/useFilters";
import { createContext, useContext } from "react";

type FilterContextType = {
  filters: Record<string, any>;
  setFilters: (key: string, value: any) => void;
};

const DataViewerContext = createContext<FilterContextType | null>(null);

export const DataViewerProvider = ({
  children,
  schema,
}: {
  children: React.ReactNode;
  schema: Record<string, any>;
}) => {
  const { filters, setFilters } = useFilters(schema);

  return (
    <DataViewerContext.Provider value={{ filters, setFilters }}>
      {children}
    </DataViewerContext.Provider>
  );
};

export const useDataViewer = () => {
  const context = useContext(DataViewerContext);
  if (!context)
    throw new Error("useDataViewer must be used within DataViewerProvider");
  return context;
};
