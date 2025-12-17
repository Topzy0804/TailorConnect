import React, { useState, useMemo, useEffect } from "react";
import { Search, Tag } from "lucide-react";
import { getRows } from "../utils/db";
import NewDesigns from "./clothing";
import { useNavigate } from "react-router-dom";

const categories = ["All", "Suits", "Shirts", "Trousers", "Outerwear"];

export default function Shop() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sort, setSort] = useState("popular");
  const navigate = useNavigate();

  // fetched designs 
  const [designs, setDesigns] = useState([]);

  const normalized = useMemo(() => {
    return (designs || []).map((d) => ({
      ...d,
      title: d.title ?? d.name ?? d.designName ?? "Untitled",
      category: d.category ?? "Uncategorized",
      price: Number(d.price ?? 0),
      image: (d.imageUrls && d.imageUrls[0]),
    }));
  }, [designs]);

  // filter/search/sort based on fetched designs
  const filtered = useMemo(() => {
    let list = normalized.slice();

    if (activeCategory !== "All") {
      list = list.filter((p) => p.category === activeCategory);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          (p.title || "").toLowerCase().includes(q) ||
          (p.category || "").toLowerCase().includes(q)
      );
    }

    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);

    return list;
  }, [normalized, query, activeCategory, sort]);

  useEffect(() => {
    const fetchTailorData = async () => {
      try {
        const response = await getRows(import.meta.env.VITE_APPWRITE_TAILORS_TABLE_ID, );
        setDesigns(response.rows ?? []);
        console.log("Tailor data fetched:", response.rows);
      } catch (error) {
        console.error("Error fetching tailor data:", error);
      }
    };

    fetchTailorData();
  }, []);

  const handleProductClick = (designId) => {
    console.log("Product clicked:", designId);
    navigate(`/design/${designId}`);
  }

  return (
    <section className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3 w-full md:w-1/2">
            <div className="relative w-full">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500"
                size={18}
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, categories..."
                className="w-full pl-9 pr-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-emerald-300"
              />
            </div>
            <button
              onClick={() => {
                setQuery("");
                setActiveCategory("All");
                setSort("popular");
              }}
              className="flex items-center gap-2 px-3 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition"
            >
              <Tag size={16} /> Reset
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition ${
                    activeCategory === c
                      ? "bg-emerald-600 text-white"
                      : "bg-white text-gray-700 border"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-3 py-2 rounded-md border bg-white text-sm"
              aria-label="Sort products"
            >
              <option value="popular">Most popular</option>
              <option value="price-asc">Price: Low to high</option>
              <option value="price-desc">Price: High to low</option>
            </select>
          </div>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length === 0 ? (
            <div className="col-span-full text-center py-20 text-gray-500">
              No products found.
            </div>
          ) : (
            <NewDesigns designs={filtered}
            onProductClick={handleProductClick} />
          )}
        </div>
      </div>
    </section>
  );
}
