import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center md:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <svg
            className="w-10 h-10 text-emerald-600"
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
            <h3 className="text-lg font-semibold text-gray-900">
              TailorConnect
            </h3>
            <p className="text-sm text-gray-600">
              Custom tailoring marketplace
            </p>
          </div>
        </div>

        <nav className="flex gap-6">
          <Link to="/" className="text-sm text-gray-700 hover:text-emerald-600">
            Home
          </Link>
          <Link
            to="/browse"
            className="text-sm text-gray-700 hover:text-emerald-600"
          >
            Browse
          </Link>
          <Link
            to="/chat"
            className="text-sm text-gray-700 hover:text-emerald-600"
          >
            Chat
          </Link>
          <Link
            to="/checkout"
            className="text-sm text-gray-700 hover:text-emerald-600"
          >
            Checkout
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="#"
            aria-label="Twitter"
            className="text-gray-500 hover:text-emerald-600"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M20 7.5c-.6.3-1.2.5-1.9.6.7-.4 1.2-1 1.4-1.8-.7.4-1.5.7-2.4.9C16.6 6.4 15.4 6 14.1 6c-2 0-3.6 1.6-3.6 3.6 0 .3 0 .7.1 1C7.6 10.4 5 9 3.4 6.9c-.4.7-.6 1.5-.6 2.4 0 1.6.8 3 2 3.9-.6 0-1.1-.2-1.6-.4v.1c0 2.3 1.6 4.2 3.7 4.6-.4.1-.9.2-1.4.2-.3 0-.6 0-.9-.1.6 2 2.4 3.5 4.6 3.6-1.6 1.2-3.6 1.9-5.8 1.9H4c2.1 1.4 4.6 2.2 7.4 2.2 8.8 0 13.6-7.3 13.6-13.6v-.6c.9-.6 1.6-1.4 2.2-2.3-.8.4-1.7.6-2.6.7z" />
            </svg>
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="text-gray-500 hover:text-emerald-600"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.5A4.5 4.5 0 1 0 16.5 13 4.5 4.5 0 0 0 12 8.5zm6.8-3.4a1.2 1.2 0 1 0 1.2 1.2 1.2 1.2 0 0 0-1.2-1.2z" />
            </svg>
          </a>
          <a
            href="#"
            aria-label="Facebook"
            className="text-gray-500 hover:text-emerald-600"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2.2V12h2.2V9.4c0-2.2 1.3-3.4 3.3-3.4.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.2l-.4 2.9h-1.8v7A10 10 0 0 0 22 12z" />
            </svg>
          </a>
        </div>
      </div>

      <div className="border-t">
        <div className="max-w-7xl mx-auto px-6 py-4 text-sm text-gray-600 flex flex-col md:flex-row justify-center items-center">
          <p>
            © {new Date().getFullYear()} TailorConnect — All rights reserved.
          </p>
          <div className="flex gap-4 mt-3 md:mt-0">
            <Link to="/terms" className="hover:underline">
              Terms
            </Link>
            <Link to="/privacy" className="hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
