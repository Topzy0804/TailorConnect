import { Mail, Phone, MapPin, Award } from "lucide-react";
import { useUser } from "../auth/userContext";


export default function ProfileHeader() {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">Loading profile...</div>
        </div>
      </div>
    );
  }


  const isTailor = user.role === "tailor";

  // Safe name initials
  const initials =
    (user.name || "")
      .split(" ")
      .map((n) => (n ? n[0] : ""))
      .join("")
      .slice(0, 3)
      .toUpperCase() || "?";

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="relative">
            {/* Avatar Logic */}
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-6xl font-bold shadow-2xl ring-4 ring-amber-400/20">
              {initials}
            </div>
            {/* Award Badge */}
            {isTailor && (

            <div className="absolute -bottom-2 -right-2 bg-amber-500 rounded-full p-3 shadow-xl">
              <Award className="w-6 h-6 text-slate-900" />
            </div>
            )}
          </div>

          <div className="flex-1 text-center md:text-left">
            {/* Name and Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">
              {user.name ?? "Untitled"}
            </h1>

            {isTailor && user.businessName && (

            <p className="text-xl text-amber-400 mb-4">{user.bussinessName ?? ""}</p> 
            )}
            {/* Bio */}
            <p className="text-slate-300 text-lg leading-relaxed mb-6 max-w-3xl">
              {user.bio ?? ""}
            </p>

           {/* Specialties - typically a tailor attribute */}
            {isTailor && user.specialties && (
              <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
                {(Array.isArray(user.specialties)
                  ? user.specialties
                  : String(user.specialties).split(",")
                ).map((skill, index) => (
                  <span
                    key={index}
                    className="bg-amber-500/10 border border-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-xs"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            )}

            {/* Contact Info */}
            <div className="flex flex-wrap gap-6 justify-center md:justify-start text-sm">
              <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-lg backdrop-blur-sm">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>{user.phone ?? "N/A"}</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-lg backdrop-blur-sm">
                <Mail className="w-4 h-4 text-amber-400" />
                <span>{user.email ?? "N/A"}</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-lg backdrop-blur-sm">
                <MapPin className="w-4 h-4 text-amber-400" />
                {/* 'user.address' is not in context, using 'user.location' */}
                <span>{user.location ?? "N/A"}</span>
              </div>
            </div>

           {isTailor && (

            <div className="mt-6 inline-block bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-400/30 px-6 py-3 rounded-lg backdrop-blur-sm">
                <span className="text-3xl font-bold text-amber-400">
                  {user.yearsOfExperience ?? 0}
                </span>
                <span className="text-slate-300 ml-2">years of excellence</span>
              </div>
           )}

          </div>
        </div>
      </div>
    </div>
  );
}