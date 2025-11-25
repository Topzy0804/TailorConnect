import React from "react";
import { Edit, Trash2 } from "lucide-react";

export default function NewDesign({ design, onEdit, onDelete }) {
  if (!design) return null;

  // robust image resolver: accept string URLs or file objects { url, $id, bucketId, ... }
  const resolveImage = (img) => {
    if (!img) return "";
    if (typeof img === "string") return img;
    // appwrite file object might include "url" or "$id" (you may need to build a download URL)
    if (img.url) return img.url;
    if (img.$id && img.bucketId) {
      // replace with your Appwrite storage download helper if available
      return `/api/storage/${img.bucketId}/${img.$id}`; // example fallback
    }
    return "";
  };

  const imageSrc =
    Array.isArray(design.images) && design.images.length > 0
      ? resolveImage(design.images[0])
      : "";

  // robust price: accept cents (integer) or dollars as string/number "49.99"
  const parsePriceDisplay = (raw) => {
    if (raw == null || raw === "") return "0.00";
    const n = Number(raw);
    if (!Number.isNaN(n)) {
      // decide: if raw looks like cents (an integer > 1000 etc.) treat as cents
      if (Number.isInteger(n) && String(raw).length >= 3)
        return (n / 100).toFixed(2);
      // otherwise treat as dollars
      return n.toFixed(2);
    }
    // fallback
    return "0.00";
  };

  const priceDisplay = parsePriceDisplay(design.price);

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 overflow-hidden">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={design.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
            No image
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{design.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {design.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-xl font-bold text-gray-900">
            ${priceDisplay}
          </span>
          <span className="text-sm text-gray-600">{design.category}</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit?.(design)}
            className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
          >
            <Edit className="w-4 h-4" /> Edit
          </button>

          <button
            onClick={() => onDelete?.(design)}
            className="bg-red-50 text-red-600 p-2 rounded-lg hover:bg-red-100 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
