import { useState, useRef, ChangeEvent } from "react";
import { Trash2, Plus } from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "sonner";

const MAX_IMAGES = 4;

type ImageType = {
  file: File;
  url: string;
};

const AddItems = () => {
  const [images, setImages] = useState<ImageType[]>([]);
  const [error, setError] = useState<string>("");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];

    if (images.length + files.length > MAX_IMAGES) {
      setError("You can only upload up to 4 images.");
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

  const handleSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value && !selectedSizes.includes(value)) {
      setSelectedSizes((prev) => [...prev, value]);
    }
  };

  const removeSize = (size: string) => {
    setSelectedSizes((prev) => prev.filter((s) => s !== size));
  };

  const handleColorChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value && !selectedColors.includes(value)) {
      setSelectedColors((prev) => [...prev, value]);
    }
  };

  const removeColor = (color: string) => {
    setSelectedColors((prev) => prev.filter((c) => c !== color));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
    formData.append("discount", form.discount.value);
    formData.append("category", form.category.value);

    selectedSizes.forEach((size) => formData.append("sizes", size));
    selectedColors.forEach((color) => formData.append("colors", color));
    images.forEach((img) => formData.append("images", img.file));

    try {
      const response = await axiosInstance.post("/create-product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.message);

      // Clear the form fields
      form.name.value = "";
      form.description.value = "";
      form.price.value = "";
      form.discount.value = "";
      form.category.value = "";

      // Clear the selected colors, sizes, and images
      setSelectedColors([]);
      setSelectedSizes([]);
      setImages([]);
    } catch (error) {
      console.error("❌ Product submission failed:", error);
      toast.error("Product submission failed!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto md:p-6 p-4">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>

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
          />

          <label className="block font-medium mb-2 mt-6">
            Product Description<span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Product Description"
            className="border p-3 rounded w-full h-32 resize-none"
            name="description"
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
              />
            </div>

            <div className="w-full">
              <label className="block font-medium mb-2">Discount Price</label>
              <input
                type="number"
                placeholder="Discount Price"
                className="border p-3 rounded w-full"
                name="discount"
              />
            </div>
          </div>

          <div className="w-full mt-6">
            <label className="block font-medium mb-2">
              Categories<span className="text-red-500">*</span>
            </label>
            <select className="border p-3 rounded w-full" name="category">
              <option value="">Select Category</option>
              <option value="Toys">Toys</option>
              <option value="Stationery">Stationery</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>

          <div className="flex flex-col md:flex-row gap-4 my-6">
            <div className="w-full">
              <div>
                <label className="block font-medium mb-2">
                  Sizes<span className="text-red-500">*</span>
                </label>
                <select
                  className="border p-3 rounded w-full"
                  onChange={handleSizeChange}
                  name="size"
                >
                  <option value="">Select Size</option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
              </div>
              {selectedSizes.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {selectedSizes.map((size) => (
                    <div
                      key={size}
                      className="flex items-center bg-gray-100 border border-gray-300 rounded-full px-3 py-1 text-sm"
                    >
                      {size}
                      <button
                        type="button"
                        onClick={() => removeSize(size)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="w-full">
              <div>
                <label className="block font-medium mb-2">
                  Colors<span className="text-red-500">*</span>
                </label>
                <select
                  className="border p-3 rounded w-full"
                  onChange={handleColorChange}
                  name="color"
                >
                  <option value="">Select Color</option>
                  <option value="Black">Black</option>
                  <option value="White">White</option>
                  <option value="Red">Red</option>
                  <option value="Blue">Blue</option>
                  <option value="Green">Green</option>
                  <option value="Yellow">Yellow</option>
                </select>
              </div>
              {selectedColors.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {selectedColors.map((color) => (
                    <div
                      key={color}
                      className="flex items-center bg-gray-100 border border-gray-300 rounded-full px-3 py-1 text-sm"
                    >
                      {color}
                      <button
                        type="button"
                        onClick={() => removeColor(color)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <label className="block font-medium mb-2">
            Upload Images<span className="text-red-500">*</span>
          </label>
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <div className="flex gap-4 flex-wrap">
            {images.map((img, index) => (
              <div
                key={index}
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

            {images.length < MAX_IMAGES && (
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

        <button
          type="submit"
          className="mt-8 w-full cursor-pointer bg-black text-white py-3 rounded hover:bg-gray-800 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddItems;
