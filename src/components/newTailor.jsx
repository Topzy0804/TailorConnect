import React from "react";
import { MapPin, Star } from "lucide-react";

export default function NewTailor({ experts = [] }) {
  return (
    <div className="grid  md:grid-cols-2 gap-6">
      {experts.map((tailor) => (
        <div
          key={tailor.id}
          onClick={() => onTailorClick(tailor.id)}
          className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group"
        >
          <div className="relative h-48 overflow-hidden">
            <img
              src={tailor.coverImage}
              alt={tailor.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <img
              src={tailor.avatar}
              alt={tailor.name}
              className="absolute bottom-4 left-4 w-16 h-16 rounded-full border-4 border-white object-cover"
            />
          </div>

          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {tailor.name}
                </h3>
                <div className="flex items-center gap-1 text-gray-600 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{tailor.location}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-lg">
                <Star className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-700">
                  {tailor.rating ?? "—"}
                </span>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {tailor.bio}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {(tailor.specialties || []).slice(0, 2).map((specialty) => (
                <span
                  key={specialty}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
                >
                  {specialty}
                </span>
              ))}
              {(tailor.specialties || []).length > 2 && (
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                  +{(tailor.specialties || []).length - 2}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <span className="text-sm text-gray-600">
                {tailor.yearsOfExperience ?? 0} years experience
              </span>
              <span className="text-sm text-gray-600">
                {tailor.designCount ?? 0} designs
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
