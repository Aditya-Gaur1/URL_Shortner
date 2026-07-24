import axios from "axios";
import { useState } from "react";
import QRCode from "react-qr-code";
import QRCodeGenerator from "qrcode";

// Backend URL stored in the .env file
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

function App() {

  // Stores the URL entered by the user
  const [url, setUrl] = useState("");

  // Stores the shortened URL received from the backend
  const [shortUrl, setShortUrl] = useState("");

  // Tracks whether the URL has been copied
  const [copied, setCopied] = useState(false);

  // Stores the generated QR Code image
  const [qrImage, setQrImage] = useState("");

  const [loading, setLoading] = useState(false);

  // ======================================================
  // Sends the original URL to the backend and receives
  // the shortened URL
  // ======================================================
  const handleShorten = async () => {

    // Don't make the API call if the input is empty
    if (!url || loading) return;
    setLoading(true);
    try {

      // Send the original URL to the backend
      const res = await axios.post(`${API_BASE_URL}/shorten`, {
        originalUrl: url
      });

      // Store the shortened URL in state
      const newShortUrl = res.data.shortUrl;
      setShortUrl(newShortUrl);

      // Reset copy button state
      setCopied(false);

      // Generate a downloadable QR Code for the shortened URL
      const qr = await QRCodeGenerator.toDataURL(newShortUrl);
      setQrImage(qr);

    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    } finally{
      setLoading(false);
    }
  };

  // ======================================================
  // Copies the shortened URL to the clipboard
  // ======================================================
  const handleCopy = () => {

    navigator.clipboard.writeText(shortUrl);

    // Change button text to "Copied"
    setCopied(true);

    // Reset button text after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  };

  return (

    // Main container
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">

      {/* Background glow effects */}
      <div className="absolute w-96 h-96 bg-red-600/20 rounded-full blur-[120px] -top-32 -left-20"></div>
      <div className="absolute w-80 h-80 bg-white/10 rounded-full blur-[120px] bottom-0 right-0"></div>

      {/* Glassmorphism Card */}
      <div className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8">

        {/* Heading */}
        <h1 className="text-5xl font-extrabold text-center text-white mb-2">
          URL <span className="text-red-500">SHORTENER</span>
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Generate short links instantly with QR codes.
        </p>

        {/* URL Input Section */}
        <div className="flex flex-col sm:flex-row gap-3">

          <input
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 rounded-xl border border-white/10 bg-black/40 px-5 py-3 text-white placeholder:text-gray-500 outline-none focus:border-red-500 transition"
          />

          {/* Calls the backend to shorten the URL */}
          <button
            onClick={handleShorten}
            className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700 transition duration-300 shadow-lg shadow-red-500/30"
            disabled={loading}
          >
            Shorten
          </button>

        </div>

        {/* Show result only after a short URL is generated */}
        {shortUrl && (

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-6">

            <p className="text-gray-300 mb-2">
              Your Short URL
            </p>

            {/* Opens the shortened URL in a new tab */}
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 break-all hover:text-red-300"
            >
              {shortUrl}
            </a>

            {/* Copy URL Button */}
            <button
              onClick={handleCopy}
              className={`mt-5 w-full rounded-xl py-3 font-semibold transition
              ${
                copied
                  ? "bg-green-600 text-white"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
            >
              {copied ? "✓ Copied" : "Copy Link"}
            </button>

            {/* QR Code Section */}
            <div className="mt-8 flex flex-col items-center">

              {/* Display QR Code */}
              <div className="rounded-2xl bg-white p-5 shadow-xl">
                <QRCode value={shortUrl} size={170} />
              </div>

              {/* Download QR Code */}
              {qrImage && (
                <a
                  href={qrImage}
                  download="qr-code.png"
                  className="mt-6 rounded-xl border border-red-500 px-6 py-3 text-red-400 transition hover:bg-red-600 hover:text-white"
                >
                  Download QR Code
                </a>
              )}

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default App;