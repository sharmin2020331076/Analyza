# Analyza - AI Resume Analyzer

An AI-powered resume analysis tool that helps you optimize your resume for Applicant Tracking Systems (ATS) and get personalized feedback.

## Features

- **Easy Authentication** - Sign in with Puter.js (no backend required)
- **Resume Upload & Storage** - Upload and store multiple resumes securely
- **AI-Powered Analysis** - Get ATS scores and custom feedback for job listings
- **Modern UI** - Clean, responsive design that works on all devices

## Tech Stack

- **React** - UI library
- **React Router v7** - Routing and navigation
- **Puter.js** - Serverless auth, storage, and AI
- **Tailwind CSS v4** - Styling
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Zustand** - State management

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/adrianhajdin/ai-resume-analyzer.git
cd ai-resume-analyzer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## How It Works

1. **Sign In** - Authenticate using Puter.js
2. **Upload Resume** - Upload your resume (PDF format)
3. **Add Job Listing** - Paste the job description you're targeting
4. **Get Analysis** - Receive AI-powered feedback and ATS score
5. **Improve** - Use the insights to optimize your resume

## Project Structure

```
app/
├── routes/          # Page routes
├── components/      # Reusable components
├── lib/            # Utilities and helpers
└── app.css         # Global styles
```

## License

This project is open source and available under the MIT License.

## Credits

Built following the tutorial by [JavaScript Mastery](https://www.youtube.com/@javascriptmastery)
