import { useState } from "react";
import axios from "axios";

export default function DailyCheckin({ token, onCheckinAdded }) {
  const [sleep, setSleep] = useState(7);
  const [stress, setStress] = useState(5);
  const [mood, setMood] = useState(5);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const headers = { Authorization: "Bearer " + token };
      await axios.post(
        "https://symptomlens-backend-production.up.railway.app/checkins",
        { user_id: 1, sleep_hours: sleep, stress_level: stress, mood: mood },
        { headers: headers }
      );
      setMessage("Checkin saved!");
      onCheckinAdded();
    } catch (err) {
      setMessage("Error saving checkin");
    }
  };

  return (
    <div style={{ background:"white", padding:"24px", borderRadius:"16px", boxShadow:"0 4px 20px rgba(0,0,0,0.1)", marginBottom:"24px" }}>
      <h3 style={{ margin:"0 0 16px", color:"#333" }}>Daily Check-in</h3>

      <div style={{ marginBottom:"16px" }}>
        <label style={{ display:"block", marginBottom:"6px", color:"#555", fontWeight:"500" }}>
          Sleep Hours: {sleep}h
        </label>
        <input type="range" min="1" max="12" step="0.5" value={sleep}
          onChange={(e) => setSleep(Number(e.target.value))}
          style={{ width:"100%", accentColor:"#667eea" }}
        />
        <div style={{ display:"flex", justifyContent:"space-between", fontSize:"12px", color:"#aaa" }}>
          <span>1h</span><span>6h</span><span>12h</span>
        </div>
      </div>

      <div style={{ marginBottom:"16px" }}>
        <label style={{ display:"block", marginBottom:"6px", color:"#555", fontWeight:"500" }}>
          Stress Level: {stress}/10
        </label>
        <input type="range" min="1" max="10" value={stress}
          onChange={(e) => setStress(Number(e.target.value))}
          style={{ width:"100%", accentColor:"#F44336" }}
        />
      </div>

      <div style={{ marginBottom:"16px" }}>
        <label style={{ display:"block", marginBottom:"6px", color:"#555", fontWeight:"500" }}>
          Mood: {mood}/10
        </label>
        <input type="range" min="1" max="10" value={mood}
          onChange={(e) => setMood(Number(e.target.value))}
          style={{ width:"100%", accentColor:"#4CAF50" }}
        />
        <div style={{ display:"flex", justifyContent:"space-between", fontSize:"12px", color:"#aaa" }}>
          <span>Bad</span><span>Okay</span><span>Great</span>
        </div>
      </div>

      {message && (
        <p style={{ color:"green", marginBottom:"12px" }}>{message}</p>
      )}

      <button
        onClick={handleSubmit}
        style={{ width:"100%", padding:"12px", background:"linear-gradient(135deg,#11998e,#38ef7d)", color:"white", border:"none", borderRadius:"8px", fontSize:"16px", cursor:"pointer", fontWeight:"bold" }}
      >
        Save Checkin
      </button>
    </div>
  );
}