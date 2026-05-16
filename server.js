const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'submissions.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the project directory
app.use(express.static(__dirname));

// Initialize submissions file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
}

// API Routes

// Submit a form
app.post('/api/submit-form', (req, res) => {
  try {
    const { name, email, phone, service, message, formType, page } = req.body;
    
    // Read existing submissions
    const submissions = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    
    // Create new submission
    const newSubmission = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      service: service || 'General Inquiry',
      message,
      formType: formType || 'quote',
      page: page || 'index',
      timestamp: new Date().toISOString(),
      status: 'new'
    };
    
    // Add to submissions
    submissions.push(newSubmission);
    
    // Save to file
    fs.writeFileSync(DATA_FILE, JSON.stringify(submissions, null, 2));
    
    res.json({ success: true, message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ success: false, message: 'Error submitting form' });
  }
});

// Get all submissions
app.get('/api/submissions', (req, res) => {
  try {
    const submissions = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    res.json(submissions);
  } catch (error) {
    console.error('Error reading submissions:', error);
    res.status(500).json({ success: false, message: 'Error reading submissions' });
  }
});

// Update submission status
app.put('/api/submissions/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const submissions = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    const index = submissions.findIndex(sub => sub.id === id);
    
    if (index !== -1) {
      submissions[index].status = status;
      fs.writeFileSync(DATA_FILE, JSON.stringify(submissions, null, 2));
      res.json({ success: true, message: 'Status updated' });
    } else {
      res.status(404).json({ success: false, message: 'Submission not found' });
    }
  } catch (error) {
    console.error('Error updating submission:', error);
    res.status(500).json({ success: false, message: 'Error updating submission' });
  }
});

// Delete submission
app.delete('/api/submissions/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    const submissions = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    const filtered = submissions.filter(sub => sub.id !== id);
    
    fs.writeFileSync(DATA_FILE, JSON.stringify(filtered, null, 2));
    res.json({ success: true, message: 'Submission deleted' });
  } catch (error) {
    console.error('Error deleting submission:', error);
    res.status(500).json({ success: false, message: 'Error deleting submission' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Admin dashboard: http://localhost:${PORT}/admin.html`);
});
