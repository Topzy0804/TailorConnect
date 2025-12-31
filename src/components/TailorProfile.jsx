import { MapPin, Star, MessageCircle, Award, ArrowLeft } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useApp } from '../context';
import { getRow, getRows } from '../utils/db';
import { Query } from 'appwrite';
import TailorPageProductDetail from './tailorPageProductDetail';


export const TailorProfile = () => {
  const { setSelectedDesignId, setCurrentView } = useApp();
  const { id } = useParams();
  const navigate = useNavigate();

  const [tailor, setTailor] = useState(null);
  const [designs, setDesigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchTailorData = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const tailorData = await getRow(
          import.meta.env.VITE_APPWRITE_TABLE_ID_USERS,
          id
        );
        setTailor(tailorData);

        const designsData = await getRows(
          import.meta.env.VITE_APPWRITE_TAILORS_TABLE_ID,
          [Query.equal("tailorId", id)]
        );
        setDesigns(designsData);
      } catch (error) {
        console.error("Error fetching tailor data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTailorData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (!tailor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Tailor not found</p>
      </div>
    );
  }

  const handleOrderClick = (designId) => {
    setSelectedDesignId(designId);
    setCurrentView('checkout');
  };

  if (isLoading) return <div className='min-h-screen flex items-center justify-center '>Loading...</div>

  if (!tailor) return <div className='min-h-screen flex items-center justify-center '>Tailor not found</div>

  const initials = (tailor.name || "").split(" ").map((n) => (n ? n[0] : "")).join("").slice(0, 3).toUpperCase() || "?";

  return (
    <div className="min-h-screen  bg-gray-50">
      <button
        onClick={() => navigate(-1)}
        className="fixed top-20 left-4 z-10 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
      >
        <ArrowLeft className="w-5 h-5 text-gray-700" />
      </button>

      <div className="relative h-80 overflow-hidden">
        <img
          src={tailor.profilePicture}
          alt="cover"
          className="w-full h-full object-cover opacity-70 blur-sm scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10 pb-16">
        <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
          <div className="flex items-start gap-6 mb-6">
            <img
              src={tailor.profilePicture}
              alt={tailor.name}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {tailor.name}
                  </h1>
                  <div className="flex items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{tailor.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      <span>{tailor.yearsOfExperience} years experience</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/chat/${tailor.$id}`)}
                  className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Message
                </button>
              </div>

              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-lg">
                  <Star className="w-5 h-5 text-emerald-600 fill-emerald-600" />
                  <span className="text-lg font-bold text-emerald-700">
                    {tailor.rating}
                  </span>
                  <span className="text-gray-600">({tailor.reviewCount} reviews)</span>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">{tailor.bio}</p>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Specialties
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tailor.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg text-sm font-medium"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Designs & Portfolio ({designs.length})
          </h2>

          {designs.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center">
              <p className="text-gray-600">No designs available yet</p>
            </div>
          ) : (
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
             <TailorPageProductDetail designs={designs} />
           </div>
          )}

          <div className="mt-8 bg-white rounded-xl p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Looking for something custom?
            </h3>
            <p className="text-gray-600 mb-6">
              Chat with {tailor.name} to discuss your unique design ideas and get a personalized quote
            </p>
            <button 
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
            onClick={() => navigate(`/chat/${tailor.$id}`)}>
             Message Tailor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
