import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/useAuth";

const Login = () => {
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
      await api.post("/api/auth/login", {
        email,
        password,
      });

      // Update AuthContext with the newly logged-in user
      await checkAuth();

      navigate("/");
    } catch (error) {
      console.error("Login error:", error);

      setError(
        error.response?.data?.message ||
          "Invalid credentials"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-lg shadow-md p-8"
      >

        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Login
        </h1>


        {/* EMAIL */}

        <label
          htmlFor="email"
          className="block font-semibold text-gray-700 mb-2"
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
            placeholder="Enter your password"
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

        {error && (
          <p className="mt-4 text-red-500 text-center">
            {error}
          </p>
        )}


        {/* LOGIN BUTTON */}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium py-3 rounded-md transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>


        {/* REGISTER */}

        <p className="text-center text-gray-600 mt-5">

          Don't have an account?{" "}

          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-blue-500 hover:underline"
          >
            Register
          </button>

        </p>

      </form>

    </div>
  );
};

export default Login;