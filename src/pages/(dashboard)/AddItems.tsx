import { useState, useRef, ChangeEvent } from "react";
import { Trash2, Plus } from "lucide-react";
import axiosInstance from "../../lib/axiosInstance";
import { toast } from "sonner";
import { useForm, SubmitHandler } from "react-hook-form";

const MAX_IMAGES = 4;

type ImageType = {
  file: File;
  url: string;
};

type FormInputs = {
  name: string;
  description: string;
  price: number | "";
  discount: number | "";
  category: string;
  color: string;
  size: string;
};

const AddItems = () => {
  const [images, setImages] = useState<ImageType[]>([]);
  const [imageError, setImageError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      discount: "",
      category: "",
      color: "",
      size: "",
    },
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];

    if (files.length === 0) {
      setImageError("At least one image is required.");
      return;
    }

    if (images.length + files.length > MAX_IMAGES) {
      setImageError("You can only upload up to 4 images.");
      return;
    }

    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
    setImageError("");
  };

  const handleDeleteImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    if (newImages.length === 0) {
      setImageError("At least one image is required.");
    }
  };

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    if (images.length === 0) {
      setImageError("At least one image is required.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("discount", data.discount ? data.discount.toString() : "0");
    formData.append("category", data.category);
    formData.append("color", data.color);
    formData.append("size", data.size);

    images.forEach((img) => formData.append("images", img.file));

    try {
      const response = await axiosInstance.post("/create-product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.message);

      // Reset form and images
      reset();
      setImages([]);
      setImageError("");
    } catch (error) {
      console.error("❌ Product submission failed:", error);
      toast.error("Product submission failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto md:p-6 p-4">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block font-medium mb-2">
            Product Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Product Name"
            className={`border p-3 rounded w-full ${
              errors.name ? "border-red-500" : ""
            }`}
            {...register("name", {
              required: "Product name is required",
              minLength: {
                value: 3,
                message: "Product name must be at least 3 characters",
              },
            })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}

          <label className="block font-medium mb-2 mt-6">
            Product Description<span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Product Description"
            className={`border p-3 rounded w-full h-32 resize-none ${
              errors.description ? "border-red-500" : ""
            }`}
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 10,
                message: "Description must be at least 10 characters",
              },
              maxLength: {
                value: 500,
                message: "Description cannot exceed 500 characters",
              },
            })}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}

          <div className="flex flex-col md:flex-row gap-4 my-6">
            <div className="w-full">
              <label className="block font-medium mb-2">
                Regular Price<span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                placeholder="Regular Price"
                className={`border p-3 rounded w-full ${
                  errors.price ? "border-red-500" : ""
                }`}
                {...register("price", {
                  required: "Price is required",
                  min: {
                    value: 50,
                    message: "Price must be at least 50",
                  },
                  max: {
                    value: 500,
                    message: "Price cannot exceed 500",
                  },
                  valueAsNumber: true,
                })}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <label className="block font-medium mb-2">Discount Price</label>
              <input
                type="number"
                placeholder="Discount Price"
                className={`border p-3 rounded w-full ${
                  errors.discount ? "border-red-500" : ""
                }`}
                {...register("discount", {
                  min: {
                    value: 0,
                    message: "Discount cannot be negative",
                  },
                  max: {
                    value: 100,
                    message: "Discount cannot exceed 100",
                  },
                  valueAsNumber: true,
                })}
              />
              {errors.discount && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.discount.message}
                </p>
              )}
            </div>
          </div>

          <div className="w-full mt-6">
            <label className="block font-medium mb-2">
              Categories<span className="text-red-500">*</span>
            </label>
            <select
              className={`border p-3 rounded w-full ${
                errors.category ? "border-red-500" : ""
              }`}
              {...register("category", {
                required: "Category is required",
              })}
            >
              <option value="">Select Category</option>
              <option value="Toys">Toys</option>
              <option value="Stationery">Stationery</option>
              <option value="Accessories">Accessories</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-4 my-6">
            <div className="w-full">
              <label className="block font-medium mb-2">
                Sizes<span className="text-red-500">*</span>
              </label>
              <select
                className={`border p-3 rounded w-full ${
                  errors.size ? "border-red-500" : ""
                }`}
                {...register("size", {
                  required: "Size is required",
                })}
              >
                <option value="">Select Size</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
              {errors.size && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.size.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <label className="block font-medium mb-2">
                Colors<span className="text-red-500">*</span>
              </label>
              <select
                className={`border p-3 rounded w-full ${
                  errors.color ? "border-red-500" : ""
                }`}
                {...register("color", {
                  required: "Color is required",
                })}
              >
                <option value="">Select Color</option>
                <option value="Black">Black</option>
                <option value="White">White</option>
                <option value="Red">Red</option>
                <option value="Blue">Blue</option>
                <option value="Green">Green</option>
                <option value="Yellow">Yellow</option>
              </select>
              {errors.color && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.color.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <label className="block font-medium mb-2">
            Upload Images<span className="text-red-500">*</span>
          </label>
          {imageError && (
            <p className="text-red-500 text-sm mb-2">{imageError}</p>
          )}
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
          disabled={loading}
          className={`mt-8 w-full py-3 rounded transition flex justify-center items-center ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-black hover:bg-gray-800 cursor-pointer text-white"
          }`}
        >
          {loading ? (
            <span className="inline-block w-6 h-6 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
          ) : (
            "Add Product"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddItems;
