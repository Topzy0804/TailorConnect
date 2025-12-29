import React from "react";

// Remove onEdit and onDelete from the props
export default function TailorPageProductDetail({ designs }) {

  const designsList = Array.isArray(designs) 
    ? designs 
    : (designs?.rows || []); // Fallback to .rows if it's an object, or empty array

  if (designsList.length === 0) {
    return <div className="text-gray-500 italic">No designs to display.</div>;
  }

  return (
    <>
      {designsList.map((design) => (
        <div key={design.$id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
          <div className="relative h-48 overflow-hidden">
            <img
              src={design.imageURL}
              alt={design.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="p-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {design.title}
            </h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {design.description}
            </p>
            
            <div className="mb-4">
              {/* Added safety checks to prevent .join() errors */}
              <p className="text-xs text-gray-500">
                Sizes: {Array.isArray(design.sizes) ? design.sizes.join(", ") : "Standard"}
              </p>
              <p className="text-xs text-gray-500">
                Colors: {Array.isArray(design.colors) ? design.colors.join(", ") : "Various"}
              </p>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-xl font-bold text-gray-900">
                ${Number(design.price).toFixed(2)}
              </span>
              <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                {design.category}
              </span>
            </div>

            {/* BUTTONS REMOVED FROM HERE */}
            <button
              onClick={() => window.location.href = `/design/${design.$id}`}
              className="w-full bg-emerald-600 text-white py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
            >
              View Design
            </button>
          </div>
        </div>
      ))}
    </>
  );
}