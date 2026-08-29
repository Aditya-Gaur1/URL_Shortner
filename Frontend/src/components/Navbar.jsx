import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const Navbar = () => {
  const navigate = useNavigate();

  const {
    user,
    isAuthenticated,
    loading,
    logout,
  } = useAuth();

  const handleLogout = async () => {
    await logout();

    navigate("/login");
  };

  return (
    <nav className="w-full bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}

        <button
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-blue-500"
        >
          URL Shortener
        </button>


        {/* RIGHT SIDE */}

        {!loading && (
          <div className="flex items-center gap-4">

            {!isAuthenticated ? (
              <>
                {/* LOGIN */}

                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 text-gray-700 hover:text-blue-500 font-medium transition"
                >
                  Login
                </button>


                {/* REGISTER */}

                <button
                  onClick={() => navigate("/register")}
                  className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium transition"
                >
                  Register
                </button>
              </>
            ) : (
              <>
                {/* USER NAME */}

                <span className="text-gray-700 font-medium">
                  Hi, {user?.name}
                </span>


                {/* DASHBOARD */}

                <button
                  onClick={() => navigate("/dashboard")}
                  className="px-4 py-2 text-gray-700 hover:text-blue-500 font-medium transition"
                >
                  Dashboard
                </button>


                {/* LOGOUT */}

                <button
                  onClick={handleLogout}
                  className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md font-medium transition"
                >
                  Logout
                </button>
              </>
            )}

          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;