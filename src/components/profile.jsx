import { Mail, Phone, MapPin, Award } from 'lucide-react';



export default function ProfileHeader({ profile }) {

  const [profiles, setProfiles] = useState([]);

  const fetchProfiles = async () => {
try {

} catch (error) {
  console.error('Error fetching profiles:', error);
}
  }

  return (
  {profiles.map((profile))}
  (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="relative">
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-6xl font-bold shadow-2xl ring-4 ring-amber-400/20">
              {profile.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-amber-500 rounded-full p-3 shadow-xl">
              <Award className="w-6 h-6 text-slate-900" />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">
              {profile.name}
            </h1>
            <p className="text-xl text-amber-400 mb-4">{profile.title}</p>
            <p className="text-slate-300 text-lg leading-relaxed mb-6 max-w-3xl">
              {profile.bio}
            </p>

            <div className="flex flex-wrap gap-6 justify-center md:justify-start text-sm">
              <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-lg backdrop-blur-sm">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>{profile.phone}</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-lg backdrop-blur-sm">
                <Mail className="w-4 h-4 text-amber-400" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-lg backdrop-blur-sm">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>{profile.address}</span>
              </div>
            </div>

            <div className="mt-6 inline-block bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-400/30 px-6 py-3 rounded-lg backdrop-blur-sm">
              <span className="text-3xl font-bold text-amber-400">{profile.years_experience}</span>
              <span className="text-slate-300 ml-2">years of excellence</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
);
}
