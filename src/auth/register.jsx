import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { account, ID, tablesDB } from "../lib/appwrite";
import { Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Register = () => {
  const [tab, setTab] = useState("customer");
  const navigate = useNavigate();

  const [CustomerDetails, setCustomerDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [tailorDetails, setTailorDetails] = useState({
    firstName: "",
    lastName: "",
    businessName: "",
    email: "",
    phone: "",
    location: "",
    password: "",
    confirmPassword: "",
  });

  const updateCustomerDetails = (e) => {
    setCustomerDetails((prevDetails) => ({
      ...prevDetails,

      [e.target.name]: e.target.value,
    }));
  };

  const updateTailorDetails = (e) => {
    setTailorDetails((prevDetails) => ({
      ...prevDetails,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTailorRegister = async (role) => {
    if (!tailorDetails.email || !tailorDetails.password) {
      alert("Please provide email and password");
      return;
    }

    if (tailorDetails.password !== tailorDetails.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // Registration logic here
      let fullname = `${tailorDetails.firstName} ${tailorDetails.lastName}`;
      const newTailor = await account.create({
        userId: ID.unique(),
        businessName: tailorDetails.businessName,
        email: tailorDetails.email,
        phone: tailorDetails.phone,
        password: tailorDetails.password,
        name: fullname,
      });

      await tablesDB.createRow({
        databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID_USERS,
        tableId: import.meta.env.VITE_APPWRITE_TABLE_ID_USERS,
        rowId: newTailor.$id,
        data: {
          businessName: tailorDetails.businessName,
          name: fullname,
          email: tailorDetails.email,
          phone: tailorDetails.phone,
          location: tailorDetails.location,
          role: "tailor",
        },
      });
      alert("Registration successful!");
      setTailorDetails({
        firstName: "",
        lastName: "",
        businessName: "",
        email: "",
        phone: "",
        location: "",
        password: "",
        confirmPassword: "",
      });
      if (role === "customer") {
        window.location.href = "/customer-dashboard";
      } else if (role === "tailor") {
        window.location.href = "/tailor-dashboard";
      }
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };

  const handleCustomerRegister = async (role) => {
    if (!CustomerDetails.email || !CustomerDetails.password) {
      alert("Please provide email and password");
      return;
    }

    if (CustomerDetails.password !== CustomerDetails.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // Registration logic here
      let fullname = `${CustomerDetails.firstName} ${CustomerDetails.lastName}`;
      const newCustomer = await account.create({
        userId: ID.unique(),
        email: CustomerDetails.email,
        phone: CustomerDetails.phone,
        password: CustomerDetails.password,
        name: fullname,
      });

      await tablesDB.createRow({
        databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID_USERS,
        tableId: import.meta.env.VITE_APPWRITE_TABLE_ID_USERS,
        rowId: newCustomer.$id,
        data: {
          name: fullname,
          email: CustomerDetails.email,
          role: "customer",
          phone: CustomerDetails.phone,
        },
      });
      alert("Registration successful!");
      setCustomerDetails({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      if (role === "customer") {
        window.location.href = "/customer-dashboard";
      } else if (role === "tailor") {
        window.location.href = "/tailor-dashboard";
      }
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
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
            Create an account to get started with custom tailoring
          </p>
        </div>

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
              <h2 className="text-lg font-medium mb-2">
                Customer Registration
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Join as a customer to browse designs and place custom orders
              </p>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="customer-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    FirstName
                  </label>
                  <input
                    id="customer-firstname"
                    type="text"
                    name="firstName"
                    placeholder="firstName"
                    value={CustomerDetails.firstName}
                    onChange={(e) => updateCustomerDetails(e)}
                    className="mt-1 block w-full rounded border-gray-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="customer-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    LastName
                  </label>
                  <input
                    id="customer-lastname"
                    type="text"
                    name="lastName"
                    placeholder="lastName"
                    value={CustomerDetails.lastName}
                    onChange={(e) => updateCustomerDetails(e)}
                    className="mt-1 block w-full rounded border-gray-300 px-3 py-2"
                  />
                </div>

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
                    name="email"
                    placeholder="sarah@example.com"
                    value={CustomerDetails.email}
                    onChange={(e) => updateCustomerDetails(e)}
                    className="mt-1 block w-full rounded border-gray-300 px-3 py-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor="customer-phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <input
                    id="customer-phone"
                    type="tel"
                    name="phone"
                    placeholder="+1 555 555 5555"
                    value={CustomerDetails.phone}
                    onChange={(e) => updateCustomerDetails(e)}
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
                    name="password"
                    placeholder="••••••••"
                    value={CustomerDetails.password}
                    onChange={(e) => updateCustomerDetails(e)}
                    className="mt-1 block w-full rounded border-gray-300 px-3 py-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor="customer-confirm"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="customer-confirm"
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={CustomerDetails.confirmPassword}
                    onChange={(e) => updateCustomerDetails(e)}
                    className="mt-1 block w-full rounded border-gray-300 px-3 py-2"
                  />
                </div>

                <button
                  onClick={() => handleCustomerRegister("customer")}
                  className="w-full bg-emerald-600 text-white px-4 py-2 rounded"
                >
                  Create Account
                </button>

                <p className="text-center text-gray-600">
                  already have an account?{" "}
                  <Link to="/login" className="text-emerald-600 hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          )}

          {tab === "tailor" && (
            <div>
              <h2 className="text-lg font-medium mb-2">Tailor Registration</h2>
              <p className="text-sm text-gray-600 mb-4">
                Sign up as a tailor to showcase designs and manage orders
              </p>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="tailor-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    FirstName
                  </label>
                  <input
                    id="tailor-name"
                    name="firstName"
                    type="text"
                    placeholder="Marcus Tailoring"
                    value={tailorDetails.firstName}
                    onChange={(e) => updateTailorDetails(e)}
                    className="mt-1 block w-full rounded border-gray-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="tailor-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    LastName
                  </label>
                  <input
                    id="tailor-name"
                    name="lastName"
                    type="text"
                    placeholder="Marcus Tailoring"
                    value={tailorDetails.lastName}
                    onChange={(e) => updateTailorDetails(e)}
                    className="mt-1 block w-full rounded border-gray-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="tailor-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Business Name
                  </label>
                  <input
                    id="tailor-business"
                    name="businessName"
                    type="text"
                    placeholder="Marcus Tailoring"
                    value={tailorDetails.businessName}
                    onChange={(e) => updateTailorDetails(e)}
                    className="mt-1 block w-full rounded border-gray-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="tailor-email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    id="tailor-email"
                    name="email"
                    type="email"
                    placeholder="marcus@example.com"
                    value={tailorDetails.email}
                    onChange={(e) => updateTailorDetails(e)}
                    className="mt-1 block w-full rounded border-gray-300 px-3 py-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor="tailor-phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <input
                    id="tailor-phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 555 555 5555"
                    value={tailorDetails.phone}
                    onChange={(e) => updateTailorDetails(e)}
                    className="mt-1 block w-full rounded border-gray-300 px-3 py-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor="tailor-location"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Location
                  </label>
                  <input
                    id="tailor-location"
                    name="location"
                    type="text"
                    placeholder="City, State or Address"
                    value={tailorDetails.location}
                    onChange={(e) => updateTailorDetails(e)}
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
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={tailorDetails.password}
                    onChange={(e) => updateTailorDetails(e)}
                    className="mt-1 block w-full rounded border-gray-300 px-3 py-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor="tailor-confirm"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="tailor-confirm"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={tailorDetails.confirmPassword}
                    onChange={(e) => updateTailorDetails(e)}
                    className="mt-1 block w-full rounded border-gray-300 px-3 py-2"
                  />
                </div>

                <button
                  onClick={() => handleTailorRegister("tailor")}
                  className="w-full bg-emerald-600 text-white px-4 py-2 rounded"
                >
                  Create Account
                </button>

                <p className="text-center text-gray-600">
                  already have an account?{" "}
                  
                  <Link to="/login" className="text-emerald-600 hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          )}

          {/* {tab === "admin" && (
            <div>
              <h2 className="text-lg font-medium mb-2">Admin Registration</h2>
              <p className="text-sm text-gray-600 mb-4">
                Register an admin account (use sparingly)
              </p>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="admin-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full name
                  </label>
                  <input
                    id="admin-name"
                    type="text"
                    placeholder="Admin Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full rounded border-gray-300 px-3 py-2"
                  />
                </div>

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

                <div>
                  <label
                    htmlFor="admin-confirm"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="admin-confirm"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1 block w-full rounded border-gray-300 px-3 py-2"
                  />
                </div>

                <button
                  onClick={() => handleCustomerRegister("admin")}
                  className="w-full bg-emerald-600 text-white px-4 py-2 rounded"
                >
                  Create Account
                </button>

                <p className="text-center text-gray-600">
                  already have an account?{" "}
                  <a href="/login" className="text-emerald-600 hover:underline">
                    Sign in
                  </a>
                </p>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Register;
