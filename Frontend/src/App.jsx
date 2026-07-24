import axios from "axios";
import { useState } from "react";
import QRCode from "react-qr-code";
import QRCodeGenerator from "qrcode";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [qr, setQr] = useState("");

  const handleShorten = async () => {
    if(!url) return;

    try{
      const res = await axios.post(`${API_BASE_URL}/shorten`,{
        originalUrl : url
      })

      const newShortUrl = res.data.shortUrl;
      setShortUrl(newShortUrl);
      setCopied(false);


      const qr = await QRCodeGenerator.toDataURL(newShortUrl);
      setQr(qr);

    } catch (err){
      console.log(err);
      alert("Something went wrong");
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div>MERN URL SHORTENER</div>
  )
}

export default App
