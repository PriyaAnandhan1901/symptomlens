const https = require('https');

const data = JSON.stringify({
  user_id: 6,
  symptom_name: 'headache',
  severity: 5,
  notes: 'test'
});

const options = {
  hostname: 'serene-elegance-production-f349.up.railway.app',
  path: '/symptoms',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = https.request(options, res => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log('Response:', body));
});

req.on('error', e => console.log('Error:', e.message));
req.write(data);
req.end();