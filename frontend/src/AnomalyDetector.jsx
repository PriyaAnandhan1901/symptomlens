import { useState } from "react";
import axios from "axios";

export default function AnomalyDetector({ symptoms }) {
  const [results, setResults] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const analyzeSymptoms = async () => {
    if (symptoms.length < 3) {
      setMessage("Log at least 3 symptoms to detect anomalies!");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5001/analyze", {
        symptoms: symptoms
      });
      setResults(res.data.results);
      setMessage(res.data.message);
    } catch (err) {
      setMessage("AI service error. Make sure Python server is running!");
    }
    setLoading(false);
  };

  return (
    <div style={{ background:"white", padding:"24px", borderRadius:"16px", boxShadow:"0 4px 20px rgba(0,0,0,0.1)", marginBottom:"24px" }}>
      <h3 style={{ margin:"0 0 8px", color:"#333" }}>AI Anomaly Detection 🤖</h3>
      <p style={{ margin:"0 0 16px", color:"#888", fontSize:"13px" }}>Detects unusual symptom patterns in your data</p>

      <button
        onClick={analyzeSymptoms}
        disabled={loading}
        style={{ width:"100%", padding:"12px", background:"linear-gradient(135deg,#f093fb,#f5576c)", color:"white", border:"none", borderRadius:"8px", fontSize:"15px", cursor:"pointer", fontWeight:"bold", marginBottom:"16px" }}
      >
        {loading ? "Analyzing..." : "Run AI Analysis"}
      </button>

      {message && (
        <div style={{ padding:"12px", borderRadius:"8px", background: message.includes("unusual") ? "#FFF3F3" : "#F0FFF4", marginBottom:"16px" }}>
          <p style={{ margin:0, fontWeight:"500", color: message.includes("unusual") ? "#F44336" : "#4CAF50" }}>
            {message.includes("unusual") ? "⚠️ " : "✅ "}{message}
          </p>
        </div>
      )}

      {results && results.map((r) => (
        <div key={r.id} style={{ padding:"12px 16px", borderRadius:"8px", border: r.is_anomaly ? "2px solid #F44336" : "1px solid #eee", marginBottom:"8px", display:"flex", justifyContent:"space-between", alignItems:"center", background: r.is_anomaly ? "#FFF3F3" : "white" }}>
          <div>
            <p style={{ margin:"0 0 2px", fontWeight:"500", textTransform:"capitalize" }}>{r.symptom_name}</p>
            <p style={{ margin:0, fontSize:"12px", color:"#aaa" }}>Severity: {r.severity}/10</p>
          </div>
          {r.is_anomaly ? (
            <span style={{ background:"#F44336", color:"white", padding:"4px 10px", borderRadius:"999px", fontSize:"12px", fontWeight:"500" }}>⚠️ Unusual</span>
          ) : (
            <span style={{ background:"#4CAF50", color:"white", padding:"4px 10px", borderRadius:"999px", fontSize:"12px", fontWeight:"500" }}>✅ Normal</span>
          )}
        </div>
      ))}
    </div>
  );
}