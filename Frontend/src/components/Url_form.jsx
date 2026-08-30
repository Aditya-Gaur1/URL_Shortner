import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import api from "../api/axios.js";

const Url_form = () => {
  const [url, setUrl] = useState("");
  const [slug, setSlug] = useState("");

  const [shortenedUrl, setShortenedUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setShortenedUrl("");
    setCopied(false);

    try {
      const response = await api.post("/api/create", {
        url,
        slug: slug.trim() || undefined,
      });

      console.log("Backend response:", response.data);

      // Supports both:
      // 1. Backend returns string
      // 2. Backend returns { shortUrl: "..." }

      const shortUrl =
        typeof response.data === "string"
          ? response.data
          : response.data.shortUrl;

      setShortenedUrl(shortUrl);
    } catch (error) {
      console.error("Error creating short URL:", error);

      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!shortenedUrl) return;

    try {
      await navigator.clipboard.writeText(shortenedUrl);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#1c1b1a] text-[#f1eadc] px-4 py-12">
      {/* ================= FORM SECTION ================= */}

      <div className="flex flex-col items-center">
        {/* HEADING */}

        <div className="text-center mb-8">
          <p className="text-[#d8894a] text-sm font-medium tracking-widest uppercase mb-3">
            Simple URL Management
          </p>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Shorten your links.
          </h1>

          <p className="mt-3 text-[#aaa294] text-base md:text-lg">
            Create clean, memorable links in seconds.
          </p>
        </div>

        {/* ================= FORM ================= */}

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-[#2d2b28] border border-[#4a4640] rounded-xl p-6 md:p-10 shadow-xl"
        >
          {/* FORM HEADER */}

          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-8 bg-[#d8894a] rounded-sm"></div>

            <h2 className="text-xl font-semibold text-[#f1eadc]">
              Create a short URL
            </h2>
          </div>

          {/* URL */}

          <label
            htmlFor="url"
            className="block text-sm font-medium text-[#c8c0b2] mb-2"
          >
            Enter your URL
          </label>

          <input
            id="url"
            type="text"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="w-full bg-[#1c1b1a] border border-[#4a4640] text-[#f1eadc] placeholder-[#777168] rounded-md px-4 py-3.5 outline-none transition-colors focus:border-[#d8894a] focus:ring-1 focus:ring-[#d8894a]"
          />

          {/* CUSTOM SLUG */}

          <label
            htmlFor="slug"
            className="block text-sm font-medium text-[#c8c0b2] mt-6 mb-2"
          >
            Custom slug
            <span className="text-xs font-normal text-[#777168]">
              {" "}
              (optional)
            </span>
          </label>

          <div className="flex items-center bg-[#1c1b1a] border border-[#4a4640] rounded-md overflow-hidden focus-within:border-[#d8894a]">
            <span className="px-3 text-[#777168] text-sm border-r border-[#4a4640]">
              /
            </span>

            <input
              id="slug"
              type="text"
              placeholder="my-link"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full bg-transparent text-[#f1eadc] placeholder-[#777168] px-3 py-3.5 outline-none"
            />
          </div>

          <p className="text-xs text-[#777168] mt-2">
            Example: your URL becomes /my-link
          </p>

          {/* SUBMIT */}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-7 bg-[#d8894a] hover:bg-[#e09a60] disabled:bg-[#76543c] disabled:cursor-not-allowed text-[#1c1b1a] font-semibold py-3.5 rounded-md transition-colors duration-200"
          >
            {loading ? "Shortening..." : "Shorten URL"}
          </button>

          {/* ERROR */}

          {error && (
            <div className="mt-4 px-4 py-3 bg-[#3a2725] border border-[#74433d] rounded-md">
              <p className="text-red-300 text-sm text-center">{error}</p>
            </div>
          )}
        </form>

        {/* ================= RESULT ================= */}

        {shortenedUrl && (
          <div className="w-full max-w-2xl mt-6 bg-[#2d2b28] border border-[#4a4640] rounded-xl p-6 md:p-8 shadow-xl">
            {/* RESULT HEADER */}

            <div className="mb-5">
              <p className="text-xs text-[#d8894a] uppercase tracking-wider font-medium">
                Success
              </p>

              <h2 className="text-xl font-semibold text-[#f1eadc] mt-1">
                Your shortened URL
              </h2>
            </div>

            {/* SHORT URL */}

            <div className="flex">
              <input
                type="text"
                readOnly
                value={shortenedUrl}
                className="flex-1 min-w-0 p-3 bg-[#1c1b1a] border border-[#4a4640] rounded-l-md outline-none text-[#f1eadc] text-sm"
              />

              <button
                type="button"
                onClick={handleCopy}
                className={`px-5 py-3 border-y border-r rounded-r-md font-medium text-sm transition-colors duration-200 ${
                  copied
                    ? "bg-green-700 border-green-700 text-white"
                    : "bg-[#3a3733] border-[#4a4640] hover:bg-[#45413c] text-[#f1eadc]"
                }`}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            {/* CLICKABLE URL */}

            <a
              href={shortenedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-3 text-[#d8894a] hover:text-[#e09a60] text-sm break-all transition-colors"
            >
              {shortenedUrl}
            </a>

            {/* ================= QR CODE ================= */}

            <div className="mt-8 pt-7 border-t border-[#4a4640] flex flex-col items-center">
              <h2 className="text-lg font-semibold text-[#f1eadc] mb-4">
                QR Code
              </h2>

              <div className="bg-white p-4 rounded-lg">
                <QRCodeSVG value={shortenedUrl} size={200} level="H" />
              </div>

              <p className="text-xs text-[#777168] mt-3 text-center">
                Scan to open your shortened URL.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Url_form;
