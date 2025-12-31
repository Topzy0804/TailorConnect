import { Search, MapPin, Star, Filter } from "lucide-react";
import { useState, useEffect, useMemo } from "react"; // Added useMemo
import { useApp } from "../context";
import { getRows } from "../utils/db";
import NewTailor from "./newTailor";
import { Query } from "appwrite";
import { useNavigate } from "react-router-dom";

export const BrowseTailors = () => {
  const { setSelectedTailorId } = useApp();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [experts, setExperts] = useState([]);

  useEffect(() => {
    fetchExperts();
  }, []);

  const fetchExperts = async () => {
    try {
      const response = await getRows(
        import.meta.env.VITE_APPWRITE_TABLE_ID_USERS,
        [Query.equal("role", "tailor")]
      );
      setExperts(response.rows || []);
    } catch (error) {
      console.error("Error fetching experts:", error);
    }
  };

  // 1. DYNAMIC CATEGORY EXTRACTION
  // This looks at the 'specialties' column in your userDetails table
  const categories = useMemo(() => {
    const allSpecialties = experts.flatMap((tailor) => tailor.specialties || []);
    // 'Set' removes duplicates, and we add 'all' at the beginning
    return ["all", ...new Set(allSpecialties)];
  }, [experts]);

  // 2. FILTERING LOGIC
  const filteredTailors = experts.filter((tailor) => {
    const matchesSearch =
      (tailor.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (tailor.location || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (tailor.specialties || []).some((s) =>
        s.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "all" ||
      (tailor.specialties || []).includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  const handleTailorClick = (tailorId) => {
    navigate(`/tailor/${tailorId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Discover Expert Tailors</h1>
          <p className="text-emerald-50 text-lg">
            Find the perfect tailor for your style needs
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name, location, or specialty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
            <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>

          {/* 3. DYNAMIC CATEGORY BUTTONS */}
          <div className="flex gap-2 mt-4 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-emerald-600 text-white" // Matches active UI
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200" // Matches inactive UI
                }`}
              >
                {category === "all" ? "All Categories" : category}
              </button>
            ))}
          </div>
        </div>

        <div className="pb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {filteredTailors.length} Tailors Found
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <NewTailor
              experts={filteredTailors}
              onTailorClick={handleTailorClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};