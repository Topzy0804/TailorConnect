import React from "react";
import { MapPin, Star } from "lucide-react";

export default function NewTailor({ experts = [], onTailorClick = () => {} }) {
  return (
    <>
      {experts.map((tailor) => (
        <div
          key={tailor.$id || tailor.id}
          onClick={() => onTailorClick(tailor.$id || tailor.id)}
          className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group h-full flex flex-col"
        >
          <div className="relative h-64 md:h-72 overflow-hidden">
            <img
              src={
                tailor.coverImage ||
                tailor.banner ||
                `https://via.placeholder.com/800x480?text=${encodeURIComponent(
                  tailor.name || "Tailor"
                )}`
              }
              alt={tailor.name || "Tailor"}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

            {/* avatar */}
            {tailor.avatar ? (
              <img
                src={tailor.avatar}
                alt={tailor.name || "Avatar"}
                className="absolute bottom-4 left-4 w-20 h-20 rounded-full border-4 border-white object-cover"
              />
            ) : (
              <div className="absolute bottom-4 left-4 w-20 h-20 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center text-sm text-gray-500">
                {((tailor.name || "T").slice(0, 1) || "T").toUpperCase()}
              </div>
            )}
          </div>

          <div className="p-6 flex-1 flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                  {tailor.name || "Unknown"}
                </h3>
                <div className="flex items-center gap-1 text-gray-600 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{tailor.location || "Location not specified"}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-emerald-50 px-3 py-1 rounded-lg">
                <Star className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-700">
                  {tailor.rating ?? "—"}
                </span>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {tailor.bio || "No bio available"}
            </p>

            <div className="mt-auto">
              <div className="flex flex-wrap gap-2 mb-4">
                {(tailor.specialties || []).slice(0, 3).map((specialty) => (
                  <span
                    key={specialty}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {specialty}
                  </span>
                ))}
                {(tailor.specialties || []).length > 3 && (
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                    +{(tailor.specialties || []).length - 3}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-sm text-gray-600">
                <span>{tailor.yearsOfExperience ?? 0} yrs exp</span>
                <span>{tailor.designCount ?? 0} designs</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
