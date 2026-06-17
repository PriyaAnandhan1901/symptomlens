export default function Landing({ onGetStarted }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }}>
      <div style={{
        background: "white",
        borderRadius: "24px",
        padding: "48px 32px",
        maxWidth: "480px",
        width: "100%",
        textAlign: "center",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
      }}>
        <div style={{ fontSize: "56px", marginBottom: "16px" }}>🩺</div>
        <h1 style={{ margin: "0 0 8px", color: "#333", fontSize: "32px" }}>SymptomLens</h1>
        <p style={{ color: "#888", fontSize: "16px", marginBottom: "32px" }}>
          Track symptoms, detect patterns, and get AI-powered health insights — all in one place.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", textAlign: "left" }}>
            <span style={{ fontSize: "20px" }}>🎤</span>
            <span style={{ color: "#555", fontSize: "14px" }}>Log symptoms by voice</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", textAlign: "left" }}>
            <span style={{ fontSize: "20px" }}>🤖</span>
            <span style={{ color: "#555", fontSize: "14px" }}>AI anomaly detection</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", textAlign: "left" }}>
            <span style={{ fontSize: "20px" }}>📄</span>
            <span style={{ color: "#555", fontSize: "14px" }}>Export PDF reports for your doctor</span>
          </div>
        </div>

        <button
          onClick={onGetStarted}
          style={{
            width: "100%",
            padding: "14px",
            background: "linear-gradient(135deg,#667eea,#764ba2)",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Get Started →
        </button>
      </div>
    </div>
  );
}