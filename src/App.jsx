import { useState } from "react";
import "./App.css";
import {
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from "@mui/material";

import axios from "axios";
import Lottie from "lottie-react";
import Typewriter from "typewriter-effect";
import DownloadModal from "./DownloadModal";
import animationData from "./assets/Robot_says _hello.json";

function App() {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("");
  const [generatedReply, setGeneratedReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
         "https://smart-email-assistant-backend-8sd2.onrender.com/api/email/generate",
        { emailContent, tone }
      );

      setGeneratedReply(
        typeof response.data === "string"
          ? response.data
          : JSON.stringify(response.data)
      );
    } catch (error) {
      alert("Failed to generate reply");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ✅ NAVBAR */}
      {/* <nav className="navbar">
        <h1 className="nav-title">Smart Email Assistant</h1>

        <Button
          className="download-btn-nav"
          onClick={() => setModalOpen(true)}
        >
          Download Chrome Extension
        </Button>
      </nav> */}

      <Container maxWidth="lg">
        {/* ✅ HERO */}
        <div className="hero">
          {/* LEFT - TYPING EFFECT */}
          <div className="hero-left">
            <h1 className="hero-title">Smart Email Assistant</h1>

            <p className="typing-tagline">
              <Typewriter
                options={{
                  strings: [
                    "Write professional emails in seconds.",
                    "Turn rough emails into perfect replies.",
                    "AI-powered email replies with one click.",
                    "Smart replies. Faster communication."
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 60,
                  deleteSpeed: 40
                }}
              />
            </p>

            <Button
              variant="contained"
              className="download-btn-main"
              onClick={() => setModalOpen(true)}
            >
              Download Chrome Extension
            </Button>
          </div>

          {/* RIGHT - LOTTIE */}
          <div className="hero-right">
            <Lottie animationData={animationData} loop />
          </div>
        </div>

        {/* ✅ MAIN GRID (UNCHANGED) */}
        <div className="main-grid">
          <div className="ui-card">
            <h3>Original Email</h3>

            <TextField
              fullWidth
              multiline
              rows={8}
              label="Paste your email here..."
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
            />

            <FormControl fullWidth className="mt-16">
              <InputLabel>Tone (Optional)</InputLabel>
              <Select
                value={tone}
                label="Tone"
                onChange={(e) => setTone(e.target.value)}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="professional">Professional</MenuItem>
                <MenuItem value="casual">Casual</MenuItem>
                <MenuItem value="friendly">Friendly</MenuItem>
              </Select>
            </FormControl>

            <Button
              className="generate-btn"
              fullWidth
              disabled={!emailContent || loading}
              onClick={handleSubmit}
            >
              {loading ? <CircularProgress size={24} /> : "Generate Reply"}
            </Button>
          </div>

          <div className="ui-card">
            <h3>Generated Reply</h3>

            {generatedReply ? (
              <>
                <TextField
                  fullWidth
                  multiline
                  rows={8}
                  value={generatedReply}
                  inputProps={{ readOnly: true }}
                />

                <Button
                  className="copy-btn"
                  fullWidth
                  onClick={() =>
                    navigator.clipboard.writeText(generatedReply)
                  }
                >
                  Copy to Clipboard
                </Button>
              </>
            ) : (
              <p className="placeholder">
                Your generated reply will appear here.
              </p>
            )}
          </div>
        </div>

        {/* ✅ FEATURES (UNCHANGED) */}
        <div className="features-section">
          <div className="feature-card">
            <h4>AI Powered</h4>
            <p>Smart contextual replies generated instantly.</p>
          </div>

          <div className="feature-card">
            <h4>Custom Tones</h4>
            <p>Choose from professional, casual & friendly.</p>
          </div>

          <div className="feature-card">
            <h4>Chrome Extension</h4>
            <p>Use directly inside Gmail with one click.</p>
          </div>
        </div>
      </Container>

      {/* ✅ FOOTER */}
      <footer className="footer">
        <p>© 2025 Smart Email Assistant. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">GitHub</a>
          <a href="#">LinkedIn</a>
        </div>
      </footer>

      <DownloadModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

export default App;
