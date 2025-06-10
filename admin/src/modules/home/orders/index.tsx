"use client";
import { DataViewerProvider } from "@/contexts/DataViewerContext";
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Data from "./components/order-data-table";
import { OrdersResponse } from "@/types/Orders";

const DataTable = ({ orders }: { orders: OrdersResponse }) => {
  return (
    <DataViewerProvider schema={{}}>
      <div className=" w-full flex flex-col gap-3  h-full ">
        <Header title="Orders" />
        <div className="px-5">
          <Data orders={orders.orders} />
        </div>
        <Footer totalPages={orders.totalPages} />
      </div>
    </DataViewerProvider>
  );
};

export default DataTable;
