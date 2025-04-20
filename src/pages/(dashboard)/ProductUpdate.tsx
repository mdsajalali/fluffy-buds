import { useState, useRef, ChangeEvent, useEffect } from "react";
import { Trash2, Plus } from "lucide-react";
import axiosInstance from "../../lib/axiosInstance";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

const MAX_IMAGES = 4;

type ImageType = {
  file: File;
  url: string;
};

type ProductType = {
  _id: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
  category: string;
  images: string[];
};

const ProductUpdate = () => {
  const { id } = useParams();
  const [images, setImages] = useState<ImageType[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<ProductType | null>(null);
  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/product/${id}`);
        const productData = res?.data?.product;
        if (productData) {
          setProduct(productData);

          setExistingImages(productData.images || []);
        }
      } catch (error) {
        console.error("Failed to fetch product", error);
        toast.error("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];

    if (existingImages.length + images.length + files.length > MAX_IMAGES) {
      setError(`You can only upload up to ${MAX_IMAGES} images total.`);
      return;
    }

    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
    setError("");
  };

  const handleDeleteImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleDeleteExistingImage = (index: number) => {
    const newImages = [...existingImages];
    newImages.splice(index, 1);
    setExistingImages(newImages);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget as HTMLFormElement & {
      name: { value: string };
      description: { value: string };
      price: { value: string };
      discount: { value: string };
      category: { value: string };
    };

    const formData = new FormData();

    formData.append("name", form.name.value);
    formData.append("description", form.description.value);
    formData.append("price", form.price.value);
    formData.append("discount", form.discount.value || "0");
    formData.append("category", form.category.value);

    images.forEach((img) => formData.append("images", img.file));
    existingImages.forEach((img) => formData.append("existingImages", img));

    try {
      const response = await axiosInstance.put(
        `/update-product/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response.data.message);

      // Update the local state with the new product data
      if (response.data.product) {
        setProduct(response.data.product);
        setExistingImages(response.data.product.images || []);
        setImages([]);
      }
    } catch (error) {
      console.error("❌ Product update failed:", error);
      toast.error("Product update failed!");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !product) {
    return (
      <div className="max-w-4xl mx-auto p-6 flex justify-center items-center h-64">
        <div className="inline-block w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <p>Product not found or failed to load.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto md:p-6 p-4">
      <h2 className="text-2xl font-bold mb-6">Update Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block font-medium mb-2">
            Product Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Product Name"
            className="border p-3 rounded w-full"
            name="name"
            defaultValue={product.name}
            required
          />

          <label className="block font-medium mb-2 mt-6">
            Product Description<span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Product Description"
            className="border p-3 rounded w-full h-32 resize-none"
            name="description"
            defaultValue={product.description}
            required
          />

          <div className="flex flex-col md:flex-row gap-4 my-6">
            <div className="w-full">
              <label className="block font-medium mb-2">
                Regular Price<span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                placeholder="Regular Price"
                className="border p-3 rounded w-full"
                name="price"
                defaultValue={product.price}
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="w-full">
              <label className="block font-medium mb-2">Discount Price</label>
              <input
                type="number"
                placeholder="Discount Price"
                className="border p-3 rounded w-full"
                name="discount"
                defaultValue={product.discount || ""}
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div className="w-full mt-6">
            <label className="block font-medium mb-2">
              Categories<span className="text-red-500">*</span>
            </label>
            <select
              className="border p-3 rounded w-full"
              name="category"
              defaultValue={product?.category}
              required
            >
              <option value="">Select Category</option>
              <option value="Toys">Toys</option>
              <option value="Stationery">Stationery</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <label className="block font-medium mb-2">
            Product Images<span className="text-red-500">*</span>
          </label>
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <div className="flex gap-4 flex-wrap">
            {/* Existing images */}
            {existingImages.map((img, index) => (
              <div
                key={`existing-${index}`}
                className="relative group w-28 h-28 rounded overflow-hidden"
              >
                <img
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-expect-error
                  src={img?.url}
                  alt={`existing-preview-${index}`}
                  className="w-full h-full object-cover border rounded"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteExistingImage(index)}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer text-white opacity-0 group-hover:opacity-100 transition"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}

            {/* Newly uploaded images */}
            {images.map((img, index) => (
              <div
                key={`new-${index}`}
                className="relative group w-28 h-28 rounded overflow-hidden"
              >
                <img
                  src={img.url}
                  alt={`preview-${index}`}
                  className="w-full h-full object-cover border rounded"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteImage(index)}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer text-white opacity-0 group-hover:opacity-100 transition"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}

            {existingImages.length + images.length < MAX_IMAGES && (
              <div
                className="w-28 h-28 flex items-center justify-center border-2 border-dashed rounded cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
                onClick={() => inputRef.current?.click()}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={inputRef}
                  className="hidden"
                />
                <Plus size={24} className="text-gray-500" />
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center mt-8  justify-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/dashboard/list-items")}
            className="w-full cursor-pointer py-3 rounded bg-gray-200 hover:bg-gray-300 transition"
            aria-label="Cancel update"
          >
            Cancel
          </button>
          <button
            onClick={() => navigate("/dashboard/list-items")}
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded transition flex justify-center items-center ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-black hover:bg-gray-800 cursor-pointer text-white"
            }`}
          >
            {loading ? (
              <span className="inline-block w-6 h-6 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
            ) : (
              "Update Product"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductUpdate;
