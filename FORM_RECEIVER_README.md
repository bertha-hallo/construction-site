# Form Receiver System - MY LIFE REAL ESTATE

This system allows you to receive and manage all form submissions from customers through a simple admin dashboard.

## Features

- **Backend Server**: Node.js/Express server to handle form submissions
- **Admin Dashboard**: Web interface to view, filter, and manage submissions
- **Form Tracking**: Track status of submissions (New, Contacted, Closed)
- **Data Storage**: Submissions stored in JSON file (submissions.json)
- **Multiple Form Types**: Supports quote forms and pricing inquiry forms

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

This will install:
- express (web server)
- cors (cross-origin resource sharing)
- body-parser (request body parsing)

### 2. Start the Server

```bash
npm start
```

The server will start on `http://localhost:3000`

### 3. Access the Admin Dashboard

Open your browser and navigate to:
```
http://localhost:3000/admin.html
```

### 4. Test Form Submissions

- Open the main site at `http://localhost:3000/index.html`
- Fill out and submit the "Get a Quote" form
- Or navigate to project pages and submit pricing inquiries
- Check the admin dashboard to see received submissions

## API Endpoints

### POST /api/submit-form
Submit a new form submission.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+233200000000",
  "service": "land-sales",
  "message": "I'm interested in...",
  "formType": "quote",
  "page": "/index.html"
}
```

### GET /api/submissions
Get all form submissions.

### PUT /api/submissions/:id
Update submission status.

**Request Body:**
```json
{
  "status": "contacted"
}
```

### DELETE /api/submissions/:id
Delete a submission.

## Admin Dashboard Features

- **View All Submissions**: See all form submissions in a table
- **Filter by Status**: Filter submissions by New, Contacted, or Closed
- **View Details**: Click the eye icon to see full submission details
- **Update Status**: Mark submissions as Contacted or Closed
- **Delete Submissions**: Remove unwanted submissions
- **Real-time Stats**: See total submissions and new submissions count
- **Auto-refresh**: Click the Refresh button to load latest data

## Form Types Supported

1. **Quote Form** (index.html): General service inquiries
2. **Pricing Form** (project pages): Specific project/pricing inquiries

## Data Storage

All submissions are stored in `submissions.json` in the project root. This file is automatically created when the server starts if it doesn't exist.

## Security Notes

- This is a basic implementation suitable for development and small-scale use
- For production, consider:
  - Adding authentication to the admin dashboard
  - Using a proper database (PostgreSQL, MongoDB, etc.)
  - Adding rate limiting to prevent spam
  - Implementing CSRF protection
  - Using HTTPS
  - Adding input validation and sanitization

## Troubleshooting

**Server won't start:**
- Make sure Node.js is installed
- Check that port 3000 is not already in use
- Run `npm install` to ensure dependencies are installed

**Forms not submitting:**
- Ensure the server is running
- Check browser console for errors
- Verify the form has the correct ID (quoteForm or pricingForm)

**Admin dashboard not loading:**
- Make sure server is running
- Check that admin.html exists in the project root
- Try accessing http://localhost:3000/admin.html directly

## File Structure

```
construction-site/
├── server.js                 # Backend server
├── package.json              # Node.js dependencies
├── admin.html                # Admin dashboard
├── submissions.json          # Stored submissions (auto-created)
├── index.html                # Main site with quote form
├── projects/                 # Project pages with pricing forms
│   ├── residential-plots.html
│   ├── managed-properties.html
│   └── ...
├── js/
│   └── main.js              # Updated to submit forms to backend
└── css/
    └── style.css
```
