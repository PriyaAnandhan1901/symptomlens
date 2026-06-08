import { useState } from "react";
import axios from "axios";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("https://symptomlens-backend-production.up.railway.app/auth/login", 
    { email, password }
);
      localStorage.setItem("token", res.data.token);
      onLogin(res.data.token);
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#667eea,#764ba2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ background:"white", padding:"40px", borderRadius:"16px", width:"360px", boxShadow:"0 20px 60px rgba(0,0,0,0.2)", display:"flex", flexDirection:"column", gap:"16px" }}>
        <h2 style={{ margin:0, fontSize:"28px", textAlign:"center" }}>SymptomLens 🏥</h2>
        <p style={{ margin:0, color:"#888", textAlign:"center" }}>Login to your account</p>
        {error && <p style={{ color:"red", textAlign:"center" }}>{error}</p>}
        <input
          style={{ padding:"12px", borderRadius:"8px", border:"1px solid #ddd", fontSize:"16px" }}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          style={{ padding:"12px", borderRadius:"8px", border:"1px solid #ddd", fontSize:"16px" }}
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          style={{ padding:"14px", background:"linear-gradient(135deg,#667eea,#764ba2)", color:"white", border:"none", borderRadius:"8px", fontSize:"16px", cursor:"pointer", fontWeight:"bold" }}
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}