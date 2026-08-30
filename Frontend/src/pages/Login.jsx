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

      setError(error.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // GOOGLE LOGIN
  // ===============================

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`;
  };

  return (
    <div className="min-h-screen bg-[#1c1b1a] text-[#f1eadc] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* ===============================
            HEADER
        =============================== */}

        <div className="text-center mb-8">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-2xl font-bold tracking-tight text-[#f1eadc] hover:text-[#d8894a] transition-colors"
          >
            Short<span className="text-[#d8894a]">//</span>Link
          </button>

          <p className="mt-3 text-[#aaa294] text-sm">
            Welcome back. Sign in to continue.
          </p>
        </div>

        {/* ===============================
            LOGIN FORM
        =============================== */}

        <form
          onSubmit={handleSubmit}
          className="w-full bg-[#2d2b28] border border-[#4a4640] rounded-xl shadow-xl p-6 md:p-8"
        >
          <h1 className="text-2xl font-semibold text-[#f1eadc] mb-7">Login</h1>

          {/* EMAIL */}

          <label
            htmlFor="email"
            className="block text-sm font-medium text-[#c8c0b2] mb-2"
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
            className="w-full bg-[#1c1b1a] border border-[#4a4640] text-[#f1eadc] placeholder-[#777168] rounded-md px-4 py-3 outline-none transition-colors focus:border-[#d8894a] focus:ring-1 focus:ring-[#d8894a]"
          />

          {/* PASSWORD */}

          <label
            htmlFor="password"
            className="block text-sm font-medium text-[#c8c0b2] mt-5 mb-2"
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
              className="w-full bg-[#1c1b1a] border border-[#4a4640] text-[#f1eadc] placeholder-[#777168] rounded-md px-4 py-3 pr-16 outline-none transition-colors focus:border-[#d8894a] focus:ring-1 focus:ring-[#d8894a]"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-[#d8894a] hover:text-[#e09a60]"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* ERROR */}

          {error && (
            <div className="mt-4 px-4 py-3 bg-[#3a2725] border border-[#74433d] rounded-md">
              <p className="text-red-300 text-sm text-center">{error}</p>
            </div>
          )}

          {/* LOGIN BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-[#d8894a] hover:bg-[#e09a60] disabled:bg-[#76543c] disabled:cursor-not-allowed text-[#1c1b1a] font-semibold py-3 rounded-md transition-colors"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* ===============================
              DIVIDER
          =============================== */}

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-[#4a4640]" />

            <span className="px-4 text-xs text-[#777168]">OR</span>

            <div className="flex-1 border-t border-[#4a4640]" />
          </div>

          {/* ===============================
              GOOGLE LOGIN
          =============================== */}

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-[#1c1b1a] border border-[#4a4640] hover:border-[#aaa294] text-[#f1eadc] font-medium py-3 rounded-md transition-colors flex items-center justify-center gap-3"
          >
            {/* Google Logo */}
            <svg width="19" height="19" viewBox="0 0 24 24">
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

          {/* REGISTER */}

          <p className="text-center text-sm text-[#aaa294] mt-6">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-[#d8894a] hover:text-[#e09a60] font-medium"
            >
              Register
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
