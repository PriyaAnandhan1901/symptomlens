export default function SymptomList({ symptoms }) {
  const getSeverityColor = (s) => {
    if (s <= 3) return "#4CAF50";
    if (s <= 6) return "#FF9800";
    return "#F44336";
  };

  return (
    <div style={{ background:"white", padding:"24px", borderRadius:"16px", boxShadow:"0 4px 20px rgba(0,0,0,0.1)" }}>
      <h3 style={{ margin:"0 0 16px", color:"#333" }}>Recent Symptoms 📋</h3>
      {symptoms.length === 0 ? (
        <p style={{ color:"#aaa", textAlign:"center" }}>No symptoms logged yet</p>
      ) : (
        symptoms.map((s) => (
          <div key={s.id} style={{ padding:"12px 16px", borderRadius:"10px", border:"1px solid #eee", marginBottom:"10px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div>
              <p style={{ margin:"0 0 4px", fontWeight:"500", color:"#333", textTransform:"capitalize" }}>{s.symptom_name}</p>
              <p style={{ margin:0, fontSize:"12px", color:"#aaa" }}>{new Date(s.logged_at).toLocaleString()}</p>
              {s.notes && <p style={{ margin:"4px 0 0", fontSize:"13px", color:"#666" }}>{s.notes}</p>}
            </div>
            <div style={{ background:getSeverityColor(s.severity), color:"white", borderRadius:"50%", width:"40px", height:"40px", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:"bold", fontSize:"16px", flexShrink:0 }}>
              {s.severity}
            </div>
          </div>
        ))
      )}
    </div>
  );
}