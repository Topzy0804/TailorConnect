import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../auth/userContext";
import { useApp } from "../../context";
// import your DB helper here (replace with actual path)
import { createRows, uploadFile } from "../../utils/db";
/**
 * AddCloth modal — allows creating a sale item or design.
 * Props:
 *  - onClose: () => void
 *  - initialMode: "sale" | "design"
 */
export default function AddCloth({ onClose = () => {}, initialMode = "sale" }) {
  const navigate = useNavigate();
  const userData = useUser();
  const currentUser = userData?.user ?? null;
  const app = useApp();

  const [mode, setMode] = useState(initialMode);
  useEffect(() => setMode(initialMode), [initialMode]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [available, setAvailable] = useState(true);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];
  const colorOptions = [
    "Black",
    "White",
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Custom",
  ];

  useEffect(() => {
    // cleanup preview URLs on unmount
    return () => {
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreviews]);

  const handleFiles = (files) => {
    const fileArray = Array.from(files).slice(0, 6);
    setImages(fileArray);
    const previews = fileArray.map((file) => URL.createObjectURL(file));
    // revoke any prior previews
    imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    setImagePreviews(previews);
  };

  const toggleSize = (s) =>
    setSizes((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  const toggleColor = (c) =>
    setColors((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );

  const validate = () => {
    if (!title.trim()) return "Title is required.";
    if (mode === "sale" && (!price || Number(price) <= 0))
      return "Valid price is required for sale items.";
    if (!category.trim()) return "Category is required.";
    if (images.length === 0) return "At least one image is required.";
    return null;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError(null);
    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setSubmitting(true);
    try {
      // Upload files and keep returned file documents
      const uploadedFiles = await Promise.all(
        images.map(async (img) => {
          if (!img) throw new Error("File not found in payload");
          console.log("Uploading file:", img.name, img.type, img.size);
          const uploaded = await uploadFile(
            import.meta.env.VITE_APPWRITE_BUCKET_ID,
            img
          );
          return uploaded;
        })
      );

      // Map uploaded file docs to a minimal representation
      // store only IDs (and a coverImageId) — ensure your Appwrite collection has 'imageIds' or adapt field names
      const imageIds = uploadedFiles.map((f) => f.$id);
      const coverImageId = imageIds[0] ?? null;

      const clothing = {
        title: title.trim(),
        description: description.trim(),
        price: String(Number(price || 0).toFixed(2)),
        category: category.trim(),
        sizes,
        colors,
        available: available ? "available" : "unavailable",
        imageIds, // array of file IDs (make sure collection has this attribute)
        coverImageId, // optional single id for quick display
        tailorId: currentUser?.$id ?? null,
      };

      // ensure createRows exists or replace with your API call
      if (typeof createRows !== "function") {
        throw new Error("createRows is not defined. Import your DB helper.");
      }

      await createRows(import.meta.env.VITE_APPWRITE_TABLE_ID, clothing);

      // cleanup previews
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
      setImagePreviews([]);
      setImages([]);

      // reset local state
      setTitle("");
      setDescription("");
      setPrice("");
      setCategory("");
      setSizes([]);
      setColors([]);
      setAvailable(true);

      onClose();
      navigate("/tailor-dashboard");
    } catch (err) {
      console.error("Upload failed:", err);
      setError(err.message || "Upload failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-auto max-h-[90vh] p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Add {mode === "sale" ? "Clothing for Sale" : "Design"}
          </h3>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMode("sale")}
              className={`px-3 py-1 rounded ${
                mode === "sale" ? "bg-emerald-600 text-white" : "bg-gray-100"
              }`}
            >
              Sale
            </button>
            <button
              type="button"
              onClick={() => setMode("design")}
              className={`px-3 py-1 rounded ${
                mode === "design" ? "bg-emerald-600 text-white" : "bg-gray-100"
              }`}
            >
              Design
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-3 text-sm text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
          </div>
        </div>

        {error && <div className="mb-4 text-sm text-red-600">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded border-gray-300 px-3 py-2"
              placeholder="Elegant linen shirt"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full rounded border-gray-300 px-3 py-2"
              placeholder="Shirts, Dresses, Suits..."
            />
          </div>

          {mode === "sale" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price (USD)
              </label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                min="0"
                step="0.01"
                className="mt-1 block w-full rounded border-gray-300 px-3 py-2"
                placeholder="49.99"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Availability
            </label>
            <select
              value={available ? "available" : "unavailable"}
              onChange={(e) => setAvailable(e.target.value === "available")}
              className="mt-1 block w-full rounded border-gray-300 px-3 py-2"
            >
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded border-gray-300 px-3 py-2"
              placeholder="Describe fabric, cut, special details..."
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Images (max 6)
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleFiles(e.target.files)}
              className="mt-1 block w-full"
            />

            <div className="mt-3 grid grid-cols-3 gap-2">
              {imagePreviews.map((src, i) => (
                <div
                  key={i}
                  className="relative border rounded overflow-hidden"
                >
                  <img
                    src={src}
                    alt={`preview-${i}`}
                    className="object-cover w-full h-24"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sizes
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {sizeOptions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggleSize(s)}
                  className={`px-2 py-1 rounded text-sm border ${
                    sizes.includes(s)
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Colors
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {colorOptions.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => toggleColor(c)}
                  className={`px-2 py-1 rounded text-sm border ${
                    colors.includes(c)
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded border text-sm text-gray-700 bg-white"
            disabled={submitting}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 rounded bg-emerald-600 text-white text-sm hover:bg-emerald-700"
            disabled={submitting}
          >
            {submitting
              ? "Saving..."
              : `Save ${mode === "sale" ? "Item" : "Design"}`}
          </button>
        </div>
      </form>
    </div>
  );
}
