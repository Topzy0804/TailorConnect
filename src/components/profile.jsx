import { Mail, Phone, MapPin, Award } from "lucide-react";
import { useUser } from "../auth/userContext";
import { useState, useEffect } from "react";
import { updateRow } from "../utils/db";
import { uploadFile } from "../utils/storage";

export default function ProfileHeader() {
  const { user } = useUser();
  const [previewImage, setPreviewImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // 1. Initialize formData with all potential database fields
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    location: "",
    phone: "",
    businessName: "",
    yearsOfExperience: "",
    specialties: [],
  });

  // 2. Sync form data when the user object is loaded from Context/DB
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        bio: user.bio || "",
        location: user.location || "",
        phone: user.phone || "",
        businessName: user.businessName || "",
        yearsOfExperience: user.yearsOfExperience || "",
        specialties: user.specialties || [],
      });
      setPreviewImage(user.profilePicture);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="bg-slate-900 text-white p-16 text-center">Loading profile...</div>
    );
  }

  const isTailor = user.role === "tailor";

  const initials = (user.name || "")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "?";

  // 3. Update Profile Handler
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    
    // Only send relevant data based on role to the DB
    const cleanData = {
      name: formData.name,
      bio: formData.bio,
      location: formData.location,
      phone: formData.phone,
      ...(isTailor && {
        businessName: formData.businessName,
        yearsOfExperience: formData.yearsOfExperience,
      }),
    };

    try {
      await updateRow(
        import.meta.env.VITE_APPWRITE_TABLE_ID_USERS,
        user.$id,
        cleanData
      );
      alert("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  // 4. Image Upload Handler
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const uploaded = await uploadFile(import.meta.env.VITE_APPWRITE_BUCKET_ID, file);
      const fileUrl = `https://cloud.appwrite.io/v1/storage/buckets/${import.meta.env.VITE_APPWRITE_BUCKET_ID}/files/${uploaded.$id}/view?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}`;

      await updateRow(import.meta.env.VITE_APPWRITE_TABLE_ID_USERS, user.$id, {
        profilePicture: fileUrl,
      });

      setPreviewImage(fileUrl);
      alert("Profile picture updated!");
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <>
      {/* HEADER SECTION */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative group">
              <div className="w-40 h-40 rounded-full bg-amber-600 flex items-center justify-center text-6xl font-bold overflow-hidden border-4 border-amber-500/30">
                {previewImage ? (
                  <img src={previewImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  initials
                )}
              </div>
              <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full">
                <span className="text-white text-xs font-bold uppercase">Change Photo</span>
                <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
              </label>
              {isTailor && (
                <div className="absolute -bottom-2 -right-2 bg-amber-500 rounded-full p-3 shadow-xl">
                  <Award className="w-6 h-6 text-slate-900" />
                </div>
              )}
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2">{user.name}</h1>
              <p className="text-slate-300 text-lg mb-4">{user.bio || "No bio added yet."}</p>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="bg-amber-500 text-slate-900 px-6 py-2 rounded-lg font-bold hover:bg-amber-400 transition"
              >
                {isEditing ? "Cancel Editing" : "Edit Profile"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DETAILS DISPLAY CARD */}
      {!isEditing && (
        <div className="max-w-7xl mx-auto px-4 -mt-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-slate-700">
                    <Mail className="text-amber-500" size={20} />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-700">
                    <Phone className="text-amber-500" size={20} />
                    <span>{user.phone || "No phone added"}</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-700">
                    <MapPin className="text-amber-500" size={20} />
                    <span>{user.location || "Location not set"}</span>
                  </div>
                </div>
              </div>

              {isTailor && (
                <div className="space-y-6">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Tailoring Experience</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-slate-500 text-sm">Business Name</p>
                      <p className="text-xl font-bold text-slate-900">{user.businessName || "Independent"}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-sm">Experience</p>
                      <p className="text-xl font-bold text-slate-900">{user.yearsOfExperience || "0"} Years</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* EDIT FORM */}
      {isEditing && (
        <div className="max-w-3xl mx-auto px-4 py-12">
          <form onSubmit={handleUpdateProfile} className="bg-white p-8 rounded-2xl shadow-xl space-y-6 border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900">Update Profile Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border-slate-300 border p-3 focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full rounded-lg border-slate-300 border p-3 focus:ring-2 focus:ring-amber-500 outline-none"
                  rows="3"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-lg border-slate-300 border p-3 focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full rounded-lg border-slate-300 border p-3 focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>
              </div>
              
              {/* TAILOR SPECIFIC INPUTS */}
              {isTailor && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Business Name</label>
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full rounded-lg border-slate-300 border p-3 focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Years of Experience</label>
                    <input
                      type="number"
                      value={formData.yearsOfExperience}
                      onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
                      className="w-full rounded-lg border-slate-300 border p-3 focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                </div>
              )}
            </div>
            <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition shadow-lg">
              Save All Changes
            </button>
          </form>
        </div>
      )}
    </>
  );
}