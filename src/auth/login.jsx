import { useState } from "react";

export default function Login() {
  const [tab, setTab] = useState("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (role) => {
    // Replace with real authentication flow
    console.log("Login attempt", { role, email });
    alert(`Demo: signing in as ${role} with ${email}`);
    if (role === "customer") {
      window.location.href = "/customer-dashboard";
    } else if (role === "tailor") {
      window.location.href = "/tailor-dashboard";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-emerald-100 p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            {/* Simple inline scissors SVG to avoid external icon imports */}
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
            <h1 className="text-emerald-600 text-2xl font-semibold">
              TailorConnect
            </h1>
          </div>
          <p className="text-gray-600">
            Modern E-commerce Platform for Custom Tailoring
          </p>
        </div>

        {/* Simple tabs implemented with state to avoid external UI dependencies */}
        <div className="w-full bg-white shadow rounded-lg p-6">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setTab("customer")}
              className={`px-4 py-2 rounded ${
                tab === "customer" ? "bg-emerald-600 text-white" : "bg-gray-100"
              }`}
            >
              Customer
            </button>
            <button
              onClick={() => setTab("tailor")}
              className={`px-4 py-2 rounded ${
                tab === "tailor" ? "bg-emerald-600 text-white" : "bg-gray-100"
              }`}
            >
              Tailor
            </button>
          </div>

          {tab === "customer" && (
            <div>
              <h2 className="text-lg font-medium mb-2">Customer Login</h2>
              <p className="text-sm text-gray-600 mb-4">
                Browse designs, shop for custom clothing, and connect with
                tailors
              </p>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="customer-email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    id="customer-email"
                    type="email"
                    placeholder="sarah@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full rounded border-gray-300 px-3 py-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor="customer-password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    id="customer-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full rounded border-gray-300 px-3 py-2"
                  />
                </div>

                <button
                  onClick={() => handleLogin("customer")}
                  className="w-full bg-emerald-600 text-white px-4 py-2 rounded"
                >
                  Sign In
                </button>

                <p className="text-center text-gray-600">
                  don't have an account?{" "}
                  <a
                    href="/register"
                    className="text-emerald-600 hover:underline"
                  >
                    Register here
                  </a>
                </p>
              </div>
            </div>
          )}

          {tab === "tailor" && (
            <div>
              <h2 className="text-lg font-medium mb-2">Tailor Login</h2>
              <p className="text-sm text-gray-600 mb-4">
                Showcase your designs, manage orders, and grow your business
              </p>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="tailor-email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    id="tailor-email"
                    type="email"
                    placeholder="marcus@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full rounded border-gray-300 px-3 py-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor="tailor-password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    id="tailor-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full rounded border-gray-300 px-3 py-2"
                  />
                </div>

                <button
                  onClick={() => handleLogin("tailor")}
                  className="w-full bg-emerald-600 text-white px-4 py-2 rounded"
                >
                  Sign In
                </button>

                <p className="text-center text-gray-600">
                  Demo: Click "Sign In" to explore the tailor dashboard
                </p>
              </div>
            </div>
          )}

          {tab === "admin" && (
            <div>
              <h2 className="text-lg font-medium mb-2">Admin Login</h2>
              <p className="text-sm text-gray-600 mb-4">
                Monitor platform performance and manage users
              </p>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="admin-email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    id="admin-email"
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full rounded border-gray-300 px-3 py-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor="admin-password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    id="admin-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full rounded border-gray-300 px-3 py-2"
                  />
                </div>

                <button
                  onClick={() => handleLogin("admin")}
                  className="w-full bg-emerald-600 text-white px-4 py-2 rounded"
                >
                  Sign In
                </button>

                <p className="text-center text-gray-600">
                  Demo: Click "Sign In" to explore the admin dashboard
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
