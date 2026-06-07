import { useState } from "react";
import axios from "axios";

export default function SymptomForm({ token, onSymptomAdded }) {
  const [symptomName, setSymptomName] = useState("");
  const [severity, setSeverity] = useState(5);
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");
  const [listening, setListening] = useState(false);

  const handleVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser doesn't support voice input. Use Chrome!");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setListening(false);

      // Simple AI-like extraction from voice
      const lower = transcript.toLowerCase();
      setNotes(transcript);

      // Extract symptom name
      const symptoms = ["headache","fatigue","nausea","fever","cough",
        "pain","dizziness","anxiety","stress","cold","flu","back pain"];
      const found = symptoms.find((s) => lower.includes(s));
      if (found) setSymptomName(found);
      else setSymptomName(transcript.split(" ").slice(0, 2).join(" "));

      // Extract severity from numbers mentioned
      const numbers = transcript.match(/\d+/);
      if (numbers) {
        const num = parseInt(numbers[0]);
        if (num >= 1 && num <= 10) setSeverity(num);
      }

      // Keywords for severity
      if (lower.includes("severe") || lower.includes("terrible") || lower.includes("worst")) setSeverity(9);
      else if (lower.includes("moderate") || lower.includes("bad")) setSeverity(6);
      else if (lower.includes("mild") || lower.includes("little") || lower.includes("slight")) setSeverity(3);

      setMessage("🎤 Voice captured! Check the form and save.");
    };

    recognition.onerror = () => {
      setListening(false);
      setMessage("❌ Voice error. Try again.");
    };

    recognition.onend = () => setListening(false);
    recognition.start();
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        "http://localhost:5000/symptoms",
        { user_id: 1, symptom_name: symptomName, severity, notes },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("✅ Symptom logged successfully!");
      setSymptomName("");
      setSeverity(5);
      setNotes("");
      onSymptomAdded();
    } catch (err) {
      setMessage("❌ Error saving symptom");
    }
  };

  return (
    <div style={{ background:"white", padding:"24px", borderRadius:"16px", boxShadow:"0 4px 20px rgba(0,0,0,0.1)", marginBottom:"24px" }}>
      <h3 style={{ margin:"0 0 16px", color:"#333" }}>Log a Symptom 📝</h3>

      {/* Voice Button */}
      <button
        onClick={handleVoice}
        style={{ width:"100%", padding:"12px", marginBottom:"16px", background: listening ? "#F44336" : "linear-gradient(135deg,#11998e,#38ef7d)", color:"white", border:"none", borderRadius:"8px", fontSize:"15px", cursor:"pointer", fontWeight:"bold" }}
      >
        {listening ? "🔴 Listening... Speak now!" : "🎤 Tap to speak your symptom"}
      </button>

      <div style={{ marginBottom:"16px" }}>
        <label style={{ display:"block", marginBottom:"6px", color:"#555", fontWeight:"500" }}>Symptom Name</label>
        <input
          style={{ width:"100%", padding:"10px 12px", borderRadius:"8px", border:"1px solid #ddd", fontSize:"15px", boxSizing:"border-box" }}
          placeholder="e.g. headache, fatigue, nausea"
          value={symptomName}
          onChange={(e) => setSymptomName(e.target.value)}
        />
      </div>

      <div style={{ marginBottom:"16px" }}>
        <label style={{ display:"block", marginBottom:"6px", color:"#555", fontWeight:"500" }}>
          Severity: <span style={{ color:"#667eea", fontWeight:"bold", fontSize:"18px" }}>{severity}</span>/10
        </label>
        <input
          type="range" min="1" max="10" value={severity}
          onChange={(e) => setSeverity(Number(e.target.value))}
          style={{ width:"100%", accentColor:"#667eea" }}
        />
        <div style={{ display:"flex", justifyContent:"space-between", fontSize:"12px", color:"#aaa" }}>
          <span>Mild</span><span>Moderate</span><span>Severe</span>
        </div>
      </div>

      <div style={{ marginBottom:"16px" }}>
        <label style={{ display:"block", marginBottom:"6px", color:"#555", fontWeight:"500" }}>Notes (optional)</label>
        <textarea
          style={{ width:"100%", padding:"10px 12px", borderRadius:"8px", border:"1px solid #ddd", fontSize:"15px", height:"80px", resize:"none", boxSizing:"border-box" }}
          placeholder="Any additional details..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      {message && (
        <p style={{ color: message.includes("✅") || message.includes("🎤") ? "green" : "red", marginBottom:"12px" }}>
          {message}
        </p>
      )}

      <button
        onClick={handleSubmit}
        style={{ width:"100%", padding:"12px", background:"linear-gradient(135deg,#667eea,#764ba2)", color:"white", border:"none", borderRadius:"8px", fontSize:"16px", cursor:"pointer", fontWeight:"bold" }}
      >
        Save Symptom
      </button>
    </div>
  );
}