import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

import Navbar from "../components/Navbar";
import api from "../api/axios";

const Dashboard = () => {
  // ===============================
  // GET USER URLs
  // ===============================

  const { data, isLoading, isError } = useQuery({
    queryKey: ["myUrls"],

    queryFn: async () => {
      const response = await api.get("/api/create/my-urls");

      return response.data.urls;
    },
  });

  // ===============================
  // QUERY CLIENT
  // ===============================

  const queryClient = useQueryClient();

  // ===============================
  // COPIED URL STATE
  // ===============================

  const [copiedId, setCopiedId] = useState(null);

  // ===============================
  // QR CODE STATE
  // ===============================

  const [qrUrlId, setQrUrlId] = useState(null);

  // ===============================
  // DELETING URL STATE
  // ===============================

  const [deletingId, setDeletingId] = useState(null);

  const urls = data || [];

  // ===============================
  // DELETE URL
  // ===============================

  const deleteMutation = useMutation({
    mutationFn: async (urlId) => {
      const response = await api.delete(`/api/dashboard/urls/${urlId}`);

      return response.data;
    },

    // Store which URL is being deleted

    onMutate: (urlId) => {
      setDeletingId(urlId);
    },

    // Refetch URLs after successful deletion

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myUrls"],
      });
    },

    // Always reset deleting state

    onSettled: () => {
      setDeletingId(null);
    },

    onError: (error) => {
      console.error(
        "❌ Error deleting URL:",
        error.response?.data?.message || error.message,
      );
    },
  });

  // ===============================
  // COPY SHORT URL
  // ===============================

  const handleCopy = async (shortCode, urlId) => {
    const shortUrl = `${import.meta.env.VITE_PUBLIC_URL}/${shortCode}`;

    try {
      await navigator.clipboard.writeText(shortUrl);

      setCopiedId(urlId);

      console.log("📋 Short URL copied:", shortUrl);

      // Reset after 2 seconds

      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch (error) {
      console.error("❌ Failed to copy short URL:", error);
    }
  };

  // ===============================
  // TOGGLE QR CODE
  // ===============================

  const handleQrToggle = (urlId) => {
    setQrUrlId((currentId) => (currentId === urlId ? null : urlId));
  };

  // ===============================
  // LOADING
  // ===============================

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1c1b1a] text-[#f1eadc]">
        <Navbar />

        <div className="flex items-center justify-center py-24">
          <p className="text-[#aaa294] text-lg">Loading your URLs...</p>
        </div>
      </div>
    );
  }

  // ===============================
  // ERROR
  // ===============================

  if (isError) {
    return (
      <div className="min-h-screen bg-[#1c1b1a] text-[#f1eadc]">
        <Navbar />

        <div className="flex items-center justify-center py-24">
          <div className="text-center">
            <p className="text-red-400 text-lg">Failed to load your URLs.</p>

            <p className="text-[#777168] text-sm mt-2">
              Please try refreshing the page.
            </p>
          </div>
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
    <div className="min-h-screen bg-[#1c1b1a] text-[#f1eadc]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* ===============================
            HEADER
        =============================== */}

        <div className="mb-10">
          <p className="text-[#d8894a] text-sm font-medium uppercase tracking-wider mb-2">
            Overview
          </p>

          <h1 className="text-3xl md:text-4xl font-bold">Dashboard</h1>

          <p className="text-[#aaa294] mt-2">
            Manage and track your shortened URLs.
          </p>
        </div>

        {/* ===============================
            STATISTICS
        =============================== */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {/* TOTAL URLS */}

          <div className="bg-[#2d2b28] border border-[#4a4640] rounded-xl p-6">
            <p className="text-[#aaa294] text-sm">Total URLs</p>

            <div className="flex items-end justify-between mt-3">
              <p className="text-3xl font-bold text-[#f1eadc]">{totalUrls}</p>

              <span className="text-[#d8894a] text-2xl">↗</span>
            </div>
          </div>

          {/* TOTAL CLICKS */}

          <div className="bg-[#2d2b28] border border-[#4a4640] rounded-xl p-6">
            <p className="text-[#aaa294] text-sm">Total Clicks</p>

            <div className="flex items-end justify-between mt-3">
              <p className="text-3xl font-bold text-[#f1eadc]">{totalClicks}</p>

              <span className="text-[#d8894a] text-2xl">◉</span>
            </div>
          </div>

          {/* CUSTOM URLS */}

          <div className="bg-[#2d2b28] border border-[#4a4640] rounded-xl p-6">
            <p className="text-[#aaa294] text-sm">Custom URLs</p>

            <div className="flex items-end justify-between mt-3">
              <p className="text-3xl font-bold text-[#f1eadc]">{customUrls}</p>

              <span className="text-[#d8894a] text-2xl">#</span>
            </div>
          </div>
        </div>

        {/* ===============================
            URL LIST
        =============================== */}

        <div className="bg-[#2d2b28] border border-[#4a4640] rounded-xl overflow-hidden">
          {/* HEADER */}

          <div className="p-6 border-b border-[#4a4640] flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-[#f1eadc]">
                Your URLs
              </h2>

              <p className="text-sm text-[#777168] mt-1">
                All your shortened links in one place.
              </p>
            </div>

            <span className="text-sm text-[#aaa294]">
              {totalUrls} {totalUrls === 1 ? "URL" : "URLs"}
            </span>
          </div>

          {/* ===============================
              EMPTY STATE
          =============================== */}

          {urls.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-14 h-14 mx-auto flex items-center justify-center bg-[#1c1b1a] border border-[#4a4640] rounded-lg text-[#d8894a] text-2xl">
                ↗
              </div>

              <p className="text-[#f1eadc] font-medium mt-5">No URLs yet</p>

              <p className="text-[#777168] text-sm mt-2">
                Create your first shortened URL to see it here.
              </p>
            </div>
          ) : (
            /* ===============================
               URL ITEMS
            =============================== */

            <div className="divide-y divide-[#4a4640]">
              {urls.map((url) => {
                const shortUrl = `${
                  import.meta.env.VITE_PUBLIC_URL
                }/${url.short_url}`;

                const isCopied = copiedId === url._id;

                const showQr = qrUrlId === url._id;

                const isDeleting = deletingId === url._id;

                return (
                  <div
                    key={url._id}
                    className="p-6 hover:bg-[#322f2c] transition-colors"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                      {/* ===============================
                          URL INFORMATION
                      =============================== */}

                      <div className="min-w-0">
                        <a
                          href={shortUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#d8894a] font-semibold hover:text-[#e09a60] transition-colors"
                        >
                          /{url.short_url}
                        </a>

                        <p className="text-sm text-[#aaa294] mt-2 break-all">
                          {url.full_url}
                        </p>

                        {url.createdAt && (
                          <p className="text-xs text-[#777168] mt-2">
                            Created{" "}
                            {new Date(url.createdAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>

                      {/* ===============================
                          STATS + ACTIONS
                      =============================== */}

                      <div className="flex items-center gap-3 flex-wrap">
                        {/* CLICKS */}

                        <div className="text-right mr-2">
                          <p className="text-xs text-[#777168] uppercase tracking-wide">
                            Clicks
                          </p>

                          <p className="font-semibold text-[#f1eadc] mt-1">
                            {url.clicks}
                          </p>
                        </div>

                        {/* OPEN */}

                        <a
                          href={shortUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-[#d8894a] hover:bg-[#e09a60] text-[#1c1b1a] text-sm font-semibold rounded-md transition-colors"
                        >
                          Open
                        </a>

                        {/* COPY */}

                        <button
                          type="button"
                          onClick={() => handleCopy(url.short_url, url._id)}
                          className={`px-4 py-2 border text-sm font-medium rounded-md transition-colors ${
                            isCopied
                              ? "border-green-500 bg-green-500 text-white"
                              : "border-[#4a4640] text-[#c8c0b2] hover:bg-[#3a3733] hover:text-[#f1eadc]"
                          }`}
                        >
                          {isCopied ? "Copied!" : "Copy"}
                        </button>

                        {/* QR */}

                        <button
                          type="button"
                          onClick={() => handleQrToggle(url._id)}
                          className={`px-4 py-2 border text-sm font-medium rounded-md transition-colors ${
                            showQr
                              ? "border-[#d8894a] bg-[#d8894a] text-[#1c1b1a]"
                              : "border-[#4a4640] text-[#c8c0b2] hover:bg-[#3a3733] hover:text-[#f1eadc]"
                          }`}
                        >
                          {showQr ? "Hide QR" : "QR"}
                        </button>

                        {/* DELETE */}

                        <button
                          type="button"
                          onClick={() => {
                            const confirmed = window.confirm(
                              `Delete /${url.short_url}?`,
                            );

                            if (confirmed) {
                              deleteMutation.mutate(url._id);
                            }
                          }}
                          disabled={isDeleting}
                          className="px-4 py-2 border border-[#74433d] text-red-400 hover:bg-red-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium rounded-md transition-colors"
                        >
                          {isDeleting ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </div>

                    {/* ===============================
                        QR CODE
                    =============================== */}

                    {showQr && (
                      <div className="mt-6 pt-6 border-t border-[#4a4640] flex flex-col items-center">
                        <p className="text-sm font-medium text-[#c8c0b2] mb-4">
                          Scan to open /{url.short_url}
                        </p>

                        <div className="bg-white p-4 rounded-lg">
                          <QRCodeSVG value={shortUrl} size={180} level="H" />
                        </div>

                        <p className="text-xs text-[#777168] mt-3">
                          {shortUrl}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
