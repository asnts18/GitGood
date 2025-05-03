# GitGood: Find Your Next Open Source Contribution

GitGood is a platform designed to help developers discover beginner-friendly open source projects and issues that match their skills and interests. The application includes a web interface that makes it easy to filter and find opportunities for meaningful contributions.

![GitGood Logo](frontend/src/images/newpurp.png)

## 🚀 Features

- **Smart Project Matching**: Find repositories and issues tailored to your programming language and skill level
- **Difficulty Filtering**: Filter projects by beginner, intermediate, or advanced difficulty levels
- **Timeline View**: See recently updated repositories and issues
- **Project Exploration**: View repository details including stars, language, and open issues
- **Enhanced GitHub Search**: Search across GitHub with advanced filters for languages, organizations, and topics
- **Beginner Friendliness Score**: Each project is rated based on documentation quality, community activity, and issue organization

## 📋 Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [API Integration](#api-integration)
- [Contributing](#contributing)
- [License](#license)

## 🏁 Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- GitHub Personal Access Token (for API access)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/gitgood.git
   cd gitgood
   ```

2. Install dependencies for both frontend and backend
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   cd frontend
   npm install
   
   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. Create a `.env` file in the backend directory with your GitHub token (see [Environment Variables](#environment-variables))

4. Start the development servers
   ```bash
   # From the root directory
   npm run dev
   ```

This will start both the frontend and backend servers concurrently. The frontend will be available at http://localhost:3000 and the backend at http://localhost:3001.

### Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```
GITHUB_TOKEN=your_github_personal_access_token
PORT=3001
```

You can obtain a GitHub Personal Access Token from your GitHub account settings. The token needs at least the following scopes:
- `public_repo`: To access public repositories
- `read:org`: For organization-related queries
- `read:user`: For user-related queries

## 📁 Project Structure

```
gitgood/
├── backend/               # Express server for proxying GitHub API requests
│   ├── server.js          # Main server file
│   └── package.json       # Backend dependencies
├── frontend/              # React frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── common/    # Shared components
│   │   │   ├── filters/   # Filter components
│   │   │   └── ui/        # UI components
│   │   ├── contexts/      # React context providers
│   │   ├── images/        # Image assets
│   │   ├── lib/           # Utility functions
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── utils/         # Utility files
│   ├── index.tsx          # React entry point
│   ├── App.tsx            # Main App component
│   └── package.json       # Frontend dependencies
└── package.json           # Root package.json for running both services
```

## 🛠️ Tech Stack

### Frontend
- **React**: UI framework
- **TypeScript**: Type-safe JavaScript
- **React Router**: Navigation and routing
- **Axios**: HTTP client
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library

### Backend
- **Express**: Node.js web server framework
- **Axios**: HTTP client for GitHub API requests
- **CORS**: Cross-Origin Resource Sharing middleware
- **dotenv**: Environment variable management

## 🔗 API Integration

GitGood uses the GitHub REST API for repository and issue data. Instead of directly connecting to GitHub from the frontend, all requests are proxied through the backend server to:

1. Secure the GitHub token
2. Avoid hitting rate limits on the client side
3. Enable additional processing of the data

The backend server exposes the following endpoints:

- `GET /api/rate-limit`: Returns the current GitHub API rate limit status
- `GET /api/github/search/repositories`: Proxies GitHub repository search requests
- `GET /api/github/repos/:owner/:repo/issues`: Proxies GitHub issue requests

## 💡 How It Works

1. **Search**: Use the search bar to find repositories based on keywords, languages, or topics
2. **Filter**: Apply filters for difficulty level, programming language, and last updated timeframe
3. **Explore**: View project details including stars, issues, and beginner-friendliness scores
4. **Contribute**: Click on issues to see details and start your contribution journey

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please make sure to update tests as appropriate and adhere to the existing coding style.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgements

- [GitHub API](https://docs.github.com/en/rest) for providing the data
- [React](https://reactjs.org/) for the frontend framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- All open-source contributors who make software accessible to everyone

---

Built with ❤️ for the open-source community