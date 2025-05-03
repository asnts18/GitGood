# Open Source Project Discovery Platform

A platform to help developers find open source projects and issues that match their skill level. The platform includes both a web application and a Chrome extension to enhance the GitHub browsing experience.

## 🚀 Features

- Search and filter open source projects by difficulty level
- Browse issues across different projects
- Filter by project topics and issue labels
- Seamless GitHub integration
- Chrome extension for enhanced GitHub browsing
- (Future) Authentication and saved preferences
- (Future) Sponsored project highlights

## 🛠️ Tech Stack

### Web Application (Frontend)
- **Framework**: React.js with TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Authentication (future)
- **API Client**: Axios

### Chrome Extension
- **Tech**: JavaScript/TypeScript
- **UI Framework**: React.js (Create React Extension)
- **State Management**: Context API

### Backend
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript
- **API Architecture**: RESTful with OpenAPI/Swagger

## 📁 Project Structure

```
project-root/
├── frontend/           # React web application
├── chrome-extension/   # Chrome extension
├── backend/           # Express.js backend
└── shared/            # Shared types and constants
```

### Detailed Structure

<details>
<summary>Click to expand</summary>

```
project-root/
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── features/        # Redux slices and features
│   │   ├── services/        # API integration
│   │   ├── hooks/          # Custom React hooks
│   │   └── utils/          # Utility functions
│
├── chrome-extension/
│   ├── src/
│   │   ├── content/        # Content scripts
│   │   ├── popup/         # Extension popup
│   │   └── background/    # Background scripts
│
└── backend/
    ├── src/
    │   ├── controllers/    # Route controllers
    │   ├── services/       # Business logic
    │   ├── routes/        # API routes
    │   └── middleware/    # Custom middleware
```
</details>

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Chrome browser (for extension development)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-name>
```

2. Install dependencies for all packages:
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

# Install chrome extension dependencies
cd ../chrome-extension
npm install
```

3. Set up environment variables:
```bash
# Frontend
cp frontend/.env.example frontend/.env

# Backend
cp backend/.env.example backend/.env
```

4. Start the development servers:
```bash
# Start frontend
cd frontend
npm run dev

# Start backend
cd ../backend
npm run dev

# Build chrome extension
cd ../chrome-extension
npm run build
```

## 🔧 Development

### Frontend Development
- The frontend runs on `http://localhost:3000`
- Uses Redux Toolkit for state management
- Implements responsive design with Tailwind CSS

### Backend Development
- API runs on `http://localhost:8000`
- Uses TypeScript for type safety
- Implements RESTful API principles

### Chrome Extension Development
1. Build the extension
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable Developer Mode
4. Click "Load unpacked" and select the `chrome-extension/build` directory

## 🌐 API Documentation

### Core Endpoints

```typescript
// Projects
GET /api/projects
GET /api/projects/:id
GET /api/projects/:id/issues

// Issues
GET /api/issues
GET /api/issues/:id

// Search
GET /api/search/projects
GET /api/search/issues
```

## 🧪 Testing

```bash
# Run frontend tests
cd frontend
npm test

# Run backend tests
cd backend
npm test

# Run chrome extension tests
cd chrome-extension
npm test
```

## 🚀 Deployment

### Frontend Deployment
- Build the production bundle:
```bash
cd frontend
npm run build
```

### Backend Deployment
- Build the production bundle:
```bash
cd backend
npm run build
```

### Chrome Extension Deployment
1. Build the production bundle:
```bash
cd chrome-extension
npm run build
```
2. Package the extension for the Chrome Web Store

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by [CodeTriage](https://www.codetriage.com/)
- UI inspiration from [Good First Issue](https://goodfirstissue.dev/)
test