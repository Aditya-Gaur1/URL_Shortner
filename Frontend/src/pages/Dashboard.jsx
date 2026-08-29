import { useQuery } from "@tanstack/react-query";
import Navbar from "../components/Navbar";
import api from "../api/axios";

const Dashboard = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["myUrls"],

    queryFn: async () => {
      const response = await api.get("/api/create/my-urls");

      return response.data.urls;
    },
  });

  const urls = data || [];

  // ===============================
  // LOADING
  // ===============================

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />

        <div className="flex items-center justify-center py-20">
          <p className="text-gray-500 text-lg">Loading your URLs...</p>
        </div>
      </div>
    );
  }

  // ===============================
  // ERROR
  // ===============================

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />

        <div className="flex items-center justify-center py-20">
          <p className="text-red-500 text-lg">Failed to load your URLs.</p>
        </div>
      </div>
    );
  }

  // ===============================
  // STATISTICS
  // ===============================

  const totalUrls = urls.length;

  const totalClicks = urls.reduce((total, url) => total + url.clicks, 0);

  const customUrls = urls.filter((url) => url.short_url.length < 7).length;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* HEADER */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

          <p className="text-gray-600 mt-2">Manage your shortened URLs</p>
        </div>

        {/* ===============================
            STATISTICS
        =============================== */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* TOTAL URLS */}

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <p className="text-gray-500 text-sm">Total URLs</p>

            <p className="text-3xl font-bold text-gray-900 mt-2">{totalUrls}</p>
          </div>

          {/* TOTAL CLICKS */}

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <p className="text-gray-500 text-sm">Total Clicks</p>

            <p className="text-3xl font-bold text-gray-900 mt-2">
              {totalClicks}
            </p>
          </div>

          {/* CUSTOM URLS */}

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <p className="text-gray-500 text-sm">Custom URLs</p>

            <p className="text-3xl font-bold text-gray-900 mt-2">
              {customUrls}
            </p>
          </div>
        </div>

        {/* ===============================
            URL LIST
        =============================== */}

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Your URLs</h2>
          </div>

          {urls.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-gray-500">You haven't created any URLs yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {urls.map((url) => (
                <div key={url._id} className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* URL INFORMATION */}

                    <div className="min-w-0">
                      <p className="font-semibold text-gray-800">
                        {url.short_url}
                      </p>

                      <p className="text-sm text-gray-500 mt-1 break-all">
                        {url.full_url}
                      </p>
                    </div>

                    {/* STATS */}

                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-sm text-gray-500">Clicks</p>

                        <p className="font-semibold text-gray-800">
                          {url.clicks}
                        </p>
                      </div>

                      <a
                        href={`http://localhost:3000/${url.short_url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition"
                      >
                        Open
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
