export default function Toast({ message, type, onClose }) {
  if (!message) return null;

  const bg = type === "error" ? "#F44336" : "#4CAF50";

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        left: "20px",
        maxWidth: "360px",
        margin: "0 auto 0 auto",
        background: bg,
        color: "white",
        padding: "14px 18px",
        borderRadius: "10px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
        zIndex: 9999,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "12px",
        fontSize: "14px",
        animation: "slideDown 0.3s ease"
      }}
    >
      <style>{`
        @keyframes slideDown {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
      <span>{type === "error" ? "❌ " : "✅ "}{message}</span>
      <button
        onClick={onClose}
        style={{ background: "none", border: "none", color: "white", cursor: "pointer", fontSize: "16px" }}
      >✕</button>
    </div>
  );
}