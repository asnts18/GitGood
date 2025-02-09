# GitGood 

GitGood is a user-friendly platform designed to help CS students and aspiring developers contribute to open-source projects on GitHub. By simplifying the Git workflow and providing guided instructions, we make it easier for newcomers to make their first open-source contributions.

## Problem Statement 

While many CS students can write quality code (especially with AI assistance), they often struggle with:
- Understanding Git commands and workflows
- Finding suitable open-source projects to contribute to
- Following proper contribution guidelines
- Collaborating with other developers

GitGood bridges this gap by providing an intuitive interface and step-by-step guidance for GitHub contributions.

## Features 

### Project Discovery
- Browse open-source projects filtered by programming language and difficulty level
- Search functionality with tags (beginner-friendly, good-first-issue, etc.)
- Detailed project cards showing key information and contribution guidelines

### Guided Git Workflow
- Interactive step-by-step instructions for Git commands
- Clear explanations for each command and its purpose
- Visual representation of the Git workflow
- Common troubleshooting tips and solutions

### Project Buddy System
- Post project descriptions to recruit team members
- Browse and apply to join existing projects
- Connect with other students and developers
- Build a portfolio through collaborative work

## Getting Started 🏁

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/gitgood.git

# Navigate to the project directory
cd gitgood

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Tech Stack 💻

- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Type Checking**: TypeScript
- **Package Manager**: npm

## Contributing 🤝

We welcome contributions from developers of all skill levels! Here's how you can help:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/improvement`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/improvement`)
6. Open a Pull Request

Please read our [Contributing Guidelines](CONTRIBUTING.md) for more details.

## Project Structure 📁

```
src/
├── components/         # Reusable UI components
├── constants/         # Constants and configuration
├── hooks/            # Custom React hooks
├── services/         # API and external service integrations
├── types/            # TypeScript type definitions
└── utils/            # Helper functions and utilities
```

## Roadmap 🗺️

- [ ] Implement GitHub OAuth integration
- [ ] Add project recommendation system
- [ ] Create interactive Git command tutorials
- [ ] Develop team formation features
- [ ] Add project progress tracking
- [ ] Implement messaging system for team communication

## License 📄

This project is licensed under the APACHE2.0 - see the [LICENSE](LICENSE) file for details.

## Contact 📧

- GitHub: [@RohanSkaria](https://github.com/RohanSkaria)

## Acknowledgments 🙏

- Thanks to all contributors who help make this project better
- Inspired by the need to make open-source contribution more accessible
