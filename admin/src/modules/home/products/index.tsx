"use client";

import { DataViewerProvider } from "@/contexts/DataViewerContext";
import { productFilterSchema } from "@/types/config/filters";
import Data from "./components/product-data-table";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductFilters from "./components/product-filters";
import ProductSorting from "./components/product-sorting";
import { ProductsResponse } from "@/types/Product";

const DataTable = ({ products }: { products: ProductsResponse }) => {
  return (
    <DataViewerProvider schema={productFilterSchema}>
      <div className=" w-full flex flex-col gap-3  h-full ">
        <Header title="Products" />
        <div className="px-5">
          <div className="flex justify-between">
            <ProductFilters />
            <ProductSorting />
          </div>
          <div className="my-5">
            <Data products={products.products} />
          </div>
        </div>
        <Footer totalPages={products.totalPages} />
      </div>
    </DataViewerProvider>
  );
};

export default DataTable;
