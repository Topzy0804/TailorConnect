import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { account, tablesDB } from "../lib/appwrite";
import { useUser } from "./userContext";

export default function Login() {
  const userData = useUser();
  const setUser = userData?.setUser;
  const navigate = useNavigate();

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const handleUpdate = (e) =>
    setLoginDetails((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // create session (returns session object)
      const currentUser = await account.createEmailPasswordSession({
        email: loginDetails.email,
        password: loginDetails.password,
      });

      // fetch profile row from your users table using the real user id
      let userProfile = await tablesDB.getRow({
        databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
        tableId: import.meta.env.VITE_APPWRITE_TABLE_ID_USERS,
        rowId: currentUser.userId,
      });

      setUser({
        email: userProfile.email,
        role: userProfile.role,
        $id: userProfile.$id,
        name: userProfile.name,
      });

      navigate(`/${userProfile.role}-dashboard`);
    } catch (error) {
      console.error("Login failed:", error.message);
      // alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-emerald-100 p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
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

        <div className="w-full bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium mb-2">Sign In</h2>
          <p className="text-sm text-gray-600 mb-4">
            Browse designs, shop for custom clothing, and connect with tailors
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={loginDetails.email}
                onChange={handleUpdate}
                className="mt-1 block w-full rounded border-gray-300 px-3 py-2"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={loginDetails.password}
                onChange={handleUpdate}
                className="mt-1 block w-full rounded border-gray-300 px-3 py-2"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 text-white px-4 py-2 rounded"
            >
              Sign In
            </button>

            <p className="text-center text-gray-600">
              don't have an account?{" "}
              <Link to="/register" className="text-emerald-600 hover:underline">
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
