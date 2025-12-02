const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Example API endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'API is running!' });
});

// Receive quiz results and append to data/quiz-results.json
app.post('/api/quiz-results', (req, res) => {
  const payload = req.body || {};
  const dataDir = path.join(__dirname, '..', 'data');
  const outFile = path.join(dataDir, 'quiz-results.json');
  try{
    if(!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    let arr = [];
    if(fs.existsSync(outFile)){
      try{ arr = JSON.parse(fs.readFileSync(outFile, 'utf8') || '[]'); }catch(e){ arr = []; }
    }
    arr.push(payload);
    fs.writeFileSync(outFile, JSON.stringify(arr, null, 2), 'utf8');
    res.json({ ok: true });
  }catch(err){
    console.error('Failed to save quiz result', err);
    res.status(500).json({ ok: false, error: 'Failed to save result' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend API server running on port ${PORT}`);
}); 