"use client";

import { productFilterSchema } from "@/types/config/filters";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { DataViewerProvider } from "@/contexts/DataViewerContext";

const DataTable = ({ products }) => {
  return (
    <DataViewerProvider schema={productFilterSchema}>
      <div className=" w-full flex flex-col justify-between gap-3 bg-red-100 h-full">
        <Header title="Products" />
        <div>{JSON.stringify(products, null, 2)}</div>
        <Footer totalPages={products.totalPages} />
      </div>
    </DataViewerProvider>
  );
};

export default DataTable;
