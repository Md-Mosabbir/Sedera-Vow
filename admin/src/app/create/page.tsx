import { createProduct } from "../actions/admin";

const page = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md rounded-lg bg-gray-800 p-8 shadow-xl">
        <h2 className="mb-6 text-center text-3xl font-bold text-white">
          Create Product
        </h2>
        <form
          action={createProduct}
          className="space-y-4"
          encType="multipart/form-data"
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            className="block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            required
            className="block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            required
            className="block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            required
            className="block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white"
          />
          <input
            type="number"
            name="numberInStock"
            placeholder="Stock"
            required
            className="block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white"
          />
          <input
            type="text"
            name="tier"
            placeholder="Tier"
            required
            className="block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white"
          />
          <input
            type="file"
            name="image"
            required
            className="block w-full text-white"
          />
          <button
            type="submit"
            className="w-full rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
          >
            Submit Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
