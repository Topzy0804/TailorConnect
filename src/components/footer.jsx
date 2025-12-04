import React from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Twitter,
  Instagram,
  Facebook,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <svg
              className="w-10 h-10 text-emerald-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <circle cx="6" cy="6" r="3"></circle>
              <circle cx="6" cy="18" r="3"></circle>
              <path d="M20 4L8.12 15.88"></path>
              <path d="M14.47 14.48L20 20"></path>
            </svg>
            <div>
              <h3 className="text-lg font-semibold text-white">
                TailorConnect
              </h3>
              <p className="text-sm text-gray-300">
                Custom tailoring marketplace
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Connecting clients with expert tailors for bespoke garments and
            alterations.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <a
              href="#"
              aria-label="Twitter"
              className="p-2 bg-white/5 rounded hover:bg-white/10 transition-colors"
            >
              <Twitter className="w-4 h-4 text-white" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="p-2 bg-white/5 rounded hover:bg-white/10 transition-colors"
            >
              <Instagram className="w-4 h-4 text-white" />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="p-2 bg-white/5 rounded hover:bg-white/10 transition-colors"
            >
              <Facebook className="w-4 h-4 text-white" />
            </a>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-4">Shop</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link to="/mens" className="hover:text-emerald-300">
                Men
              </Link>
            </li>
            <li>
              <Link to="/womens" className="hover:text-emerald-300">
                Women
              </Link>
            </li>
            <li>
              <Link to="/kids" className="hover:text-emerald-300">
                Kids
              </Link>
            </li>
            <li>
              <Link to="/new" className="hover:text-emerald-300">
                New Arrivals
              </Link>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-4">Services</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link to="/bespoke" className="hover:text-emerald-300">
                Bespoke Tailoring
              </Link>
            </li>
            <li>
              <Link to="/alterations" className="hover:text-emerald-300">
                Alterations
              </Link>
            </li>
            <li>
              <Link to="/styling" className="hover:text-emerald-300">
                Personal Styling
              </Link>
            </li>
            <li>
              <Link to="/consultation" className="hover:text-emerald-300">
                Virtual Consultation
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-300" />
              <span>123 Fashion Avenue, New York, NY</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-300" />
              <a href="tel:+15551234567" className="hover:text-emerald-300">
                +1 (555) 123-4567
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-300" />
              <a
                href="mailto:contact@atelier.com"
                className="hover:text-emerald-300"
              >
                contact@atelier.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} TailorConnect — All rights reserved.
          </p>
          <div className="flex gap-6 mt-3 md:mt-0">
            <Link to="/terms" className="hover:text-emerald-300">
              Terms
            </Link>
            <Link to="/privacy" className="hover:text-emerald-300">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
