# Nutri-Guard

A full-stack application that analyzes food images and provides health safety recommendations based on user's health conditions.

## Project Structure

```
Nutri-Guard/
├── server/          # Node.js/Express backend
└── client/          # React/Vite frontend
```

## Setup Instructions

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `server` directory with your API keys:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   NINJA_API_KEY=your_ninja_api_key_here
   ```

4. Start the server:
   ```bash
   npm start
   ```
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

The server will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The client will run on `http://localhost:5173`

## API Keys Required

1. **Gemini API Key**: Get it from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. **API Ninjas Key**: Get it from [API Ninjas](https://api-ninjas.com/api/nutrition)

## Features

- Upload food images for analysis
- Select health conditions (Diabetes, Hypertension, etc.)
- Get AI-powered nutritional analysis
- Traffic light system (Green/Yellow/Red) for quick safety assessment
- Detailed recommendations and suggestions

## Tech Stack

**Backend:**
- Node.js
- Express
- Multer (file uploads)
- Google Gemini 1.5 Flash (AI analysis)
- API Ninjas (nutrition data)
- Axios

**Frontend:**
- React
- Vite
- Axios
- Lucide React (icons)
- Modern CSS with mobile-first design

