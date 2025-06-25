import { Product } from "@/types/Product";
import React from "react";
import { ProductHeader } from "./components/product-header-card";
import { ProductImageCard } from "./components/product-image-card";
import { BasicInfoCard } from "./components/basic-info-card";
import { PricingStockCard } from "./components/price-stock-card";
import { RatingsReviewsCard } from "./components/ratings-review-card";
import { ProductStatusCard } from "./components/product-status-card";
import { TimestampsCard } from "./components/timestamp-card";
import { ReviewsSection } from "./components/review-section";

const ProductTemplate = async ({ product }: { product: Product }) => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <ProductHeader />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ProductImageCard
          imageUrl={product.imageUrl}
          productName={product.name}
        />

        <BasicInfoCard
          name={product.name}
          description={product.description}
          category={product.category}
          tier={product.tier}
        />

        <PricingStockCard
          price={product.price}
          inStock={product.inStock}
          numberInStock={product.numberInStock}
        />

        <RatingsReviewsCard
          averageRating={product.averageRating}
          numberOfReviews={product.numberOfReviews}
        />

        <ProductStatusCard
          featured={product.featured}
          productId={product._id}
        />

        <TimestampsCard
          createdAt={product.createdAt}
          updatedAt={product.updatedAt}
        />
      </div>

      <ReviewsSection reviews={product.reviews} />

      {/* <EditProductDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        editForm={editForm}
        setEditForm={setEditForm}
        onSave={handleEditSave}
      />

      <DeleteProductDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        productName={product.name}
        onDelete={handleDelete}
      /> */}
    </div>
  );
};

export default ProductTemplate;
