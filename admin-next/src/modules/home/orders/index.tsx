"use client";
import { DataViewerProvider } from "@/contexts/DataViewerContext";
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Data from "./components/order-data-table";
import { OrdersResponse } from "@/types/Orders";
import { orderFilterSchema } from "@/types/config/filters";
import OrderFilter from "./components/order-filter";
import OrderSorting from "./components/order-sort";

const DataTable = ({ orders }: { orders: OrdersResponse }) => {
  return (
    <DataViewerProvider schema={orderFilterSchema}>
      <div className="flex h-full w-full flex-col">
        <Header title="Orders" />
        <div className="flex flex-col gap-3 px-5">
          <div className="flex justify-between">
            <OrderFilter />
            <OrderSorting />
          </div>
          <div className="h-[calc(100vh-13rem)] overflow-auto rounded-md ">
            <Data orders={orders.orders} />
          </div>
        </div>
        <div className="mt-auto">
          <Footer totalPages={orders.totalPages} />
        </div>
      </div>
    </DataViewerProvider>
  );
};

export default DataTable;
