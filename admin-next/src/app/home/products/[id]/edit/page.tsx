import { getProductById } from "@/lib/data/products";
import { ProductForm } from "@/modules/home/products/components/forms/product-form";

const EditProduct = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const product = await getProductById(id);

  return (
    <ProductForm initialValues={product} productId={id} isEditMode={true} />
  );
};

export default EditProduct;
