import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import api from "../api/axios";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, checkAuth } = useAuth();

  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);

  // ======================================
  // CLOSE PROFILE DROPDOWN ON OUTSIDE CLICK
  // ======================================

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // ======================================
  // LOGOUT
  // ======================================

  const handleLogout = async () => {
    try {
      await api.post("/api/auth/logout");

      await checkAuth();

      setProfileOpen(false);

      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // ======================================
  // ACTIVE ROUTE
  // ======================================

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="w-full bg-[#242321] border-b border-[#4a4640] px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* ===============================
            LOGO
        =============================== */}

        <button
          type="button"
          onClick={() => navigate("/")}
          className="text-2xl font-bold tracking-tight text-[#f1eadc] hover:text-[#d8894a] transition-colors"
        >
          Short<span className="text-[#d8894a]">//</span>Link
        </button>

        {/* ===============================
            NAVIGATION
        =============================== */}

        <div className="flex items-center gap-2">
          {/* HOME */}

          <button
            type="button"
            onClick={() => navigate("/")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive("/")
                ? "bg-[#d8894a] text-[#1c1b1a]"
                : "text-[#c8c0b2] hover:text-[#f1eadc] hover:bg-[#2d2b28]"
            }`}
          >
            Home
          </button>

          {/* ===============================
              LOGGED IN
          =============================== */}

          {user ? (
            <>
              {/* DASHBOARD */}

              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/dashboard")
                    ? "bg-[#d8894a] text-[#1c1b1a]"
                    : "text-[#c8c0b2] hover:text-[#f1eadc] hover:bg-[#2d2b28]"
                }`}
              >
                Dashboard
              </button>

              {/* ===============================
                  PROFILE
              =============================== */}

              <div ref={profileRef} className="relative">
                <button
                  type="button"
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 ml-2 px-2 py-1.5 rounded-md hover:bg-[#2d2b28] transition-colors"
                >
                  <img
                    src={user.avatar}
                    alt={`${user.name}'s avatar`}
                    className="w-8 h-8 rounded-full object-cover border border-[#4a4640]"
                  />

                  <span className="hidden md:block text-sm font-medium text-[#f1eadc]">
                    {user.name}
                  </span>

                  <span className="text-xs text-[#aaa294]">
                    {profileOpen ? "▲" : "▼"}
                  </span>
                </button>

                {/* ===============================
                    PROFILE DROPDOWN
                =============================== */}

                {profileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-[#2d2b28] border border-[#4a4640] rounded-lg shadow-xl z-50">
                    {/* USER INFO */}

                    <div className="p-4 border-b border-[#4a4640]">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={`${user.name}'s avatar`}
                          className="w-11 h-11 rounded-full object-cover border border-[#4a4640]"
                        />

                        <div className="min-w-0">
                          <p className="font-medium text-[#f1eadc] truncate">
                            {user.name}
                          </p>

                          <p className="text-xs text-[#aaa294] truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* DASHBOARD */}

                    <button
                      type="button"
                      onClick={() => {
                        setProfileOpen(false);
                        navigate("/dashboard");
                      }}
                      className="w-full text-left px-4 py-3 text-sm text-[#c8c0b2] hover:bg-[#3a3733] hover:text-[#f1eadc] transition-colors"
                    >
                      Dashboard
                    </button>

                    {/* LOGOUT */}

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 border-t border-[#4a4640] text-sm text-red-400 hover:bg-[#3a3733] transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* LOGIN */}

              <button
                type="button"
                onClick={() => navigate("/login")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/login")
                    ? "bg-[#d8894a] text-[#1c1b1a]"
                    : "text-[#c8c0b2] hover:text-[#f1eadc] hover:bg-[#2d2b28]"
                }`}
              >
                Login
              </button>

              {/* REGISTER */}

              <button
                type="button"
                onClick={() => navigate("/register")}
                className="px-4 py-2 rounded-md bg-[#d8894a] text-[#1c1b1a] text-sm font-medium hover:bg-[#e09a60] transition-colors"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
