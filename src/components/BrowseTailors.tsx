import { Search, MapPin, Star, Filter } from 'lucide-react';
import { useState } from 'react';
import { mockTailors, mockDesigns } from '../data/mockData';
import { useApp } from '../context/AppContext';

export const BrowseTailors = () => {
  const { setCurrentView, setSelectedTailorId } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'African Wear', 'Suits', 'Contemporary Fashion', 'Indian Wear'];

  const filteredTailors = mockTailors.filter((tailor) => {
    const matchesSearch =
      tailor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tailor.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tailor.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'all' || tailor.specialties.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  const handleTailorClick = (tailorId: string) => {
    setSelectedTailorId(tailorId);
    setCurrentView('tailor-profile');
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

          <div className="flex gap-2 mt-4 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category === 'all' ? 'All Categories' : category}
              </button>
            ))}
          </div>
        </div>

        <div className="pb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredTailors.length} Tailors Found
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTailors.map((tailor) => {
              const tailorDesigns = mockDesigns.filter((d) => d.tailorId === tailor.id);
              return (
                <div
                  key={tailor.id}
                  onClick={() => handleTailorClick(tailor.id)}
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
                        <Star className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                        <span className="text-sm font-semibold text-emerald-700">
                          {tailor.rating}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{tailor.bio}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {tailor.specialties.slice(0, 2).map((specialty) => (
                        <span
                          key={specialty}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {specialty}
                        </span>
                      ))}
                      {tailor.specialties.length > 2 && (
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                          +{tailor.specialties.length - 2}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-sm text-gray-600">
                        {tailor.yearsOfExperience} years experience
                      </span>
                      <span className="text-sm text-gray-600">
                        {tailorDesigns.length} designs
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
