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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      {/* ================= FORM ================= */}

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white rounded-lg shadow-md p-10"
      >
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-10">
          URL Shortener
        </h1>

        {/* URL */}

        <label
          htmlFor="url"
          className="block text-lg font-semibold text-gray-700 mb-2"
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
          className="w-full border border-gray-300 rounded-md px-5 py-4 text-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />

        {/* CUSTOM SLUG */}

        <label
          htmlFor="slug"
          className="block text-lg font-semibold text-gray-700 mt-6 mb-2"
        >
          Custom slug
          <span className="text-sm font-normal text-gray-500"> (optional)</span>
        </label>

        <input
          id="slug"
          type="text"
          placeholder="e.g. my-link"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-5 py-4 text-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />

        <p className="text-sm text-gray-500 mt-2">
          Example: your URL becomes /my-link
        </p>

        {/* SUBMIT */}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-5 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white text-lg font-medium py-4 rounded-md transition duration-200"
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </button>

        {/* ERROR */}

        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </form>

      {/* ================= RESULT ================= */}

      {shortenedUrl && (
        <div className="w-full max-w-2xl mt-6 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-3 text-gray-800">
            Your shortened URL:
          </h2>

          {/* SHORT URL */}

          <div className="flex">
            <input
              type="text"
              readOnly
              value={shortenedUrl}
              className="flex-1 p-3 border border-gray-300 rounded-l-md bg-gray-50 outline-none text-gray-700"
            />

            <button
              type="button"
              onClick={handleCopy}
              className={`px-5 py-3 rounded-r-md transition-colors duration-200 ${
                copied
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-800"
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
            className="block mt-3 text-blue-500 hover:underline break-all"
          >
            {shortenedUrl}
          </a>

          {/* ================= QR CODE ================= */}

          <div className="flex flex-col items-center mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              QR Code
            </h2>

            <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm">
              <QRCodeSVG value={shortenedUrl} size={200} level="H" />
            </div>

            <p className="text-sm text-gray-500 mt-3 text-center">
              Scan this QR code to open your shortened URL.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Url_form;
