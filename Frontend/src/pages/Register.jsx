import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/useAuth";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { checkAuth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await api.post("/api/auth/register", {
        name,
        email,
        password,
      });

      // Get the newly registered user
      await checkAuth();

      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);

      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // GOOGLE REGISTRATION / LOGIN
  // ===============================

  const handleGoogleRegister = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-lg shadow-md p-8"
      >
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Create Account
        </h1>

        {/* NAME */}

        <label
          htmlFor="name"
          className="block font-semibold text-gray-700 mb-2"
        >
          Name
        </label>

        <input
          id="name"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* EMAIL */}

        <label
          htmlFor="email"
          className="block font-semibold text-gray-700 mt-5 mb-2"
        >
          Email
        </label>

        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* PASSWORD */}

        <label
          htmlFor="password"
          className="block font-semibold text-gray-700 mt-5 mb-2"
        >
          Password
        </label>

        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-3 pr-16 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-500 hover:text-blue-700"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* ERROR */}

        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

        {/* REGISTER BUTTON */}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium py-3 rounded-md transition"
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        {/* ===============================
            OR DIVIDER
        =============================== */}

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>

          <span className="px-4 text-sm text-gray-500">OR</span>

          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* ===============================
            GOOGLE REGISTER / LOGIN
        =============================== */}

        <button
          type="button"
          onClick={handleGoogleRegister}
          className="w-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 font-medium py-3 rounded-md transition flex items-center justify-center gap-3"
        >
          {/* Google Logo */}
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M21.35 12.27c0-.79-.07-1.54-.22-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.42z"
            />

            <path
              fill="#34A853"
              d="M12 21.75c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.93-3.31.93-2.54 0-4.69-1.72-5.46-4.03H3.29v2.53A9.75 9.75 0 0 0 12 21.75z"
            />

            <path
              fill="#FBBC05"
              d="M6.54 13.84a5.87 5.87 0 0 1 0-3.68V7.63H3.29a9.75 9.75 0 0 0 0 8.74l3.25-2.53z"
            />

            <path
              fill="#EA4335"
              d="M12 6.13c1.43 0 2.72.49 3.73 1.46l2.8-2.8C16.84 3.21 14.63 2.25 12 2.25a9.75 9.75 0 0 0-8.71 5.38l3.25 2.53C7.31 7.85 9.46 6.13 12 6.13z"
            />
          </svg>
          Continue with Google
        </button>

        {/* LOGIN */}

        <p className="text-center text-gray-600 mt-5">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-blue-500 hover:underline"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default Register;
