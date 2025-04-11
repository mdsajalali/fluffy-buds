import { useState, useRef, ChangeEvent } from "react";
import { Trash2, Plus } from "lucide-react";

const MAX_IMAGES = 4;

type ImageType = {
  file: File;
  url: string;
};

const AddItems = () => {
  const [images, setImages] = useState<ImageType[]>([]);
  const [error, setError] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];

    if (images.length + files.length > MAX_IMAGES) {
      setError("You can only upload up to 4 images.");
      return;
    }

    const newImages: ImageType[] = files.map((file) => ({
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

  return (
    <div className="max-w-4xl mx-auto md:p-6">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>

      <div>
        <label className="block font-medium mb-2">
          Product Name<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Product Name"
          className="border p-3 rounded w-full"
        />

        <label className="block font-medium mb-2 mt-6">
          Product Description<span className="text-red-500">*</span>
        </label>
        <textarea
          placeholder="Product Description"
          className="border p-3 rounded w-full h-32 resize-none md:col-span-2"
        />

        <div className="flex items-center gap-4 my-6 w-full">
          <div className="w-full">
            <label className="block font-medium mb-2">
              Regular Price<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="Regular Price"
              className="border p-3 rounded w-full"
            />
          </div>

          <div className="w-full">
            <label className="block font-medium mb-2">Discount Price</label>
            <input
              type="number"
              placeholder="Discount Price"
              className="border p-3 rounded w-full"
            />
          </div>
        </div>

        <div className="w-full">
          <label className="block font-medium mb-2">
            Categories<span className="text-red-500">*</span>
          </label>
          <select className="border p-3 rounded w-full">
            <option value="">Select Category</option>
            <option value="Toys">Toys</option>
            <option value="Stationery">Stationery</option>
            <option value="Accessories">Accessories</option>
          </select>
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

      <button className="mt-8 w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition">
        Add Product
      </button>
    </div>
  );
};

export default AddItems;
