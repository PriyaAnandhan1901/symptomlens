import { useState } from "react";
import axios from "axios";

const BACKEND = "https://serene-elegance-production-f349.up.railway.app";

export default function SymptomForm() {
  const [symptomName, setSymptomName] = useState("");
  const [severity, setSeverity] = useState(5);
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const payload = JSON.parse(atob(token.split(".")[1]));
      const user_id = payload.userId;

      await axios.post(`${BACKEND}/symptoms`, {
        user_id,
        symptom_name: symptomName,
        severity: parseInt(severity),
        notes,
      });
      setMessage("Symptom saved successfully!");
      setSymptomName("");
      setSeverity(5);
      setNotes("");
    } catch (err) {
      setMessage("Error saving symptom: " + err.message);
    }
  };

  return (
    <div>
      <h2>Log Symptom</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Symptom Name:</label>
          <input
            type="text"
            value={symptomName}
            onChange={(e) => setSymptomName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Severity (1-10):</label>
          <input
            type="number"
            min="1"
            max="10"
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Notes:</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <button type="submit">Save Symptom</button>
      </form>
    </div>
  );
}