from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np

app = Flask(__name__)
CORS(app)

def detect_anomalies(severities):
    if len(severities) < 3:
        return [False] * len(severities)
    
    arr = np.array(severities, dtype=float)
    mean = np.mean(arr)
    std = np.std(arr)
    
    if std == 0:
        return [False] * len(severities)
    
    anomalies = []
    for val in arr:
        z_score = abs((val - mean) / std)
        anomalies.append(bool(z_score > 1.5))
    
    return anomalies

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    symptoms = data.get('symptoms', [])
    
    if not symptoms:
        return jsonify({'anomalies': [], 'message': 'No data'})
    
    severities = [s['severity'] for s in symptoms]
    anomaly_flags = detect_anomalies(severities)
    
    results = []
    for i, s in enumerate(symptoms):
        results.append({
            'id': s['id'],
            'symptom_name': s['symptom_name'],
            'severity': s['severity'],
            'is_anomaly': anomaly_flags[i]
        })
    
    anomaly_count = sum(anomaly_flags)
    message = ""
    if anomaly_count == 0:
        message = "All symptoms look normal"
    else:
        message = str(anomaly_count) + " unusual symptom(s) detected!"
    
    return jsonify({
        'results': results,
        'message': message,
        'anomaly_count': anomaly_count
    })

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'AI service running!'})

if __name__ == '__main__':
    app.run(port=5001, debug=True)