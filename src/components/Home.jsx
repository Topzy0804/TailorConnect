import React, { useState } from "react";
import {
  Scissors,
  Users,
  MessageCircle,
  Scissors as ScissorsIcon,
  X,
  Menu,
  Search,
  ShoppingBag,
  Phone,
  Mail,
} from "lucide-react";
import { useApp } from "../context";
import { Link } from "react-router-dom";

export const Home = () => {
  const { setCurrentView } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* <header className="fixed top-0 w-full z-50 transition-all duration-300 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <button
              className="lg:hidden p-2 hover:bg-gray-50 rounded-lg transition-colors text-emerald-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="flex-1 lg:flex-none">
              <h1 className="text-2xl font-semibold tracking-wider text-emerald-600">
               TailorConnect
              </h1>
            </div>

            <nav className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
              <a
                href="#men"
                className="text-sm tracking-wide text-gray-700 hover:text-emerald-600 transition-colors"
              >
                MEN
              </a>
              <a
                href="#women"
                className="text-sm tracking-wide text-gray-700 hover:text-emerald-600 transition-colors"
              >
                WOMEN
              </a>
              <a
                href="#kids"
                className="text-sm tracking-wide text-gray-700 hover:text-emerald-600 transition-colors"
              >
                KIDS
              </a>
              <a
                href="#new"
                className="text-sm tracking-wide text-gray-700 hover:text-emerald-600 transition-colors"
              >
                NEW ARRIVALS
              </a>
              <a
                href="#bespoke"
                className="text-sm tracking-wide text-gray-700 hover:text-emerald-600 transition-colors"
              >
                
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <button
                className="p-2 hover:bg-gray-50 rounded-lg transition-colors text-emerald-600"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <button
                className="p-2 hover:bg-gray-50 rounded-lg transition-colors text-emerald-600"
                aria-label="Cart"
              >
                <ShoppingBag size={20} />
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <nav className="px-4 py-6 space-y-4">
              <a
                onClick={() => setMobileMenuOpen(false)}
                href="#men"
                className="block text-sm tracking-wide text-gray-700 hover:text-emerald-600 transition-colors"
              >
                MEN
              </a>
              <a
                onClick={() => setMobileMenuOpen(false)}
                href="#women"
                className="block text-sm tracking-wide text-gray-700 hover:text-emerald-600 transition-colors"
              >
                WOMEN
              </a>
              <a
                onClick={() => setMobileMenuOpen(false)}
                href="#kids"
                className="block text-sm tracking-wide text-gray-700 hover:text-emerald-600 transition-colors"
              >
                KIDS
              </a>
              <a
                onClick={() => setMobileMenuOpen(false)}
                href="#new"
                className="block text-sm tracking-wide text-gray-700 hover:text-emerald-600 transition-colors"
              >
                NEW ARRIVALS
              </a>
              <a
                onClick={() => setMobileMenuOpen(false)}
                href="#bespoke"
                className="block text-sm tracking-wide text-gray-700 hover:text-emerald-600 transition-colors"
              >
                BESPOKE
              </a>
            </nav>
          </div>
        )}
      </header> */}

      <main className="pt-1">
        <section className="relative h-screen">
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="Luxury tailoring"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
          </div>
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="max-w-xl text-white">
              <h2 className="text-5xl md:text-7xl font-light mb-6 leading-tight">
                Crafted for
                <br />
                Perfection
              </h2>
              <p className="text-lg md:text-xl mb-8 font-light leading-relaxed opacity-95">
                Experience the art of bespoke tailoring with our master
                craftsmen. Every stitch tells a story of elegance and precision.
              </p>
              <Link to="/shop">
              <button
                onClick={() => setCurrentView?.("browse")}
                className="bg-emerald-600 text-white px-8 py-4 text-sm tracking-wider hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105 rounded-md"
              >
                EXPLORE COLLECTION
              </button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-light mb-4 tracking-wide">
                Featured Collections
              </h3>
              <p className="text-gray-600 font-light">
                Discover our latest arrivals and timeless pieces
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-emerald-50 w-14 h-14 rounded-xl flex items-center justify-center mb-5">
                  <Users className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Find Expert Tailors
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Browse profiles of skilled tailors from around the world. View
                  their portfolios, specialties, and customer reviews.
                </p>
                <button
                  onClick={() => setCurrentView?.("browse")}
                  className="mt-4 text-emerald-600 hover:text-emerald-700 text-sm font-semibold"
                >
                  Browse Tailors →
                </button>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-emerald-50 w-14 h-14 rounded-xl flex items-center justify-center mb-5">
                  <MessageCircle className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Direct Communication
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Chat directly with tailors to discuss your vision, share
                  measurements, and get personalized recommendations.
                </p>
                <button
                  onClick={() => setCurrentView?.("chat")}
                  className="mt-4 text-emerald-600 hover:text-emerald-700 text-sm font-semibold"
                >
                  Start Chat →
                </button>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-emerald-50 w-14 h-14 rounded-xl flex items-center justify-center mb-5">
                  <ScissorsIcon className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Custom Creation
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Get clothing tailored to your exact measurements and style
                  preferences. Every piece is unique and made for you.
                </p>
                <button
                  onClick={() => setCurrentView?.("create")}
                  className="mt-4 text-emerald-600 hover:text-emerald-700 text-sm font-semibold"
                >
                  Create →
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-3xl md:text-4xl font-light mb-6 tracking-wide leading-tight">
                  Our Heritage of Excellence
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed font-light">
                  For over three decades, we have been at the forefront of
                  luxury fashion, combining traditional craftsmanship with
                  contemporary design.
                </p>
                <button className="border border-emerald-600 text-emerald-600 px-8 py-4 text-sm tracking-wider hover:bg-emerald-600 hover:text-white transition-all duration-300">
                  LEARN MORE
                </button>
              </div>
              <div>
                <img
                  src="https://images.pexels.com/photos/6567607/pexels-photo-6567607.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Craftsmanship"
                  className="w-full h-auto shadow-2xl rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-light mb-4 tracking-wide">
                New Arrivals
              </h3>
              <p className="text-gray-300 font-light">
                Fresh styles for the discerning individual
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                "https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=600",
                "https://images.pexels.com/photos/1926620/pexels-photo-1926620.jpeg?auto=compress&cs=tinysrgb&w=600",
                "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=600",
                "https://images.pexels.com/photos/794064/pexels-photo-794064.jpeg?auto=compress&cs=tinysrgb&w=600",
              ].map((src, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="relative overflow-hidden mb-3 aspect-square">
                    <img
                      src={src}
                      alt={`New arrival ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 rounded-lg"
                    />
                  </div>
                  <p className="text-sm font-light tracking-wide">
                    New Collection ${(index + 1) * 250}
                  </p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <button className="bg-emerald-600 text-white px-8 py-4 text-sm tracking-wider hover:bg-emerald-700 transition-all duration-300">
                VIEW ALL
              </button>
            </div>
          </div>
        </section>

        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-gray-300 rounded-full">
                  <Phone size={28} className="text-emerald-600" />
                </div>
                <h4 className="text-xl font-light mb-3 tracking-wide">
                  Book a Consultation
                </h4>
                <p className="text-gray-600 font-light mb-2">
                  +234 811 720 4079
                </p>
                <p className="text-gray-600 font-light text-sm">
                  Mon - Sat, 10AM - 7PM
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-gray-300 rounded-full">
                  <Mail size={28} className="text-emerald-600" />
                </div>
                <h4 className="text-xl font-light mb-3 tracking-wide">
                  Get in Touch with Admin
                </h4>
                <p className="text-gray-600 font-light mb-2">topzy@gmail.com</p>
                <p className="text-gray-600 font-light text-sm">
                  We reply within 24 hours
                </p>
              </div>

              {/* <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-gray-300 rounded-full">
                  <Scissors size={28} className="text-emerald-600" />
                </div>
                <h4 className="text-xl font-light mb-3 tracking-wide">
                  Visit OurTailorConnect
                </h4>
                <p className="text-gray-600 font-light mb-2">
                  123 Fashion Avenue
                </p>
                <p className="text-gray-600 font-light text-sm">
                  New York, NY 10013
                </p>
              </div> */}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
