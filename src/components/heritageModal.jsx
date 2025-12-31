import { Award, Scissors, Star, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HeritagePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-slate-600 hover:text-amber-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
          {/* Visual Side */}
          <div className="bg-slate-900 p-12 flex flex-col justify-center items-center text-center space-y-6">
            <div className="w-20 h-20 bg-amber-500 rounded-2xl flex items-center justify-center rotate-3 shadow-lg">
              <Scissors className="w-10 h-10 text-slate-900" />
            </div>
            <h2 className="text-4xl font-bold text-white leading-tight">
              Our Heritage of <span className="text-amber-500">Excellence</span>
            </h2>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-5 h-5 fill-amber-500 text-amber-500" />
              ))}
            </div>
          </div>

          {/* Content Side */}
          <div className="p-12 space-y-8">
            <section className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-amber-600">The Vision</h3>
              <p className="text-slate-700 leading-relaxed text-xl">
                The heritage of TailorConnect is built on a foundation of professional craftsmanship 
                and a deep-rooted passion for luxury fashion.
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-amber-600">The Connection</h3>
              <p className="text-slate-700 leading-relaxed text-lg">
                Rather than just being a digital marketplace, the platform serves as a bridge 
                between traditional tailoring techniques and modern design aesthetics.
              </p>
            </section>

            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <Award className="w-8 h-8 text-amber-500 mb-3" />
                <h4 className="font-bold text-slate-900 text-lg">Artisanal</h4>
                <p className="text-sm text-slate-500">Traditional Methods</p>
              </div>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <Star className="w-8 h-8 text-amber-500 mb-3" />
                <h4 className="font-bold text-slate-900 text-lg">Luxury</h4>
                <p className="text-sm text-slate-500">Modern Design</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}