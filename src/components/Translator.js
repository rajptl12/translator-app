import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function Translator() {
  const [text, setText] = useState("");
  const [translated, setTranslated] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("hi");
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!text.trim()) return alert("Please enter text to translate.");
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          text
        )}&langpair=${sourceLang}|${targetLang}`
      );
      setTranslated(res.data.responseData.translatedText);
    } catch (err) {
      console.error(err);
      alert("⚠️ Translation failed. Check your internet or try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <motion.div
        className="card shadow-lg p-4"
        style={{
          maxWidth: "600px",
          width: "100%",
          borderRadius: "20px",
          background: "white",
        }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-center mb-3" style={{ color: "#4b2e83" }}>
          🌐 Language Translator
        </h3>

        <textarea
          className="form-control mb-3"
          rows="4"
          placeholder="Type text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            borderRadius: "12px",
            borderColor: "#c3b4e6",
            boxShadow: "0 0 8px rgba(102,126,234,0.2)",
          }}
        />

        <div className="d-flex justify-content-between align-items-center mb-3">
          <select
            className="form-select"
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            style={{ width: "45%", borderRadius: "10px" }}
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="gu">Gujarati</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
          </select>

          <span className="fw-bold">➡️</span>

          <select
            className="form-select"
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            style={{ width: "45%", borderRadius: "10px" }}
          >
            <option value="hi">Hindi</option>
            <option value="gu">Gujarati</option>
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
          </select>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleTranslate}
          className="btn w-100 text-white"
          disabled={loading}
          style={{
            background: "linear-gradient(90deg, #764ba2, #667eea)",
            borderRadius: "10px",
            fontWeight: "600",
          }}
        >
          {loading ? "Translating..." : "Translate ✨"}
        </motion.button>

        {translated && (
          <motion.div
            className="mt-4 p-3"
            style={{
              background: "#f8f9fa",
              borderRadius: "100px",
              border: "1px solid #e0e0e0",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <strong>Translated Text:</strong>
            <p style={{ marginTop: "5px", fontSize: "1.1rem" }}>{translated}</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
