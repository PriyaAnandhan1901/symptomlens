import { useState, useEffect } from "react";
import axios from "axios";
import Login from "./Login";
import SymptomForm from "./SymptomForm";
import SymptomList from "./SymptomList";
import SeverityChart from "./SeverityChart";
import DailyCheckin from "./DailyCheckin";
import AnomalyDetector from "./AnomalyDetector";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [symptoms, setSymptoms] = useState([]);
  const [checkins, setCheckins] = useState([]);
  const [activeTab, setActiveTab] = useState("symptoms");

  const fetchSymptoms = async () => {
    try {
      const res = await axios.get("https://serene-elegance-production-f349.up.railway.app/symptoms");
      setSymptoms(res.data);
    } catch (err) { console.error(err); }
  };

  const fetchCheckins = async () => {
    try {
      const res = await axios.get("https://serene-elegance-production-f349.up.railway.app/checkins");
      setCheckins(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    if (token) { fetchSymptoms(); fetchCheckins(); }
  }, [token]);

  if (!token) return <Login onLogin={setToken} />;

  const tabs = [
    { id: "symptoms", label: "Symptoms" },
    { id: "checkin", label: "Check-in" },
    { id: "chart", label: "Chart" },
    { id: "ai", label: "AI" },
  ];

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#667eea,#764ba2)", padding:"40px 20px" }}>
      <div style={{ maxWidth:"600px", margin:"0 auto" }}>

        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"24px" }}>
          <h1 style={{ margin:0, color:"white", fontSize:"28px" }}>SymptomLens</h1>
          <div style={{ display:"flex", gap:"8px" }}>
  <button
    onClick={() => window.open("https://serene-elegance-production-f349.up.railway.app/report/1", "_blank")}
    style={{ padding:"8px 16px", background:"rgba(255,255,255,0.9)", color:"#667eea", border:"none", borderRadius:"8px", cursor:"pointer", fontWeight:"bold" }}
  >PDF</button>
  <button
    onClick={() => { localStorage.removeItem("token"); setToken(null); }}
    style={{ padding:"8px 16px", background:"rgba(255,255,255,0.2)", color:"white", border:"1px solid rgba(255,255,255,0.4)", borderRadius:"8px", cursor:"pointer" }}
  >Logout</button>
</div>
        </div>

        <div style={{ display:"flex", gap:"8px", marginBottom:"24px" }}>
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{ flex:1, padding:"10px", border:"none", borderRadius:"8px", cursor:"pointer", fontWeight:"500", fontSize:"13px",
                background: activeTab === tab.id ? "white" : "rgba(255,255,255,0.2)",
                color: activeTab === tab.id ? "#667eea" : "white" }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "symptoms" && (
          <div>
            <SymptomForm token={token} onSymptomAdded={fetchSymptoms} />
            <SymptomList symptoms={symptoms} />
          </div>
        )}

        {activeTab === "checkin" && (
          <div>
            <DailyCheckin token={token} onCheckinAdded={fetchCheckins} />
            {checkins.length > 0 && (
              <div style={{ background:"white", padding:"24px", borderRadius:"16px", boxShadow:"0 4px 20px rgba(0,0,0,0.1)" }}>
                <h3 style={{ margin:"0 0 16px", color:"#333" }}>Recent Check-ins</h3>
                {checkins.slice(0, 5).map((c) => (
                  <div key={c.id} style={{ padding:"12px", borderRadius:"8px", border:"1px solid #eee", marginBottom:"8px", display:"flex", justifyContent:"space-between" }}>
                    <span style={{ fontSize:"13px", color:"#666" }}>{new Date(c.checked_in_at).toLocaleDateString()}</span>
                    <span style={{ fontSize:"13px" }}>Sleep: {c.sleep_hours}h</span>
                    <span style={{ fontSize:"13px" }}>Stress: {c.stress_level}</span>
                    <span style={{ fontSize:"13px" }}>Mood: {c.mood}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "chart" && (
          <SeverityChart symptoms={symptoms} />
        )}

        {activeTab === "ai" && (
          <AnomalyDetector symptoms={symptoms} />
        )}

      </div>
    </div>
  );
}
