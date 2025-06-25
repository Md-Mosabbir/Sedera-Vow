import { getProductById } from "@/lib/data/products";
import ProductTemplate from "@/modules/single-product-page";

const ProductPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const product = await getProductById(id);
  return <ProductTemplate product={product} />;
};

export default ProductPage;
